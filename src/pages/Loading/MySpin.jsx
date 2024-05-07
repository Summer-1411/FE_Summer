import { Spin } from 'antd'
import React from 'react'
import { LoadingOutlined } from '@ant-design/icons';
const MySpin = () => {
    console.log('render');
    return (
        <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'white', zIndex: 100, opacity: 0.5 }}>
            <div className="content" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <Spin size='large' indicator={<LoadingOutlined style={{ fontSize: 42 }} spin />} />
            </div>
        </div>
    )
}

export default MySpin