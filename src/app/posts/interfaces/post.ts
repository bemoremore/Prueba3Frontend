export interface Post {
    id: number;
    title: string;
    publicationDate: Date;
    url: string;
    userEmail: string;
}

export interface PostCreate {
    title: string;
    URL: string;
    UserId: string;
}
