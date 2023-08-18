

export interface IUser {
    _id: string;
    name: string;
    email: string;
    password?: string;
    role: string;

    createAt?: String;
    updateAt?: String;
}