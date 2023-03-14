import { useState, useEffect } from 'react';
import axios from 'axios';
import config from './../config/config';
import Link from 'next/link';

function Tags() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setLoading(true);
        axios.get(config.baseUrl + '/tags').then(res => {
            setData(res.data);
            setLoading(false);
        });
    }

    return (
        <nav className="nav">
            {
                data.map((d, index) => {
                    return (
                        <Link key={index} className="nav-link text-dark bg-light rounded-pill mb-2 me-2 fb-tag" href={'/tag/' + d.name}>
                            {d.name}
                        </Link>
                    )
                })
            }
        </nav>
    )
}

export default Tags