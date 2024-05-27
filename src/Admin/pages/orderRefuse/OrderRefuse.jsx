import React, { useEffect, useState } from 'react'
import BottomOrder from '../../components/bottomOrder/BottomOrder'
import OrderItem from '../../components/orderItem/OrderItem'
import { request } from '../../../requestMethod'

export default function OrderRefuse() {
    const [listOrderRefuse, setListOrderRefuse] = useState([])
    useEffect(() => {
        const getListOrderRefuse = async () => {
            const res = await request.get(`/order/byAdmin?refuse=true`)
            //console.log(res.data);
            setListOrderRefuse(res.data.order)
            //setBill(res.data.order)
        }
        getListOrderRefuse();
    }, [])
    const sumTotal = listOrderRefuse.reduce((value, cur) => value + cur.total_amount, 0);
    return (
        <div>
            {listOrderRefuse.map(order => (
                <OrderItem key={order.id} order={order} setListOrderRefuse={setListOrderRefuse} undo/>
            ))}
            <BottomOrder sumTotal={sumTotal}/>
        </div>
    )
}
