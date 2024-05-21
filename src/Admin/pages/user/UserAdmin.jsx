
import { useContext, useEffect } from 'react';
import './userAdmin.scss'
import { Link, Outlet } from 'react-router-dom';
import { CountUserDeletedContext } from '../../../context/countUserDeleted';
import { request } from '../../../requestMethod';
export default function UserAdmin() {
    const { countUserDeleted, setCountUserDeleted } = useContext(CountUserDeletedContext)
    console.log(countUserDeleted);
    useEffect(() => {
        const getCountProductDeleted = async () => {
            const res = await request.get(`/user/count/deleted`)
            setCountUserDeleted(res.data.count.numberDeleted)
        }
        getCountProductDeleted()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (<div className='userAdmin-wrapper'>
            <div className="userAdmin-heading">
                <Link to="" className="link-item heading-title">Danh sách người dùng</Link>
                {/* <Link to="deleted-user" className="link-item user-deleted"> */}
                <Link to="deleted-user" className=" link-item user-deleted">
                    Đã xoá {`(${countUserDeleted})`}
                </Link>
            </div>
            <>
                <Outlet />
            </>
        </div>)
    
}
