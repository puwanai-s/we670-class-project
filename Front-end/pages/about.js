import Layout from '@/components/Layout'
import React, { useState } from 'react'
import config from './../config/config';
import { useAuth } from '@/context/AuthContext';
import { NextSeo } from 'next-seo';

const About = () => {
    const { user } = useAuth();
    return (
        <Layout>
            <NextSeo
                title={'เกี่ยวกับเรา'}
                description={config.siteDescription}
            />
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='py-5'>
                            <img src='/friends-cooking-japanese-food-together.jpg' alt='friends cooking japanese food together' className='img-fluid rounded-5' />
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='py-5'>
                            <h1>Food Blog</h1>
                            <h2>{config.siteName}</h2>
                            <p>Food Blog คือ Community Platform Online เพื่อให้ Creators หน้าเก่า หน้าใหม่ที่มีใจรักอาหาร ไม่ว่าจะเป็นการทำอาหาร สูตรอาหาร ร้านอาหารอร่อย ๆ ที่อยากแนะนำเพื่อน ๆ ให้ไปลองชิม</p>
                            <p>ไม่ว่าคุณจะเป็นใคร ก็สามารถนำเสนอเรื่องราวเกี่ยวกับอาหารการกินได้แบบฟรี ๆ ในรูปแบบของคุณเองบน Food Blog</p>
                        </div>
                        {/* <code>{user ? user.accessToken : ''}</code> */}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default About