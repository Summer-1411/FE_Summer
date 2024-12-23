
import { Button, Col, Divider, Image, Row } from 'antd'
import { CloudUploadOutlined, DeleteFilled } from '@ant-design/icons';
import CustomModalForm from '../../../../ui/ModelForm'
import { useModalConfirm } from '../../../../ui/ConfirmModel/ModalContextCustom'
import TextInput from '../../../../ui/TextInput'
import { useManageProduct } from '../hooks/ManageProductContext'
import { TextArea } from '../../../../ui/TextArea'
import { NumberInput } from '../../../../ui/NumberInput';
import ListForm from '../../../../ui/ListForm';
import SelectInput from '../../../../ui/Select';
import { useCreateProduct, useUpdateProduct } from '../../../../services/product';
import { ACTION_TYPE, DELETE_ITEM, listStatus, ModalType, toastOption } from '../../../../constants';
import { toast } from 'react-toastify';

const FormCreateUpdate = () => {
    const { formCreate,
        listProducer,
        listCategory,
        imageUrls,
        setImageUrls,
        mainImg,
        setMainImg,
        statusForm, setStatusForm
    } = useManageProduct()
    const { showConfirm } = useModalConfirm()

    const createProduct = useCreateProduct()
    const updateProduct = useUpdateProduct()




    const updateImageUrl = (key, url) => {
        setImageUrls(prevImageUrls => {
            const exists = prevImageUrls.some(image => image.key === key);

            // Nếu đã tồn tại, cập nhật lại url của ảnh đó
            if (exists) {
                return prevImageUrls.map(image =>
                    image.key === key ? { ...image, value: url } : image
                );
            }

            return [...prevImageUrls, { key: key, value: url }];
        });
    };

    const handleOpenWidget = (key) => {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "drkmrlmla",
                uploadPreset: "summer"
            },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    const url = result.info.url;
                    if (key) {
                        updateImageUrl(key, url);
                    } else {
                        setMainImg(url)
                    }
                }
            }
        );

        widget.open(); // Open the widget
    };
    const handleResetForm = () => {
        formCreate.resetFields();
    }


    const convertDataToProductDetail = (list) => {
        const flatListWithImages = list.flatMap(item =>
            item.listDetail.map(detail => {
                // Tìm link ảnh tương ứng với màu sắc từ mảng `img`
                const imgLink = imageUrls.find(image => image.key === item.color)?.value || null;

                if (!imgLink) {
                    toast.error(`Bạn chưa upload ảnh cho màu ${item.color}`, toastOption);
                    return null;
                }
                return {
                    id: detail.id,
                    color: item.color,
                    size: detail.size,
                    quantity: detail.quantity,
                    price: Number(detail.price),
                    img: imgLink // Thêm link ảnh
                };
            })
        );
        console.log('run');

        // Kiểm tra nếu bất kỳ phần tử nào là `null` thì trả về `false`
        if (flatListWithImages.includes(null)) {
            return { valid: false, data: [] };
        }
        return { valid: true, data: flatListWithImages };
    }




    const handleSubmitData = async (values) => {
        await formCreate.validateFields()
        const { listColor, priceRange, ...rest } = values
        const priceRangeValue = parseInt(String(priceRange).replace(/\./g, ''), 10);
        const { valid, data: productDetail } = convertDataToProductDetail(listColor)
        if (!valid) {
            return;
        }
        const dataSubmit = {
            ...statusForm.initData,
            ...rest,
            priceRange: priceRangeValue,
            img: mainImg,
            productDetail,
        }
        showConfirm({
            title: `Xác nhận lưu dữ liệu`,
            message: 'Bạn có chắc chắn lưu thông tin sản phẩm này?',
            type: ModalType.INFO,
            onOk: async () => {
                await saveData(dataSubmit)
            },
        })
    }
    const saveData = async (dataSubmit) => {
        if (statusForm.action === ACTION_TYPE.CREATE) {
            await createProduct.mutateAsync(dataSubmit);
        } else if (statusForm.action === ACTION_TYPE.UPDATE) {
            await updateProduct.mutateAsync(dataSubmit);
        }
        handleClose()
    }
    const getTitleModelForm = () => {
        switch (statusForm.action) {
            case ACTION_TYPE.CREATE:
                return 'Thêm mới sản phẩm'
            case ACTION_TYPE.UPDATE:
                return 'Cập nhật sản phẩm'
            case ACTION_TYPE.VIEW:
                return 'Chi tiết sản phẩm'
            default:
                return 'Thêm mới sản phẩm'
        }

    }



    const handleClose = () => {
        setImageUrls([])
        setStatusForm({
            open: false,
            action: ''
        })
        setMainImg('')
    }
    const onCancel = () => {
        handleClose()
    }

    const creatorButtonStyle = {
        background:
            ' linear-gradient(90deg, #E6EAF4 0%, #EEE9F4 15.7%, #F1E7F3 26.7%, #F7E5EE 61.18%, #F8EAE9 100%)',
        width: '100%'
    }

    const onDeleteAction = (index, action, typeDelete) => {
        showConfirm({
            title: `Xóa ${typeDelete === DELETE_ITEM.COLOR ? 'màu sắc' : 'dung lượng'}`,
            message: `${typeDelete === DELETE_ITEM.COLOR ? 'Khi xóa màu sắc này của sản phẩm, tất cả các bản ghi dung lượng liên quan cũng sẽ bị xóa. Bạn có chắc chắn muốn xóa ?' : 'Bạn có chắc chắn muốn xóa dung lượng này?'}`,
            type: ModalType.WARNING,
            onOk: () => {
                action.remove(index)
            },
        })
    }


    return (
        <CustomModalForm
            width={1000}
            open={statusForm.open}
            title={getTitleModelForm()}
            onFinish={handleSubmitData}
            form={formCreate}
            onCancel={onCancel}
            disabled={statusForm.action === ACTION_TYPE.VIEW}
            isDisableReset={statusForm.action !== ACTION_TYPE.CREATE}
            onReset={handleResetForm}
        >
            <Row gutter={16}>
                <Col xs={24} sm={24} md={16} xl={16}>

                    <TextInput
                        name="name"
                        autoRequired
                        label={"Tên sản phẩm"}
                        key="name"
                    />
                    <TextArea
                        name="description"
                        label={"Mô tả"}
                        fieldProps={{ maxLength: 500 }}
                    />
                    <TextArea
                        name="information"
                        label={"Thông tin"}
                        fieldProps={{ maxLength: 500 }}
                    />
                    <NumberInput
                        isDotNumberFormat
                        isNonTypingZero
                        fieldProps={{
                            maxLength: 15,
                            addonAfter: 'VNĐ',
                            onPaste: (event) => {
                                const pastedText = event.clipboardData.getData('text/plain')
                                if (!/^\d+$/.test(pastedText)) {
                                    event.preventDefault()
                                }
                            },
                        }}
                        name={"priceRange"}
                        label={"Khoảng giá"}
                        autoRequired
                    />

                    <TextArea
                        name="qualityGrade"
                        autoRequired
                        label={"Tình trạng sản phẩm"}
                        key="qualityGrade"
                        fieldProps={{ maxLength: 255 }}
                    />
                    <SelectInput
                        autoRequired
                        form={formCreate}
                        name="id_category"
                        options={listCategory}
                        label={"Loại sản phẩm"}
                    />
                    <SelectInput
                        autoRequired
                        form={formCreate}
                        name="id_producer"
                        options={listProducer}
                        label={"Nhà sản xuất"}
                    />
                    <SelectInput
                        form={formCreate}
                        name="status"
                        options={listStatus}
                        label={"Trạng thái"}
                        disabled={[ACTION_TYPE.CREATE, ACTION_TYPE.VIEW].includes(statusForm.action)}
                        fieldProps={{
                            defaultValue: 1,
                        }}
                    />
                </Col>
                <Col xs={24} sm={24} md={8} xl={8}>
                    <Button
                        style={{ marginBottom: 4 }}
                        icon={<CloudUploadOutlined />}
                        onClick={async () => {
                            handleOpenWidget()
                        }}
                        size="default"
                    >
                        Ảnh
                    </Button>
                    {mainImg && <Image
                        width={300}
                        src={mainImg}
                    />}
                </Col>
            </Row>
            <Divider style={{ borderColor: '#7cb305' }} variant="dotted" orientation="left" plain>
                Chi tiết sản phẩm
            </Divider>
            <div>
                <ListForm
                    colProps={{
                        xs: 24,
                        sm: 24,
                        md: 24,
                        lg: 24,
                        xxl: 24,
                    }}
                    initialValues={[undefined]}
                    listFormProps={{
                        name: ['listColor'],
                        creatorButtonProps: {
                            prefixCls: 'bss-creator-form',
                            style: creatorButtonStyle,
                            creatorButtonText: "Thêm màu sắc",
                        },
                        copyIconProps: false,
                        deleteIconProps: false,
                    }}
                >
                    {(metaColor, indexColor, actionColor) => {
                        return (
                            <div>
                                <Row gutter={16} align="top">
                                    <Col xs={24} sm={24} md={18} xl={18}>
                                        <Row>
                                            <Col xs={24} sm={24} md={24} xl={24}>
                                                <TextInput
                                                    autoRequired
                                                    name="color"
                                                    label={"Màu sắc"}
                                                />
                                            </Col>
                                        </Row>
                                        <Row gutter={16}>
                                            <Col span={24}>
                                                <ListForm
                                                    colProps={{
                                                        xs: 24,
                                                        sm: 24,
                                                        md: 24,
                                                        lg: 24,
                                                        xxl: 24,
                                                    }}
                                                    initialValues={[undefined]}
                                                    listFormProps={{
                                                        name: ['listDetail'],
                                                        creatorButtonProps: {
                                                            prefixCls: 'bss-creator-form',
                                                            style: creatorButtonStyle,
                                                            creatorButtonText: "Thêm dung lượng, giá bán",
                                                        },
                                                        copyIconProps: false,
                                                        deleteIconProps: false,
                                                    }}
                                                >
                                                    {(metaDetail, indexDetail, actionDetail) => {
                                                        return (
                                                            <Row gutter={16} align="bottom">
                                                                <Col xs={0} sm={0} md={0} xl={0}>
                                                                    <TextInput
                                                                        name="id"
                                                                        label={"id"}
                                                                    // placeholder={"Nhập màu sắc"}
                                                                    />
                                                                </Col>
                                                                <Col xs={24} sm={24} md={8} xl={8}>
                                                                    <TextInput
                                                                        autoRequired
                                                                        name="size"
                                                                        label={"Size"}
                                                                    />
                                                                </Col>
                                                                <Col xs={24} sm={24} md={6} xl={6}>
                                                                    <TextInput
                                                                        autoRequired
                                                                        name="quantity"
                                                                        label={"Số lượng"}
                                                                    />
                                                                </Col>
                                                                <Col xs={24} sm={24} md={8} xl={8}>
                                                                    <NumberInput
                                                                        isDotNumberFormat
                                                                        isNonTypingZero
                                                                        fieldProps={{
                                                                            maxLength: 15,
                                                                            addonAfter: 'VNĐ',
                                                                            onPaste: (event) => {
                                                                                const pastedText = event.clipboardData.getData('text/plain')
                                                                                if (!/^\d+$/.test(pastedText)) {
                                                                                    event.preventDefault()
                                                                                }
                                                                            },
                                                                        }}
                                                                        name={"price"}
                                                                        label={"Giá bán"}
                                                                        autoRequired
                                                                    />
                                                                </Col>
                                                                <Col span={2}>
                                                                    <Button
                                                                        style={{ marginBottom: 4 }}
                                                                        disabled={indexDetail === 0}
                                                                        onClick={() => onDeleteAction(indexDetail, actionDetail, DELETE_ITEM.SIZE)}
                                                                        type="default"
                                                                        icon={<DeleteFilled />}
                                                                        size={"default"}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        )
                                                    }}
                                                </ListForm>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={24} sm={24} md={4} xl={4}>
                                        <Button
                                            style={{ marginBottom: 4 }}
                                            icon={<CloudUploadOutlined />}
                                            onClick={async () => {
                                                await formCreate.validateFields([['listColor', indexColor, 'color']])
                                                const colorKey = formCreate.getFieldValue('listColor')[indexColor]?.color;
                                                handleOpenWidget(colorKey)
                                            }}
                                            size="default"
                                        >
                                            Ảnh
                                        </Button>
                                        {<Image
                                            width={150}
                                            key={indexColor}
                                            src={imageUrls[indexColor]?.value}
                                        />}
                                    </Col>
                                    <Col xs={24} sm={24} md={2} xl={2}>
                                        <Button disabled={indexColor === 0}
                                            onClick={() => onDeleteAction(indexColor, actionColor, DELETE_ITEM.COLOR)} type="dashed" icon={<DeleteFilled />} size={"default"} />
                                    </Col>
                                </Row>
                            </div>
                        )
                    }}
                </ListForm>
            </div>
        </CustomModalForm >
    )
}


export default FormCreateUpdate;