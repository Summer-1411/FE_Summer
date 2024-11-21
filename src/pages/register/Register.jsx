import './register.scss'
import { Link, useNavigate } from 'react-router-dom';
import { request } from '../../requestMethod';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOption } from '../../constants';
import { Button, Form, Input, Modal, Statistic } from 'antd';
import { useEffect, useState } from 'react';
import { useForm } from 'antd/es/form/Form';


export default function Register() {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = useForm();
    const [formRegister] = useForm();
    const showModal = () => {
        setIsModalOpen(true);
    };



    const handleOk = async (values) => {
        const valueRegister = formRegister.getFieldValue()
        const value = { ...values, ...valueRegister }
        try {
            await request.post(`/auth/register_otp`, value)
            handleCancel()
            toast.success('Bạn đã đăng ký thành công !', toastOption);
            navigate("/login")

        } catch (error) {
            toast.error(error.message, toastOption);
            console.log("ERROR REGISTER: ", error);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };


    const onFinish = async (values) => {
        showModal()
        handleSendOTP()

    }
    const handleSendOTP = async () => {
        const values = formRegister.getFieldValue()
        if (!values.email || !values.username || !values.password) {
            toast.error('Vui lòng nhập đủ thông tin !', toastOption);
            return
        }
        try {
            await request.post(`/auth/send_otp`, values)
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
                        Đăng ký
                    </div>

                </div>
                <Modal
                    title="Vui lòng nhập mã OTP được gửi về Email để đăng ký dịch vụ Summer Shop"
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
                            <Button type="primary" htmlType='submit' >
                                Xác nhận
                            </Button>
                        </div>



                    </Form>
                </Modal>
                <Form
                    layout={'vertical'}
                    name="login"
                    form={formRegister}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Họ tên"
                        name="username"
                        rules={[{ required: true, message: 'Bạn chưa nhập họ tên !' }]}
                    >
                        <Input />
                    </Form.Item>
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
                    <Form.Item>
                        <Button type="primary" htmlType='submit' style={{ width: '100%' }}>
                            Đăng ký
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
