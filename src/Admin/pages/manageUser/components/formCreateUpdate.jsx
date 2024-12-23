
import { Card, Col, Descriptions, Form, Image, Row, Statistic, Typography } from 'antd'
import CustomModalForm from '../../../../ui/ModelForm'
import { useManageUser } from '../hooks/ManageUserContext';
import { useEffect, useMemo, useState } from 'react';
import { numberWithCommas } from '../../../../utils/formatMoney';
import { IMAGE_DEFAULT, request } from '../../../../requestMethod';
import { formatDate } from '../../../../utils/formatDate';

const { Title } = Typography;

const FormCreateUpdate = () => {
    const {
        statusForm, setStatusForm
    } = useManageUser()
    const { initData: user } = statusForm
    const [formCreate] = Form.useForm()
    const onCancel = () => {
        setStatusForm({
            open: false,
            action: '',
            initData: null
        })
    }

    const [infor, setInfor] = useState({
        countOrder: 0,
        money: 0,
        countOrderCancel: 0,
        moneyOrderCancel: 0,
        countProductBought: 0,
    })
    useEffect(() => {
        const getUserDetail = async () => {
            try {
                const result = await request.get(`/stat/stat-byUser/${user?.id}`)
                setInfor({
                    countOrder: result.data.order?.numberOrder,
                    money: result.data.order?.money,
                    countOrderCancel: result.data.orderCancel?.numberOrderCancel,
                    moneyOrderCancel: result.data.orderCancel?.money,
                    countProductBought: result.data.product?.total_quantity
                })
            } catch (error) {
                console.log(error);
            }
        }
        user && getUserDetail()
    }, [user])
    const { countOrder, money, countOrderCancel, moneyOrderCancel, countProductBought } = infor
    const items = useMemo(() => {
        return [
            {
                key: '1',
                label: '',
                children: <>
                    <Image
                        width={100}
                        // src={record.avatar}
                        src={user?.avatar ? `${user?.avatar}` : `${IMAGE_DEFAULT}`}
                    />
                    <Title level={3} style={{ marginLeft: 10 }}>{user?.username}</Title>
                </>,
            },
            {
                key: '2',
                label: 'Thông tin liên hệ',
                children: user?.email ?? '',
            },
            {
                key: '3',
                label: 'Giới tính',
                children: user?.gender === 1 ? "Nam" : user?.gender === 2 ? "Nữ" : "Khác",
            },
            {
                key: '4',
                label: 'Ngày sinh',
                children: user?.birthday && formatDate(user?.birthday),
            },
            {
                key: '5',
                label: 'Ngày đăng ký',
                children: user?.createAt && formatDate(user?.createAt),
            },
        ];
    }, [user])


    return (
        <CustomModalForm
            width={1000}
            open={statusForm.open}
            title={"Chi tiết khách hàng"}
            form={formCreate}
            submitter={{
                render: (_, doms) => {
                    return (
                        <div>
                        </div>
                    )
                },
            }}
            onCancel={onCancel}
        >
            <Row gutter={16}>
                <Col xs={24} sm={24} md={12} xl={12}>
                    <Card>
                        <Descriptions column={1} items={items} />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} xl={12}>
                    <Card>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Statistic title="Số sản phẩm đã mua" value={countProductBought ? countProductBought : 0} />
                            </Col>
                        </Row>
                    </Card>
                    <Card style={{ marginTop: 12 }}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Statistic title="Tổng số đơn đã đặt" value={countOrder} />
                            </Col>
                            <Col span={12}>
                                <Statistic title="Thành tiền" value={money ? numberWithCommas(Number(money)) : numberWithCommas(0)} />
                            </Col>
                        </Row>
                    </Card>
                    <Card style={{ marginTop: 12 }}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Statistic title="Tổng số đơn đã huỷ" value={countOrderCancel} />
                            </Col>
                            <Col span={12}>
                                <Statistic title="Thành tiền" value={moneyOrderCancel ? numberWithCommas(Number(moneyOrderCancel)) : numberWithCommas(0)} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </CustomModalForm >
    )
}


export default FormCreateUpdate;