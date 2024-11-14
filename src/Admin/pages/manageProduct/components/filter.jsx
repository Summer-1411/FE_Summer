import ProForm from "@ant-design/pro-form"
import { Button, Card, Form } from "antd"
import TextInput from "../../../../ui/TextInput"
import SelectInput from "../../../../ui/Select"
import { useManageProduct } from "../hooks/ManageProductContext"
import { listStatus } from "../../../../constants"

const Filter = () => {
    const { listProducer, listCategory, setFilter } = useManageProduct()
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
                    name="name"
                    label={"Tên sản phẩm"}
                />
                <SelectInput
                    form={form}
                    name="idCategory"
                    options={listCategory}
                    label={"Loại sản phẩm"}
                />
                <SelectInput
                    form={form}
                    name="idProducer"
                    options={listProducer}
                    label={"Nhà sản xuất"}
                />
                <SelectInput
                    form={form}
                    name="status"
                    options={listStatus}
                    label={"Trạng thái"}
                    placeholder={"Chọn trạng thái"}
                    fieldProps={{
                        defaultValue: 1,
                    }}
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
