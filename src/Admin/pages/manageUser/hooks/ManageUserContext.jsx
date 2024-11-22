import { createContext, useContext, useState } from "react";
import { ACTION_TYPE } from "../../../../constants";

export const ManageUserContext = createContext('Context bảng user');

export const ManageUserProvider = ({
  children,
}) => {
  const [statusForm, setStatusForm] = useState({
    open: false,
    action: ACTION_TYPE.CREATE,
    initData: null
  })


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
  const value = {
    filter,
    setFilter,
    statusForm, setStatusForm,
  }
  return <ManageUserContext.Provider value={value}>
    {children}
  </ManageUserContext.Provider>
}

export const useManageUser = () => {
  return useContext(ManageUserContext)
}