import React, { useEffect, useState } from 'react'
import BottomOrder from '../../components/bottomOrder/BottomOrder'
import OrderItem from '../../components/orderItem/OrderItem'
import { request } from '../../../requestMethod'

export default function OrderSuccess() {
    const [listOrderSuccess, setListOrderSuccess] = useState([])
    useEffect(() => {
        const getListOrderSuccess = async () => {
            const res = await request.get(`/order/byAdmin?success=true`)
            //console.log(res.data);
            setListOrderSuccess(res.data.order)
            //setBill(res.data.order)
        }
        getListOrderSuccess();
    }, [])
    const sumTotal = listOrderSuccess.reduce((value, cur) => value + cur.total_amount, 0);
    return (
        <div>
            {listOrderSuccess.map(order => (
                <OrderItem key={order.id} setListOrderSuccess={setListOrderSuccess} order={order} />
            ))}
            
            <BottomOrder sumTotal={sumTotal}/>
        </div>
    )
}
