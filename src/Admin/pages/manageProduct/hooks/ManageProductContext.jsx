import { Form } from "antd";
import { createContext, useContext, useState } from "react";
import { useGetProducer } from "../../../../services/producer";
import { useGetCategory } from "../../../../services/category";
import { ACTION_TYPE } from "../../../../constants";

export const ManageProductContext = createContext('Context bảng product');

export const ManageProductProvider = ({
  children,
}) => {
  const [formCreate] = Form.useForm()
  const [statusForm, setStatusForm] = useState({
    open: false,
    action: ACTION_TYPE.CREATE,
    initData: {}
  })
  const [imageUrls, setImageUrls] = useState([]);
  const [mainImg, setMainImg] = useState("");

  const [filter, setFilter] = useState({
    sample: {
      name: "",
      idCategory: "",
      idOwner: "",
      id: "",
      status: 1,
    },
    orders: {
      property: "createAt",
      direction: "desc"
    }
  })


  const { listProducer } = useGetProducer()
  const { listCategory } = useGetCategory()
  const value = {
    formCreate,
    listProducer,
    listCategory,
    filter,
    setFilter,
    imageUrls,
    setImageUrls,
    mainImg, setMainImg,
    statusForm, setStatusForm
  }
  return <ManageProductContext.Provider value={value}>
    {children}
  </ManageProductContext.Provider>
}

export const useManageProduct = () => {
  return useContext(ManageProductContext)
}