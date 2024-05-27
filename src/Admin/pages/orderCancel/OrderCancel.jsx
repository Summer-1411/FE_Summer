import React, { useEffect, useState } from 'react'
import OrderItem from '../../components/orderItem/OrderItem'
import BottomOrder from '../../components/bottomOrder/BottomOrder'
import {  request } from '../../../requestMethod'

export default function OrderCancel() {
    const [listOrderCancel, setListOrderCancel] = useState([])
    useEffect(() => {
        const getListOrderCancel = async () => {
            const res = await request.get(`/order/byAdmin?cancel=true`)
            //console.log("Check", res.data);
            setListOrderCancel(res.data.order)
            //setBill(res.data.order)
        }
        getListOrderCancel();
    }, [])
    const sumTotal = listOrderCancel.reduce((value, cur) => value + cur.total_amount, 0);
    return (
        <div>
            {listOrderCancel.map(order => (
                <OrderItem key={order.id} order={order} setListOrderCancel={setListOrderCancel}/>
            ))}
            <BottomOrder sumTotal={sumTotal}/>
        </div>
    )
}
