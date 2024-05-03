export interface image {
    public_id: string,
    url: string,
}

export interface user {
    _id: string,
    image: image,
    name: string,
}

export interface comment {
    _id: string
    user: user,
    comment: string,
    createdAt: Date,
}

export interface post {
    _id: string,
    owner: user,
    likes: user[] | [],
    createdAt: Date,
    images: image[] | [],
    caption?: string,
    comments: comment[] | []
}