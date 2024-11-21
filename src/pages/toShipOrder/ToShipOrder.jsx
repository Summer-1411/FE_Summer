import { useEffect, useState } from 'react'
import { request } from '../../requestMethod';
import OrderItem from '../../components/orderItem/OrderItem';
import { useHistoryOrder } from '../../components/purchase/Purchase';

export default function ToShipOrder() {
    const { activeKey: key } = useHistoryOrder()
    const [orderItem, setOrderItem] = useState([])
    useEffect(() => {
        const getOrderItem = async () => {
            const res = await request.get(`/order/byCustomer?confirm=true`)
            setOrderItem(res.data.order)
        }
        key === '2' && getOrderItem();
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
