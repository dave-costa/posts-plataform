import { useRouter } from 'next/dist/client/router'
import Link, { LinkProps } from 'next/link'
import { ReactElement, cloneElement } from 'react'

interface ActiveLinkProps extends LinkProps {
    children: ReactElement
    active: string
}

export function ActiveLink({children, active, ...rest}: ActiveLinkProps) {
    const {asPath} = useRouter()
    const className = asPath == rest.href ? active : ''
    return (
        <Link {...rest}>
            {cloneElement(children, {
                className
            })}
        </Link> 
    )
}