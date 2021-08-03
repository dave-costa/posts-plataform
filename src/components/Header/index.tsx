import { SignInButton } from '../SignInButton'
import style from './style.module.sass'
import { ActiveLink } from '../ActiveLink'

export function Header() {

    return (
        <header className = {style.headerContainer}>
            <div className = {style.headerContent}>
                <img src="/images/logo.svg" alt="logo" />
                <nav>
                    <ActiveLink href='/' active = {style.active}>
                        <a> Home</a>
                    </ActiveLink>
                    <ActiveLink href="/posts" active = {style.active}>
                        <a> Posts</a>
                    </ActiveLink>
                </nav>
                <SignInButton />
            </div>
        </header>
    )
}