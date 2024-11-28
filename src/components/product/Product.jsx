import './product.scss'
import {
    ShoppingCartOutlined
} from '@ant-design/icons';
import StarRateIcon from '@mui/icons-material/StarRate';
import { Link } from 'react-router-dom';
import { numberWithCommas } from '../../utils/formatMoney';
import { IMAGE_LINK } from '../../requestMethod';
import { Button } from 'antd';
export default function Product({ product }) {
    //console.log(product.img);
    return (
        <Link to={`/product/${product.id}`} className="product-item">

            <img className="img" src={product.img} alt='img-product' />



            <div className="product-content">
                <div className="product-content-top">
                    <div className="name-product">{product.name}</div>

                    <div className="price-product">
                        {numberWithCommas(product.priceRange)}
                    </div>
                </div>


                <div className="btn">
                    <div className="list-star">
                        <div className="star-tem">
                            <StarRateIcon className="star" />
                        </div>
                        <div className="star-tem">
                            <StarRateIcon className="star" />
                        </div>
                        <div className="star-tem">
                            <StarRateIcon className="star" />
                        </div>
                        <div className="star-tem">
                            <StarRateIcon className="star" />
                        </div>
                        <div className="star-tem">
                            <StarRateIcon className="star" />
                        </div>
                    </div>
                    <Button>
                        Mua ngay <ShoppingCartOutlined />
                    </Button>
                </div>
            </div>

        </Link>
    )
}
