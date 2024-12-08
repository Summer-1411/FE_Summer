
import { createContext, useState } from "react";
import { useGetCart } from "../services/products";
import { useSelector } from "react-redux";
const AppContext = createContext();
const AppProvider = ({ children }) => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [selectedProducts, setSelectedProducts] = useState([])

    const [filterProduct, setFilterProduct] = useState({
        sample: {
            name: "",
            idCategory: "",
            idOwner: "",
            id: ""
        },
        orders: {
            property: "createAt",
            direction: "desc"
        }
    })
    const { productCart } = useGetCart(currentUser)
    const values = {
        filterProduct,
        setFilterProduct,
        productCart,
        selectedProducts,
        setSelectedProducts
    }
    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext }
export default AppProvider