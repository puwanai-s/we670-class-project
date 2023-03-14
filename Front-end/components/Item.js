import Link from 'next/link'
import React from 'react'


function Item({ item, ...props }) {
    return (
        <div className="card overflow-hidden h-100 border-0 bg-light rounded-4">
            <img src={item.thumbnail} alt={item.title} className="card-img-top" />
            <div className="card-body">
                <div className="card-text mt-auto">
                    <p className="mb-0">
                        <Link href={'/detail/' + item._id} className="stretched-link text-dark text-decoration-none short-text-2" title={item.title}>
                            {item.title}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Item