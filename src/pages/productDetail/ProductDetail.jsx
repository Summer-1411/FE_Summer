import './productDetail.scss'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { request } from '../../requestMethod';
import { useDispatch, useSelector } from 'react-redux';
import { numberWithCommas } from '../../utils/formatMoney';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { INFOR_PRODUCT, toastOption } from '../../constants';
import { Button, Divider, Modal, Rate } from 'antd';
import { useInsertUpdateCart } from '../../services/products';
import Review from '../../components/Review/Review';
import { useGetFeedbackProduct } from '../../services/feedback';
import { useGetInforProductDetail, useGetProductDetailSizeColorProductId } from '../../services/filter';
import { useGetProductById } from '../../services/product';
import useCurrentUser from '../../hooks/useCurrentUser';

export default function ProductDetail() {
    const navigate = useNavigate()
    const location = useLocation()
    const currentUser = useCurrentUser();
    const [countSold, setCountSold] = useState(0);
    const id = location.pathname.split("/")[2];
    const [avatar, setAvatar] = useState("")

    const [sizeColor, setSizeColor] = useState({
        size: '',
        color: ''
    })
    const [quantity, setQuantity] = useState(1)
    const [isModalOpen, setIsModalOpen] = useState(false);


    const { listSize, listColorImg } = useGetInforProductDetail(id);
    const currentProduct = useGetProductById(id);

    console.log('currentProduct', currentProduct);

    const detailProduct = useGetProductDetailSizeColorProductId({
        id: id,
        ...sizeColor
    })


    useEffect(() => {
        if (currentProduct) {
            setAvatar(currentProduct.img)
        }
    }, [currentProduct])

    const renderQuantity = useMemo(() => {
        console.log('detailProduct', detailProduct);
        if (!detailProduct) {
            return ''
        }
        return detailProduct.quantity > 0
            ? `${detailProduct.quantity} sản phẩm`
            : 'Hết hàng';
    }, [detailProduct])



    const handleChangeOption = (name, value) => {
        setSizeColor(prev => ({
            ...prev,
            [name]: value
        }))
    }




    const { feedbackListProduct } = useGetFeedbackProduct(id)
    const serviceInsertUpdateCart = useInsertUpdateCart()
    const showModal = () => {
        setIsModalOpen(true);
    };

    const caculatorRateValue = useMemo(() => {
        const total = feedbackListProduct.reduce((accumulator, currentValue) => accumulator + currentValue.rate,
            0,)
        return feedbackListProduct.length > 0 ? total / feedbackListProduct.length : 5
    }, [feedbackListProduct])



    const handleOk = () => {
        navigate("/login")
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const getProductDetail = async () => {
            try {
                const result = await request.get(`/stat/sold/${id}`)
                setCountSold(result.data.total_quantity)

            } catch (error) {
                console.log(error);
            }
        }
        getProductDetail()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])




    const handleChangeQuantityOrder = (action) => {
        if (action === "increase") {
            if (detailProduct && quantity < detailProduct.quantity) {
                setQuantity(prev => prev + 1)
            }
        } else if (action === "reduce") {
            if (quantity > 1) {
                setQuantity(prev => prev - 1)
            }
        }
    }
    useEffect(() => {
        if (detailProduct === null || detailProduct?.quantity < 1) {
            setQuantity(0)
        } else {
            setQuantity(1)
        }
    }, [detailProduct])


    const handleAddToCart = async () => {
        if (!currentUser) {
            showModal()
            return;
        }
        if (!sizeColor.size || !sizeColor.color) {
            toast.error('Vui lòng chọn loại sản phẩm !', toastOption);
            return;
        } else if (quantity < 1) {
            toast.error('Rất tiếc, sản phẩm này hiện đã hết hàng :(((', toastOption);
            return;
        }
        else if (quantity > detailProduct.quantity) {
            toast.error('Rất tiếc, sản phẩm này không đủ số lượng :(((', toastOption);
            return;
        }
        if (sizeColor.size && sizeColor.color && quantity > 0) {
            serviceInsertUpdateCart.mutateAsync({
                filter: detailProduct.id,
                quantity: quantity
            })

        }
    }
    const handleBuyNow = () => {
        if (!currentUser) {

            showModal()
            return;
        }
        if (!sizeColor.size || !sizeColor.color) {
            toast.error('Vui lòng chọn màu sắc, dung lượng !', toastOption);
            return;
        } else if (quantity < 1) {
            toast.error('Rất tiếc, sản phẩm này hiện đã hết hàng :(((', toastOption);
            return;
        }
        else if (quantity > detailProduct.quantity) {
            toast.error('Rất tiếc, sản phẩm này không đủ số lượng :(((', toastOption);
            return;
        }
        if (sizeColor.size && sizeColor.color && quantity > 0) {
            handleAddToCart()
            navigate("/cart")
        } else if (quantity < 1) {
            toast.error("Xin lỗi! Sản phẩm này đã hết :((", toastOption);
        } else {
            toast.error("Bạn vui lòng chọn màu sắc và số lượng !", toastOption);
        }
    }
    const formatPrice = () => {
        if (detailProduct?.price) {
            return numberWithCommas(detailProduct.price)
        } else if (currentProduct.priceRange) {
            return numberWithCommas(currentProduct.priceRange)
        }
    }

    return (
        <>

            <Modal title="Bạn vui lòng đăng nhập để thực hiện chức năng này" open={isModalOpen} onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Hủy
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        Đăng nhập
                    </Button>,
                ]}>

            </Modal>
            {
                currentProduct && (
                    <div className="productDetail-wrapper">
                        <div className="productDetail-container">
                            <div className="left">
                                <div className="main-img" style={{ backgroundImage: `url(${avatar})` }}></div>
                                <div className="list-img">
                                    {listColorImg?.map(image => (
                                        <div key={image.img} className="img-item" onMouseEnter={() => setAvatar(image.img)}>
                                            <div className="img-item-content" style={{ backgroundImage: `url(${image.img})` }}>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="right">
                                <div className="heading">
                                    <div className="name-product">
                                        {currentProduct?.name}
                                    </div>
                                    <div className="info-product">
                                        <div className="star">
                                            <div className="star-number">{caculatorRateValue}</div>
                                            <div className="list-star">
                                                <Rate allowHalf disabled value={caculatorRateValue} />

                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <div className="info-item-number">
                                                {feedbackListProduct.length}
                                            </div>
                                            <div className="info-item-title">
                                                Đánh giá
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <div className="info-item-number">
                                                {countSold ? countSold : 0}
                                            </div>
                                            <div className="info-item-title">
                                                Đã bán
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="price-product">
                                    {formatPrice()}
                                </div>
                                <div className="main">
                                    <div className="main-row">
                                        <div className="row-title">
                                            Tình trạng
                                        </div>
                                        {currentProduct?.description}
                                    </div>
                                    <div className="main-row">
                                        <div className="row-title">
                                            Bảo Hiểm
                                        </div>
                                        {currentProduct?.qualityGrade}
                                    </div>
                                    <div className="main-row">
                                        <div className="row-title">
                                            Màu sắc
                                        </div>
                                        <div className="row-list-option">
                                            {listColorImg?.map((cl) => (
                                                <div
                                                    key={cl.color}
                                                    className={sizeColor.color === cl.color ? "option-item active" : "option-item"}
                                                    onClick={() => handleChangeOption(INFOR_PRODUCT.COLOR, cl.color)}
                                                    onMouseEnter={() => setAvatar(cl.img)}
                                                >
                                                    {cl.color}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="main-row">
                                        <div className="row-title">
                                            Dung lượng
                                        </div>
                                        <div className="row-list-option">
                                            {listSize?.map((sz) => (
                                                <div
                                                    key={sz.size}
                                                    className={sizeColor.size === sz.size ? "option-item active" : "option-item"}
                                                    onClick={() => handleChangeOption(INFOR_PRODUCT.SIZE, sz.size)}
                                                >
                                                    {sz.size}
                                                </div>
                                            ))}

                                        </div>
                                    </div>
                                    <div className="main-row">
                                        <div className="row-title">
                                            Số lượng
                                        </div>
                                        <div className="main-row-content">
                                            <div className="row-content-left">
                                                <div className="btn-icon" onClick={() => handleChangeQuantityOrder("reduce")}>
                                                    -
                                                </div>
                                                <input
                                                    type="text"
                                                    className='input-number'
                                                    value={quantity}
                                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                                />
                                                <div className="btn-icon" onClick={() => handleChangeQuantityOrder("increase")}>
                                                    +
                                                </div>
                                            </div>
                                            <div className="row-content-right">
                                                {renderQuantity}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bottom-productDetail">
                                    <button className='btn add-cart' onClick={handleAddToCart}>
                                        <AddShoppingCartIcon />
                                        Thêm vào giỏ hàng
                                    </button>
                                    <button className='btn buy-now' onClick={handleBuyNow}>
                                        Mua ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                        <Divider orientation="center">Chi tiết sản phẩm</Divider>
                        <p style={{ padding: 20 }}>
                            {currentProduct?.information}
                        </p>
                        <Divider orientation="center">Đánh giá sản phẩm</Divider>
                        <Review feedbackListProduct={feedbackListProduct} />
                    </div>
                )
            }

        </>
    )
}
