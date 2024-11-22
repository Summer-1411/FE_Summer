import { useEffect, useState } from 'react'
import { request } from '../../requestMethod'
import OrderItem from '../../components/orderItem/OrderItem'
import Feedback from '../../components/orderItem/Feedback'
import { Divider } from 'antd'
import { FeedbackProvider } from './FeedbackContext'
import { useHistoryOrder } from '../../components/purchase/Purchase'

export default function CompletedOrder() {
    const { activeKey: key } = useHistoryOrder()
    const [orderItem, setOrderItem] = useState([])

    useEffect(() => {
        const getOrderItem = async () => {
            const res = await request.get("/order/byCustomer?success=true")
            setOrderItem(res?.data.order)
        }
        key === '3' && getOrderItem();
    }, [key])


    return (
        <FeedbackProvider>
            <Divider />
            {
                orderItem.map((order) => (
                    <OrderItem key={order.id} order={order} complete={true} />
                ))
            }
            <Feedback />
        </FeedbackProvider>
    )
}
