import { Outlet } from "react-router-dom"
import NavBar from "../components/navbar/Navbar"
import Bottom from "../components/bottom/Bottom"
import { useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "../requestMethod"
import { useDispatch, useSelector } from "react-redux"
import { SUMMER_SHOP } from "../constants"
import { setCart } from "../redux/cartRedux"
import Loading from "../pages/Loading/Loading"

const Layout = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.user.currentUser);
    useEffect(() => {
        const getCart = async () => {
            const res = await axios.get(`${BASE_URL}/cart`, {
                headers: {Authorization: `Bearer ${localStorage[SUMMER_SHOP]}`}
            })
            //console.log(res.data);
            dispatch(setCart(res.data.cart))
        }
        currentUser && getCart();
    }, [currentUser])

    return (
        <div className="theme-light">
            {/* <Loading /> */}
            <NavBar />
            <div className="wrapper-container">
                <Outlet />
            </div>
            <Bottom />
        </div>
    )
}
export default Layout