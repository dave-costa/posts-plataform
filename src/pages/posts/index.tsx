import { GetStaticProps } from 'next'
import Head from 'next/head'
import { getPrismicClient } from '../../services/prismic'
import styles from './style.module.sass'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import { useSession } from 'next-auth/client'
type Post = {
    slug: string
    title: string
    desc: string
    updated: string
}

interface PropsPost {
    posts: Post[]// eh por ele ser um array e dentro der objetos falamos q eh um array daquilo
}

export default function Posts({posts}: PropsPost) {

    const [session] = useSession()
    if (!session) {
        return (
            <h1>PLEASE, REGISTER WITH GITHUB</h1>
        )
    }

    return (
        <>
            <Head>
                <title>Posts | News</title>
            </Head>
            <main className = {styles.container}>
                <div className = {styles.post}>
                    {posts.map(post => (

                        <a key = {post.slug} href='#'>
                       <time> {post.updated} </time>
                       <strong> {post.title} </strong>
                       <p> {post.desc} </p>
                    </a>
                    ))}
                    
                </div>
            </main>
        </>
    )
}

export const getStaticProps:GetStaticProps = async () => {
    const prismic = getPrismicClient()
    const response = await prismic.query([
        Prismic.predicates.at('document.type', 'publication')
    ], {
        fetch: ['publication.title', 'publication.content'],
        pageSize: 100,
    })

    const posts = response.results.map(post => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            desc: post.data.content.find(content => content.type ==='paragraph')?.text ?? '',
            updated: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })

        }
    })
    return {
        props: {
            posts
        }
    }
}