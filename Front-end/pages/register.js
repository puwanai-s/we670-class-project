import { useAuth } from '@/context/AuthContext';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Layout from '../components/Layout';
import Swal from 'sweetalert2';

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user, signup } = useAuth();

    if(user) {
        router.push('/dashboard/list');
        return;
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (password && password == rePassword) {
            setLoading(true);
            signup(email, password).then(res => {
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
        } else {
            Swal.fire({
                icon: 'error',
                title: 'พบข้อผิดพลาด!',
                text: 'โปรดกรอกข้อมูลให้ถูกต้อง!'
            });
        }
    }

    return (
        <Layout>
            <NextSeo
                title="Register"
                description="Register page"
            />
            <div className='container'>
                <div className='my-5'>
                    <div className='row'>
                        <div className='col-md-4 offset-2'>
                            <img src='undraw_Authentication_re_svpt.png' className='img-fluid' />
                        </div>
                        <div className='col-md-4'>
                            <div className='my-5'>
                                <h1 className='mb-3'>ลงทะเบียน Creator</h1>
                                <form onSubmit={onSubmit} method='post'>
                                    <div className="mb-3 row">
                                        <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Email</label>
                                        <div className="col-sm-8">
                                            <input type="email" className="form-control" id="staticEmail" placeholder='email@mail.com' autoFocus onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="inputPassword" className="col-sm-4 col-form-label">Password</label>
                                        <div className="col-sm-8">
                                            <input type="password" className="form-control" id="inputPassword" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="inputRePassword" className="col-sm-4 col-form-label">re-Password</label>
                                        <div className="col-sm-8">
                                            <input type="password" className="form-control" id="inputRePassword" placeholder='re-Password' onChange={(e) => setRePassword(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <div className="col-sm-8 offset-sm-4">
                                            <button className="btn btn-primary" type="submit" disabled={loading}>
                                                {loading ?
                                                    <>
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        <span className='ps-2'>Loading...</span>
                                                    </> : 'Register'}
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

export default Register