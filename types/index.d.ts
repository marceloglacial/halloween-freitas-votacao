type GuestType = {
    id: string,
    name: string,
    email: string
    photo?: string
}

interface ApiResponse {
    status: 'error' | 'success'
    error?: Error
    data: unknown
}
interface GetSingleGuestResponse extends ApiResponse {
    data: GuestType
}

interface GestAllGuestsResponse extends ApiResponse {
    data: GuestType[] | null
}

type PollType = {
    id: string,
    title: string
    icon: string
}

interface PollApiResponse extends ApiResponse {
    data: PollType[]
}

interface AlertProps {
    title: string;
    variant?: 'info' | 'success' | 'warning' | 'error'
}

interface CardProps {
    title?: string;
    id: string;
    icon?: string;
}

type PhotoType = {
    image: string
    alt: string
}
