import React, { useEffect, useState } from 'react'
import { request } from '../../requestMethod';
import OrderItem from '../../components/orderItem/OrderItem';

export default function ToShipOrder({key}) {
    const [orderItem,setOrderItem] = useState([])
    useEffect(() => {
        const getOrderItem = async () => {
            const res = await request.get(`/order/byCustomer?confirm=true`)
            //console.log(res.data);
            setOrderItem(res.data.order)
        }
        getOrderItem();
    }, [key])
    return (
        <div>
            {
                orderItem.map((order) => (
                    <OrderItem key={order.id} order={order} />
                ))
            }
        </div>
    )
}
