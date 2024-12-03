import React from 'react';
import './styles/index.scss'
import VoucherItem from './components/VoucherItem';
import { useGetVoucherUser } from '../../services/voucher';
const Voucher = () => {
    const listVoucher = useGetVoucherUser();
    console.log('listVoucher', listVoucher);

    return (
        <div class="voucher-ai-container">
            <h1 class="voucher-ai-title">Danh Sách Mã Giảm Giá</h1>
            <div class="voucher-ai-discount-cards">
                {listVoucher.map((item) => <VoucherItem voucher={item} key={item.id} />)}
            </div>
        </div>
    )
}
export default Voucher;