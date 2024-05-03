import { SUMMER_SHOP, toastOption } from "../constants";
import { clearCart } from "../redux/cartRedux";
import { logout } from "../redux/userRedux";
import { toast } from 'react-toastify';

const handleLogout = (dispatch) => {
    toast.info("HT Mobile tạm biệt quý khách !", toastOption)
    dispatch(logout());
    dispatch(clearCart());
    localStorage.removeItem(SUMMER_SHOP)
}

export {
    handleLogout
}