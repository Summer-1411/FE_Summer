import React from 'react';
import { Button, Result } from 'antd';

const OrderResult = () => (
  <Result
    status="success"
    title="Bạn đã thanh toán thành công"
    subTitle="Đơn hàng của bạn đã được thanh toán, chúng tôi sẽ sớm hoàn thành quá trình giao hàng. Xin chân thành cảm ơn !"
    extra={[
      <Button type="primary" key="console">
        Trang chủ
      </Button>,
      <Button key="buy">Tiếp tục mua hàng</Button>,
    ]}
  />
);

export default OrderResult;