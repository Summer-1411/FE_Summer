
import { Button, Col, Divider, Image, Row } from 'antd'
import CustomModalForm from '../../../../ui/ModelForm'
import { useModalConfirm } from '../../../../ui/ConfirmModel/ModalContextCustom'
import TextInput from '../../../../ui/TextInput'
import { TextArea } from '../../../../ui/TextArea'
import { NumberInput } from '../../../../ui/NumberInput';
import SelectInput from '../../../../ui/Select';
import { ACTION_TYPE, DELETE_ITEM, listStatus, METHOD_API, ModalType, toastOption } from '../../../../constants';
import { toast } from 'react-toastify';
import { useTrackingLog } from '../hooks/TrackingLogContext'

const FormCreateUpdate = () => {
    const { formCreate,
        statusForm, setStatusForm
    } = useTrackingLog()
    const { showConfirm } = useModalConfirm()






    const updateImageUrl = (key, url) => {

    };


    const handleResetForm = () => {
        formCreate.resetFields();
    }






    const handleSubmitData = async (values) => {

    }
    const saveData = async (dataSubmit) => {

        handleClose()
    }



    const handleClose = () => {
        setStatusForm({
            open: false,
            action: ''
        })
    }
    const onCancel = () => {
        handleClose()
    }


    return (
        <CustomModalForm
            width={1000}
            open={statusForm.open}
            title={"Chi tiết yêu cầu"}
            onFinish={handleSubmitData}
            form={formCreate}
            disabled
            onCancel={onCancel}
            submitter={{
                render: (_, doms) => {
                    return (
                        <div>
                        </div>
                    )
                },
            }}
            onReset={handleResetForm}
        >
            <Row gutter={16}>
                <Col xs={24} sm={24} md={12} xl={12}>
                    <SelectInput
                        form={formCreate}
                        name="method"
                        options={METHOD_API}
                        label={"Method"}
                    />
                    <TextInput
                        name="ipAddress"
                        label={"Địa chỉ ip"}
                    />
                </Col>
                <Col xs={24} sm={24} md={12} xl={12}>
                    <TextInput
                        name="url"
                        label={"Url"}
                    />
                    <TextInput
                        name="statusCode"
                        label={"Status"}
                    />
                </Col>
            </Row>
            <TextArea
                name="requestBody"
                label={"Request body"}
            />
            <TextArea
                name="responseBody"
                label={"Response body"}
            />
            <TextInput
                name="responseTime"
                label={"Thời gian phản hồi (s)"}
            />
            <TextInput
                name="userAgent"
                label={"User Agent"}
            />
        </CustomModalForm >
    )
}


export default FormCreateUpdate;