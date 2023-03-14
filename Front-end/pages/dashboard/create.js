import Layout from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { TagsInput } from "react-tag-input-component";
import axios from 'axios';
import config from './../../config/config';
import { NextSeo } from 'next-seo';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

const Create = () => {
    const { user } = useAuth();
    const editorRef = useRef(null);
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [tags, setTags] = useState([]);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const submit = () => {
        if (editorRef.current && title && thumbnail && editorRef.current.getContent()) {
            setLoading(true);
            const data = {
                title: title,
                body: editorRef.current.getContent(),
                thumbnail: thumbnail,
                tags: tags
            };
            axios.post(config.baseUrl + '/article', data, {
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`
                }
            }).then(async res => {
                if (res.status == 201) {
                    await Swal.fire({
                        icon: 'success',
                        title: 'ดำเนินการเรียบร้อยแล้ว',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    router.push('/dashboard/list');
                    setLoading(false);
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'พบข้อผิดพลาด!',
                text: 'โปรดกรอกข้อมูลให้ครบถ้วน!'
            });
        }
    };

    return (
        <Layout>
            <NextSeo
                title="เขียนบทความ"
            />
            <div className='container'>
                <div className='my-5'>
                    <div className='row justify-content-center'>
                        <div className='col-md-8 mb-3'>
                            <label htmlFor="title" className="form-label">หัวข้อ/เรื่อง <span className='text-danger'>*</span></label>
                            <input type="text" className="form-control" id="title" value={title} onChange={e => setTitle(e.target.value)} />
                        </div>
                        <div className='col-md-8 mb-3'>
                            <label htmlFor="thumbnail" className="form-label">รูปภาพประกอบ <span className='text-danger'>*</span></label>
                            <input type="text" className="form-control" id="thumbnail" placeholder='ใส่ลิงก์รูปภาพ' value={thumbnail} onChange={e => setThumbnail(e.target.value)} />
                        </div>
                        <div className='col-md-8 mb-3'>
                            <label htmlFor="tags" className="form-label">คำค้น <span className='text-danger'>*</span></label>
                            <TagsInput
                                value={tags}
                                onChange={setTags}
                                name="tags"
                                id="tags"
                                separators={["Enter", ","]}
                                placeHolder="ใส่คำค้น"
                            />
                        </div>
                        <div className='col-md-8 mb-3'>
                            <label htmlFor="body" className="form-label">เนื้อหา <span className='text-danger'>*</span></label>
                            <Editor
                                apiKey='080qjkfu12a3zmh4jb9dtcvbyte4s5a2qutfneg2n4ea2zr7'
                                onInit={(evt, editor) => editorRef.current = editor}
                                initialValue=""
                                disableEnforceFocus={true}
                                init={{
                                    branding: false,
                                    menubar: false,
                                    plugins: ['link', 'image', 'autoresize', 'autolink'],
                                    toolbar: 'undo redo | formatselect | ' +
                                        'bold italic backcolor | link image | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                    content_style: '@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@100;200;300;400;500;600;700&display=swap"); body { font-family:"IBM Plex Sans Thai",sans-serif; }'
                                }}
                            />
                        </div>
                    </div>
                    <div className='text-center'>
                        <button className='btn btn-primary' onClick={submit} disabled={loading}>บันทึก</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Create