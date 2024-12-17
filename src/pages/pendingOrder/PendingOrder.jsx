
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { request } from '../../requestMethod';
import PurchaseProduct from '../../components/purchaseProduct/PurchaseProduct';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOption } from '../../constants';
import { useHistoryOrder } from '../../components/purchase/Purchase';

export default function PendingOrder() {
    const { activeKey: key } = useHistoryOrder()
    const [bill, setBill] = useState([])
    const currentUser = useSelector((state) => state.user.currentUser);



    useEffect(() => {
        const getBill = async () => {
            const res = await request.get(`/order/byCustomer`)
            console.log(res.data);
            setBill([...res.data.order, ...res.data.orderError])
        }
        key === '1' && getBill();
    }, [key])


    const cancelOrder = async ({ id, reason }) => {
        try {
            const res = await request.put(`/order/cancel_by_user/${currentUser.id}`,
                {
                    id: id,
                    reason: reason
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
        </div>
    )
}
