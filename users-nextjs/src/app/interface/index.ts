
export interface User {
    id: number;
    username: string;
    email: string;
    age: number;
}


export interface UserLogin {
    username: string;
    email: string;
    password: string;
}