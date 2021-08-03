import style from './style.module.sass'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { signIn, useSession, signOut } from 'next-auth/client'

export function SignInButton() {
    const [session] = useSession()
    console.log(session);
    
    return session ? (
        <button 
        className = {style.buttonSignIn}
        onClick = {() => signOut()}
        >
            <FaGithub color="#84d361" />
            {session.user.name}
            <FiX color="#737380" className = {style.closeIcon} />
        </button>
    ) : (
        <button 
        className = {style.buttonSignIn}
        onClick= {() => signIn('github')}
        >
            <FaGithub color="#eba417" />
            Sign in with Github
        </button>
    )
}