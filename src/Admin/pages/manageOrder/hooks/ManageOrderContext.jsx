import { Form } from "antd";
import { createContext, useContext, useState } from "react";
import { useGetProducer } from "../../../../services/producer";
import { useGetCategory } from "../../../../services/category";
import { ACTION_TYPE } from "../../../../constants";

export const ManageOrderContext = createContext('Context bảng order');

export const ManageOrderProvider = ({
  children,
}) => {



  const [filter, setFilter] = useState({
    sample: {
      status: 0,
    },
    pagination: {
      page: 1,
      pageSize: 10
    },
    orders: {
      property: "orderDate",
      direction: "desc"
    }
  })



  const value = {
    filter,
    setFilter,
  }
  return <ManageOrderContext.Provider value={value}>
    {children}
  </ManageOrderContext.Provider>
}

export const useManageOrder = () => {
  return useContext(ManageOrderContext)
}