import './register.scss'
import { Link, useNavigate } from 'react-router-dom';
import { request } from '../../requestMethod';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOption } from '../../constants';
import { Button, Form, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { spinningLoaderRef } from '../Loading/hook';
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
        console.log('form', form.getFieldValue());
        console.log('check',await form.validateFields())
        // setIsModalOpen(false);
    }; 

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        spinningLoaderRef.current?.stop()
    }, [])

    const onFinish = async (values) => {
        console.log('values register', values);
        showModal()
        // if (!values.email || !values.username || !values.password) {
        //     toast.error('Vui lòng nhập đủ thông tin !', toastOption);
        //     return
        // }
        // try {
        //     await request.post(`/auth/register`, values)
        //     toast.success('Đăng ký thành công !', toastOption);
        //     navigate("/login")
        // } catch (error) {
        //     toast.error(error.response.data.message, toastOption);
        //     console.log("ERROR REGISTER: ", error);
        // }
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
                    title="Vui lòng nhập mã OTP được gửi về Email để đăng ký dịch vụ HoangTuan Shop"
                    open={isModalOpen}
                    onCancel={handleCancel}
                    footer={[
                        <></>
                    ]}>
                    <Form
                    form={form}
                        name="formOTP"
                        onFinish={handleOk}
                    >
                        <Form.Item
                            hasFeedback
                            name="otp"
                            rules={[{ required: true, message: 'Không được trống mã OTP !' }]}
                            validateStatus="success"
                            style={{textAlign: 'center'}}
                        >
                            <Input.OTP  />
                        </Form.Item>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                            <Button key="back" onClick={handleCancel}>
                                Bỏ qua
                            </Button>
                            <Button type="primary" htmlType='submit' onClick={handleOk}>
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
                            // {
                            //     type: 'email',
                            //     message: 'Định dạng email không hợp lệ !',
                            // },
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
                        rules={[{ required: true, message: 'Bạn chưa nhập mật khẩu !' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType='submit' onClick={onFinish} style={{ width: '100%' }}>
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
