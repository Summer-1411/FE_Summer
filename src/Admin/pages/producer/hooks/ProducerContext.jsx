import { ReactNode, createContext, useContext, useState } from "react";
import { Form } from "antd";

export const ProducerContext = createContext('Context bảng producer');

export const ProducerProvider = ({
  children,
}) => {
  const [formCreateUpdate] = Form.useForm();
  const [edit, setEdit] = useState(false)
  const [initValue, setInitValue] = useState()
  const value = {
    formCreateUpdate,
    edit,
    setEdit,
    initValue,
    setInitValue
  }
  return <ProducerContext.Provider value={value}>
    {children}
  </ProducerContext.Provider>
}

export const useProducer = () => {
  return useContext(ProducerContext)
}