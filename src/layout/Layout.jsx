import { Outlet } from "react-router-dom"
import NavBar from "../components/navbar/Navbar"
import Bottom from "../components/bottom/Bottom"
const Layout = () => {
    return (
        <div className="theme-light">
            <NavBar />
            <div className="wrapper-container">
                <Outlet />
            </div>
            <Bottom />
        </div>
    )
}
export default Layout