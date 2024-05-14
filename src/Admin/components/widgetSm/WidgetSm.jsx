import { useEffect, useState } from "react";
import "./widgetSm.scss";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IMAGE_LINK, request } from "../../../requestMethod";
import { Link } from "react-router-dom";
export default function WidgetSm() {
  const [topProduct, setTopProduct] = useState([])
  useEffect(() => {
    const getTopProduct = async () => {
      try {
        const res = await request.get(`/stat/top-product`)
        setTopProduct(res.data)
      } catch (error) {
        console.log(error);
      }
    }

    getTopProduct()
  }, [])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Sản phẩm đã bán</span>
      <ul className="widgetSmList">
        {topProduct.map((pro) => (
          <li className="widgetSmListItem" key={pro.id}>
            <img
              src={`${IMAGE_LINK}/${pro.img}`}
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{pro.name}</span>
              <span className="widgetSmUserTitle">Số lượng: {pro.total_quantity}</span>
            </div>
            <Link to={`products/detail-product/${pro.id}`} className="widgetSmButton">
              <VisibilityIcon className="widgetSmIcon" />
              Xem
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
