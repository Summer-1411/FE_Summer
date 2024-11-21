import { useEffect, useState } from 'react'
import { request } from '../../requestMethod'
import OrderItem from '../../components/orderItem/OrderItem'
import { useHistoryOrder } from '../../components/purchase/Purchase'

export default function CancelledOrder() {
    const { activeKey: key } = useHistoryOrder()
    const [orderItem, setOrderItem] = useState([])
    useEffect(() => {
        const getOrderItem = async () => {
            const res = await request.get("/order/byCustomer?cancel=true")
            //console.log(res.data);
            setOrderItem(res.data.order)
        }
        key === '4' && getOrderItem();
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
