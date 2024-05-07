import './user.scss'

import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {  routeUserPage } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { IMAGE_DEFAULT, IMAGE_LINK } from '../../requestMethod';
import 'react-toastify/dist/ReactToastify.css';
import { handleLogout } from '../../utils/utils';

export default function User() {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.user.currentUser);
    const location = useLocation().pathname;
    console.log(location);
    const [currentPage, setCurrentPage] = useState("profile")
    useEffect(() => {
        setCurrentPage(location.split("/")[2])
    },[location])
    const logout = () => {
        handleLogout(dispatch)
    }
    return (
        <div className='user-wrapper'>
            <div className="left-user">
                <div className="heading-left">
                    <img src={currentUser.avatar ? `${IMAGE_LINK}/${currentUser.avatar}` : `${IMAGE_DEFAULT}`} alt="" className="avatar-user" />
                    <div className="username">{currentUser.username}</div>
                </div>
                <div className="content-left">
                    {routeUserPage.map((route) => {
                        return (
                            <Link
                                key={route.id}
                                to={route.path}
                                className={route.path === currentPage ? "item-content active" : "item-content"}
                                onClick={() => setCurrentPage(route.path)}
                            >
                                <div className="item-icon">
                                    <route.icon />
                                </div>
                                <div className="item-title">
                                    {route.title}
                                </div>
                            </Link>
                        )
                    })}
                    
                    <div className="item-content" onClick={logout}>
                        <div className="item-icon">
                            <ExitToAppOutlinedIcon />
                        </div>
                        <div className="item-title">
                            Đăng xuất
                        </div>
                    </div>
                </div>
            </div>
            <div className="right-user">
                <Outlet />
            </div>
        </div>
    )
}
