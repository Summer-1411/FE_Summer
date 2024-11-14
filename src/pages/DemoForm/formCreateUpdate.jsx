
import { FormattedMessage, useIntl } from 'react-intl'
import { TextArea } from '../../ui/TextArea'
import TextInput from '../../ui/TextInput'
import { useModalConfirm } from '../../ui/ConfirmModel/ModalContextCustom'
import CustomModalForm from '../../ui/ModelForm'
import { ProForm, ProFormText } from '@ant-design/pro-form'
import { Col, Row } from 'antd'



export const FormCreateUpdate = (props) => {
    const { form, open, handleClose } = props
    const intl = useIntl()
    const { showConfirm } = useModalConfirm()

    const resetForm = () => {

    }



    const handleCreateOrUpdate = async (row) => {
        await form.validateFields()
        console.log('props', props);
    }

    const messageCheckChangeValue = () => {

    }

    const onCancel = () => {
        handleClose()
    }

    const handleCreate = () => {

    }

    const handleOnSelectParent = (data) => {
    }

    return (
        <CustomModalForm
            width={'100%'}
            open={open}
            title={"Thêm mới"}
            onFinish={handleCreateOrUpdate}
            form={form}
            onCancel={onCancel}
            onReset={() => {
                form.resetFields();
            }}
        >
            <Row gutter={16}>
                <Col xs={24} sm={24} md={12} xl={6}>
                    <TextInput
                        name="itemCode"
                        autoRequired
                        label={"Code"}
                        key="code"
                        isUpperCase={true}
                        accept={'[^A-Za-z0-9_+*-]'}
                        replaceSignCharacter
                        fieldProps={{
                            maxLength: 30,
                        }}
                    />
                </Col>
            </Row>




        </CustomModalForm>
    )
}
