import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout';
import axios from 'axios';
import config from './../../config/config';
import { NextSeo } from 'next-seo';
import Hot from '@/components/Hot';
import Tags from '@/components/Tags';

function Detail() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = () => {
        setLoading(true);
        axios.get(config.baseUrl + '/detail/' + id).then(res => {
            setData(res.data);
            setLoading(false);
        });
    }

    return (
        <Layout>
            <NextSeo
                title={data.title}
                description={data.body}
            />
            <div className='container'>
                <div className='py-5'>
                    <div className='row'>
                        <div className='col-md-8'>
                            <h1>{data.title}</h1>
                            <div className='my-3'>
                                <img src={data.thumbnail} className='w-100 rounded-4' />
                            </div>
                            <div className='my-3'>
                                <div dangerouslySetInnerHTML={{ __html: data.body }}></div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='hot mb-5'>
                                <h2><i className="bi bi-hash text-warning"></i> แท็กยอดนิยม</h2>
                                <Tags />
                            </div>
                            <div className='hot'>
                                <h2><i className="bi bi-fire text-warning"></i> ยอดนิยม</h2>
                                <Hot />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Detail