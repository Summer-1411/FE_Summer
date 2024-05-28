import axios from "axios";
import { request } from "../requestMethod";

export const exportInvoice = async (order) => {
    try {
        const response = await request.post('/invoices/export_id', order, { responseType: 'blob' });

        // Tạo một URL từ dữ liệu blob
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Tạo một thẻ <a> ẩn để tải xuống tệp
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Hóa đơn ${order.id}.pdf`);

        // Thêm thẻ <a> vào DOM và kích hoạt sự kiện click để tải xuống tệp
        document.body.appendChild(link);
        link.click();

        // Xóa URL đã tạo sau khi tệp đã được tải xuống
        window.URL.revokeObjectURL(url);

        return response.data;

    } catch (error) {
        console.log('error', error);
        // throw new Error(error.response);
    }
};