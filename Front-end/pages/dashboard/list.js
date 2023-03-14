import Layout from '@/components/Layout'
import React, { useEffect, useState } from 'react'
import config from './../../config/config'
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Swal from 'sweetalert2';
import Paginate from '@/components/Paginate';
import { useRouter } from 'next/router';

function List() {
    const [articleData, setArticleData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (router.query?.page !== undefined) {
            setCurrentPage(router.query.page);
        } else {
            setCurrentPage(1);
        }

        fetchData();
    }, [router.query, currentPage]);

    const fetchData = () => {
        setLoading(true);
        axios.get(config.baseUrl + '/article?page=' + currentPage, {
            headers: {
                'Authorization': `Bearer ${user.accessToken}`
            }
        }).then(res => {
            setArticleData(res.data);
            setLoading(false);
        });
    }

    const deleteData = (id) => {
        Swal.fire({
            title: 'ต้องการลบข้อมูลหรือไม่?',
            text: "ลบแล้วไม่สามารถกู้คืนได้!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ตกลง',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                axios.put(config.baseUrl + '/article/' + id, { deleted: true }, {
                    headers: {
                        'Authorization': `Bearer ${user.accessToken}`
                    }
                }).then(() => {
                    return Swal.fire({
                        icon: 'success',
                        title: 'ดำเนินการเรียบร้อยแล้ว',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        fetchData();
                    });
                });
            }
        })
    }

    return (
        <Layout>
            <div className='container'>
                <div className='my-5'>
                    <div className='mb-2'>
                        <div className='float-end'>
                            <Link href={'/dashboard/create'} className='btn btn-warning'><i className='bi bi-pencil'></i> เขียนบทความ</Link>
                        </div>
                    </div>
                    <h2>จัดการบทความ</h2>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>หัวข้อ/เรื่อง</th>
                                <th width="15%" className='text-center'>ดำเนินการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articleData.data?.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <Link href={'/detail/' + item._id} className='text-dark text-decoration-none' target={'_blank'}>{item.title}</Link>
                                    </td>
                                    <td className='text-center'>
                                        <Link href={'edit/' + item._id} className='btn btn-sm btn-warning'><i className="bi bi-pencil-square"></i> แก้ไข</Link>
                                        <button type='button' className='ms-2 btn btn-sm btn-danger' onClick={() => deleteData(item._id)}>
                                            <i className="bi bi-trash3"></i> ลบ
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Paginate pageSize={articleData.totalPages} currentPage={articleData.currentPage} />
                </div>
            </div>
        </Layout>
    )
}

export default List