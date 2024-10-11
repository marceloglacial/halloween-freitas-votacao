'use server'
import { COLLECTIONS } from '@/constants';
import { db } from '@/lib/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

export const getAllGuests = async (): Promise<GestAllGuestsResponse> => {
    try {
        const querySnapshot = await getDocs(collection(db, COLLECTIONS.GUESTS));
        const guests = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        const serializedGuests = JSON.parse(JSON.stringify(guests));
        return {
            status: 'success',
            data: serializedGuests
        };
    } catch (e) {
        console.error(e)
        return {
            status: 'error',
            error: {
                message: 'Error to get all the Guests',
                name: ''
            },
            data: null
        }
    }
}

export const getSingleGuest = async (email: string): Promise<GetSingleGuestResponse> => {
    try {
        const q = query(collection(db, COLLECTIONS.GUESTS), where("email", "==", email));

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const guest = {
                id: doc.id,
                ...doc.data(),
            };
            const serializedGuest = JSON.parse(JSON.stringify(guest));
            return {
                status: 'success',
                data: serializedGuest
            };
        } else {
            return {
                status: 'error',
                data: null,
                error: {
                    name: 'UserNotFound',
                    message: 'Usuário não encontado',
                }
            }
        }
    } catch (e) {
        console.error(e);
        return {
            status: 'error',
            error: {
                message: 'Error to get Single Guest',
                name: ''
            },
            data: null
        }
    }
};
