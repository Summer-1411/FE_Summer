import './purchase.scss'
import { Tabs } from 'antd';
import PendingOrder from '../../pages/pendingOrder/PendingOrder';
import ToShipOrder from '../../pages/toShipOrder/ToShipOrder';
import CompletedOrder from '../../pages/completedOrder/CompletedOrder';
import CancelledOrder from '../../pages/cancelledOrder/CancelledOrder';
import { createContext, useContext, useState } from 'react';


export const HistoryOrderContext = createContext('Context bảng order');

export default function Purchase() {
    const [activeKey, setActiveKey] = useState('1');
    const onChange = (key) => {
        setActiveKey(key);
    };
    const value = {
        activeKey
    }
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

        <HistoryOrderContext.Provider value={value}>
            <Tabs
                defaultActiveKey="1"
                centered
                onChange={onChange}
                type="card"
                items={dataOrderStatus}
            />
        </HistoryOrderContext.Provider>
    )
}


export const useHistoryOrder = () => {
    return useContext(HistoryOrderContext)
}