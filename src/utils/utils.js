import { SUMMER_SHOP, toastOption } from "../constants";
import { logout } from "../redux/userRedux";
import { toast } from 'react-toastify';

const handleLogout = (dispatch) => {
    toast.info("Summer Shop tạm biệt quý khách !", toastOption)
    dispatch(logout());
    localStorage.removeItem(SUMMER_SHOP)
}

function hasValue(variable) {
    return variable !== undefined && variable !== null && variable !== '';
}

export {
    handleLogout,
    hasValue
}