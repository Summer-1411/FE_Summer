import React from 'react'
import { AppstoreOutlined, MailOutlined, SettingOutlined, FallOutlined, FireOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
const MyMenu = () => {
    const items = [
        {
            label: (
                <Link to={"/voucher"}>
                    Mã giảm giá
                </Link>
            ),
            key: 'voucher',
            icon: <FallOutlined />,
        },
        {
            label: (
                <Link to={"/voucher"}>
                    Mã giảm giá
                </Link>
            ),
            key: 'sale',
            icon: <FireOutlined />,
        },
        {
            key: 'alipay',
            label: (
                <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                    Navigation Four - Link
                </a>
            ),
        },
    ];
    return (
        <Menu mode="horizontal" items={items} />
    )
}

export default MyMenu