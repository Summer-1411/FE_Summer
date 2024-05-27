import { Outlet, useLocation } from "react-router-dom"
import NavBar from "../components/navbar/Navbar"
import Bottom from "../components/bottom/Bottom"
import ScrollToTop from "../ui/ScrollToTop/ScrollToTop";
const Layout = () => {
    const { pathname } = useLocation();
    return (
        <div className="theme-light">
            <ScrollToTop />
            <NavBar />
            <div className="wrapper-container">
                <Outlet />
            </div>
            <Bottom />
        </div>
    )
}
export default Layout