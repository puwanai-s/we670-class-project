import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import ActiveLink from './ActiveLink';

function Header() {

    const { user, logout } = useAuth();

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
                <div className="container">
                    <div className="h-100 d-inline-flex">
                        <button className="navbar-toggler navbar-left border-0 ps-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvas" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <Link className="navbar-brand" href="/">
                            <img src='/logo.png' alt='logo' />
                        </Link>
                    </div>
                    <div className="offcanvas offcanvas-start-md" tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
                        <div className="offcanvas-header d-flex d-md-none">
                            <h5 className="offcanvas-title" id="offcanvasLabel">Menu</h5>
                            <a href="#" className="text-reset p-0" data-bs-dismiss="offcanvas" aria-label="close">
                                <i className="bi bi-x-circle fs-5"></i>
                            </a>
                        </div>
                        <div className="offcanvas-body p-lg-0">
                            <ul className="navbar-nav ms-auto mb-0">
                                <li className="nav-item">
                                    <ActiveLink href="/">หน้าหลัก</ActiveLink>
                                </li>
                                <li className="nav-item">
                                    <ActiveLink href="/about">เกี่ยวกับเรา</ActiveLink>
                                </li>
                                <li className="nav-item">
                                    <ActiveLink href="/contact">ติดต่อเรา</ActiveLink>
                                </li>
                                {
                                    user ?
                                        <>
                                            <li className="nav-item">
                                                <ActiveLink href="/dashboard/list">การจัดการ</ActiveLink>
                                            </li>
                                            <li className="nav-item">
                                                <ActiveLink href="/login" onClick={logout}>ออกจากระบบ</ActiveLink>
                                            </li>
                                        </> :
                                        <li className="nav-item">
                                            <ActiveLink href="/login">เข้าสู่ระบบ</ActiveLink>
                                        </li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header