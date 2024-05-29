import { ReactNode, createContext, useContext, useState } from "react";
import { Form } from "antd";

export const CategoryContext = createContext('Context bảng Student');

export const CategoryProvider = ({
  children,
}) => {


//   const { listClass } = useSearchClass({
//     status: 1
//   })
  const [formCreateUpdate] = Form.useForm();
  const [detailStudent, setDetailStudent] = useState()
  const [openView, setOpenView] = useState(false)
  const [edit, setEdit] = useState(false)
  const [initValue, setInitValue] = useState()
  const value = {
    // listClass,
    formCreateUpdate,
    detailStudent,
    setDetailStudent,
    openView,
    setOpenView,
    edit,
    setEdit,
    initValue,
    setInitValue
  }
  return <CategoryContext.Provider value={value}>
    {children}
  </CategoryContext.Provider>
}

export const useCategory = () => {
  return useContext(CategoryContext)
}