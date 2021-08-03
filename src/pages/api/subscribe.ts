import { stripe } from './../../services/stripe';
import { query as q } from 'faunadb';
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from 'next-auth/client';
import { fauna } from '../../services/fauna';

type User = {
    ref: {
        id: string
    }
    data: {
        costumerId: string
    }
}

export default async(req: NextApiRequest, res: NextApiResponse) => {

    if (req.method == 'POST') {

        const session = await getSession({
            req
        })

        const user = await fauna.query<User>(
            q.Get(
                q.Match(
                    q.Index('useremail'),
                    q.Casefold(session.user.email)
                )
            )
        )

        let costumerId = user.data.costumerId

        if (!costumerId) {
            const costumer = await stripe.customers.create({
            email: session.user.email
            })

            await fauna.query(
            q.Update(
                q.Ref(q.Collection('users'), user.ref.id) , {
                    data: {
                        costumerId: costumer.id
                    }
                }
            )
        )
        costumerId = costumer.id
        }

        
        

        const checkout = await stripe.checkout.sessions.create({
            customer: costumerId,
            payment_method_types: ['card'],
            billing_address_collection : 'required',
            line_items: [{
                price: 'price_1JI1dGAPYFSejF2xgcsnwBh8', quantity: 1
            }],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: 'http://localhost:3000/posts',
            cancel_url: 'http://localhost:3000/'
        })

        return res.status(200).json({sessionId: checkout.id})
    }else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    }

}