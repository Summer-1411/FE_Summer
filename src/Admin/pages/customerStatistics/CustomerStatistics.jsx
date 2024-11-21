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
import { useCustomerStatistics } from './service';
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
const generateDataChart = (labels, dataArray, field, colNameSuccess) => {
    return [
        {
            label: colNameSuccess,
            data: labels.map((item) => {
                let monthSale = dataArray?.find((dataItem) => dataItem.month === item)
                return monthSale ? Number(monthSale[field]) : 0
            }),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ]
}


export default function CustomerStatistics() {
    const [params, setParams] = useState({
        startDate: getCurrentYearMonth(),
        endDate: getCurrentYearMonth(true)
    })
    const { data } = useCustomerStatistics(params)


    console.log();
    const labels = useMemo(() => {
        if (params) {
            const { startDate, endDate } = params
            return listMonths(startDate, endDate)
        }
        return []
    })

    const dataChartRegister = {
        labels,
        datasets: generateDataChart(labels, data ?? [], 'countRegister', 'Số lượng khách đăng ký')
    };



    return <div>
        <Search setParams={setParams} />
        <Bar options={generateOptions('Thống kê số lượng khách đăng ký mới')} data={dataChartRegister} />
        <Divider />
    </div>;
}


