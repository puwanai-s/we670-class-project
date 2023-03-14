import Link from 'next/link'
import React from 'react'

function Slide({ item, ...props }) {
    return (
        <div className="card card-overlay overflow-hidden rounded-4">
            <img src={item.thumbnail} alt={item.title} className="card-image-full" />
            <div className="card-img-overlay d-flex">
                <div className="card-text mt-auto">
                    <p className="mb-0 text-white">
                        <Link href={'/detail/' + item._id} className="text-white stretched-link text-decoration-none short-text-2">{item.title}</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Slide