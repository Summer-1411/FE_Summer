
import { Button, Tag, Image, Space, Divider, Row, Col, Form } from 'antd';
import { CheckOutlined, ClockCircleOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined, EyeOutlined, PlusOutlined, SyncOutlined } from '@ant-design/icons';
import Table from "antd/es/table";

import {
    CheckCircleOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';
import { ManageOrderProvider, useManageOrder } from "./hooks/ManageOrderContext";
import { ACTION_TYPE, PAYMENT_TYPE, STATUS_ORDER } from '../../../constants';
import Filter from './components/filter';
import { numberWithCommas } from '../../../utils/formatMoney';
import { useModalConfirm } from '../../../ui/ConfirmModel/ModalContextCustom';
import { ModalType } from '../../../ui/ConfirmModel/contanst';
import { formatDate } from '../../../utils/formatDate';
import { useGetOrderAdmin, useUpdateStatusOrder } from '../../../services/order';
import { Typography } from 'antd';
import { exportInvoiceSingle } from '../../../services/invoice';
import { useMemo, useState } from 'react';
import CustomModalForm from '../../../ui/ModelForm';
import { TextArea } from '../../../ui/TextArea';
import { hasValue } from '../../../utils/utils';

const { Title, Text } = Typography;


const ManageOrder = () => {
    const { filter, setFilter } = useManageOrder()
    const { showConfirm } = useModalConfirm()

    const { data = [], pagination: paginationResponse = { total: 0, pageSize: 10, current: 1, totalPages: 1 } } = useGetOrderAdmin(filter)
    const updateStatusOrder = useUpdateStatusOrder()


    const [payloadForm, setPayloadForm] = useState({
        open: false,
        value: {}
    })
    const { total, pageSize, current } = paginationResponse

    const [formCancel] = Form.useForm()

    const handleOpenFormCancel = (record) => {
        setPayloadForm({
            open: true,
            value: record
        })
    }
    const handleCloseFormCancel = () => {
        setPayloadForm({
            open: false,
            value: {}
        })
    }


    const handleDelete = (record) => {
        showConfirm({
            title: "Xóa sản phẩm",
            message: "Bản ghi sẽ chuyển trạng thái không hoạt động. Bạn có chắc chắn muốn xóa ?",
            type: ModalType.WARNING,
            onOk: () => {
                // serviceDelete.mutateAsync(record.id)
            },
        })
    }
    const getStyleStatusOrder = (status) => {
        let result = {
            icon: '',
            color: ''
        }
        switch (status) {
            case 0:
                result = {
                    icon: <ClockCircleOutlined />,
                    color: 'default'
                }
                break;
            case 1:
                result = {
                    icon: <SyncOutlined />,
                    color: 'processing'
                }
                break;
            case 2:
                result = {
                    icon: <CheckCircleOutlined />,
                    color: 'success'
                }
                break;
            case -1:
                result = {
                    icon: <CloseCircleOutlined />,
                    color: 'error'
                }
                break;
            case -2:
                result = {
                    icon: <ExclamationCircleOutlined />,
                    color: 'error'
                }
                break;
            default:
                result = {
                    icon: <ClockCircleOutlined />,
                    color: 'default'
                }
                break;
        }
        return result
    }


    const totalAmountOrder = useMemo(() => {
        return data.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.total_amount;
        }, 0);
    }, [data]); // Chỉ tính toán lại khi mảng items thay đổi

    const columns = [
        {

            title: 'Mã đơn',
            dataIndex: 'id',
        },
        {
            title: 'Khách hàng',
            dataIndex: 'fullname',
            render: (field, record) => {
                return <Space direction="vertical">
                    <Title level={5}>{record?.fullname}</Title>
                    <Text>Email: {record?.user?.email}</Text>
                    <Text>SDT: {record?.phone}</Text>
                    <Text>{record?.shipping_address}</Text>
                    <Text type="warning">Giảm giá: {hasValue(record?.voucherValue) ? numberWithCommas(record?.voucherValue) : ''}</Text>
                    <Text strong type="success">Ghi chú: {record?.note ?? ''}</Text>
                </Space>
            }
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'fullname',
            render: (field, record) => {
                return (
                    <>{record.order_detail.map((item, index) => (<div key={item.id}>
                        <h5 style={{ marginBottom: 0 }}>{item?.filter?.product?.name}</h5>
                        <div>Loại: {item?.filter?.size}, {item?.filter?.color}  <span style={{ marginLeft: 10 }} type="danger">x{item?.quantity}</span></div>
                        <div>Đơn giá: {numberWithCommas(item?.price)}</div>
                        {index !== record.order_detail.length - 1 && <Divider style={{ borderColor: '#7cb305' }}></Divider>}
                    </div>))
                    }</>
                )
            }
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'name',
            render: (field, record) => {
                return (
                    <>{formatDate(record.orderDate)}</>
                )
            },
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total_amount',
            render: (field, record) => {
                return (
                    <div>{numberWithCommas(record?.total_amount)}</div>
                )
            },
        },
        {
            title: 'Loại thanh toán',
            dataIndex: 'status',
            render: (field, record) => {
                return (
                    <div style={{ fontSize: 13, fontWeight: 500 }}>
                        {PAYMENT_TYPE.find((i) => i.value == record.payment_method)?.label ?? ''}
                    </div>
                )
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (field, record) => {
                return (
                    <>
                        <div><Tag style={{ fontSize: 14, fontWeight: 500 }} icon={getStyleStatusOrder(record.status).icon} color={getStyleStatusOrder(record.status).color}>
                            {STATUS_ORDER.find((i) => i.value == record.status)?.label ?? ''}
                        </Tag></div>
                        {record.status < 0 && <div><Text strong type="danger">Lý do: {record?.reason ?? ''}</Text></div>}
                    </>
                )
            },
        },
        {
            key: "action",
            render: (field, record) => (
                <Space direction="vertical" style={{ width: '100%' }}>
                    {record.status === 0 && <Button
                        block
                        type='primary'
                        onClick={() => handleUpdate('', record)}
                    >
                        Xác nhận
                    </Button>}
                    {record.status === 1 && <Button
                        block
                        type='primary'
                        style={{ backgroundColor: '#28a745' }}
                        onClick={() => handleUpdate('?success=true', record)}
                    >
                        Thành công
                    </Button>}
                    {record.status === 0 && <Button
                        block
                        style={{ backgroundColor: '#dc3545' }}
                        onClick={() => handleOpenFormCancel(record)}
                    >
                        Hủy đơn
                    </Button>}
                    {record.status === -2 && <Button
                        block
                        style={{ backgroundColor: '#ffc107' }}
                        onClick={() => handleUpdate('?undo=true', record)}
                    >
                        Hoàn hủy
                    </Button>}
                    <Button
                        block
                        style={{ backgroundColor: '#6c757d' }}
                        onClick={() => handleExportBill(record)}
                    >
                        Xem hóa đơn
                    </Button>
                </Space>
            )
        }
    ];


    const handleUpdate = async (query, params) => {
        try {
            await updateStatusOrder.mutateAsync({ query, params })
        } catch (error) {
            console.log(error);
        }
    }

    const handleRejectOrder = async (values) => {
        const data = {
            ...payloadForm.value,
            ...values,
        }
        if (data.payment_method === "2") {
            showConfirm({
                title: "Hủy đơn hàng",
                message: "Đơn hàng này đã được thanh toán, cần thực hiện hoàn tiền khi hủy đơn. Bạn có chắc chắn muốn hủy ?",
                type: ModalType.WARNING,
                onOk: () => {
                    handleUpdate('?refuse=true', data)
                    handleCloseFormCancel()
                },
            })
        } else {
            handleUpdate('?refuse=true', data)
            handleCloseFormCancel()
        }

    }
    const handleExportBill = async (record) => {
        exportInvoiceSingle(record)
    }

    const Header = () => {
        return <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>
                Danh sách đơn hàng
            </h3>
            <Text strong style={{ fontSize: 16 }} type="danger">Tổng tiền: {numberWithCommas(totalAmountOrder)}</Text>
        </div>
    }


    const handleTableChange = (page, size) => {
        setFilter(prev => ({
            ...prev,
            pagination: {
                page: page,
                pageSize: size,
            }
        }))
    };


    return (
        <div>

            <Filter />
            <Table
                title={() => <Header />}
                rowKey={'id'}
                columns={columns}
                dataSource={data}
                pagination={{
                    current: current,
                    pageSize: pageSize,
                    total: total,
                    onChange: handleTableChange, // Đặt sự kiện onChange
                }}
            />
            <CustomModalForm
                width={1000}
                open={payloadForm.open}
                title={"Bạn có chắc chắn muốn huỷ đơn hàng này ?"}
                form={formCancel}
                onFinish={handleRejectOrder}
                onReset={handleCloseFormCancel}
                onCancel={handleCloseFormCancel}

                resetText={"Hủy"}
                submitText="Đồng ý"
            // onCancel={onCancel}
            >
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={24} xl={24}>
                        <TextArea
                            name="reason"
                            label={"Lý do"}
                            autoRequired
                            fieldProps={{ maxLength: 500 }}
                        />
                    </Col>

                </Row>
            </CustomModalForm >
        </div>
    )
}



const OrderRoot = () => (
    <ManageOrderProvider>
        <ManageOrder />
    </ManageOrderProvider>
)

export default OrderRoot