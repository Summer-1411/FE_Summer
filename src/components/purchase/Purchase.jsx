import './purchase.scss'
import { Tabs } from 'antd';
import PendingOrder from '../../pages/pendingOrder/PendingOrder';
import ToShipOrder from '../../pages/toShipOrder/ToShipOrder';
import CompletedOrder from '../../pages/completedOrder/CompletedOrder';
import CancelledOrder from '../../pages/cancelledOrder/CancelledOrder';



export default function Purchase() {
    const dataOrderStatus = [
        {
            key: '1',
            children: <PendingOrder />,
            label: "Chờ xác nhận"
        },
        {
            key: '2',
            children: <ToShipOrder />,
            label: "Đang giao"
        },
        {
            key: '3',
            children: <CompletedOrder />,
            label: "Hoàn thành"
        },
        {
            key: '4',
            children: <CancelledOrder />,
            label: "Đã huỷ"
        },
    ]
    return (
      
        <Tabs
            defaultActiveKey="1"
            centered
            items={dataOrderStatus}
        />
       
    )
}
