import { createContext, useContext, useState } from "react";

export const FeedbackContext = createContext('Context Feedback');

export const FeedbackProvider = ({children}) => {

    const [open, setOpen] = useState(false)
    const [product, setProduct] = useState({})
    const values = {
        open,
        setOpen,
        product,
        setProduct
    }
  return <FeedbackContext.Provider value={values}>
    {children}
  </FeedbackContext.Provider>
}

export const useFeedback = () => {
  return useContext(FeedbackContext)
}