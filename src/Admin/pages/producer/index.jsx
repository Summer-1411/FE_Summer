
import { useState } from 'react';
import { Button, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CreateUpdate from "./components/formCreateUpdate";
import Table from "antd/es/table";

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { ProducerProvider, useProducer } from "./hooks/ProducerContext";
import { useDeleteProducer, useSearchProducer } from './services';
import Search from './components/search';
import { listStatus } from '../../../constants';
import { useModalConfirm } from '../../../ui/ConfirmModel/ModalContextCustom';
import { ModalType } from '../../../ui/ConfirmModel/contanst';


const ProducerManager = () => {
  const { setEdit, formCreateUpdate, setInitValue } = useProducer()
  const { showConfirm } = useModalConfirm()

  const [open, setOpen] = useState(false)
  const [initSearch, setInitSearch] = useState({
    name: '',
    status: ''
  })
  const { producerList } = useSearchProducer(initSearch)
  const deleteProducer = useDeleteProducer()

  const handleClickDelete = (record) => {
    showConfirm({
      message: "Sau khi xóa sẽ chuyển trạng thái về không hoạt động. Bạn có muốn xóa ?",
      type: ModalType.WARNING,
      title: "Xóa bản ghi",
      onOk: async () => {
        await deleteProducer.mutateAsync(record.id)
      },
    })
  }
  const showDrawer = () => {
    setOpen(true);
  };
  //Edit
  const handleClickEdit = (record) => {
    formCreateUpdate.setFieldsValue(record)
    setOpen(true);
    setEdit(true)
    setInitValue(record)
  }

  const columns = [
    {

      title: 'Id',
      dataIndex: 'id',
    },
    {

      title: 'Tên hãng sản xuất',
      dataIndex: 'name',
    },
    {
      width: 200,
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (field, record) => {
        return (
          <Tag icon={record.status ? <CheckCircleOutlined /> : <CloseCircleOutlined />} color={record.status ? 'success' : 'error'}>
            {listStatus.find((i) => i.value == record.status)?.label ?? ''}
          </Tag>
        )
      },
    },
    {

      title: 'Ngày tạo',
      dataIndex: 'createAt',
    },
    {

      title: 'Ngày cập nhật',
      dataIndex: 'updateAt',
    },

    {
      key: "action",
      render: (field, record) => (
        <div style={{ display: "flex", gap: 10 }}>
          <Button type="primary" ghost onClick={() => handleClickEdit(record)}>Sửa</Button>
          <Button danger disabled={record.status == 0} onClick={() => handleClickDelete(record)}>Xóa</Button>
        </div>
      )
    }
  ];
  const Header = () => {
    return <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h3>
        Danh sách hãng sản xuất
      </h3>
      <Button type="primary" style={{ marginBottom: 16 }} onClick={showDrawer} icon={<PlusOutlined />}>
        Thêm mới
      </Button>
    </div>
  }



  return (
    <div>

      <Search setParams={setInitSearch} />
      <Table
        title={() => <Header />}
        rowKey={'id'}
        onRow={(record) => {
          return {
            onClick: () => {

            }, // click row

          };
        }}
        pagination={{ pageSize: 8 }}
        columns={columns}
        dataSource={producerList}
      />
      <CreateUpdate open={open} setOpen={setOpen} />
    </div>
  )
}



const ProducerRoot = () => (
  <ProducerProvider>
    <ProducerManager />
  </ProducerProvider>
)

export default ProducerRoot