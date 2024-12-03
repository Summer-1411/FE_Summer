import React from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOption } from '../../../constants';
import { numberWithCommas } from '../../../utils/formatMoney';
import { formatDate, parseDate } from '../../../utils/formatDate';
const VoucherItem = (props) => {
    const { voucher } = props
    const { isExpired } = voucher

    console.log('props', props);

    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code).then(() => {
            toast.info(`Mã giảm giá ${code} đã được sao chép vào clipboard!`, toastOption);
        }).catch(err => {
            console.error('Không thể sao chép mã:', err);
        });
    }
    return (
        <div className={`voucher-ai-card ${isExpired ? 'voucher-ai-expired' : ''}`}>
            <div className="voucher-ai-card-header">
                <h3 className="voucher-ai-discount-code">{voucher.code}</h3>
                <p className="voucher-ai-discount-value">{voucher.value}%</p>
            </div>
            <div className="voucher-ai-card-body">
                <p><strong>Giảm tối đa: {numberWithCommas(voucher.maxMoney)}</strong></p>
                <p><strong>Thời Gian:</strong> {parseDate(voucher.expiredTime)}</p>
                <p><strong>Đơn tối thiểu:</strong> {numberWithCommas(voucher.minOrderValue)}</p>
                <p><strong>Số Lượng Còn Lại:</strong> {voucher.quantity}/{voucher.initQuantity}</p>
                <div className="voucher-ai-progress-container">
                    <progress value={voucher.quantity} max={voucher.initQuantity}></progress>
                </div>
            </div>
            {!isExpired && <button className="voucher-ai-save-btn" onClick={() => copyToClipboard(voucher.code)}>Sao chép</button>}
            {isExpired && <div className="voucher-ai-expired-overlay">
                <span className="voucher-ai-expired-icon">×</span>
                <p className="voucher-ai-expired-text">Hết lượt sử dụng</p>
            </div>}
        </div>
    )
}

export default VoucherItem