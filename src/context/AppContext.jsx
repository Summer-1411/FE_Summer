
import { createContext,  useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [productFilter, setProductFilter] = useState({
        category: null,
        producer: null,
    })
    
    //console.log(productFilter);
    return (
        <AppContext.Provider value={{productFilter, setProductFilter}}>
            {children}
        </AppContext.Provider>
    )
}

export {AppContext}
export default AppProvider