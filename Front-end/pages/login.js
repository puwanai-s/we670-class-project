import { useAuth } from '@/context/AuthContext';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Layout from '../components/Layout';
import Swal from 'sweetalert2';

const Login = () => {

    const [email, setEmail] = useState('puwanai.sangphon@gmail.com');
    const [password, setPassword] = useState('123456');
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const { user, login } = useAuth()

    const onSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        login(email, password).then(res => {
            router.push('/dashboard/list');
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'พบข้อผิดพลาด!',
                text: error.message
            });
        });
    }

    return (
        <Layout>
            <NextSeo
                title="Login"
                description="login page"
            />
            <div className='container'>
                <div className='my-5'>
                    <div className='row'>
                        <div className='col-md-4 offset-2'>
                            <img src='undraw_secure_login_pdn4.png' className='img-fluid' />
                        </div>
                        <div className='col-md-4'>
                            <div className='my-5'>
                                <h1 className='mb-3'>การยืนยันตัวตน</h1>
                                <form onSubmit={onSubmit} method='post'>
                                    <div className="mb-3 row">
                                        <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Email</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id="staticEmail" placeholder='email@mail.com' autoFocus onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Password</label>
                                        <div className="col-sm-9">
                                            <input type="password" className="form-control" id="inputPassword" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <div className="col-sm-9 offset-sm-3">
                                            <button className="btn btn-primary" type="submit" disabled={loading}>
                                                {loading ?
                                                    <>
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        <span className='ps-2'>Loading...</span>
                                                    </> : 'Login'}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Login