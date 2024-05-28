import { useEffect, useState } from 'react';
import './orderItem.scss'
import { IMAGE_LINK, request } from '../../requestMethod';
import { numberWithCommas } from '../../utils/formatMoney';
import { formatDate } from '../../utils/formatDate';
import { Button, Typography } from 'antd';
import { useFeedback } from '../../pages/completedOrder/FeedbackContext';
import { useGetFeedbackUser } from '../../services/feedback';
import { Link } from 'react-router-dom';
export default function OrderItem({ order, complete }) {
    const [products, setProducts] = useState([])
    const { Text } = Typography;
    const { open, setOpen, setFeedbackInfor, formCreateUpdate, setPointRate } = useFeedback()
    useEffect(() => {
        const getProductByBill = async () => {
            const res = await request.get(`/order_detail/${order.id}`)
            setProducts(res.data.products)
            console.log(res.data);
        }
        getProductByBill();
    }, [order.id])
    const { feedbackList } = useGetFeedbackUser()

    const handleCreateUpdateFeedback = (pro, edit) => {
        let data = {
            ...pro,
            idOrder: order.id,
            edit: false,
            idEdit: null,
            prevImg: null
        }
        if (edit) {
            const feedbackEdit = feedbackValid(feedbackList, pro)
            formCreateUpdate.setFieldsValue({
                description: feedbackEdit.description
            })

            console.log('data', data);
            console.log('feedbackEdit', feedbackEdit);
            setPointRate(feedbackEdit.rate)
            data = {
                ...data,
                edit: true,
                idEdit: feedbackEdit.id,
                prevImg: feedbackEdit.img
            }
        }
        setOpen(true)
        setFeedbackInfor(data)


    }


    const feedbackValid = (feedbackList, pro) => {
        return feedbackList.find((feedbackItem) => feedbackItem.id_product === pro.id_pro && feedbackItem.id_order === order.id)
    }
    return (
        <div className='orderItem-wrapper'>
            {products.map(pro => (
                <div key={pro.id} className="orderItem-content">
                    <div className="orderItem-content-left">
                        <img src={`${IMAGE_LINK}/${pro.img}`} alt="" className="img-product" />
                        <Link to={`/product/${pro.id_pro}`} style={{ textDecoration: 'none' }} className="infor-product">
                            <div className="name-product">{pro.name}</div>
                            <div className="filter-product">
                                Phân loại: {pro.size}, {pro.color}
                            </div>
                            <div className="quantity-product">
                                x{pro.quantity}
                            </div>
                        </Link>
                    </div>
                    <div className="orderItem-content-right">
                        <div className="price-product">
                            {numberWithCommas(pro.price)}
                        </div>
                        {feedbackValid(feedbackList, pro) ? <div style={{ textAlign: 'right', marginTop: 20 }}>
                            {complete && <Button ghost type="primary" onClick={() => handleCreateUpdateFeedback(pro, true)}>
                                Sửa đánh giá
                            </Button>}
                        </div> : <div style={{ textAlign: 'right', marginTop: 20 }}>
                            {complete && <Button type="primary" danger onClick={() => handleCreateUpdateFeedback(pro, false)}>
                                Đánh giá sản phẩm
                            </Button>}
                        </div>}

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
