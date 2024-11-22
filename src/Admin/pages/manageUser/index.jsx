
import { Button, Tag, Image } from 'antd';
import { DeleteOutlined, EyeOutlined, RollbackOutlined } from '@ant-design/icons';
import Table from "antd/es/table";

import {
    CheckCircleOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';
import { ManageUserProvider, useManageUser } from "./hooks/ManageUserContext";
import { ACTION_TYPE, listGender, listStatus, STATUS } from '../../../constants';
import Filter from './components/filter';
import { useModalConfirm } from '../../../ui/ConfirmModel/ModalContextCustom';
import { ModalType } from '../../../ui/ConfirmModel/contanst';
import { useDeleteUser, useGetListUser, useRestoreUser } from '../../../services/user';
import { IMAGE_DEFAULT, IMAGE_LINK } from '../../../requestMethod';
import FormCreateUpdate from './components/formCreateUpdate';
import { formatDate } from '../../../utils/formatDate';


const ManageUser = () => {
    const { setStatusForm, filter } = useManageUser()
    const { showConfirm } = useModalConfirm()
    const { listUser } = useGetListUser(filter)
    const serviceDelete = useDeleteUser();
    const serviceRestore = useRestoreUser();




    const handleDelete = (record) => {
        showConfirm({
            title: "Xóa tài khoản",
            message: "Bản ghi sẽ chuyển trạng thái không hoạt động. Bạn có chắc chắn muốn xóa ?",
            type: ModalType.WARNING,
            onOk: () => {
                serviceDelete.mutateAsync(record.id)
            },
        })
    }

    const handleRestore = (record) => {
        showConfirm({
            title: "Khôi phục tài khoản",
            message: "Bản ghi sẽ chuyển trạng thái hoạt động. Bạn có chắc chắn muốn khôi phục ?",
            type: ModalType.WARNING,
            onOk: () => {
                serviceRestore.mutateAsync(record.id)
            },
        })
    }
    const handleView = async (record) => {
        setStatusForm({
            open: true,
            action: ACTION_TYPE.CREATE,
            initData: record
        })
    }
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'Tên người dùng',
            // width: 150,
            dataIndex: 'username',
            render: (field, record) => {
                return <>
                    <Image
                        width={100}
                        // src={record.avatar}
                        src={record.avatar ? `${IMAGE_LINK}/${record.avatar}` : `${IMAGE_DEFAULT}`}
                    />
                    <span style={{ marginLeft: 10 }}>{record.username}</span>
                </>
            }
        },
        {
            // width: 300,
            title: 'Email',
            dataIndex: 'email',
        },
        {
            // width: 100,
            title: 'Giới tính',
            dataIndex: 'gender',
            render: (field, record) => {
                return (
                    <>{listGender.find((i) => i.value == record.gender)?.label ?? ''}</>
                )
            },
        },
        {
            // width: 80,
            title: 'Ngày sinh',
            dataIndex: 'birthday',
            render: (field, record) => {
                return (
                    <>{record.birthday && formatDate(record.birthday)}</>
                )
            },
        },
        {
            // width: 80,
            title: 'Ngày đăng ký',
            dataIndex: 'createAt',
            render: (field, record) => {
                return (
                    <>{record.createAt && formatDate(record.createAt)}</>
                )
            },
        },
        {
            // width: 80,
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (field, record) => {
                return (
                    <Tag icon={record.status ? <CheckCircleOutlined /> : <CloseCircleOutlined />} color={record.status ? 'success' : 'error'}>
                        {listStatus.find((i) => i.value == record.status)?.label ?? ''}
                    </Tag>
                )
            },
        },
        {
            // width: 160,
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
                    <Button disabled={record.status === STATUS.ACTIVE} size='small' type="primary" ghost onClick={() => handleRestore(record)} icon={<RollbackOutlined />} />
                    <Button disabled={record.status === STATUS.INACTIVE} size='small' danger onClick={() => handleDelete(record)} icon={<DeleteOutlined />} />
                    <Button size='small' type='default' onClick={() => handleView(record)} icon={<EyeOutlined />} />
                </div>
            )
        }
    ];
    const Header = () => {
        return <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>
                Danh sách khách hàng
            </h3>
        </div>
    }



    return (
        <div>
            <Filter />
            <Table
                title={() => <Header />}
                rowKey={'id'}
                pagination={{ pageSize: 8 }}
                columns={columns}
                dataSource={listUser}
            />
            <FormCreateUpdate />
        </div>
    )
}



const UserRoot = () => (
    <ManageUserProvider>
        <ManageUser />
    </ManageUserProvider>
)

export default UserRoot