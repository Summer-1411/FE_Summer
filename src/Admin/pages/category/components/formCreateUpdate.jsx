
import React from 'react';
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { useCategory } from '../hooks/CategoryContext';
import { listStatus } from '../../../../constants';
import { useCreateCategory, useUpdateCategory } from '../services';

const { Option } = Select;
const CreateUpdate = (props) => {
  const { formCreateUpdate, edit, setEdit, initValue } = useCategory()
  const { open, setOpen } = props
  const onClose = () => {
    setOpen(false);
    setEdit(false)
    onReset()
  };
  const updateCategory = useUpdateCategory()
  const createCategory = useCreateCategory()
  const onFinish = async () => {
    const param = formCreateUpdate.getFieldsValue()
    if (edit) {
      const update = {
        ...initValue,
        ...param,
      }
      await updateCategory.mutateAsync(update);
      onClose();
    } else {
      await createCategory.mutateAsync(param);
      onClose();
    }
  };

  const onReset = () => {
    formCreateUpdate.resetFields()
    setFileList([])
  }


  return (
    <Drawer
      title={edit ? "Cập nhật loại sản phẩm" : "Thêm mới loại sản phẩm"}
      width={720}
      onClose={onClose}
      open={open}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form layout="vertical"  form={formCreateUpdate} onFinish={onFinish}>

        <Row gutter={16}>


          <Col span={12}>
            <Form.Item
              name="name"
              label="Tên loại sản phẩm"
              rules={[{ required: true, message: 'Bạn chưa nhập tên loại' }]}
            >
              <Input placeholder="Nhập tên loại sản phẩm" />
            </Form.Item>
          </Col>


          <Col span={12}>
            <Form.Item label="Trạng thái" name="status" initialValue={1}>
              <Select
                placeholder="Chọn trạng thái"
                allowClear
                disabled={!edit}
              >
                {listStatus.map((item) => (
                  <Option key={item.value} value={item.value}>{item.label}</Option>
                ))}
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