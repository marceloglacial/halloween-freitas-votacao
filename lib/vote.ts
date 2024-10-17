'use server'
import { arrayUnion, doc, getDoc, increment, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export const handleVote = async (pollId: string, selectedOption: GuestType, user: GuestType): Promise<ApiResponse> => {
    try {
        const guestResult = await updateGuest(user, pollId, selectedOption)
        const pollResult = await updatePoll(pollId, selectedOption)

        return {
            data: { guestResult, pollResult },
            status: 'success'
        }

    } catch (e) {
        console.error('Error submitting vote:', e)
        throw new Error('Failed to submit vote')
    }

}

const updatePoll = async (pollId: string, selectedOption: GuestType): Promise<ApiResponse> => {
    const pollRef = doc(db, 'polls', pollId)
    const pollSnapshot = await getDoc(pollRef)

    const selectedVote = structuredClone(selectedOption)
    delete selectedVote.createdAt
    delete selectedVote.polls

    if (!pollSnapshot.exists()) {
        throw new Error('Poll does not exist')
    }

    const pollData = pollSnapshot.data() as PollType

    if (!Array.isArray(pollData.options)) {
        pollData.options = []
    }

    const optionIndex = pollData.options.findIndex((option) => option.id === selectedVote.id)

    if (optionIndex !== -1) {
        const updatedOptions = [...pollData.options]
        updatedOptions[optionIndex] = {
            ...updatedOptions[optionIndex],
            votes: updatedOptions[optionIndex].votes ? updatedOptions[optionIndex].votes + 1 : 1,
        }

        await updateDoc(pollRef, {
            options: updatedOptions,
            totalVotes: increment(1),
        })

        console.log(`Vote added to existing option "${selectedVote.name}" successfully!`)

        return {
            data: selectedVote,
            status: 'success',
        }
    } else {
        const newOption: GuestType = {
            ...selectedVote,
            votes: 1,
        }

        await updateDoc(pollRef, {
            options: arrayUnion(newOption),
            totalVotes: increment(1),
        })

        console.log(`New option "${selectedVote.name}" added successfully with an initial vote!`)
        return {
            data: newOption,
            status: 'success'
        }
    }
}

const updateGuest = async (guest: GuestType, pollId: string, vote: GuestType): Promise<ApiResponse> => {
    const guestRef = doc(db, 'guests', guest.id)
    const guestSnapshot = await getDoc(guestRef)

    const selectedVote = structuredClone(vote)
    delete selectedVote.createdAt
    delete selectedVote.polls


    if (!guestSnapshot.exists()) {
        throw new Error('Guest does not exist')
    }

    const guestData = guestSnapshot.data() as GuestType

    if (guestData.polls?.find((poll) => pollId === poll.pollId)) {
        throw new Error('Você já votou nessa categoria')
    }


    await updateDoc(guestRef, {
        polls: arrayUnion({ pollId, vote: selectedVote }),
    });

    console.log(`${selectedVote.name} added to ${guest.name} votes`)

    const updatedGuestSnapshot = await getDoc(guestRef);
    const updatedGuestData = updatedGuestSnapshot.data() as GuestType;
    return {
        data: updatedGuestData,
        status: 'success'
    }
}
