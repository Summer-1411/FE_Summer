import { useState } from 'react';
import './style/AdminLayout.scss';
import Header from '../Admin/components/header/Header';
import SideBar from '../Admin/components/sideBar/SideBar';
import { Outlet } from 'react-router-dom';
import { ConfirmModal } from '../ui/ConfirmModel';

function AdminLayout() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <div className={`style-ai-admin-layout ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            {/* Overlay sẽ hiển thị khi sidebar mở */}
            {isSidebarOpen && <div className="style-ai-overlay" onClick={closeSidebar}></div>}

            {/* Sidebar */}
            <SideBar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />

            {/* Main content area */}
            <div className="style-ai-main-content">
                {/* Header */}
                <Header toggleSidebar={toggleSidebar} />

                {/* Content */}
                <div className="style-ai-content">
                    <Outlet />
                    <ConfirmModal />
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
