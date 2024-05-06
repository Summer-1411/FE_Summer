import './register.scss'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../requestMethod';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOption } from '../../constants';
import { Button, Form, Input } from 'antd';
export default function Register() {
    const navigate = useNavigate()
    
    const onFinish = async (values) => {
        if(!values.email || !values.username || !values.password){
            toast.error('Vui lòng nhập đủ thông tin !', toastOption);
            return
        }
        try {
            await axios.post(`${BASE_URL}/auth/register`, values)
            toast.success('Đăng ký thành công !', toastOption);
            navigate("/login")
        } catch (error) {
            toast.error(error.response.data.message, toastOption);
            console.log("ERROR REGISTER: ", error);
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
                <Form
                    layout={'vertical'}
                    name="login"
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
                        rules={[{ required: true, message: 'Bạn chưa nhập email !' }]}
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
                        <Button type="primary" htmlType="submit" style={{width: '100%'}}>
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
