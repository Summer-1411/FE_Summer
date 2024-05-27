import React, { useEffect, useState } from 'react'
import OrderItem from '../../components/orderItem/OrderItem'
import BottomOrder from '../../components/bottomOrder/BottomOrder'
import { request } from '../../../requestMethod'

export default function OrderConfirn() {
    const [listOrderConfirm, setListOrderConfirm] = useState([])
    useEffect(() => {
        const getListOrderConfirm = async () => {
            const res = await request.get(`/order/byAdmin?confirm=true`)
            //console.log(res.data);
            setListOrderConfirm(res.data.order)
            //setBill(res.data.order)
        }
        getListOrderConfirm();
    }, [])
    const sumTotal = listOrderConfirm.reduce((value, cur) => value + cur.total_amount, 0);
    return (
        <div>
            {listOrderConfirm.map(order => (
                <OrderItem key={order.id} order={order} setListOrderConfirm={setListOrderConfirm} success/>
            ))}
            <BottomOrder sumTotal={sumTotal}/>
        </div>
    )
}
