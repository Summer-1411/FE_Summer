import { Layout, Form, Input, Button, Select, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { listStatus } from '../../../../constants';
const { Content } = Layout;
const { Option } = Select;


const Search = (props) => {

    const [form] = Form.useForm();
    const { setParams } = props
    const onFinish = (values) => {
        setParams(values)
    };

    return (
        <Content style={{
            padding: 16,
            background: '#fff',
        }}>
            <Form
                onFinish={onFinish}
                form={form}
                layout="vertical" hideRequiredMark
            >
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={12} xl={6}>
                        <Form.Item label="Tên loại sản phẩm" name="name">
                            <Input placeholder="Nhập tên loại sản phẩm" allowClear />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} xl={6}>
                        <Form.Item label="Trạng thái" name="status" >
                            <Select
                                placeholder="Chọn trạng thái"
                                allowClear
                            >
                                {listStatus.map((item) => (
                                    <Option key={item.value} value={item.value}>{item.label}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'end' }}>
                        <Form.Item  >
                            <Button type="primary" icon={<SearchOutlined />} htmlType="submit">Tìm kiếm</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Content >
    )
}

export default Search