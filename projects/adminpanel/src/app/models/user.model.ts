export interface UserModel {
    [key:string] : any;
    name: string;
    surname: string;
    password: string;
    work_type: string;
    work_norm: number;
    phone_number: string;
}

export const userFiels = ["name",
    "password",
    "phone_number",
    "surname",
    "work_norm",
    "work_type"];