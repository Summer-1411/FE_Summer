
import { createContext, useState } from "react";
import { useGetCart } from "../services/products";
import { useSelector } from "react-redux";
const AppContext = createContext();
const AppProvider = ({ children }) => {
    const currentUser = useSelector((state) => state.user.currentUser);
    
    const [filterProduct, setFilterProduct] = useState({
        sample: {
            name: "",
            idCategory: "",
            idOwner: "",
            id: ""
        },
        orders: {
            property: "",
            direction: ""
        }
    })
    const {productCart} = useGetCart(currentUser)
    const values = {
        filterProduct,
        setFilterProduct,
        productCart
    }
    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext }
export default AppProvider