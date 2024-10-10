'use server'

import { COLLECTIONS } from '@/constants';
import { db } from '@/lib/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

export const getAllGuests = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, COLLECTIONS.GUESTS));
        const guests = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        const serializedGuests = JSON.parse(JSON.stringify(guests));
        return serializedGuests as GuestType;
    } catch (e) {
        console.error(e)
        throw new Error('Error to get all guests!')
    }
}

interface ApiResponse {
    status: 'error' | 'success'
    error?: Error
    data: unknown
}
interface GetSingleGuestResult extends ApiResponse {
    data: GuestType | null

}
export const getSingleGuest = async (email: string): Promise<GetSingleGuestResult> => {
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

export async function submitLogin(formData: FormData) {
    const email = formData.get('email')?.toString();

    if (!email) throw new Error('Favor preencher o email!');

    try {
        const guest = await getSingleGuest(email);
        if (!guest) throw new Error('Usuário não encontrado')
        return guest
    } catch (e) {
        console.error(e);
        throw new Error('Erro ao submeter o login');
    }
}
