import { Link } from 'react-router-dom';
import { IMAGE_DEFAULT, IMAGE_LINK } from '../../../requestMethod';
import { parseDate } from '../../../utils/formatDate';
import './userItem.scss'
import { Modal } from 'antd';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { toastOption } from '../../../constants';
export default function UserItem({ view, remove, undo, user, handleDeleteUserItem, handleCancelDeleteUserItem }) {
    const [openModel, setOpenModel] = useState(false);
    const handleClickDeleteUser = () => {
        showNotification()
        handleDeleteUserItem(user.id)
    }
    const handleClickRestoreUser = () => {
        showNotification()
        handleCancelDeleteUserItem(user.id)
    }
    const showNotification = () => {
        toast.success("Cập nhật thành công", toastOption);
    }
    const handleOpenModel = () => {
        setOpenModel(true)
    }
    const handleCancelModel = () => {
        setOpenModel(false)
    }
    return (
        <div className='row-userItem'>
            <div className="col-item">
                {user.id}
            </div>
            <div className="col-item-2 col-img-name">
                <img className="avatar-user" src={user.avatar ? `${IMAGE_LINK}/${user.avatar}` : `${IMAGE_DEFAULT}`} alt="" />
                <div className="name-user">{user.username}</div>
            </div>
            <div className="col-item-2">
                {user.email}
            </div>
            <div className="col-item">
                {user.gender === 1 ? "Nam" : user.gender === 2 ? "Nữ" : "Khác"}
            </div>
            <div className="col-item">
                {parseDate(user.birthday)}
            </div>
            <div className="col-item">
                {parseDate(user.createAt)}
            </div>
            <div className="col-item col-action-admin">
                {view && <Link to={`/2020606605/admin/users/detail-user/${user.id}`} className="btn-action btn-view">Xem</Link>}
                {remove && <div className="btn-action btn-remove" onClick={handleOpenModel}>Xoá</div>}
                {undo && <div className="btn-action btn-undo" onClick={handleClickRestoreUser}>Khôi phục</div>}
            </div>
            <Modal
                title="Xóa bản ghi"
                open={openModel}
                onOk={handleClickDeleteUser}
                onCancel={handleCancelModel}
            >
                <p>Sau khi xóa sẽ chuyển trạng thái về không hoạt động. Bạn có muốn xóa ?</p>
            </Modal>
        </div>
    )
}
