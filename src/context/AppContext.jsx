
import { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
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
    const values = {
        filterProduct,
        setFilterProduct,
        productFilter,
        setProductFilter
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