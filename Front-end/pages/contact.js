import Layout from '@/components/Layout'
import { NextSeo } from 'next-seo'
import React from 'react'
import config from './../config/config';

function contact() {
    return (
        <Layout>
            <NextSeo
                title="ติดต่อเรา"
                description={config.siteDescription}
            />
            <div className='container'>
                <div className='py-5'>
                    <h1>ติดต่อเรา</h1>
                    <p>ระบบนี้เป็นโครงงานเว็บแอปพลิเคชันโดยการเขียนโปรแกรมเว็บขั้นสูง (WE670) โดยมีผู้พัฒนาดังนี้</p>

                    <div className='ms-4 border-start border-5 ps-4 mt-5'>
                        <div className="mb-3">
                            <h4><i className="bi bi-person-circle"></i> นางสาวสรัลนุช ถนอมทรัพย์</h4>
                            <p>รหัส 64230090</p>
                        </div>
                        <div className="mb-3">
                            <h4><i className="bi bi-person-circle"></i> นายฤกษ์ดี เพียรพิทักษ์</h4>
                            <p>รหัส 64230089</p>
                        </div>
                        <div className="mb-3">
                            <h4><i className="bi bi-person-circle"></i> นายภูวนัย แสงพล</h4>
                            <p>รหัส 64230175</p>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default contact