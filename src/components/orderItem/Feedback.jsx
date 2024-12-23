
import React, { useState } from 'react';

import { Button, Col, Drawer, Form, Input, Row, Select, Space, Modal, Upload, DatePicker, Image, Flex, Rate } from 'antd';
import { useFeedback } from '../../pages/completedOrder/FeedbackContext';
import DescriptionItem from '../../ui/DescriptionItem/DescriptionItem';
import { useSendFeedback, useUpdateFeedback } from '../../services/feedback';
import { CloudUploadOutlined, DeleteFilled } from '@ant-design/icons';
const desc = ['Rất tệ', 'Tệ', 'Ổn', 'Tuyệt', 'Rất tuyệt'];

const Feedback = () => {
    const { open, setOpen, feedbackInfor, formCreateUpdate, pointRate, setPointRate, setFeedbackInfor } = useFeedback()
    const serviceSendFeedback = useSendFeedback()
    const serviceUpdateFeedback = useUpdateFeedback()





    const handleOpenWidget = () => {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "drkmrlmla",
                uploadPreset: "summer"
            },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    const url = result.info.url;
                    setFeedbackInfor((prev) => ({
                        ...prev,
                        prevImg: url
                    }))
                }
            }
        );

        widget.open(); // Open the widget
    };


    const onClose = () => {
        setOpen(false);
        onReset()
    };
    const onFinish = async () => {
        const param = formCreateUpdate.getFieldsValue()

        try {
            if (feedbackInfor.edit) {
                const data = {
                    description: param.description,
                    rate: pointRate,
                    img: feedbackInfor.prevImg
                }
                await serviceUpdateFeedback.mutateAsync({ id: feedbackInfor.idEdit, params: data })
                onClose()
            } else {
                const data = {
                    idProduct: feedbackInfor.id_pro,
                    idOrder: feedbackInfor.idOrder,
                    description: param.description,
                    rate: pointRate,
                    img: feedbackInfor.prevImg
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
    }


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
                        <Button
                            style={{ marginRight: 4 }}
                            icon={<CloudUploadOutlined />}
                            onClick={async () => {
                                handleOpenWidget()
                            }}
                            size="default"
                        >
                            Ảnh
                        </Button>
                        {feedbackInfor?.prevImg && <Image
                            width={300}
                            src={feedbackInfor?.prevImg}
                        />}
                    </Col>
                </Row>
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