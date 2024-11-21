import ProForm from "@ant-design/pro-form"
import { Button, Card, Form } from "antd"
import TextInput from "../../../../ui/TextInput"
import SelectInput from "../../../../ui/Select"
import { useTrackingLog } from "../hooks/TrackingLogContext"
import { METHOD_API } from "../../../../constants"
import { TextArea } from "../../../../ui/TextArea"

const Filter = () => {
    const { setFilter } = useTrackingLog()
    const [form] = Form.useForm()
    const onFinish = async (values) => {
        setFilter(prev => ({
            ...prev,
            pagination: {
                ...prev.pagination,
                page: 1,
            },
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
                <SelectInput
                    form={form}
                    name="method"
                    options={METHOD_API}
                    label={"Method"}
                />
                <TextInput
                    name="url"
                    label={"Url"}
                />
                <TextInput
                    name="ipAddress"
                    label={"Địa chỉ ip"}
                />

                <TextArea
                    name="requestBody"
                    label={"Request body"}
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
