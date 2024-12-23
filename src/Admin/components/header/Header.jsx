import useCurrentUser from '../../../hooks/useCurrentUser';
import { Image } from 'antd';

function Header({ toggleSidebar }) {
    const currentUser = useCurrentUser()
    return (
        <header className="style-ai-header">
            <button className="style-ai-menu-toggle" onClick={toggleSidebar}>☰</button>
            <div className="style-ai-account-info">Welcome, {currentUser.username}</div>
            <Image
                width={40}
                height={40}
                style={{ borderRadius: '50%', objectFit: "cover", marginLeft: 4 }}
                src={`${currentUser.avatar}`}
            />
        </header>
    );
}

export default Header;
