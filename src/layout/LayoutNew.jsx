import { Outlet } from "react-router-dom"
import NavBar from "../components/navbar/Navbar"
import Bottom from "../components/bottom/Bottom"
import ScrollToTop from "../ui/ScrollToTop/ScrollToTop";

import { ConfirmModal } from "../ui/ConfirmModel";
import Slider from "../components/slider/Slider";
import MyMenu from "../components/myMenu/MyMenu";
const LayoutNew = () => {

    return (
        <div className="theme-light">
            <ScrollToTop />

            <NavBar />

            <div style={{ maxWidth: 1200, margin: 'auto' }}>
                <Slider />
                <MyMenu />
                <Outlet />
            </div>

            <ConfirmModal />
            <Bottom />
        </div>
    )
}
export default LayoutNew