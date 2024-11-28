import "./orderItem.scss"
import ProductSmall from '../productSmall/ProductSmall'
import { formatDate } from "../../../utils/formatDate"
import { useEffect, useMemo, useState } from "react"
import { numberWithCommas } from "../../../utils/formatMoney"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, Input, Modal, Statistic } from 'antd';
import { toastOption } from "../../../constants"
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { request } from "../../../requestMethod"
import { exportInvoice } from "../../../services/invoice"
import { useForm } from 'antd/es/form/Form';

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
    const [form] = useForm();
    const listProduct = useMemo(() => {
        return products.map((item) => {
            return {
                ...item,
                category: `${item.size} - ${item.color}`,
                price: numberWithCommas(item.price),
                total: numberWithCommas(item.price * item.quantity)
            }
        })
    }, [products])
    //Thành công ở trang đã xác nhận
    //Khi xác nhận thì danh sách đã xác nhận thay đổi
    const handleSuccess = async () => {
        try {
            const res = await request.put(`/order/byAdmin?success=true`,
                {
                    ...order,
                    id: order.id,
                    userId: order.id_user,
                    email: order.email,
                    fullName: order.fullname,
                    orderDate: formatDate(order.orderDate),
                    voucherValue: numberWithCommas(order.voucherValue),
                    total_amount: numberWithCommas(order.total_amount),
                    products: listProduct
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
        const data = {
            ...order,
            total_amount: numberWithCommas(order.total_amount),
            products: listProduct
        }
        try {
            console.log('check', {
                ...order,
                id: order.id,
                userId: order.id_user,
                email: order.email,
                fullName: order.fullname,
                orderDate: formatDate(order.orderDate),
                voucherValue: numberWithCommas(order.voucherValue),
                total_amount: numberWithCommas(order.total_amount),
                products: listProduct
            });

            // await request.post('/invoices/send_mail', data);
            // const res = await request.put(`/order/byAdmin`,
            //     {
            //         ...order,
            //         id: order.id,
            //         userId: order.id_user,
            //         email: order.email,
            //         fullName: order.fullname,
            //         orderDate: formatDate(order.orderDate),
            //         voucherValue: numberWithCommas(order.voucherValue),
            //         total_amount: numberWithCommas(order.total_amount),
            //         products: listProduct
            //     })
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
        const data = {
            ...order,
            orderDate: formatDate(order.orderDate),
            voucherValue: numberWithCommas(order.voucherValue),
            total_amount: numberWithCommas(order.total_amount),
            products: listProduct
        }
        exportInvoice(data)
    }
    const handleOpenForm = () => {
        setOpenCancellation(true)
    }
    const handleCloseForm = () => {
        setOpenCancellation(false)
        setReason("")
    }
    const handleClickConfirm = async (values) => {
        try {
            const res = await request.put(`/order/byAdmin?refuse=true`,
                {
                    ...order,
                    id: order.id,
                    reason: values.reason,
                    email: order.email,
                    userId: order.id_user,
                    fullName: order.fullname,
                    orderDate: formatDate(order.orderDate),
                    voucherValue: numberWithCommas(order.voucherValue),
                    total_amount: numberWithCommas(order.total_amount),
                    products: listProduct
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

    //Undo ở trang đã huỷ bỏ
    //Khi hoàn tác thì danh sách đã huỷ thay đổi
    const handleUndo = async () => {
        try {
            const res = await request.put(`/order/byAdmin?undo=true`,
                {
                    ...order,
                    id: order.id,
                    reason: null,
                    userId: order.id_user,
                    email: order.email,
                    fullName: order.fullname,
                    orderDate: formatDate(order.orderDate),
                    voucherValue: numberWithCommas(order.voucherValue),
                    total_amount: numberWithCommas(order.total_amount),
                    products: listProduct
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
            <Modal
                title="Bạn có chắc chắn muốn huỷ đơn hàng này ?"
                open={openCancellation}
                onCancel={handleCloseForm}
                footer={[
                    <></>
                ]}>
                <Form
                    form={form}
                    name="formCancel"
                    layout={'vertical'}
                    onFinish={handleClickConfirm}
                >
                    <Form.Item

                        name="reason"
                        rules={[{ required: true, message: 'Không được trống lý do huỷ đơn !' }]}
                        label="Lý do huỷ đơn"
                    >
                        <Input.TextArea style={{ width: '100%' }} />
                    </Form.Item>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                        <Button key="back" onClick={handleCloseForm}>
                            Hủy bỏ
                        </Button>
                        <Button type="primary" danger htmlType='submit' >
                            Xác nhận
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}
