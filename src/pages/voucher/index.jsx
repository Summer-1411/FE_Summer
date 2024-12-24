import React from 'react';
import './styles/index.scss'
import VoucherItem from './components/VoucherItem';
import { useGetVoucherUser } from '../../services/voucher';
const Voucher = () => {
    const listVoucher = useGetVoucherUser();
    console.log('listVoucher', listVoucher);

    return (
        <div className="voucher-ai-container">
            <h1 className="voucher-ai-title">Danh Sách Mã Giảm Giá</h1>
            <div className="voucher-ai-discount-cards">
                {listVoucher.map((item) => <VoucherItem voucher={item} key={item.id} />)}
            </div>
        </div>
    )
}
export default Voucher;