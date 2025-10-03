interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
}

type GetUserResponse = User[];

export type { User, GetUserResponse };