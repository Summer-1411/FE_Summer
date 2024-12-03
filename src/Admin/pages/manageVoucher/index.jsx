
import { Button, Tag, Image } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, RollbackOutlined } from '@ant-design/icons';
import Table from "antd/es/table";

import {
    CheckCircleOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';
import { ACTION_TYPE, listGender, listStatus, STATUS } from '../../../constants';
import Filter from './components/filter';
import { useModalConfirm } from '../../../ui/ConfirmModel/ModalContextCustom';
import { ModalType } from '../../../ui/ConfirmModel/contanst';
import FormCreateUpdate from './components/formCreateUpdate';
import { formatDate, parseDate } from '../../../utils/formatDate';
import { ManageVoucherProvider, useManageVoucher } from './hooks/ManageVoucherContext';
import { useGetVoucherAdmin } from '../../../services/voucher';
import { numberWithCommas } from '../../../utils/formatMoney';
import { useIntl } from 'react-intl';
import { hasValue } from '../../../utils/utils';


const ManageVoucher = () => {
    const intl = useIntl()
    const { setStatusForm, filter, formCreate } = useManageVoucher()
    const { showConfirm } = useModalConfirm()


    const listVoucher = useGetVoucherAdmin(filter);



    const handleDelete = (record) => {
        showConfirm({
            title: "Xóa tài khoản",
            message: "Bản ghi sẽ chuyển trạng thái không hoạt động. Bạn có chắc chắn muốn xóa ?",
            type: ModalType.WARNING,
            onOk: () => {
                // serviceDelete.mutateAsync(record.id)
            },
        })
    }

    const handleRestore = (record) => {
        showConfirm({
            title: "Khôi phục tài khoản",
            message: "Bản ghi sẽ chuyển trạng thái hoạt động. Bạn có chắc chắn muốn khôi phục ?",
            type: ModalType.WARNING,
            onOk: () => {
                // serviceRestore.mutateAsync(record.id)
            },
        })
    }
    const formatNumber = (number) => {
        return intl.formatNumber(number.toString().replace(/\./g, '').replace(/,/g, ''))
            .toString()
    }
    const generateInitData = (record) => {
        const date = new Date(record.expiredTime);
        const minOrderValue = hasValue(record?.minOrderValue) ? formatNumber(record?.minOrderValue) : undefined
        const maxMoney = hasValue(record?.maxMoney) ? formatNumber(record?.maxMoney) : undefined
        const dataInit = {
            ...record,
            expiredTime: date,
            minOrderValue,
            maxMoney
        }
        return dataInit
    }
    const handleView = async (record) => {
        const dataInit = generateInitData(record)
        formCreate.setFieldsValue(dataInit)
        setStatusForm({
            open: true,
            action: ACTION_TYPE.VIEW,
            initData: dataInit
        })
    }
    const handleClickEdit = async (record) => {
        const dataInit = generateInitData(record)
        formCreate.setFieldsValue(dataInit)
        setStatusForm({
            open: true,
            action: ACTION_TYPE.UPDATE,
            initData: dataInit
        })
    }
    const handleOpenForm = () => {
        setStatusForm({
            open: true,
            action: ACTION_TYPE.CREATE,
            initData: {}
        })
    }
    // {
    //     "id": 2,
    //     "code": "VOUCHER_99",
    //     "value": 99,
    //     "quantity": 1,
    //     "initQuantity": 0,
    //     "minOrderValue": 0,
    //     "maxMoney": null,
    //     "expiredTime": "2024-12-31T00:00:00.000Z",
    //     "description": null,
    //     "createAt": "2024-12-01T23:10:11.000Z",
    //     "createUser": "",
    //     "updateAt": null
    // }

    const Header = () => {
        return <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>
                Danh sách mã giảm giá
            </h3>
            <Button type="primary" style={{ marginBottom: 16 }} onClick={handleOpenForm} icon={<PlusOutlined />}>
                Thêm mới
            </Button>
        </div>
    }

    const columns = [
        {
            title: 'Mã',
            width: 100,
            dataIndex: 'code',
        },
        {
            title: 'Giá trị',
            dataIndex: 'value',
            width: 100,
            render: (field, record) => {
                return <>
                    {record.value} %
                </>
            }
        },
        {
            title: 'Số lượng còn lại',
            dataIndex: 'quantity',
            width: 150,
            render: (field, record) => {
                return <>
                    {`${record.quantity}/${record.initQuantity}`}
                </>
            }
        },
        {
            title: 'Đơn tối thiểu',
            dataIndex: 'minOrderValue',
            width: 150,
            render: (field, record) => {
                return (
                    <div>{numberWithCommas(record?.minOrderValue)}</div>
                )
            },
        },
        {
            title: 'Giảm tối đa',
            dataIndex: 'maxMoney',
            width: 150,
            render: (field, record) => {
                return (
                    <div>{numberWithCommas(record?.maxMoney)}</div>
                )
            },
        },
        {
            title: 'Ngày hết hạn',
            dataIndex: 'expiredTime',
            render: (field, record) => {
                return (
                    <>
                        <>{parseDate(record.expiredTime)}</>
                        <>{record.isExpired && <Tag icon={<CloseCircleOutlined />} color={'error'}>
                            Hết hạn sử dụng
                        </Tag>}
                        </>
                    </>

                )
            },
        },
        {

            title: 'Ngày tạo',
            dataIndex: 'createAt',
            render: (field, record) => {
                return (
                    <>{formatDate(record.createAt)}</>
                )
            },
        },
        {

            title: 'Ngày cập nhật',
            dataIndex: 'updateAt',
            render: (field, record) => {
                return (
                    <>{formatDate(record.updateAt)}</>
                )
            },
        },
        {
            key: "action",
            render: (field, record) => (
                <div style={{ display: "flex", gap: 10 }}>
                    <Button size='small' type="primary" ghost onClick={() => handleClickEdit(record)} icon={<EditOutlined />} />
                    {/* <Button disabled={record.status === STATUS.INACTIVE} size='small' danger onClick={() => handleDelete(record)} icon={<DeleteOutlined />} /> */}
                    <Button size='small' type='default' onClick={() => handleView(record)} icon={<EyeOutlined />} />
                </div>
            )
        }
    ];


    return (
        <div>
            <Filter />
            <Table
                title={() => <Header />}
                rowKey={'id'}
                pagination={{ pageSize: 8 }}
                columns={columns}
                dataSource={listVoucher}
            />
            <FormCreateUpdate />
        </div>
    )
}



const VoucherRoot = () => (
    <ManageVoucherProvider>
        <ManageVoucher />
    </ManageVoucherProvider>
)

export default VoucherRoot