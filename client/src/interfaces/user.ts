import { image, post, user } from "./post"

export interface login {
    email?: string,
    phone?: string,
    password: string
}

export interface register {
    name: string,
    image?: string,
    email: string,
    phone?: string,
    password: string
}

export interface userDetails {
    _id: string,
    name: string,
    image?: image,
    email: string,
    posts: post[] | [],
    followers: user[] | [],
    following: user[] | [],
    createdAt: Date
}