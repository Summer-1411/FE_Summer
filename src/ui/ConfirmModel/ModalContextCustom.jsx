import React, { createContext, useContext, useState } from 'react'
import { ModalType } from './contanst'

export const ModalContextCustom = createContext('Context must be in component function')

export const ModalProvider = ({ children }) => {
  const [options, setOption] = useState({
    title: '',
    message: '',
    type: ModalType.SUCCESS,
    open: false,
  })
  const showConfirm = (optionModal) => {
    console.log('optionModal', optionModal);

    setOption({
      ...optionModal,
      open: true,
    })
  }

  const hideConfirm = () => {
    setOption((prevState) => ({
      ...prevState,
      open: false,
    }))
  }

  const value = {
    options,
    showConfirm,
    hideConfirm,
  }
  return (
    <ModalContextCustom.Provider value={value}>
      {children}
    </ModalContextCustom.Provider>
  )
}
export const useModalConfirm = () => {
  return useContext(ModalContextCustom)
}
