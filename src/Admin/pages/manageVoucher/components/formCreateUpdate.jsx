
import { Card, Col, Descriptions, Form, Image, Row, Statistic, Typography } from 'antd'
import CustomModalForm from '../../../../ui/ModelForm'
import { useEffect, useMemo, useState } from 'react';
import { numberWithCommas } from '../../../../utils/formatMoney';
import { IMAGE_DEFAULT, request } from '../../../../requestMethod';
import { formatDate } from '../../../../utils/formatDate';
import { useManageVoucher } from '../hooks/ManageVoucherContext';
import TextInput from '../../../../ui/TextInput';
import SelectInput from '../../../../ui/Select';
import { TextArea } from '../../../../ui/TextArea';
import { NumberInput } from '../../../../ui/NumberInput';
import { DateInput } from '../../../../ui/DatePicker';
import { ACTION_TYPE, DATE_FORMAT, listStatus } from '../../../../constants';
import moment from 'moment/moment';
import dayjs from 'dayjs';
import { useCreateVoucher, useUpdateVoucher } from '../../../../services/voucher';
import { useIntl } from 'react-intl';
import { hasValue } from '../../../../utils/utils';

const { Title } = Typography;

const FormCreateUpdate = () => {
    const {
        statusForm, setStatusForm, formCreate
    } = useManageVoucher()

    const { initData } = statusForm
    const createVoucher = useCreateVoucher()
    const updateVoucher = useUpdateVoucher()
    const handleSubmitData = async (values) => {
        const expiredTime = dayjs(values.expiredTime).format(DATE_FORMAT)
        const minOrderValue = hasValue(values.minOrderValue) ? parseInt(String(values.minOrderValue).replace(/\./g, ''), 10) : undefined;
        const maxMoney = hasValue(values.maxMoney) ? parseInt(String(values.maxMoney).replace(/\./g, ''), 10) : undefined;
        const data = {
            ...initData,
            ...values,
            minOrderValue,
            maxMoney,
            expiredTime: expiredTime
        }
        if (statusForm.action === ACTION_TYPE.CREATE) {
            await createVoucher.mutateAsync(data);
        } else if (statusForm.action === ACTION_TYPE.UPDATE) {
            await updateVoucher.mutateAsync(data);
        }
        onCancel()
    }
    const onCancel = () => {
        setStatusForm({
            open: false,
            action: '',
            initData: null
        })
    }

    const handleResetForm = () => {
        formCreate.resetFields();
    }

    const getTitleModelForm = () => {
        switch (statusForm.action) {
            case ACTION_TYPE.CREATE:
                return 'Thêm mới mã giảm giá'
            case ACTION_TYPE.UPDATE:
                return 'Cập nhật mã giảm giá'
            case ACTION_TYPE.VIEW:
                return 'Chi tiết mã giảm giá'
            default:
                return 'Thêm mới mã giảm giá'
        }

    }

    return (
        <CustomModalForm
            width={1000}
            open={statusForm.open}
            title={getTitleModelForm()}
            form={formCreate}
            onFinish={handleSubmitData}
            onCancel={onCancel}
            disabled={statusForm.action === ACTION_TYPE.VIEW}
            isDisableReset={statusForm.action !== ACTION_TYPE.CREATE}
            onReset={handleResetForm}
        >
            <Row gutter={16}>
                <Col xs={24} sm={24} md={12} xl={12}>
                    <TextInput
                        name="code"
                        isUpperCase
                        label={"Mã giảm giá"}
                        autoRequired
                    />
                    <NumberInput
                        isDotNumberFormat
                        isNonTypingZero
                        fieldProps={{
                            maxLength: 3,
                            addonAfter: '%',
                            onPaste: (event) => {
                                const pastedText = event.clipboardData.getData('text/plain')
                                if (!/^\d+$/.test(pastedText)) {
                                    event.preventDefault()
                                }
                            },
                        }}
                        name={"value"}
                        label={"Giá trị"}
                        autoRequired
                    />
                </Col>
                <Col xs={24} sm={24} md={12} xl={12}>
                    <NumberInput
                        isDotNumberFormat
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
                        name={"minOrderValue"}
                        label={"Đơn tối thiểu"}
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
                        name={"maxMoney"}
                        label={"Giảm tối đa"}
                    />
                </Col>
                <Col xs={24} sm={24} md={12} xl={12}>
                    <NumberInput
                        isNonTypingZero
                        fieldProps={{
                            maxLength: 15,
                            onPaste: (event) => {
                                const pastedText = event.clipboardData.getData('text/plain')
                                if (!/^\d+$/.test(pastedText)) {
                                    event.preventDefault()
                                }
                            },
                        }}
                        name={"quantity"}
                        label={"Số lượng"}
                        autoRequired
                    />
                </Col>
                <Col xs={24} sm={24} md={12} xl={12}>
                    <DateInput
                        type={'normal'}
                        name={"expiredTime"}
                        label={"Ngày hết hạn"}
                        fieldProps={{
                            format: DATE_FORMAT,
                        }}
                        placeholder={DATE_FORMAT}
                        autoRequired
                    />
                </Col>
            </Row>
            <TextArea
                name="description"
                label={"Mô tả"}
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
        </CustomModalForm >
    )
}


export default FormCreateUpdate;