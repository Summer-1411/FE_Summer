import React from 'react'
import "../../Grid.css"
import "./bottom.scss"
import { Footer } from 'antd/es/layout/layout'
import { Col, Row } from 'antd'
export default function Bottom() {
    return (
        <>
            <div className='bottom'>
                <div className='bottom-top'>
                    <div className='row'>
                        <div className='col l-4 c-12 m-6'>
                            <div className="item">
                                <div className="heading">
                                    Summer
                                </div>
                                <div className="item-content">
                                    <div className="item-content-row">
                                        <div className="row-title">
                                            Địa chỉ :
                                        </div>
                                        <div className="row-content">
                                            2Q8M+PM3, Đ. Phạm Hùng, Keangnam, Nam Từ Liêm, Hà Nội
                                        </div>
                                    </div>
                                    <div className="item-content-row">
                                        <div className="row-title">
                                            Fanpage :
                                        </div>
                                        <div className="row-content">
                                            Fb.com/Summer
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col l-4 c-12 m-6'>
                            <div className="item">
                                <div className="heading">
                                    Hotline:
                                    <div className="heading-red">
                                        0373984007
                                    </div>
                                </div>
                                <div className="item-content">
                                    <div className="item-content-row">
                                        <div className="row-title row-title-center">
                                            Gọi mua hàng :
                                        </div>
                                        <div className="row-content">
                                            Phím số 1 (8h00 - 22h00)
                                        </div>
                                    </div>
                                    <div className="item-content-row">
                                        <div className="row-title row-title-center">
                                            Hỗ trợ kỹ thuật :
                                        </div>
                                        <div className="row-content">
                                            Phím số 2 (8h00 - 22h00)
                                        </div>
                                    </div>
                                    <div className="item-content-row">
                                        <div className="row-title row-title-center">
                                            Hỗ trợ phụ kiện :
                                        </div>
                                        <div className="row-content">
                                            Phím số 3 (8h00 - 22h00)
                                        </div>
                                    </div>
                                    <div className="item-content-row">
                                        <div className="row-title row-title-center">
                                            Tư vấn trả góp :
                                        </div>
                                        <div className="row-content">
                                            Phím số 4 (8h00 - 22h00)
                                        </div>
                                    </div>
                                    <div className="item-content-row">
                                        <div className="row-title row-title-center">
                                            Trung tâm bảo hành :
                                        </div>
                                        <div className="row-content">
                                            0334357515 (8h00 - 22h00)
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col l-4 c-12 m-6'>
                            <div className="item">
                                <div className="heading">
                                    Thông báo
                                </div>
                                <div className="item-content">
                                    <div className="item-content-row">
                                        <div className="row-content">
                                            Tuyển dụng
                                        </div>
                                    </div>
                                    <div className="item-content-row">
                                        <div className="row-content">
                                            Gói bảo hành
                                        </div>
                                    </div>
                                    <div className="item-content-row">
                                        <div className="row-content">
                                            Chính sách đổi trả
                                        </div>
                                    </div>
                                    <div className="item-content-row">
                                        <div className="row-content">
                                            Mọi thắc mắc khi mua hàng, thanh toán, yêu cầu khi đổi hàng, hoàn hàng vui lòng liên hệ qua Zalo <a href="https://zalo.me/0373984007">0373984007</a>.
                                        </div>
                                    </div>
                                    <div className="item-content-row">
                                        <div className="row-content">
                                            Chúc các bạn một ngày tốt lành!
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer style={{ textAlign: 'center' }}>
                Summer Shop ©{new Date().getFullYear()} Created by Summer
            </Footer>

        </>
    )
}
