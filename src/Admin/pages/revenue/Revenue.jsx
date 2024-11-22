import React, { useMemo, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Search from './search';
import { useSearchRevenue } from './service';
import { getCurrentYearMonth, listMonths } from '../../../utils/formatDate';
import { Divider } from 'antd';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const generateOptions = (title) => {
    return {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: title,
            },
        },
    };
}
const generateDataChart = (labels, dataArray, field, colNameCancel, colNameSuccess) => {
    return [
        {
            label: colNameCancel,
            data: labels.map((item) => {
                let monthSale = dataArray?.find((dataItem) => dataItem.month === item && dataItem.status === -1)
                return monthSale ? Number(monthSale[field]) : 0
            }),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: colNameSuccess,
            data: labels.map((item) => {
                let monthSale = dataArray?.find((dataItem) => dataItem.month === item && dataItem.status === 2)
                return monthSale ? Number(monthSale[field]) : 0
            }),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ]
}

export default function Revenue() {
    const [params, setParams] = useState({
        startDate: getCurrentYearMonth(),
        endDate: getCurrentYearMonth(true)
    })
    const { data } = useSearchRevenue(params)


    console.log();
    const labels = useMemo(() => {
        if (params) {
            const { startDate, endDate } = params
            return listMonths(startDate, endDate)
        }
        return []
    })

    const dataChartMoney = {
        labels,
        datasets: generateDataChart(labels, data?.dataSum ?? [], 'totalSales', 'Tổng tiền đơn hủy', 'Tổng tiền đơn thành công')
    };

    const dataCharCountSale = {
        labels,
        datasets: generateDataChart(labels, data?.dataCount ?? [], 'countOrder', 'Số đơn hủy', 'Số đơn thành công')
    };



    return <div>
        <Search setParams={setParams} />
        <Bar options={generateOptions('Thống kê doanh thu (VNĐ)')} data={dataChartMoney} />
        <Divider />
        <Bar options={generateOptions('Thống kê số đơn bán')} data={dataCharCountSale} />
    </div>;
}


