
import { Button, Tag, Image } from 'antd';
import { CopyOutlined, DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import FormCreateUpdate from "./components/formCreateUpdate";
import Table from "antd/es/table";

import {
    CheckCircleOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';
import { ManageProductProvider, useManageProduct } from "./hooks/ManageProductContext";
import { ACTION_TYPE, listStatus } from '../../../constants';
import Filter from './components/filter';
import { useDeleteProduct, useGetProduct } from '../../../services/product';
import { numberWithCommas } from '../../../utils/formatMoney';
import { useModalConfirm } from '../../../ui/ConfirmModel/ModalContextCustom';
import { ModalType } from '../../../ui/ConfirmModel/contanst';
import { useSearchProductDetail } from '../../../services/filter';
import { useState } from 'react';
import { formatDate } from '../../../utils/formatDate';


const ManageProduct = () => {
    const { setStatusForm, filter, listProducer, listCategory, formCreate, setImageUrls, setMainImg } = useManageProduct()
    const { showConfirm } = useModalConfirm()
    const { productList } = useGetProduct(filter)
    const serviceDelete = useDeleteProduct();
    const serviceSearchProdDetail = useSearchProductDetail();




    const handleOpenForm = () => {
        setStatusForm({
            open: true,
            action: ACTION_TYPE.CREATE,
            initData: {}
        })
    }


    function convertData(data) {
        const result = [];

        // Group by color
        data.forEach(item => {
            // Find if color already exists in result
            let colorGroup = result.find(group => group.color === item.color);

            // If the color group doesn't exist, create a new one
            if (!colorGroup) {
                colorGroup = { color: item.color, listDetail: [] };
                result.push(colorGroup);
            }

            // Add the item details to the color group
            colorGroup.listDetail.push({
                id: item.id,
                size: item.size,
                quantity: item.quantity,
                price: item.price
            });
        });

        return result;
    }

    function getColorImageArray(data) {
        const result = [];
        const colorImages = {};

        data.forEach(item => {
            // If the color is not already in colorImages, add it
            if (!colorImages[item.color]) {
                colorImages[item.color] = item.img;
                // Push the color and img as an object to the result array
                result.push({ key: item.color, value: item.img });
            }
        });

        return result;
    }
    const handleSetDataFormModal = async (record) => {
        const result = await serviceSearchProdDetail.mutateAsync(record.id)

        const listColorConvert = convertData(result)

        const imgs = getColorImageArray(result);
        const dataUpdate = {
            ...record,
            listColor: listColorConvert
        }

        formCreate.setFieldsValue(dataUpdate);
        setMainImg(record.img)
        setImageUrls(imgs)
    }
    const handleClickEdit = async (record) => {
        await handleSetDataFormModal(record)
        setStatusForm({
            open: true,
            action: ACTION_TYPE.UPDATE,
            initData: record
        })
    }
    const handleClickCopy = async (record) => {
        const { id, ...other } = record
        await handleSetDataFormModal(record)
        setStatusForm({
            open: true,
            action: ACTION_TYPE.CREATE,
            initData: other
        })
    }
    const handleView = async (record) => {
        await handleSetDataFormModal(record)
        setStatusForm({
            open: true,
            action: ACTION_TYPE.VIEW,
            initData: record
        })
    }

    const handleDelete = (record) => {
        showConfirm({
            title: "Xóa sản phẩm",
            message: "Bản ghi sẽ chuyển trạng thái không hoạt động. Bạn có chắc chắn muốn xóa ?",
            type: ModalType.WARNING,
            onOk: () => {
                serviceDelete.mutateAsync(record.id)
            },
        })
    }

    const columns = [
        {

            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'Ảnh',
            width: 150,
            dataIndex: 'img',
            render: (field, record) => {
                return <Image
                    width={150}
                    // key={itemIndex}
                    src={record.img}
                />
            }
        },
        {
            width: 300,
            title: 'Tên sản phẩm',
            dataIndex: 'name',
        },
        {
            width: 100,
            title: 'Khoảng giá',
            dataIndex: 'priceRange',
            render: (field, record) => {
                return (
                    <>{numberWithCommas(record.priceRange)}</>
                )
            },
        },
        {
            width: 80,
            title: 'Loại',
            dataIndex: 'id_category',
            render: (field, record) => {
                return (
                    <>{listCategory.find((i) => i.value == record.id_category)?.label ?? ''}</>
                )
            },
        },
        {
            width: 80,
            title: 'Nhà sx',
            dataIndex: 'id_producer',
            render: (field, record) => {
                return (
                    <>{listProducer.find((i) => i.value == record.id_producer)?.label ?? ''}</>
                )
            },
        },
        {
            width: 80,
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
            width: 100,
            title: 'Ngày tạo',
            dataIndex: 'createAt',
            render: (field, record) => {
                return (
                    <>{formatDate(record.createAt)}</>
                )
            },
        },
        {
            width: 160,
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
                    <Button size='small' danger disabled={record.status == 0} onClick={() => handleDelete(record)} icon={<DeleteOutlined />} />
                    <Button size='small' type='default' onClick={() => handleView(record)} icon={<EyeOutlined />} />
                    <Button size='small' type='default' onClick={() => handleClickCopy(record)} icon={<CopyOutlined />} />
                </div>
            )
        }
    ];
    const Header = () => {
        return <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>
                Danh sách sản phẩm
            </h3>
            <Button type="primary" style={{ marginBottom: 16 }} onClick={handleOpenForm} icon={<PlusOutlined />}>
                Thêm mới
            </Button>
        </div>
    }

    return (
        <div>

            <Filter />
            <Table
                title={() => <Header />}
                rowKey={'id'}
                columns={columns}
                dataSource={productList}
                pagination={{ pageSize: 8 }}
            />
            <FormCreateUpdate />
        </div>
    )
}



const ProductRoot = () => (
    <ManageProductProvider>
        <ManageProduct />
    </ManageProductProvider>
)

export default ProductRoot