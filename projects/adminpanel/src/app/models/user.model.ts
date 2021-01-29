export interface UserModel {
    [key:string] : any;
    name: string;
    surname: string;
    work_type: string;
    work_norm: number;
    phone_number: string;
    password:string;
    id?:number;
}

export const userFiels = ["name",
    "phone_number",
    "surname",
    "work_norm",
    "work_type",
    "password"];