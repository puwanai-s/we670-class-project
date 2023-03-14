import { useRouter } from 'next/router'
import Link from 'next/link'

const ActiveLink = ({ children, ...props }) => {
    const router = useRouter();
    const classActiveName = (props?.className == undefined ? 'nav-link':'') + (router.pathname == props?.href ? ' active' : '');

    return (
        <Link className={classActiveName} {...props}>
            {children}
        </Link>
    )
}

export default ActiveLink