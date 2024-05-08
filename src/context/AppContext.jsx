
import { createContext, useState } from "react";
import { useGetCart } from "../services/products";
import { useSelector } from "react-redux";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [productFilter, setProductFilter] = useState({
        category: null,
        producer: null,
    })
    const [filterProduct, setFilterProduct] = useState({
        sample: {
            name: " ",
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
        productFilter,
        setProductFilter,
        productCart
    }

    //console.log(productFilter);
    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext }
export default AppProvider