import ProForm from "@ant-design/pro-form"
import { Button, Card, Form } from "antd"
import TextInput from "../../../../ui/TextInput"
import SelectInput from "../../../../ui/Select"
import { useManageOrder } from "../hooks/ManageOrderContext"
import { DATE_FORMAT, listStatus, PAYMENT_TYPE, STATUS_ORDER } from "../../../../constants"
import { DateInput } from "../../../../ui/DatePicker"

const Filter = () => {
    const { setFilter } = useManageOrder()
    const [form] = Form.useForm()
    const onFinish = async (values) => {
        const data = {
            ...values,
            fromDate: values?.date ? values?.date[0] : null,
            toDate: values?.date ? values?.date[1] : null,
        }
        setFilter(prev => ({
            ...prev,
            pagination: {
                ...prev.pagination,
                page: 1,
            },
            sample: data
        }))
    }
    const resetForm = () => {
        form.resetFields()
    }


    return (
        <Card title={false}>
            <ProForm
                form={form}
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
                    name="id"
                    label={"Mã đơn hàng"}
                />
                <DateInput
                    name="date"
                    type="range"
                    fieldProps={{
                        allowEmpty: [true, true],
                        format: DATE_FORMAT,
                        placeholder: [
                            "Từ ngày",
                            "Đến ngày",
                        ],
                    }}
                    label={"Ngày đặt"}
                />
                <SelectInput
                    form={form}
                    name="status"
                    options={STATUS_ORDER}
                    fieldProps={{
                        defaultValue: 0,
                    }}
                    label={"Trạng thái đơn hàng"}
                />
                <SelectInput
                    form={form}
                    name="method"
                    options={PAYMENT_TYPE}
                    label={"Phương thức thanh toán"}
                />
                <TextInput
                    name="fullname"
                    label={"Tên khách hàng"}
                />
                <TextInput
                    name="phone"
                    label={"Số điện thoại"}
                />
                <TextInput
                    name="address"
                    label={"Địa chỉ giao hàng"}
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
