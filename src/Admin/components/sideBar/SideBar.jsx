
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/userRedux';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { SUMMER_SHOP, sideBarAdmin, toastOption } from '../../../constants'
function SideBar({ isOpen, closeSidebar }) {
    const dispatch = useDispatch()
    const location = useLocation().pathname;

    // Hàm kiểm tra mục nào là "active" dựa trên URL
    const getActiveClass = (path) => {
        return location.split("/")[3] === path ? 'active' : '';
    };
    const handleLogout = () => {
        toast.info("Bạn đã đăng xuất thành công !", toastOption)
        dispatch(logout());
        localStorage.removeItem(SUMMER_SHOP)
    }

    return (
        <aside className={`style-ai-sidebar ${isOpen ? 'active' : ''}`}>
            <div className="style-ai-sidebar-logo">Summer Admin</div>
            <nav className="style-ai-menu">
                {sideBarAdmin.map((nav) => (
                    <Link
                        to={nav.path}
                        key={nav.id}
                        className={`style-ai-menu-item ${getActiveClass(nav.path)}`}
                        onClick={closeSidebar}
                    >
                        <nav.icon /> {nav.title}
                    </Link>
                ))}
                <Link
                    to="/"
                    className="style-ai-menu-item"
                >
                    <HighlightOffIcon /> Thoát Admin
                </Link>
                <div
                    className="style-ai-menu-item"
                    onClick={handleLogout}
                >
                    <ExitToAppOutlinedIcon /> Đăng xuất
                </div>
            </nav>
        </aside>
    );
}

export default SideBar;
