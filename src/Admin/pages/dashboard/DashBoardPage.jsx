import { useGetCountStat, useGetTopProduct, useGetTopUser } from '../../../services/stat'
import { Card, Col, Image, Row, Statistic, Table } from 'antd'
import { IMAGE_LINK } from '../../../requestMethod'
import { numberWithCommas } from '../../../utils/formatMoney'
import { parseDate } from '../../../utils/formatDate'

export default function DashBoardPage() {
    const data = useGetCountStat()
    const { listProduct } = useGetTopProduct()
    const { user, product, order, productSold } = data
    const { listUser } = useGetTopUser()

    const columns = [
        {
            title: 'Mã',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên sp',
            dataIndex: 'name',
            render: (field, record) => {
                return <>
                    <Image
                        width={50}
                        // src={record.avatar}
                        // src={record.avatar ? `${IMAGE_LINK}/${record.avatar}` : `${IMAGE_DEFAULT}`}
                        src={`${IMAGE_LINK}/${record.img}`}
                    />
                    <span style={{ marginLeft: 10 }}>{record.name}</span>
                </>
            }
        },
        {
            title: 'Số lượng',
            dataIndex: 'total_quantity',
            key: 'total_quantity',
        },
    ];

    const columnUsers = [
        {
            title: 'Mã',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'name',
            render: (field, record) => {
                return <>
                    <Image
                        width={50}
                        src={`${IMAGE_LINK}/${record.avatar}`}
                    />
                    <span style={{ marginLeft: 10 }}>{record.username}</span>
                </>
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Ngày ĐK',
            dataIndex: 'createAt',
            key: 'createAt',
            render: (field, record) => {
                return <>
                    {parseDate(record.createAt)}
                </>
            }
        },
        {
            title: 'Thanh toán',
            dataIndex: 'total_order_value',
            key: 'total_order_value',
            render: (field, record) => {
                return <>
                    {numberWithCommas(Number(record.total_order_value))}
                </>
            }
        },
    ];
    return (
        <div>
            <Row gutter={16}>
                <Col xs={24} sm={12} md={6} xl={6}>
                    <Card bordered style={{ marginTop: 12 }}>
                        <Statistic title="Tổng số người dùng" value={user ? user : 0} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6} xl={6}>
                    <Card bordered style={{ marginTop: 12 }}>
                        <Statistic title="Tổng số sản phẩm" value={product ? product : 0} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6} xl={6}>
                    <Card bordered style={{ marginTop: 12 }}>
                        <Statistic title="Tổng số đơn hàng" value={order ? order : 0} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6} xl={6}>
                    <Card bordered style={{ marginTop: 12 }}>
                        <Statistic title="Số lượng sản phẩm đã bán" value={productSold ? productSold : 0} />
                    </Card>
                </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: 12 }}>
                <Col xs={24} sm={24} md={10} xl={10}>
                    <Card title="Sản phẩm đã bán" style={{ marginTop: 12 }}>
                        <Table rowKey={'id'} dataSource={listProduct} columns={columns} />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={14} xl={14}>
                    <Card title="Khách hàng gần đây" style={{ marginTop: 12 }}>
                        <Table rowKey={'id'} dataSource={listUser} columns={columnUsers} />
                    </Card>
                </Col>
            </Row>
        </div >

    )
}
