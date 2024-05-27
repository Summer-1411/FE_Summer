import { useContext, useMemo } from 'react'

import './order.scss'
import ProductCheckout from '../../components/productCheckout/ProductCheckout'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { request } from '../../requestMethod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOption } from '../../constants';
import { numberWithCommas } from '../../utils/formatMoney';
import { Button, Form, Input, Space, Select, Row, Col } from 'antd';
import { AppContext } from '../../context/AppContext';
import { useClearCart } from '../../services/products';

const { Option } = Select;

export default function Order() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const serviceClearCart = useClearCart()
    const { productCart } = useContext(AppContext)
    const [form] = Form.useForm();


    const sumPrice = useMemo(() => productCart.reduce(
        (accumulator, item) => {
            return item.price * item.quantity + accumulator
        },
        0,
    ), [productCart])

    let checkCondition = () => {
        if (productCart.length === 0) {
            toast.error('Bạn chưa có sản phẩm trong giỏ hàng !', toastOption);
            return false
        }
        return true
    }
    const handleOrder = async (values) => {
        if (!checkCondition()) {
            return;
        }
        let data = {
            ...values,
            methodShip: 'Giao hàng',
            total: sumPrice,
            products: productCart
        }
        try {
            const res = await request.post(`/order`, data)
            toast.success(res.data.message, toastOption);
            serviceClearCart.mutateAsync()
            navigate("/user/purchase")
        } catch (error) {
            console.log('error.response', error);
            toast.error(error.message, toastOption);
        }

    }
    return (
        <div className='order-wrapper'>
            <Form
                form={form}
                onFinish={handleOrder}
                name="validateOnly"
                layout="vertical"
                autoComplete="off"
            >
                <div className="order-heading">
                    Đặt hàng
                </div>

                <Form.Item
                    name="fullname"
                    label="Họ và tên"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn chưa nhập họ tên!'
                        }
                    ]} >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn chưa nhập số điện thoại!'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Địa chỉ nhận hàng"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn chưa nhập địa chỉ nhận hàng!'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                
                <Form.Item label="Mã giảm giá" extra="Nhập mã giảm giá nếu có">
                <Row gutter={8}>
                    <Col span={20}>
                        <Form.Item
                            name="voucher"
                            // label="Mã giảm giá"

                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Button type='primary'>Áp dụng</Button>
                    </Col>
                </Row>
                </Form.Item>
                <Form.Item
                    name="note"
                    label="Ghi chú"
                >
                    <Input.TextArea showCount maxLength={100} />
                </Form.Item>
                <Form.Item name="paymentMethod" label="Hình thức thanh toán" rules={[{ required: true, message: 'Vui lòng chọn hình thức thanh toán!' }]}>
                    <Select
                        placeholder="Chọn hình thức thanh toán"
                        // onChange={onGenderChange}
                        allowClear
                    >
                        <Option value="1">Thanh toán khi nhận hàng</Option>
                        <Option value="2">Thanh toán trực tuyến</Option>
                    </Select>
                </Form.Item>




                <div className="order-product">
                    {productCart.map(pro => (
                        <ProductCheckout product={pro} key={uuidv4()} />
                    ))}
                </div>
                <div className="checkout-product">
                    <div className="checkout-product-right">
                        <div className="sum-price-checkout">
                            <div className="title-checkout">
                                Thành tiền:
                            </div>
                            <div className="price-order">
                                {numberWithCommas(sumPrice)}
                            </div>
                        </div>
                    </div>
                </div>
                <Form.Item style={{ textAlign: 'center' }}>

                    <Space >
                        <Button htmlType="reset">Làm mới</Button>
                        <Button type="primary" htmlType="submit" >
                            Đặt hàng
                        </Button>

                    </Space>

                </Form.Item>

            </Form>
        </div>
    )
}
