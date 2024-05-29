
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

import { Button, Col, Drawer, Form, Input, Row, Select, Space, Modal, Upload, DatePicker, Image } from 'antd';

import dayjs from 'dayjs';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useCategory } from '../hooks/CategoryContext';
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const { Option } = Select;

const CreateUpdate= (props) => {
  const { formCreateUpdate, edit, setEdit, initValue } = useCategory()
  const { open, setOpen } = props
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');



  const [fileList, setFileList] = useState([]);
  const dummyRequest = ({ onSuccess }) => {
    onSuccess('ok')
  }
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || (file.preview));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ fileList: newFileList }) =>
    setFileList(newFileList);




  const onClose = () => {
    setOpen(false);
    setEdit(false)
    onReset()


  };
  const onFinish = async () => {
    const param = formCreateUpdate.getFieldsValue()


    if (edit) {
      if (fileList && fileList.length > 0) {
        const data = new FormData()
        const fileName = fileList[0]?.originFileObj?.name ? Date.now() + fileList[0]?.originFileObj?.name : ""
        data.append("name", fileName)
        data.append("file", fileList[0]?.originFileObj || "")
        await axios.post(`http://localhost:6868/api/upload`, data)
        param.avatar = fileName
      } else {
        param.avatar = initValue?.avatar
      }
      param.birthday = param.birthday
        ? dayjs(param.birthday).format('YYYY-MM-DD')
        : ''
      param.id = initValue?.id
      const update = {
        ...param,
      }
      // await updateStudent.mutateAsync(update);
      onClose();
    } else {
      //Thêm mới
      if (fileList && fileList.length > 0) {
        const data = new FormData()
        const fileName = fileList[0]?.originFileObj?.name ? Date.now() + fileList[0]?.originFileObj?.name : ""
        data.append("name", fileName)
        data.append("file", fileList[0]?.originFileObj || "")
        await axios.post(`http://localhost:6868/api/upload`, data)
        param.avatar = fileName
        param.birthday = param.birthday
          ? dayjs(param.birthday).format('YYYY-MM-DD')
          : ''

        const newStudent = {
          ...param,
          // idClass: classInfor?.id
        }
        // await createStudent.mutateAsync(newStudent);
        onClose();
      } else {
        toast.error("Bạn chưa chọn ảnh đại diện !", toastOption);
      }
    }

  };
  const onReset = () => {
    formCreateUpdate.resetFields()
    setFileList([])
  }
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Tải ảnh</div>
    </div>
  );


  return (
    <Drawer
      title={edit ? "Cập nhật hãng sản xuất" : "Thêm mới hãng sản xuất"}
      width={720}
      onClose={onClose}
      open={open}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form layout="vertical" hideRequiredMark form={formCreateUpdate} onFinish={onFinish}>

        <Row gutter={16}>
          
          
          <Col span={12}>
            <Form.Item
              name="name"
              label="Tên hãng sản xuất"
              rules={[{ required: true, message: 'Bạn chưa nhập tên hãng' }]}
            >
              <Input placeholder="Nhập tài khoản" />
            </Form.Item>
          </Col>
          

          <Col span={12}>
            <Form.Item label="Trạng thái" name="status" initialValue={1}>
              <Select
                placeholder="Chọn trạng thái"
                allowClear

              >
                {/* {listStatus.map((item) => (
                  <Option key={item.value} value={item.value}>{item.label}</Option>
                ))} */}
              </Select>
            </Form.Item>
          </Col>

        </Row>
        
        <Space>
          <Button onClick={onClose}>Hủy bỏ</Button>
          <Button onClick={onReset}>Làm mới</Button>
          <Button htmlType='submit' type="primary">
            Lưu dữ liệu
          </Button>
        </Space>
      </Form>
    </Drawer>
  );
};

export default CreateUpdate;