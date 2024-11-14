
import React, { useRef } from 'react';
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { useProducer } from '../hooks/ProducerContext';
import { listStatus } from '../../../../constants';
import { useCreateProducer, useUpdateProducer } from '../services';
import {
  ProForm,
  ProFormMoney,
  ProFormSwitch,
} from '@ant-design/pro-form';
import { NumberInput } from '../../../../ui/NumberInput';
const { Option } = Select;
const CreateUpdate = (props) => {
  const { formCreateUpdate, edit, setEdit, initValue } = useProducer()
  const { open, setOpen } = props
  const onClose = () => {
    setOpen(false);
    setEdit(false)
    onReset()
  };
  const updateProducer = useUpdateProducer()
  const createProducer = useCreateProducer()
  const onFinish = async () => {
    const param = formCreateUpdate.getFieldsValue()
    if (edit) {
      const update = {
        ...initValue,
        ...param,
      }
      await updateProducer.mutateAsync(update);
      onClose();
    } else {
      await createProducer.mutateAsync(param);
      onClose();
    }
  };

  const onReset = () => {
    formCreateUpdate.resetFields()
    setFileList([])
  }

  const formRef = useRef();

  return (
    <Drawer
      title={edit ? "Cập nhật hãng sản xuất" : "Thêm mới hãng sản xuất"}
      width={720}
      onClose={onClose}
      open={open}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <ProForm
        onFinish={async (values) => {

          console.log(values);
        }}
        formRef={formRef}
        params={{ id: '100' }}
        formKey="base-form-use-demo"
        autoFocusFirstInput
      >

        <NumberInput
          isDotNumberFormat
          isNonTypingZero
          colProps={{ sm: 24, md: 12, lg: 12 }}
          fieldProps={{
            maxLength: 15,
            addonAfter: 'VNĐ',
            onPaste: (event) => {
              const pastedText = event.clipboardData.getData('text/plain')
              if (!/^\d+$/.test(pastedText)) {
                event.preventDefault()
              }
            },
          }}
          name={"amout"}
          label={"Test"}
          autoRequired
        />


      </ProForm>
      {/* <Form layout="vertical" form={formCreateUpdate} onFinish={onFinish}>

        <Row gutter={16}>


          <Col span={12}>
            <Form.Item
              name="name"
              label="Tên hãng sản xuất"
              rules={[{ required: true, message: 'Bạn chưa nhập tên hãng' }]}
            >
              <Input placeholder="Nhập tên hãng sản xuất" />
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
      </Form> */}
    </Drawer>
  );
};

export default CreateUpdate;