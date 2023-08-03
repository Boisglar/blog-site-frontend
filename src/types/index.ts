export interface IUser {
    avatarUrl: string;
    createdAt: string;
    email: string;
    fullName: string;
    passwordHash: string;
    updatedAt: string
    _id: string
}

export type Comments = {
    _id: string,
    user: IUser,
    text: string,
    postId: string
}