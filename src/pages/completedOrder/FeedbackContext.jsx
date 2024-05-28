import { createContext, useContext, useState } from "react";
import { Form } from 'antd';

export const FeedbackContext = createContext('Context Feedback');

export const FeedbackProvider = ({children}) => {

    const [open, setOpen] = useState(false)
    const [feedbackInfor, setFeedbackInfor] = useState({})
    const [pointRate, setPointRate] = useState(5);

    const [formCreateUpdate] = Form.useForm();
    const values = {
        open,
        setOpen,
        feedbackInfor,
        setFeedbackInfor,
        formCreateUpdate,
        pointRate, 
        setPointRate
    }
  return <FeedbackContext.Provider value={values}>
    {children}
  </FeedbackContext.Provider>
}

export const useFeedback = () => {
  return useContext(FeedbackContext)
}