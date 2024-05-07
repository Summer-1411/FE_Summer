
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { request } from '../../requestMethod';
import PurchaseProduct from '../../components/purchaseProduct/PurchaseProduct';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOption } from '../../constants';

export default function PendingOrder() {
    const [bill, setBill] = useState([])
    const [billError, setBillError] = useState([])
    const currentUser = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        const getBill = async () => {
            const res = await request.get(`/order/byCustomer`)
            console.log(res.data);
            setBill(res.data.order)
            setBillError(res.data.orderError)
        }
        getBill();
    }, [])

    const cancelOrder = async (id) => {
        try {
            const res = await request.put(`/order/cancel_by_user/${currentUser.id}`,
                {
                    id: id
                })
            setBill((prev) => prev.filter(order => order.id !== id))
            toast.success(res.data.message, toastOption);
        } catch (error) {
            toast.error(error.response.data.message, toastOption);
        }

    }
    return (
        <div>
            {bill.map(item => (
                <PurchaseProduct key={item.id} bill={item} cancelOrder={cancelOrder} />
            ))}
            {billError.map(item => (
                <PurchaseProduct key={item.id} bill={item} cancelOrder={cancelOrder} />
            ))}
        </div>
    )
}
