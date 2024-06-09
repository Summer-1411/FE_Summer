import { Layout, Form, Button, Row, Col, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const { Content } = Layout;
const { RangePicker } = DatePicker;

const Search = (props) => {
    const [form] = Form.useForm();
    const { setParams } = props
    const onFinish = (values) => {
        const rangeValue = values['range-picker'];
        setParams({
            startDate: rangeValue[0].format('YYYY-MM'),
            endDate: rangeValue[1].format('YYYY-MM')
        })
    };
    const rangeConfig = {
        rules: [
            {
                type: 'array',
                required: true,
                message: 'Vui lòng chọn khoảng thời gian!',
            },
        ],
    };

    return (
        <Content style={{
            padding: 16,
            background: '#fff',
        }}>
            <Form
                onFinish={onFinish}
                form={form}
                layout="vertical"
            >
                <Row gutter={16}>
                    
                    <Col xs={24} sm={24} md={12} xl={6}>
                        <Form.Item name="range-picker" label="Thời gian" {...rangeConfig}>
                            <RangePicker picker="month" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'end' }}>
                        <Form.Item  >
                            <Button type="primary" icon={<SearchOutlined />} htmlType="submit">Thống kê</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Content >
    )
}

export default Search