import { GetStaticProps } from 'next'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'
import styles from './home.module.sass'

interface HomeProps {
  product: {
    priceId: string,
    amount: number
  }
}

export default function Home({product}: HomeProps) {
  
  return (
    <>
      <Head>
        <title>Home | News</title>
      </Head>
      <main className= {styles.contentContainer} >
        <section className= {styles.hero} >
          <span>👏Hey, welcome</span>
          <h1>News about the <span>React</span> world </h1>
          <p>Get access to all the publications <br />
          <span>for {product.amount} month </span>
          </p>
          <SubscribeButton priceId = {product.priceId}/>
        </section>
        <img src="/images/avatar.svg" alt="gir-coding" />
        
      </main>
    </>
  )
}

export const getStaticProps:GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1JI1dGAPYFSejF2xgcsnwBh8')
  const hour = 60 * 60 * 24
  const product =  { 
    priceId: price.id,
    amount: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount/100)
    //pq ta em centavos
   } 
  return {
      props: {
        product
      },
      revalidate: hour 
  }
}