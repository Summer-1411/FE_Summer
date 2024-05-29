import './forgotPassword.scss'
import { Link, useNavigate } from 'react-router-dom';
import { request } from '../../requestMethod';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOption } from '../../constants';
import { Button, Form, Input, Modal, Statistic, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useForm } from 'antd/es/form/Form';


export default function ForgotPassword() {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = useForm();
    const [formForgotPassword] = useForm();
    const showModal = () => {
        setIsModalOpen(true);
    };



    const handleOk = async (values) => {
        
        const valueRegister = formForgotPassword.getFieldValue()
        const value = { ...values, ...valueRegister }
        try {
            await request.post(`/auth/forgot-password`, value)
            handleCancel()
            toast.success('Bạn đã đổi mật khẩu thành công !', toastOption);
            navigate("/login")
        } catch (error) {
            toast.error(error.message, toastOption);
            console.log("ERROR REGISTER: ", error);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const onFinish = async (values) => {
        showModal()
        handleSendOTP()

    }
    
    const handleSendOTP = async () => {
        const values = formForgotPassword.getFieldValue()
        console.log('values', values);
        console.log('!values.username',!values.username);
        
        if (!values.email || !values.password || !values.password2) {
            toast.error('Vui lòng nhập đủ thông tin !', toastOption);
            return
        }
        try {
            await request.post(`/auth/send_otp_forgot`, values)
        } catch (error) {
            toast.error(error.message, toastOption);
            console.log("ERROR OTP: ", error);
        }
    }


    return (
        <div className="register">
            <div className="register-container">
                <div className="header">
                    <div className="heading">
                        Quên mật khẩu
                    </div>

                </div>
                <Modal
                    title="Vui lòng nhập mã OTP được gửi về Email để đăng ký dịch vụ HoangTuan Shop"
                    open={isModalOpen}
                    onCancel={handleCancel}
                    footer={[
                        <></>
                    ]}>
                    <Form
                        form={form}
                        name="formOTP"
                        layout={'vertical'}
                        onFinish={handleOk}
                    >
                        <Form.Item

                            name="otp"
                            rules={[{ required: true, message: 'Không được trống mã OTP !' }]}
                            label="Mã OTP"
                            style={{ textAlign: 'center' }}
                        >
                            <Input style={{ width: '100%' }} />
                        </Form.Item>


                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                            <Button onClick={handleSendOTP}>
                                Gửi lại mã OTP
                            </Button>
                            <Button key="back" onClick={handleCancel}>
                                Bỏ qua
                            </Button>
                            <Button type="primary" htmlType='submit'>
                                Xác nhận
                            </Button>
                        </div>



                    </Form>
                </Modal>
                <Form
                    layout={'vertical'}
                    name="forgotPassword"
                    form={formForgotPassword}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'Định dạng email không hợp lệ !',
                            },
                            {
                                required: true,
                                message: 'Bạn chưa nhập email!',
                            },

                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa nhập mật khẩu !'
                            },
                            {
                                min: 6,
                                message: 'Mật khẩu phải từ 6 ký tự trở lên !',
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Xác nhận mật khẩu"
                        name="password2"
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa xác nhận mật khẩu !'
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu không trùng khớp !'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType='submit' style={{ width: '100%' }}>
                            Đặt lại mật khẩu
                        </Button>
                        <div className="outer-link">
                            Bạn đã có tài khoản? <Link className='link-item' to="/login">Đăng nhập</Link>
                        </div>
                    </Form.Item>
                </Form>

            </div>
        </div>
    )
}
