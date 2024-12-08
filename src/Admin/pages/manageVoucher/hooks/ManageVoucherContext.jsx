import { createContext, useContext, useState } from "react";
import { ACTION_TYPE } from "../../../../constants";
import { Form } from "antd";

export const ManageVoucherContext = createContext('Context bảng voucher');

export const ManageVoucherProvider = ({
  children,
}) => {
  const [formCreate] = Form.useForm()
  const [statusForm, setStatusForm] = useState({
    open: false,
    action: ACTION_TYPE.CREATE,
    initData: null
  })

  const [filter, setFilter] = useState({
    sample: {
      code: "",
      value: "",
      quantity: "",
      minOrderValue: "",
      maxMoney: "",
      description: "",
      status: 1
    },
    orders: {
      property: "createAt",
      direction: "desc"
    }
  })
  const value = {
    filter,
    formCreate,
    setFilter,
    statusForm, setStatusForm,
  }
  return <ManageVoucherContext.Provider value={value}>
    {children}
  </ManageVoucherContext.Provider>
}

export const useManageVoucher = () => {
  return useContext(ManageVoucherContext)
}