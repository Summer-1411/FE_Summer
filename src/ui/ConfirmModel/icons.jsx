import ErrorIcon from './assets/error.svg'
import WarningIcon from './assets/warning.svg'
import SuccessIcon from './assets/success.svg'
import InfoIcon from './assets/info.svg'
import DeleteIcon from './assets/delete.svg'
import * as React from 'react'

export const ERROR = () => {
  return <img src={ErrorIcon} alt="Error Icon" />
}
export const WARNING = () => {
  return <img src={WarningIcon} alt="Error Icon" />
}
export const SUCCESS = () => {
  return <img src={SuccessIcon} alt="Error Icon" />
}
export const DELETE = () => {
  return <img src={DeleteIcon} alt="Error Icon" />
}
export const INFO = () => {
  return <img src={InfoIcon} alt="Error Icon" />
}
