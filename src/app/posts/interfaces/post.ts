export interface Post {
    id: number;
    title: string;
    date: Date;
    URL: string;
    userId: string;
    user: {
        email: string;
        id: string;
    }
}

export interface PostCreate {
    title: string;
    URL: string;
    UserId: string;
}
