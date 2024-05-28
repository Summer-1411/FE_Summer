
import React, { useState } from 'react';

import { Button, Col, Drawer, Form, Input, Row, Select, Space, Modal, Upload, DatePicker, Image, Flex, Rate } from 'antd';
import { useFeedback } from '../../pages/completedOrder/FeedbackContext';
import DescriptionItem from '../../ui/DescriptionItem/DescriptionItem';
import { request } from '../../requestMethod';
import { useSendFeedback, useUpdateFeedback } from '../../services/feedback';
const desc = ['Rất tệ', 'Tệ', 'Ổn', 'Tuyệt', 'Rất tuyệt'];

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });


const Feedback = () => {
    const { open, setOpen, feedbackInfor, formCreateUpdate, pointRate, setPointRate } = useFeedback()

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const serviceSendFeedback = useSendFeedback()
    const serviceUpdateFeedback = useUpdateFeedback()

    const [fileList, setFileList] = useState([]);
    const dummyRequest = ({ onSuccess }) => {
        onSuccess('ok')
    }
    const handleCancel = () => {
        setPreviewOpen(false)
    };

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
        let fileName = feedbackInfor.edit ? feedbackInfor.prevImg : null;

        if (fileList && fileList.length > 0) {
            const data = new FormData()
            fileName = fileList[0]?.originFileObj?.name ? Date.now() + fileList[0]?.originFileObj?.name : ""
            data.append("name", fileName)
            data.append("file", fileList[0]?.originFileObj || "")

            try {
                await request.post(`/upload`, data)
            } catch (error) {
                console.log(error);
            }
        }
        try {
            if (feedbackInfor.edit) {
                const data = {
                    description: param.description,
                    rate: pointRate,
                    img: fileName
                }
                await serviceUpdateFeedback.mutateAsync({ id: feedbackInfor.idEdit, params: data })
                onClose()
            } else {
                const data = {
                    idProduct: feedbackInfor.id_pro,
                    idOrder: feedbackInfor.idOrder,
                    description: param.description,
                    rate: pointRate,
                    img: fileName
                }
                await serviceSendFeedback.mutateAsync(data)
                onClose()
            }
        } catch (error) {
            console.log(error);
        }

    };
    const onReset = () => {
        formCreateUpdate.resetFields()
        setFileList([])
    }
    const uploadButton = (

        <div style={{ marginTop: 8 }}>Tải ảnh</div>

    );


    return (
        <Drawer
            title={feedbackInfor?.edit ? "Cập nhật đánh giá" : "Đánh giá sản phẩm"}
            width={720}
            onClose={onClose}
            open={open}
            bodyStyle={{ paddingBottom: 80 }}
        >
            <DescriptionItem title='Sản phẩm' content={feedbackInfor?.name + ` (${feedbackInfor?.color} - ${feedbackInfor.size})`} />
            <Form layout="vertical" hideRequiredMark form={formCreateUpdate} onFinish={onFinish}>
                <Flex gap="middle" vertical>
                    <Rate tooltips={desc} onChange={setPointRate} value={pointRate} />
                    {pointRate ? <span>{desc[pointRate - 1]}</span> : null}
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