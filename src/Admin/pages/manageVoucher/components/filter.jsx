import ProForm from "@ant-design/pro-form"
import { Button, Card, Form } from "antd"
import TextInput from "../../../../ui/TextInput"
import SelectInput from "../../../../ui/Select"
import { DATE_FORMAT, listGender, listStatus } from "../../../../constants"
import { useManageVoucher } from "../hooks/ManageVoucherContext"
import { NumberInput } from "../../../../ui/NumberInput"
import { DateInput } from "../../../../ui/DatePicker"
import { TextArea } from "../../../../ui/TextArea"

const Filter = () => {
    const { setFilter } = useManageVoucher()
    const [form] = Form.useForm()
    const onFinish = async (values) => {
        setFilter(prev => ({
            ...prev,
            sample: values
        }))

    }
    const resetForm = () => {
        form.resetFields()
    }


    return (
        <Card title={false}>
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
                    name="code"
                    isUpperCase
                    label={"Mã giảm giá"}
                />
                <NumberInput
                    isDotNumberFormat
                    isNonTypingZero
                    fieldProps={{
                        maxLength: 3,
                        addonAfter: '%',
                        onPaste: (event) => {
                            const pastedText = event.clipboardData.getData('text/plain')
                            if (!/^\d+$/.test(pastedText)) {
                                event.preventDefault()
                            }
                        },
                    }}
                    name={"value"}
                    label={"Giá trị"}
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
                    name={"minOrderValue"}
                    label={"Đơn tối thiểu"}
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
                    name={"maxMoney"}
                    label={"Giảm tối đa"}
                />
                <NumberInput
                    isNonTypingZero
                    fieldProps={{
                        maxLength: 15,
                        onPaste: (event) => {
                            const pastedText = event.clipboardData.getData('text/plain')
                            if (!/^\d+$/.test(pastedText)) {
                                event.preventDefault()
                            }
                        },
                    }}
                    name={"quantity"}
                    label={"Số lượng"}
                />
                <DateInput
                    type={'normal'}
                    name={"expiredTime"}
                    label={"Ngày hết hạn"}
                    placeholder={DATE_FORMAT}

                />
                <TextArea
                    name="description"
                    label={"Mô tả"}
                />
            </ProForm>
            <div style={{ justifyContent: 'flex-end', display: 'flex', marginTop: 20 }}>
                <Button onClick={resetForm} >
                    Làm mới
                </Button>
                <Button
                    type="primary"
                    onClick={() => form.submit()}
                    style={{ marginLeft: 4 }}
                >
                    Tìm kiếm
                </Button>
            </div>
        </Card>
    )
}
export default Filter;
