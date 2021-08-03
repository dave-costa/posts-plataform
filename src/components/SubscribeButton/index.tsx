import { signIn, useSession } from 'next-auth/client'
import { client } from '../../services/api'
import { getStripeJs } from '../../services/stripe.js'
import styles from './style.module.sass'

interface SubscribeButtonProps {
    priceId: string
}

export function SubscribeButton ({priceId} : SubscribeButtonProps) {
    const [session] = useSession()
    
    async function handleSubs() {
        if (!session) {
            signIn('github')
            return 
        }

        try {
            const response = await client.post('/subscribe')
            const { sessionId } = response.data

            const stripe = await getStripeJs()

            await stripe.redirectToCheckout({sessionId: sessionId})
        } catch (error) {
            alert(error.message)
        }

    }

    return (
        <button 
        className = {styles.subscribeButton}
        onClick = {handleSubs}
        >
            Subscribe now
        </button>
    )
}