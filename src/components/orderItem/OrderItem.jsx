import { useEffect, useState } from 'react';
import './orderItem.scss'
import { IMAGE_LINK, request } from '../../requestMethod';
import { numberWithCommas } from '../../utils/formatMoney';
import { formatDate } from '../../utils/formatDate';
import { Button } from 'antd';
import { useFeedback } from '../../pages/completedOrder/FeedbackContext';
export default function OrderItem({ order, complete }) {
    const [products, setProducts] = useState([])
    const { open, setOpen, setProduct } = useFeedback()
    useEffect(() => {
        const getProductByBill = async () => {
            const res = await request.get(`/order_detail/${order.id}`)
            setProducts(res.data.products)
            console.log(res.data);
        }
        getProductByBill();
    }, [order.id])

    const handleOpenFeedback = (pro) => {
        console.log('handleOpenFeedback', open);
        setOpen(true)
        setProduct(pro)
    }

    console.log('products', products);
    return (
        <div className='orderItem-wrapper'>
            {products.map(pro => (
                <div key={pro.id} className="orderItem-content">
                    <div className="orderItem-content-left">
                        <img src={`${IMAGE_LINK}/${pro.img}`} alt="" className="img-product" />
                        <div className="infor-product">
                            <div className="name-product">{pro.name}</div>
                            <div className="filter-product">
                                Phân loại: {pro.size}, {pro.color}
                            </div>
                            <div className="quantity-product">
                                x{pro.quantity}
                            </div>
                        </div>
                    </div>
                    <div className="orderItem-content-right">
                        <div className="price-product">
                            {numberWithCommas(pro.price)}
                        </div>
                        <div style={{ textAlign: 'right', marginTop: 20 }}>
                            {complete && <Button type="primary" danger onClick={() => handleOpenFeedback(pro)}>
                                Đánh giá sản phẩm
                            </Button>}
                        </div>
                    </div>
                </div>

            ))}
            <div className="checkout-product">
                <div className="checkout-product-left">
                    <div className="name-customer">
                        {order.fullname}
                    </div>
                    <div className="phone-number">
                        {order.phone}
                    </div>
                    <div className="delivery-address">
                        {order.shipping_address}
                    </div>
                    <div className="date-order">
                        <div className="title">Ngày đặt : </div>
                        <div className="date-value">{formatDate(order.orderDate)}</div>
                    </div>
                </div>
                <div className="checkout-product-right">
                    <div className="sum-price-checkout">
                        <div className="title-checkout">
                            Thành tiền :
                        </div>
                        <div className="price-order">
                            {numberWithCommas(order.total_amount)}
                        </div>
                    </div>

                </div>

            </div>



        </div>
    )
}
