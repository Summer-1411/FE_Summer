import React from 'react'
import "../../Grid.css"
import "./bottom.scss"
import { Footer } from 'antd/es/layout/layout'
import { Col, Row } from 'antd'
export default function Bottom() {
    return (
        <>
            <section id="contact" class="ai_css_style-section">
                <div class="ai_css_style-container">
                    <h3>Liên hệ</h3>

                    <h4>Cửa hàng: Summer Shop</h4>

                    <p>Mọi thắc mắc khi mua hàng, thanh toán, yêu cầu khi đổi hàng, hoàn hàng vui lòng liên hệ qua Zalo
                        <a href="https://zalo.me/0373984007"> 0373984007</a>.
                    </p>

                    <p>Email: <a href="mailto:[email của bạn]">levantung14112002@gmail.com</a></p>
                    <p>Phone: 0373984007</p>
                    <p>Địa chỉ: 2Q8M+PM3, Đ. Phạm Hùng, Keangnam, Nam Từ Liêm, Hà Nội</p>
                </div>
            </section>

            <Footer style={{ textAlign: 'center' }}>
                Summer Shop ©{new Date().getFullYear()} Created by Summer
            </Footer>

        </>
    )
}
