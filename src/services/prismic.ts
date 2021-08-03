import Prismic from '@prismicio/client'

export function getPrismicClient (req?: unknown) {
    const prismic = Prismic.client('https://davenews.cdn.prismic.io/api/v2', {

        req,
        accessToken: process.env.PRISMIC
    })

    return prismic
}