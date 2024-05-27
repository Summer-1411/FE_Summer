import React, { useEffect, useState } from 'react'
import {  request } from '../../requestMethod'
import OrderItem from '../../components/orderItem/OrderItem'
import Feedback from '../../components/orderItem/Feedback'
import { Divider } from 'antd'
import { FeedbackProvider, useFeedback } from './FeedbackContext'

export default function CompletedOrder() {
    const [orderItem,setOrderItem] = useState([])
    
    useEffect(() => {
        const getOrderItem = async () => {
            const res = await request.get("/order/byCustomer?success=true")
            //console.log(res.data);
            setOrderItem(res.data.order)
        }
        getOrderItem();
    }, [])
    

    return (
        <FeedbackProvider>
            <Divider />
            {
                orderItem.map((order) => (
                    <OrderItem key={order.id} order={order} complete={true}/>
                ))
            }
            <Feedback/>
        </FeedbackProvider>
    )
}
