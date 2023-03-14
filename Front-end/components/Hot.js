import { useState, useEffect } from 'react';
import axios from 'axios';
import config from './../config/config';
import Slide from './Slide';

function Hot() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setLoading(true);
        axios.get(config.baseUrl + '/hot').then(res => {
            setData(res.data);
            setLoading(false);
        });
    }

    return (
        <div className='row'>
            {
                data.map((d, index) => {
                    return (
                        <div key={index} className='col-md-12 mb-4'>
                            <Slide item={d} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Hot