import { useEffect, useState } from 'react';
import './orderItem.scss'
import { IMAGE_LINK, request } from '../../requestMethod';
import { numberWithCommas } from '../../utils/formatMoney';
import { formatDate } from '../../utils/formatDate';
import { Button, Typography } from 'antd';
import { useFeedback } from '../../pages/completedOrder/FeedbackContext';
import { useGetFeedbackUser } from '../../services/feedback';
import { Link } from 'react-router-dom';
import { useGetListProductInOrderByOrderId } from '../../services/order';
export default function OrderItem({ order, complete }) {
    const { open, setOpen, setFeedbackInfor, formCreateUpdate, setPointRate } = useFeedback()

    const { products } = useGetListProductInOrderByOrderId(order?.id)
    const { feedbackList } = useGetFeedbackUser()

    console.log('products', products);

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
        console.log('feedbackList', feedbackList);
        console.log('pro', pro);


        return feedbackList.find((feedbackItem) => feedbackItem.id_product === pro.id_pro && feedbackItem.id_order === order.id)
    }
    const displayedFeedback = new Set();
    return (
        <div className='orderItem-wrapper'>
            {products.map(pro => {
                // Kiểm tra nếu nút đánh giá cho sản phẩm với id_pro này đã được hiển thị chưa
                const isFeedbackValid = feedbackValid(feedbackList, pro);
                const isFeedbackDisplayed = displayedFeedback.has(pro.id_pro);

                // Nếu chưa hiển thị nút đánh giá cho id_pro này, đánh dấu là đã hiển thị
                if (!isFeedbackDisplayed) {
                    displayedFeedback.add(pro.id_pro);
                }
                return (
                    <div key={pro.id} className="orderItem-content">
                        <div className="orderItem-content-left">
                            <img src={`${pro.img}`} alt="" className="img-product" />
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
                            {!isFeedbackDisplayed && complete && (
                                <div style={{ textAlign: 'right', marginTop: 20 }}>
                                    {isFeedbackValid ? (
                                        <Button ghost type="primary" onClick={() => handleCreateUpdateFeedback(pro, true)}>
                                            Sửa đánh giá
                                        </Button>
                                    ) : (
                                        <Button type="primary" danger onClick={() => handleCreateUpdateFeedback(pro, false)}>
                                            Đánh giá sản phẩm
                                        </Button>
                                    )}
                                </div>
                            )}

                        </div>
                    </div>

                )
            })}
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
                    {order.voucherValue ? <div className="sum-price-checkout">

                        <div className="title-checkout">
                            Giảm giá :
                        </div>
                        <div className="price-order">
                            <span>   - {numberWithCommas(order.voucherValue)}</span>
                        </div>
                    </div> : <></>}
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
            {(order.status === -1) && (<div className="purchaseProduct-bottom">
                <div style={{ color: 'red' }}>
                    Bạn đã hủy đơn vì lý do : {order.reason} !
                </div>
            </div>)}
        </div>
    )
}
