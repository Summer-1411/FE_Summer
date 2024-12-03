import React from 'react'
import { AppstoreOutlined, MailOutlined, SettingOutlined, FallOutlined, FireOutlined, HomeOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
const MyMenu = () => {
    const items = [
        {
            label: (
                <Link to={"/"}>
                    Trang chủ
                </Link>
            ),
            key: 'home',
            icon: <HomeOutlined />,
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

    ];
    return (
        <Menu mode="horizontal" items={items} />
    )
}

export default MyMenu