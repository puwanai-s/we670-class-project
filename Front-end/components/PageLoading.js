import React from 'react'

const PageLoading = () => {
    return (
        <div className='h-100 d-flex justify-content-center'>
            <div className='my-auto text-center'>
                <div><img src='/logo.png' alt='logo' /></div>
                <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default PageLoading