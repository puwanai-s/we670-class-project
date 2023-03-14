import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo';
import Layout from '@/components/Layout';
import Link from 'next/link';
import config from './../../config/config';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper";
import axios from 'axios';
import Slide from '@/components/Slide';
import Item from '@/components/Item';
import Hot from '@/components/Hot';
import Tags from '@/components/Tags';

export default function Tag() {
    const [featureData, setFeatureData] = useState([]);
    const [latestData, setLatestData] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { tag } = router.query;

    useEffect(() => {
        fetchData();
    }, [tag]);

    const fetchData = () => {
        setLoading(true);
        const fetchFeature = axios.get(config.baseUrl + '/feature');
        const fetchLatest = axios.get(config.baseUrl + '/tag-latest/' + tag);
        axios.all([fetchFeature, fetchLatest]).then(res => {
            setFeatureData(res[0].data);
            setLatestData(res[1].data.data);
            setLoading(false);
        });
    }

    return (
        <Layout>
            <NextSeo
                title={'#' + tag}
                description={config.siteDescription}
            />
            <div className='bg-light py-5'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-9 col-lg-8'>
                            <h1>{config.siteName}</h1>
                            <h2>เนื้อหาคุณภาพจาก Creators ทั่วประเทศ</h2>
                            <div className='mt-4'>
                                <p className='lead text-muted'><i className="bi bi-yelp"></i> {config.siteDescription}</p>
                            </div>
                            <div className='mt-4 mt-md-5'>
                                <Link href='/dashboard' className='btn btn-warning rounded-pill'>
                                    <i className="bi bi-pencil"></i> สมัครเป็น creator
                                </Link>
                            </div>
                        </div>
                        <div className='col-md-3 col-lg-4 d-none d-md-block'>
                            {
                                <Swiper
                                    pagination={{
                                        dynamicBullets: true,
                                    }}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: false,
                                    }}
                                    navigation={true}
                                    modules={[Pagination, Navigation, Autoplay]}
                                    className="mySwiper"
                                >
                                    {
                                        featureData.map((d, index) => {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <Slide item={d} />
                                                </SwiperSlide>
                                            )
                                        })
                                    }
                                </Swiper>
                            }
                        </div>
                    </div>

                </div>
            </div>
            <div className='py-5'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-9'>
                            <h2>#{tag}</h2>
                            <div className='mt-3 latest'>
                                <div className='row'>
                                    {
                                        latestData.map((d, index) => {
                                            return (
                                                <div key={index} className='col-md-4 mb-4'>
                                                    <Item item={d} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3'>
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
