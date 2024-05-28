import "./orderItem.scss"
import ProductSmall from '../productSmall/ProductSmall'
import { formatDate } from "../../../utils/formatDate"
import { useEffect, useState } from "react"
import { numberWithCommas } from "../../../utils/formatMoney"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOption } from "../../../constants"
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { request } from "../../../requestMethod"
import { exportInvoice } from "../../../services/invoice"
export default function OrderItem(
    {
        order,
        success,
        confirm,
        cancel,
        undo,
        setListOrderPending,
        setListOrderConfirm,
        setListOrderRefuse
    }) {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const getProductByOrder = async () => {
            const res = await request.get(`/order_detail/${order.id}`)
            setProducts(res.data.products)
            //console.log(res.data);
        }
        getProductByOrder();
    }, [order.id])
    const [openCancellation, setOpenCancellation] = useState(false)
    const [reason, setReason] = useState("")
    //Thành công ở trang đã xác nhận
    //Khi xác nhận thì danh sách đã xác nhận thay đổi
    const handleSuccess = async () => {
        try {
            const res = await request.put(`/order/byAdmin?success=true`,
                {
                    id: order.id
                })
            toast.success(res.data.message, toastOption);
            if (res.data.success) {
                setListOrderConfirm(prev => prev.filter(item => item.id !== order.id))
            }
        } catch (error) {
            toast.error(error.response.data.message, toastOption);
            console.log(error);
        }
    }

    //Confirm và cancel ở trang chờ xử lý
    //Khi xác nhận thì danh sách chờ thay đổi


    const handleConfirm = async () => {
        let listProduct = products.map((item) => {
            return {
                ...item,
                category: `${item.size} - ${item.color}`,
                price: numberWithCommas(item.price),
                total: numberWithCommas(item.price * item.quantity)
            }
        })
        const data = {
            ...order,
            total_amount: numberWithCommas(order.total_amount),
            products: listProduct
        }
        try {
            await request.post('/invoices/send_mail', data);
            const res = await request.put(`/order/byAdmin`,
                {
                    id: order.id
                })
            if (res.data.success) {
                setListOrderPending(prev => prev.filter(item => item.id !== order.id))
            }
            toast.success(res.data.message, toastOption);
        } catch (error) {
            // toast.error(error.response.data.message, toastOption);
            console.log(error);
        }
    }


    const handleExportBill = async () => {
        let listProduct = products.map((item) => {
            return {
                ...item,
                category: `${item.size} - ${item.color}`,
                price: numberWithCommas(item.price),
                total: numberWithCommas(item.price * item.quantity)
            }
        })
        const data = {
            ...order,
            total_amount: numberWithCommas(order.total_amount),
            products: listProduct
        }
        exportInvoice(data)
    }
    //Khi huỷ thì danh sách chờ xwr ly thay đổi
    // const handleCancel = async () => {
    //     try {
    //         const res = await request.put(`/order/byAdmin?refuse=true`,
    //         {
    //             id: order.id
    //         },
    //         {
    //             headers: { Authorization: `Bearer ${localStorage[SUMMER_SHOP]}` }
    //         })
    //         if(res.data.success){
    //             setListOrderPending(prev => prev.filter(item => item.id !== order.id))
    //         }
    //         toast.success(res.data.message, toastOption);
    //     } catch (error) {
    //         toast.error(error.response.data.message, toastOption);
    //         console.log(error);
    //     }
    // }
    const handleOpenForm = () => {
        setOpenCancellation(true)
    }
    const handleCloseForm = () => {
        setOpenCancellation(false)
        setReason("")
    }
    const handleClickConfirm = async () => {
        if (!reason) {
            toast.warning("Vui lòng nhập lý do huỷ đơn hàng !", toastOption);
            return;
        } else {
            try {
                const res = await request.put(`/order/byAdmin?refuse=true`,
                    {
                        id: order.id,
                        reason: reason
                    })
                if (res.data.success) {
                    setListOrderPending(prev => prev.filter(item => item.id !== order.id))
                }
                toast.success(res.data.message, toastOption);
            } catch (error) {
                toast.error(error.response.data.message, toastOption);
                console.log(error);
            }

        }
    }

    //Undo ở trang đã huỷ bỏ
    //Khi hoàn tác thì danh sách đã huỷ thay đổi
    const handleUndo = async () => {
        try {
            const res = await request.put(`/order/byAdmin?undo=true`,
                {
                    id: order.id,
                    reason: null,
                })
            if (res.data.success) {
                //console.log("Undo", order);
                setListOrderRefuse(prev => prev.filter(item => item.id !== order.id))
            }
            toast.success(res.data.message, toastOption);
        } catch (error) {
            toast.error(error.response.data.message, toastOption);
            console.log(error);
        }
    }
    return (
        <div className="row-orderItem">
            <div className="col-item-2">
                <div className="username">{order.fullname}</div>
                <div className="email-user">{order.email}</div>
                <div className="email-user">{order.phone}</div>
                <div className="address-user">{order.shipping_address}</div>
                <div className="order-note">Ghi chú : {order.note}</div>
                {order.status === -2 && (<div className="order-reason">Lý do huỷ : {order.reason}</div>)}


            </div>
            <div className="col-item-2">
                {products.map(pro => (
                    <ProductSmall key={pro.id} pro={pro} />
                ))}
            </div>
            <div className="col-item">
                {order.id}
            </div>
            <div className="col-item-2">
                {formatDate(order.orderDate)}

            </div>
            <div className="col-item total-money">
                {numberWithCommas(order.total_amount)}
            </div>
            <div className="col-item col-action">
                {success &&
                    <div className="btn btn-success" onClick={handleSuccess}>
                        Thành công
                    </div>
                }
                {confirm &&
                    <div className="btn btn-confirm" onClick={handleConfirm}>
                        Xác nhận
                    </div>
                }
                {cancel &&
                    <div className="btn btn-cancel" onClick={handleOpenForm}>
                        Huỷ bỏ
                    </div>
                }
                {undo &&
                    <div className="btn btn-undo" onClick={handleUndo}>
                        Hoàn tác
                    </div>
                }
                <div className="btn btn-success" onClick={handleExportBill}>
                    Xem hóa đơn
                </div>
            </div>
            {openCancellation &&
                <div className="wrapper-cancel" onClick={handleCloseForm}>
                    <div className="cancel-container" onClick={(e) => { e.stopPropagation() }} >
                        <div className="cancel-heading">
                            Bạn có chắc chắn muốn huỷ đơn hàng này <SentimentVeryDissatisfiedIcon />
                        </div>
                        <div className="cancel-reason">
                            <div className="cancel-reason-label">Lý do huỷ đơn</div>
                            <input
                                type="text"
                                className="cancel-reason-input"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </div>
                        <div className="cancel-content">
                            <div className="btn btn-agree" onClick={handleClickConfirm}>
                                Xác nhận
                            </div>
                            <div className="btn btn-cancel" onClick={handleCloseForm}>
                                Huỷ bỏ
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
