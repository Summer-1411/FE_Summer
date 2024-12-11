
import { useState } from 'react';
import { Button, Tag, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CreateUpdate from "./components/formCreateUpdate";
import Table from "antd/es/table";

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { CategoryProvider, useCategory } from "./hooks/CategoryContext";
import { useDeleteCategory, useSearchCategory } from './services';
import Search from './components/search';
import { listStatus } from '../../../constants';


const CategoryManager = () => {
  const { setEdit, formCreateUpdate, setInitValue } = useCategory()
  const [open, setOpen] = useState(false)
  const [openModel, setOpenModel] = useState(false);
  const [initSearch, setInitSearch] = useState({
    name: '',
    status: ''
  })
  const [idDelete, setIdDelete] = useState()
  const { categoryList } = useSearchCategory(initSearch)
  const deleteCategory = useDeleteCategory()

  const handleClickDelete = (record) => {
    setOpenModel(true)
    setIdDelete(record.id)
  }
  const showDrawer = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpenModel(false);
    deleteCategory.mutateAsync(idDelete)
  };
  const handleCancel = () => {
    setOpenModel(false);
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

      title: 'Tên loại sản phẩm',
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
        Danh sách loại sản phẩm
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
        dataSource={categoryList}
      />
      <Modal
        title="Xóa loại sản phẩm"
        open={openModel}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Sau khi xóa sẽ chuyển trạng thái về không hoạt động. Bạn có muốn xóa ?</p>
      </Modal>
      <CreateUpdate open={open} setOpen={setOpen} />
    </div>
  )
}



const CategoryRoot = () => (
  <CategoryProvider>
    <CategoryManager />
  </CategoryProvider>
)

export default CategoryRoot