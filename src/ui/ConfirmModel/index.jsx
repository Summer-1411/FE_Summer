import { DELETE, ERROR, INFO, SUCCESS, WARNING } from './icons'
import { Button, Modal } from 'antd'
import * as React from 'react'
import { ModalType } from './contanst'
import { useModalConfirm } from './ModalContextCustom'

export const ConfirmModal = (props) => {

  const {
    options,
    hideConfirm,
  } = useModalConfirm()
  const { type = ModalType.SUCCESS } = options
  const handleCancel = () => {
    options.onCancel && options.onCancel()
    hideConfirm()
  }
  const handelOk = () => {
    options.onOk && options.onOk()
    hideConfirm()
  }

  console.log('options.open', options.open);

  const genIconsHeader = () => {
    switch (type) {
      case ModalType.ERROR:
        return <ERROR />
      case ModalType.WARNING:
        return <WARNING />
      case ModalType.DELETE:
        return <DELETE />
      case ModalType.SUCCESS:
        return <SUCCESS />
      default:
        return <INFO />
    }
  }
  return (
    <Modal
      wrapClassName={'modal-confirm'}
      destroyOnClose={true}
      style={{ zIndex: 999999 }}
      width={400}
      title={
        <div style={{ textAlign: 'center' }}>
          <div>{genIconsHeader()}</div>
          <div>{options.title}</div>
        </div>
      }
      onCancel={handleCancel}
      footer={[
        <div
          key={'action_modal'}
          style={{
            display: 'flex',
            flex: 1,
            gap: 10,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            style={{
              width: '100%',
              height: '40px',
            }}
            key="back"
            onClick={handleCancel}
          >
            Hủy
          </Button>
          <Button
            style={{
              width: '100%',
              height: '40px',
            }}
            type='primary'
            hidden={options?.hideConfirm}
            onClick={handelOk}
            key="submit"
          >
            Đồng ý
          </Button>
        </div>,
      ]}
      open={options.open || props.open}
    >
      <div style={{ textAlign: 'center' }}>
        <div>{options.message}</div>
      </div>
    </Modal>
  )
}
