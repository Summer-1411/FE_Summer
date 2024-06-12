import { useEffect, useState } from 'react';
import './purchaseProduct.scss'
import { IMAGE_LINK, request } from '../../requestMethod';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { numberWithCommas } from '../../utils/formatMoney';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
export default function PurchaseProduct({ bill, cancelOrder }) {

    //console.log("item: ", bill);
    const [opnenCancellation, setOpnenCancellation] = useState(false)
    const [products, setProducts] = useState([])
    useEffect(() => {
        const getProductByBill = async () => {
            const res = await request.get(`/order_detail/${bill.id}`)
            setProducts(res.data.products)
            console.log(res.data);
        }
        getProductByBill();
    }, [bill.id])

    const handleCalcellation = async () => {
        await cancelOrder(bill.id)
        setOpnenCancellation(false)
    }
    const dateString = bill.orderDate;
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString();

    return (
        <div className='purchaseProduct-wrapper'>

            {products.map(pro => (
                <div key={pro.id} className="purchaseProduct-content">
                    <div className="purchaseProduct-content-left">
                        <img src={`${IMAGE_LINK}/${pro.img}`} alt="" className="img-product" />
                        <Link to={`/product/${pro.id_pro}`} className="infor-product">
                            <div className="name-product">{pro.name}</div>
                            <div className="filter-product">
                                Phân loại: {pro.size}, {pro.color}
                            </div>
                            <div className="quantity-product">
                                x{pro.quantity}
                            </div>
                        </Link>
                    </div>
                    <div className="purchaseProduct-content-right">
                        <div className="price-product">
                            {numberWithCommas(pro.price)}
                        </div>
                    </div>
                </div>
            ))}
            <div className="checkout-product">
                <div className="checkout-product-left">
                    <div className="name-customer">
                        {bill.fullname}
                    </div>
                    <div className="phone-number">
                        {bill.phone}
                    </div>
                    <div className="delivery-address">
                        {bill.shipping_address}
                    </div>
                    <div className="date-order">
                        <div className="title">Ngày đặt :</div>
                        <div className="date-value">{formattedDate}</div>
                    </div>
                    <div className="date-order">
                        <div className="title">Ghi chú :</div>
                        <div className="date-value">{bill.note}</div>
                    </div>
                    <div className="date-order">
                        <div className="title">Hình thức thanh toán :</div>
                        <div className="date-value" style={{ fontWeight: 'bold' }}>{bill.payment_method === '1' ? "Thanh toán khi nhận hàng" : bill.payment_method === '2' ? 'Đã thanh toán' : ''}</div>
                    </div>
                </div>
                <div className="checkout-product-right">
                    <div className="sum-price-checkout">

                        <div className="title-checkout">
                            Giảm giá :
                        </div>
                        <div className="price-order">
                            {bill.voucherValue ? <span>   - {numberWithCommas(bill.voucherValue)}</span> : ''}
                        </div>
                    </div>
                    <div className="sum-price-checkout">
                        <div className="title-checkout">
                            Thành tiền :
                        </div>
                        <div className="price-order">
                            {numberWithCommas(bill.total_amount)}
                        </div>
                    </div>
                </div>
            </div>
            {bill.status === 0 && (<div className="purchaseProduct-bottom">
                <div className="btn-delete" onClick={() => setOpnenCancellation(true)}>
                    Huỷ đơn
                </div>
            </div>)}
            {bill.status === -2 && (<div className="purchaseProduct-bottom">
                <div className="order-reason">
                    Đơn hàng của bạn đã bị huỷ vì lý do {bill.reason}, xin vui lòng thử lại !
                </div>
            </div>)}
            {/* {opnenCancellation &&
                <div className="wrapper-cancel" onClick={() => setOpnenCancellation(false)}>
                    <div className="cancel-container" onClick={(e) => { e.stopPropagation() }} >
                        <div className="cancel-heading">
                            Bạn có chắc chắn muốn huỷ đơn hàng này <SentimentVeryDissatisfiedIcon />
                        </div>
                        <div className="cancel-content">
                            <div className="btn btn-agree" onClick={handleCalcellation}>
                                Đồng ý
                            </div>
                            <div className="btn btn-cancel" onClick={}>
                                Huỷ bỏ
                            </div>
                        </div>
                    </div>
                </div>
            } */}
            <Modal
                title="Hủy đơn hàng"
                open={opnenCancellation}
                onOk={handleCalcellation}
                onCancel={() => setOpnenCancellation(false)}
            >
                <p>Bạn có chắc chắn muốn huỷ đơn hàng này ?</p>
            </Modal>
        </div>
    )
}
