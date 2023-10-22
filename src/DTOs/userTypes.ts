export interface userType{
    _id: string,
    name: string,
    email: string,
    password: string,
    favorites: [],
    createdAt: Date,
    updatedAt: Date,
    __v: Number
}

export interface SignInType{
    email: string,
    password: string
}

export interface createType{
    name: string,
    email: string,
    password: string,

}