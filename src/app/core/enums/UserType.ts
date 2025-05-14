export enum UserType {
    Admin = 1,
    Manager = 2,
    Staff = 3
}

export const USER_TYPE_OPTIONS = [
    { value: UserType.Admin, label: 'Admin' },
    { value: UserType.Manager, label: 'Manager' },
    { value: UserType.Staff, label: 'Staff' }  
];