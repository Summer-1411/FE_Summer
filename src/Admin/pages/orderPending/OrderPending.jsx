import React, { useEffect, useState } from 'react'
import OrderItem from '../../components/orderItem/OrderItem'
import BottomOrder from '../../components/bottomOrder/BottomOrder'
import { request } from '../../../requestMethod'

export default function OrderPending() {
    const [listOrderPending, setListOrderPending] = useState([])
    useEffect(() => {
        const getListOrderPending = async () => {
            const res = await request.get(`/order/byAdmin`)
            //console.log(res.data);
            setListOrderPending(res.data.order)
            //setBill(res.data.order)
        }
        getListOrderPending();
    }, [])
    const sumTotal = listOrderPending.reduce((value, cur) => value + cur.total_amount, 0);
    return (
        <div>
            {listOrderPending.map(order => (
                <OrderItem key={order.id} order={order} setListOrderPending={setListOrderPending} confirm cancel/>
            ))}
            <BottomOrder sumTotal ={sumTotal}/>
        </div>
    )
}
