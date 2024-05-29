
import { useState } from 'react';
import { Divider, Button, Tag, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CreateUpdate from "./components/formCreateUpdate";
import Table from "antd/es/table";

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { CategoryProvider, useCategory } from "./hooks/CategoryContext";
import { useSearchCategory } from './services';


const CategoryManager = () => {
  const { setDetailStudent, setOpenView, setEdit, formCreateUpdate, setInitValue } = useCategory()
  const [open, setOpen] = useState(false)
  const [openModel, setOpenModel] = useState(false);
  const [initSearch, setInitSearch] = useState({
    status: 1
  })
//   const { listStudent } = useSearchStudent(initSearch)
  const {categoryList} = useSearchCategory()

//   const deleteStudent = useDeleteStudent();
  const [listIdDelete, setListIdDelete] = useState([]);
  const handleClickDelete = (record) => {
    setOpenModel(true)
    setListIdDelete([record.id])
  }
  const showDrawer = () => {
    setOpen(true);
  };
  const handleClickStudent = (record) => {
    setOpenView(true);
    setDetailStudent(record)
  }
  const handleOk = () => {
    setOpenModel(false);
    // deleteStudent.mutateAsync({ ids: listIdDelete })
  };
  const handleCancel = () => {
    setOpenModel(false);
  };

  //Edit
  const handleClickEdit = (record) => {
    // formCreateUpdate.setFieldValue("birthday", dayjs(record.birthday))
    // formCreateUpdate.setFieldValue("idClass", record.id_class)
    delete record.birthday
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



  return (
    <div>
      {/* <Search setInitSearch={setInitSearch} /> */}

      <Divider />
      <Button type="primary" style={{ marginBottom: 16 }} onClick={showDrawer} icon={<PlusOutlined />}>
        Thêm mới
      </Button>
      <Table
        title={() => 'Danh sách loại sản phẩm'}
        rowKey={'id'}
        onRow={(record) => {
          return {
            onClick: () => {

            }, // click row

          };
        }}
        columns={columns}
        dataSource={categoryList}
      />
      <Modal
        title="Xóa bản ghi"
        open={openModel}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Sau khi xóa sẽ chuyển trạng thái về không hoạt động. Bạn có muốn xóa ?</p>
      </Modal>
      <CreateUpdate open={open} setOpen={setOpen} />
      {/* <ViewInfor /> */}
    </div>
  )
}



const CategoryRoot = () => (
  <CategoryProvider>
    <CategoryManager />
  </CategoryProvider>
)

export default CategoryRoot