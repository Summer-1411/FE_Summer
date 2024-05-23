
import React, { useState } from 'react';

import { Button, Col, Drawer, Form, Input, Row, Select, Space, Modal, Upload, DatePicker, Image, Flex, Rate } from 'antd';
import { useFeedback } from '../../pages/completedOrder/FeedbackContext';
import DescriptionItem from '../../ui/DescriptionItem/DescriptionItem';
const desc = ['Rất tệ', 'Tệ', 'Ổn', 'Tuyệt', 'Rất tuyệt'];

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const { Option } = Select;

const Feedback = (props) => {
    const { open, setOpen, product } = useFeedback()

    const [formCreateUpdate] = Form.useForm();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [value, setValue] = useState(3);


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
        onReset()


    };
    const onFinish = async () => {
        const param = formCreateUpdate.getFieldsValue()


        // if (edit) {
        //   if (fileList && fileList.length > 0) {
        //     const data = new FormData()
        //     const fileName = fileList[0]?.originFileObj?.name ? Date.now() + fileList[0]?.originFileObj?.name : ""
        //     data.append("name", fileName)
        //     data.append("file", fileList[0]?.originFileObj || "")
        //     await axios.post(`http://localhost:6868/api/upload`, data)
        //     param.avatar = fileName
        //   } else {
        //     param.avatar = initValue?.avatar
        //   }
        //   param.birthday = param.birthday
        //     ? dayjs(param.birthday).format('YYYY-MM-DD')
        //     : ''
        //   param.id = initValue?.id
        //   const update = {
        //     ...param,
        //   }
        //   await updateStudent.mutateAsync(update);
        //   onClose();
        // } else {
        //   //Thêm mới
        //   if (fileList && fileList.length > 0) {
        //     const data = new FormData()
        //     const fileName = fileList[0]?.originFileObj?.name ? Date.now() + fileList[0]?.originFileObj?.name : ""
        //     data.append("name", fileName)
        //     data.append("file", fileList[0]?.originFileObj || "")
        //     await axios.post(`http://localhost:6868/api/upload`, data)
        //     param.avatar = fileName
        //     param.birthday = param.birthday
        //       ? dayjs(param.birthday).format('YYYY-MM-DD')
        //       : ''

        //     const newStudent = {
        //       ...param,
        //       // idClass: classInfor?.id
        //     }
        //     await createStudent.mutateAsync(newStudent);
        //     onClose();
        //   } else {
        //     toast.error("Bạn chưa chọn ảnh đại diện !", toastOption);
        //   }
        // }

    };
    const onReset = () => {
        formCreateUpdate.resetFields()
        setFileList([])
    }
    const uploadButton = (

        <div style={{ marginTop: 8 }}>Tải ảnh</div>

    );
    console.log('product',product);


    return (
        <Drawer
            title={"Đánh giá sản phẩm"}
            width={720}
            onClose={onClose}
            open={open}
            bodyStyle={{ paddingBottom: 80 }}
        >
            <DescriptionItem title='Sản phẩm' content={product?.name + ` (${product?.color} - ${product.size})`} />
            <Form layout="vertical" hideRequiredMark form={formCreateUpdate} onFinish={onFinish}>
                <Flex gap="middle" vertical>
                    <Rate tooltips={desc} onChange={setValue} value={value} />
                    {value ? <span>{desc[value - 1]}</span> : null}
                </Flex>
                <Row gutter={16}>
                    <Col span={24}>
                        {<Image
                            width={300}
                        // src={`${IMAGE_LINK}/${initValue?.avatar}`}
                        />}
                        <Form.Item
                            name="avatar"
                            label="Ảnh đánh giá"
                        >
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                maxCount={1}
                                customRequest={dummyRequest}
                                onPreview={handlePreview}
                                onChange={handleChange}
                            >
                                {uploadButton}

                            </Upload>

                        </Form.Item>
                    </Col>
                </Row>

                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>


                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="description"
                            label="Mô tả"
                        >
                            <Input.TextArea rows={4} placeholder="Nhập mô tả sản phẩm" />
                        </Form.Item>
                    </Col>
                </Row>
                <Space>
                    <Button onClick={onClose}>Hủy bỏ</Button>
                    <Button onClick={onReset}>Làm mới</Button>
                    <Button htmlType='submit' type="primary">
                        Gửi
                    </Button>
                </Space>
            </Form>

        </Drawer >
    );
};

export default Feedback;