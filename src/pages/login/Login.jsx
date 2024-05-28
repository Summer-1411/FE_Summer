import './login.scss'
import { Link } from 'react-router-dom';
import { Button, Form, Input,Typography } from 'antd';

const { Text } = Typography;
import { useDispatch } from 'react-redux';
import { SUMMER_SHOP } from '../../constants';
import { loginFailure, loginSuccess } from '../../redux/userRedux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOption } from '../../constants';
import { useEffect } from 'react';
import { spinningLoaderRef } from '../Loading/hook';
import { request } from '../../requestMethod';

export default function Login() {
    const dispatch = useDispatch()
    useEffect(() => {
        spinningLoaderRef.current?.stop()
    }, [])

    const onFinish = async (values) => {

        if (!values.email || !values.password) {
            toast.error('Vui lòng nhập đủ thông tin !', toastOption);
            return
        }
        try {
            const res = await request.post(`/auth/login`, values)
            localStorage.setItem(SUMMER_SHOP, res.data.accessToken)

            console.log('resres', res);
            toast.success(res.data.message, toastOption);
            dispatch(loginSuccess(res.data.user))
        } catch (error) {
            console.log('err', error);
            toast.error(error.message, toastOption);
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
                        rules={[{ required: true, message: 'Bạn chưa nhập mật khẩu!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Đăng nhập
                        </Button>
                        <div className="outer-link">
                            Bạn không có tài khoản? <Link className='link-item' to="/register">Đăng ký</Link>
                        </div>
                        <Link to="/forgot-password">Quên mật khẩu ?</Link>

                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
