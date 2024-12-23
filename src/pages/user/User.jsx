import './user.scss';
import SettingsIcon from '@mui/icons-material/Settings';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { handleLogout } from '../../utils/utils';
// import { Link, Outlet, useLocation } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { routeUserPage } from '../../constants';
// import { useDispatch, useSelector } from 'react-redux';
// import { IMAGE_DEFAULT, IMAGE_LINK } from '../../requestMethod';
// import 'react-toastify/dist/ReactToastify.css';


// export default function User() {
//     const dispatch = useDispatch();
//     const currentUser = useSelector((state) => state.user.currentUser);
//     const location = useLocation().pathname;
//     const [currentPage, setCurrentPage] = useState("profile");
//     const [isMenuVisible, setIsMenuVisible] = useState(true); // State để điều khiển menu trên mobile

//     useEffect(() => {
//         setCurrentPage(location.split("/")[2]);
//     }, [location]);

//     const logout = () => {
//         handleLogout(dispatch);
//     };

//     const toggleMenu = () => {
//         setIsMenuVisible(!isMenuVisible);
//     };

//     return (
//         <div className="user-wrapper">
//             {/* Menu bên trái */}
//             <div className={`left-user ${isMenuVisible ? 'menu-visible' : 'menu-hidden'}`}>
//                 <div className="heading-left">
//                     <img
//                         src={currentUser.avatar ? `${IMAGE_LINK}/${currentUser.avatar}` : `${IMAGE_DEFAULT}`}
//                         alt="Avatar"
//                         className="avatar-user"
//                     />
//                     <div className="username">{currentUser.username}</div>
//                 </div>
//                 <div className="content-left">
//                     {routeUserPage.map((route) => (
//                         <Link
//                             key={route.id}
//                             to={route.path}
//                             className={route.path === currentPage ? 'item-content active' : 'item-content'}
//                             onClick={() => setCurrentPage(route.path)}
//                         >
//                             <div className="item-icon">
//                                 <route.icon />
//                             </div>
//                             <div className="item-title">{route.title}</div>
//                         </Link>
//                     ))}
//                     <div className="item-content" onClick={logout}>
//                         <div className="item-icon">
//                             <ExitToAppOutlinedIcon />
//                         </div>
//                         <div className="item-title">Đăng xuất</div>
//                     </div>
//                 </div>
//             </div>

//             {/* Phần content bên phải */}
//             <div className={`right-user ${isMenuVisible ? 'menu-visible' : ''}`}>
//                 {/* Nút để mở/đóng sidebar */}
//                 <div className="menu-toggle-btn" onClick={toggleMenu}>
//                     {isMenuVisible ? 'Ẩn Menu' : 'Hiển Thị Menu'}
//                 </div>
//                 <Outlet />
//             </div>
//         </div>
//     );
// }

import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Outlet, Link } from 'react-router-dom'; // Import Link từ react-router-dom
import { useDispatch } from 'react-redux';
const { Header, Sider, Content } = Layout;

const User = () => {
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const logout = () => {
        handleLogout(dispatch);
    };

    return (
        <div className='ai_css_style-content'>
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    style={{
                        backgroundColor: 'white',  // Thay đổi nền của Sider
                        borderRight: '1px solid #ddd',
                    }}
                >
                    <Menu
                        theme="light"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                icon: <AccountCircleOutlinedIcon />,
                                label: <Link to="profile">Tài khoản của tôi</Link>, // Sử dụng Link để điều hướng
                            },
                            {
                                key: '2',
                                icon: <InventoryOutlinedIcon />,
                                label: <Link to="purchase">Đơn mua</Link>, // Sử dụng Link để điều hướng
                            },
                            {
                                key: '3',
                                icon: <SettingsIcon />,
                                label: <Link to="change-password">Đổi mật khẩu</Link>, // Sử dụng Link để điều hướng
                            },
                            {
                                key: '4',
                                icon: <ExitToAppOutlinedIcon />,
                                label: <div onClick={logout} className="item-title">Đăng xuất</div>, // Sử dụng Link để điều hướng
                            },
                        ]}
                        style={{
                            backgroundColor: 'white',  // Thay đổi nền của Menu trong Sider
                        }}
                    />
                </Sider>

                <Layout>
                    {/* Header */}
                    <Header
                        style={{
                            padding: 0,
                            background: 'white',
                            borderBottom: '1px solid #ddd',
                        }}
                    >
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                    </Header>

                    {/* Content */}
                    <Content
                        style={{
                            padding: 20,
                            minHeight: 280,
                            background: 'white',
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default User;
