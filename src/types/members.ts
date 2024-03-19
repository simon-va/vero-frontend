export interface Member {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
    birthDate: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
    gender: number | null;
    userId?: number;
}