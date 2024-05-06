import './login.scss'
import { Link } from 'react-router-dom';
import { Button, Card, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../requestMethod';
import { SUMMER_SHOP } from '../../constants';
import { loginFailure, loginSuccess } from '../../redux/userRedux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOption } from '../../constants';

export default function Login() {
    const dispatch = useDispatch()
    
    
    const onFinish = async (values) => {
        console.log('check values', values);
    
        if (!values.email || !values.password) {
            toast.error('Vui lòng nhập đủ thông tin !', toastOption);
            return
        }
        try {
            const res = await axios.post(`${BASE_URL}/auth/login`, values)
            console.log(res);
            localStorage.setItem(SUMMER_SHOP, res.data.accessToken)

            toast.success(res.data.message, toastOption);
            dispatch(loginSuccess(res.data.user))
        } catch (error) {
            toast.error(error.response.data.message, toastOption);
            dispatch(loginFailure())
        }
    }



    return (
        <div className="login">
            <div className="login-container">
                <div className="header">
                    <div className="heading">
                        Đăng nhập
                    </div>

                </div>
                <Form
                    layout={'vertical'}
                    name="login"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Bạn chưa nhập email!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Bạn chưa nhập mật khẩu!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                            Đăng nhập
                        </Button>
                        <div className="outer-link">
                            Bạn không có tài khoản? <Link className='link-item' to="/register">Đăng ký</Link>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
