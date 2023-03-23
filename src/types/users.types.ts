export type User = {
    id: number
    first_name: string | null
    last_name: string | null
    phone_number: string
    role: string | null
    categories: number[]
    car_number: string | null
    is_admin: boolean
}

export type UserFetchResponse = {
    count: number
    next: string | null
    previous: string | null
    results: User[]
}

export type UserTableFilters = {
    search: string;
    isAdmin: boolean;
    role: boolean;
}