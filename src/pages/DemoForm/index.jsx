


import { FormattedMessage, useIntl } from 'react-intl'
import TextInput from '../../ui/TextInput/index'
import SelectInput from '../../ui/Select/index'
import { Button, Card, Col, Form, Row } from 'antd'
import { ProForm } from '@ant-design/pro-form'
import React, { useState } from 'react'
import { PlusOutlined } from "@ant-design/icons";
import { NumberInput } from '../../ui/NumberInput'
import { TextArea } from '../../ui/TextArea'
import { DATE_FORMAT } from '../../constants'
import { DateInput } from '../../ui/DatePicker'
import ListForm from '../../ui/ListForm'
import { FormCreateUpdate } from './formCreateUpdate'

const DemoForm = () => {

    const [form] = Form.useForm()
    const [formCreate] = Form.useForm()
    const onFinish = async (request) => {

    }
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }


    const resetForm = () => {
        form.resetFields()
    }
    const option = [
        {
            value: 1,
            label: "1"
        },
        {
            value: 2,
            label: "2"
        },
        {
            value: 3,
            label: "3"
        }
    ]

    const creatorButtonStyle = {
        background:
            ' linear-gradient(90deg, #E6EAF4 0%, #EEE9F4 15.7%, #F1E7F3 26.7%, #F7E5EE 61.18%, #F8EAE9 100%)',
    }

    const onDeleteAction = (index, action) => {
        action.remove(index)
    }
    return (
        <div>
            <ProForm
                form={form}
                initialValues={{ status: 1 }}
                colon={false}
                labelCol={{
                    md: 24,
                }}
                colProps={{
                    xs: 24,
                    sm: 24,
                    md: 8,
                }}
                rowProps={{
                    gutter: 16,
                    wrap: true,
                }}
                grid={true}
                onFinish={onFinish}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        form.submit()
                    }
                }}
                submitter={{
                    submitButtonProps: {
                        style: { display: 'none' }
                    },
                    resetButtonProps: {
                        style: { display: 'none' }
                    },
                }}
            >
                <TextInput
                    autoRequired
                    name="itemCode"
                    label={"Item code"}
                    placeholder={"Nhập item code"}
                />
                <SelectInput
                    autoRequired
                    form={form}
                    name="status"
                    options={option}
                    label={"Trạng thái"}
                    placeholder={"Chọn trạng thái"}
                    fieldProps={{
                        defaultValue: 1,
                    }}
                />
                <NumberInput
                    isDotNumberFormat
                    isNonTypingZero
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
                <TextArea
                    colProps={{ md: 24 }}
                    name="description"
                    label={"Mô tả"}
                    fieldProps={{ maxLength: 500 }}
                />
                <DateInput
                    label={"Range"}
                    name="requestDate"
                    type={'range'}
                    fieldProps={{
                        format: DATE_FORMAT,
                        placeholder: [
                            "Từ ngày",
                            "Đến ngày",
                        ],
                    }}
                />
                <DateInput
                    type={'normal'}
                    name={"formDate"}
                    label={"Từ ngày"}
                    placeholder={DATE_FORMAT}
                    autoRequired
                />
                <ListForm
                    colProps={{
                        xs: 24,
                        sm: 24,
                        md: 24,
                        lg: 24,
                        xxl: 24,
                    }}
                    initialValues={[undefined]}
                    listFormProps={{
                        name: ['listDay'],
                        creatorButtonProps: {
                            prefixCls: 'bss-creator-form',
                            style: creatorButtonStyle,
                            creatorButtonText: "Thêm",
                        },
                        copyIconProps: false,
                        deleteIconProps: false,
                    }}
                >
                    {(metaDate, index, action) => {
                        return (
                            <Row
                                style={{
                                    paddingLeft: 4,
                                    paddingRight: 10,
                                }}
                            >
                                <TextInput
                                    autoRequired
                                    name="code"
                                    label={"Item code"}
                                    placeholder={"Nhập item code"}
                                />

                                <Col>
                                    <Row>
                                        <Col span={23}>
                                            <ListForm
                                                colProps={{
                                                    xs: 24,
                                                    sm: 24,
                                                    md: 24,
                                                    lg: 24,
                                                    xxl: 24,
                                                }}
                                                initialValues={[undefined]}
                                                listFormProps={{
                                                    name: ['listTime'],
                                                    creatorButtonProps: {
                                                        prefixCls: 'bss-creator-form',
                                                        style: creatorButtonStyle,
                                                        creatorButtonText: "Thêm 1",
                                                    },
                                                    copyIconProps: false,
                                                    deleteIconProps: false,
                                                }}
                                            >
                                                {(metaTime, index, action) => {
                                                    return (
                                                        <Row>
                                                            <Col span={20}>
                                                                <TextInput
                                                                    autoRequired
                                                                    name="name"
                                                                    label={"Item name"}
                                                                    placeholder={"Nhập item name"}
                                                                />
                                                            </Col>
                                                            <Col span={4}>
                                                                <Button
                                                                    type={'text'}
                                                                    style={{ backgroundColor: 'white' }}
                                                                    onClick={() =>
                                                                        onDeleteAction(index, action)
                                                                    }
                                                                    disabled={metaTime?.key === 0}
                                                                >
                                                                    Xóa 1
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    )
                                                }}
                                            </ListForm>
                                        </Col>
                                        <Col span={1}>
                                            <Button
                                                disabled={metaDate?.key === 0}
                                                onClick={() => onDeleteAction(index, action)}
                                            >
                                                Xóa
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        )
                    }}
                </ListForm>

            </ProForm>
            <div
                style={{ justifyContent: 'flex-end', display: 'flex', marginTop: 20 }}
            >
                <Button>
                    Làm mới
                </Button>
                <Button
                    onClick={() => form.submit()}
                    style={{ marginLeft: 4 }}
                >
                    Tìm
                </Button>
                <Button type='primary' onClick={() => { setOpen(true) }}>
                    Thêm mới
                </Button>

                <FormCreateUpdate open={open} form={formCreate} handleClose={handleClose} />

            </div>
        </div>
    )
}


export default DemoForm