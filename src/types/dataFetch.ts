export type dataT = {
    id: string,
    urls: {
        regular: string,

    },
    user: {
        name: string,
        username: string,
        profile_image: {
            small: string,
        }
        instagram_username?: string,
        twitter_username?: string,
    },
    likes: number,
    downloads: number,
    tags: tags[]

}

type tags  = {
    title: string
}