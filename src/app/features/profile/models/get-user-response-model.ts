export interface User {
    UserName: string;
    Name: string;
    LastName: string;
    Mail: string;
    Gender: string;
    BirthDate: Date;
    Addresses: Address[];
}

export interface Address {
    LocationType: string;
    Name: string;
    Country: string;
    City: string;
    District: string;
    ZipCode: string;
    AddressText: string;
}
