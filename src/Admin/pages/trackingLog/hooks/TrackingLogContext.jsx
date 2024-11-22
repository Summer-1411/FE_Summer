import { Form } from "antd";
import { createContext, useContext, useState } from "react";
import { ACTION_TYPE } from "../../../../constants";

export const TrackingLogContext = createContext('Context bảng product');

export const TrackingLogProvider = ({
  children,
}) => {
  const [formCreate] = Form.useForm()
  const [statusForm, setStatusForm] = useState({
    open: false,
    action: ACTION_TYPE.CREATE,
    initData: {}
  })


  const [filter, setFilter] = useState({
    sample: {
      method: "",
      url: "",
      requestBody: "",
      ipAddress: ""
    },
    pagination: {
      page: 1,
      pageSize: 10
    },
    orders: {
      property: "createAt",
      direction: "desc"
    }
  })



  const value = {
    formCreate,
    filter,
    setFilter,
    statusForm, setStatusForm
  }
  return <TrackingLogContext.Provider value={value}>
    {children}
  </TrackingLogContext.Provider>
}

export const useTrackingLog = () => {
  return useContext(TrackingLogContext)
}