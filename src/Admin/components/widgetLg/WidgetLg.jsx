
import { useEffect, useState } from "react";
import "./widgetLg.scss";
import {  IMAGE_DEFAULT, IMAGE_LINK, request } from "../../../requestMethod";
import {  parseDate } from '../../../utils/formatDate';
import { numberWithCommas } from '../../../utils/formatMoney';
import { Link } from "react-router-dom";
export default function WidgetLg() {
  const [topUser, setTopUser] = useState([])
  useEffect(() => {
    const getTopUser = async () => {
      try {
        const res = await request.get(`/stat/top-user`)
        //console.log(res.data);
        setTopUser(res.data)
      } catch (error) {
        console.log(error);
      }
    }

    getTopUser()
  }, [])

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Khách hàng gần đây</h3>
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Tên khách hàng</th>
            <th className="widgetLgTh">Email</th>
            <th className="widgetLgTh">Ngày ĐK</th>
            <th className="widgetLgTh">Thanh toán</th>
          </tr>
        </thead>
        <tbody>
          {topUser.map((user) => (
            <tr className="widgetLgTr" key={user.id}>
              <td className="widgetLgUser">
                <img
                  src={user.avatar ? `${IMAGE_LINK}/${user.avatar}` : `${IMAGE_DEFAULT}`}
                  alt=""
                  className="widgetLgImg"
                />
                <Link to={`/2020606605/admin/users/detail-user/${user.id}`} className="widgetLgName">{user.username}</Link>
              </td>
              <td className="widgetLgDate">{(user.email)}</td>
              <td className="widgetLgAmount">{parseDate(user.createAt)}</td>
              <td className="widgetLgStatus">
                {numberWithCommas(Number(user.total_order_value))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
