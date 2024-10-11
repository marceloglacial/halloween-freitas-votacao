type GuestType = {
    id: string,
    name: string,
    email: string
}

interface ApiResponse {
    status: 'error' | 'success'
    error?: Error
    data: unknown
}
interface GetSingleGuestResponse extends ApiResponse {
    data: GuestType | null
}

interface GestAllGuestsResponse extends ApiResponse {
    data: GuestType[] | null
}
