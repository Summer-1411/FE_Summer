import { SUMMER_SHOP, toastOption } from "../constants";
import { logout } from "../redux/userRedux";
import { toast } from 'react-toastify';

const handleLogout = (dispatch) => {
    toast.info("HT Mobile tạm biệt quý khách !", toastOption)
    dispatch(logout());
    localStorage.removeItem(SUMMER_SHOP)
}



export {
    handleLogout
}