import { Link } from 'react-router-dom';
import './cart.scss'
import { numberWithCommas } from '../../utils/formatMoney';
import SettingsIcon from '@mui/icons-material/Settings';
import { Button, Divider, Image, Modal, Space, Table, Tag } from 'antd';
import DeleteIcon from '@mui/icons-material/Delete';
import { IMAGE_LINK } from '../../requestMethod';
import { toast } from 'react-toastify';
import { toastOption } from '../../constants';
import { useContext, useMemo, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { useDeleteProductInCart } from '../../services/products';

export default function Cart() {
    const { productCart } = useContext(AppContext)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [productDelete, setProductDelete] = useState();
    const serviceDeleteProductInCart = useDeleteProductInCart()
    const handleDeletetItem = async (product) => {
        try {
            setConfirmLoading(true);
            serviceDeleteProductInCart.mutateAsync(product.id_filter)
            setConfirmLoading(false);
        } catch (error) {
            toast.error(error.message, toastOption);
        }
    }

    const showModalDelete = (product) => {
        setIsModalOpen(true);
        setProductDelete(product)
    };

    const handleOk = () => {
        setIsModalOpen(false);
        handleDeletetItem(productDelete)
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const columns = [
        {
            title: 'Ảnh sản phẩm',
            dataIndex: 'img',
            key: 'img',
            render: (_, record) => (
                <Image
                    width={150}
                    src={`${IMAGE_LINK}/${record.img}`}
                />

            ),
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Phân loại',
            key: 'filter',
            render: (_, record) => {
                return (
                    <div>
                        <div>Màu: {record.color}</div>
                        <div>Dung lượng: {record.size}</div>
                    </div>
                )
            },
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            render: (_, record) => (
                <Space size="middle">
                    {numberWithCommas(record.price)}
                </Space>
            ),
        },
        {
            title: 'Số lượng',
            key: 'quantity',
            align: 'center',
            dataIndex: 'quantity'
        },
        {
            title: 'Thành tiền',
            key: 'amount',
            render: (_, record) => (
                <Space size="middle">
                    {numberWithCommas(record.price * record.quantity)}
                </Space>
            ),
        },
        {
            title: <div style={{ textAlign: 'center' }}><SettingsIcon /></div>,
            key: 'action',
            render: (_, record) => (
                <div
                    onClick={() => showModalDelete(record)}
                    style={{ textAlign: 'center', cursor: 'pointer', padding: '8px' }}
                >
                    <DeleteIcon />
                </div>
            ),
        },
    ];


    return (
        <div className='wrapper-cart'>
            <Divider>Giỏ hàng</Divider>
            <Table
                columns={columns}
                rowKey={'id'}
                dataSource={productCart ?? []}
                footer={() => <FotterTable data={productCart}/>}
            />
            <Button type='primary' size='large' style={{ width: '100%' }}>
                <Link to={"/order"}>
                    Đặt hàng
                </Link>
            </Button>
            <Modal
                title="Bạn muốn xóa sản phẩm này khỏi giỏ hàng ?" open={isModalOpen} onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading={confirmLoading}
                footer={[
                    <Button key="back" onClick={handleOk}>
                        Đồng ý
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleCancel}>
                        Hủy
                    </Button>

                ]}>

            </Modal>

        </div>
    )
}

const FotterTable = ({ data }) => {
    const sumPrice = useMemo(() => data.reduce(
        (accumulator, item) => {
            console.log({item, accumulator});
            return item.price * item.quantity + accumulator
        },
        0,
    ), [data])
    return (
        <div style={{ textAlign: 'center', fontSize: 18, fontWeight: 600 }}>Tổng thành tiền: {numberWithCommas(sumPrice)}</div>
    )
}