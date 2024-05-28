import './purchase.scss'
import { Tabs } from 'antd';
import PendingOrder from '../../pages/pendingOrder/PendingOrder';
import ToShipOrder from '../../pages/toShipOrder/ToShipOrder';
import CompletedOrder from '../../pages/completedOrder/CompletedOrder';
import CancelledOrder from '../../pages/cancelledOrder/CancelledOrder';
import { useState } from 'react';



export default function Purchase() {
    


    const [activeKey, setActiveKey] = useState('1');
    const onChange = (key) => {
        setActiveKey(key);
      };
    console.log('123',activeKey);
    const dataOrderStatus = [
        {
            key: '1',
            children: <PendingOrder key={activeKey}/>,
            label: "Chờ xác nhận"
        },
        {
            key: '2',
            children: <ToShipOrder key={activeKey}/>,
            label: "Đang giao"
        },
        {
            key: '3',
            children: <CompletedOrder key={activeKey}/>,
            label: "Hoàn thành"
        },
        {
            key: '4',
            children: <CancelledOrder key={activeKey}/>,
            label: "Đã huỷ"
        },
    ]
    return (
      
        <Tabs
            defaultActiveKey="1"
            centered
            onChange={onChange}
            type="card"
            items={dataOrderStatus}
        />
       
    )
}
