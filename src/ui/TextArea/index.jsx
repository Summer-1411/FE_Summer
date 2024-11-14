import { ProForm, ProFormTextArea } from '@ant-design/pro-form'
import React from 'react'
import { useIntl } from 'react-intl'

export const TextArea = (props) => {
    const { fieldProps, autoRequired, ...restProps } = props
    const intl = useIntl()
    const form = ProForm.useFormInstance()

    const handleBlur = (event) => {
        const value = form && form.getFieldValue(props.name)
        if (value) {
            form.setFieldValue(props.name, value?.trim())
        }
        if (fieldProps && fieldProps.onBlur) {
            fieldProps.onBlur(event)
        }
    }

    if (autoRequired) {
        restProps.rules = [
            ...(restProps.rules ?? []),
            {
                required: true,
                message: "Không được để trống",
            },
        ]
    }

    return (
        <ProFormTextArea
            fieldProps={{
                placeholder: 'Nhập ' + `${props?.label ? props.label.toString().toLowerCase() : ''}`,
                ...fieldProps,
                onBlur: handleBlur,
            }}
            allowClear
            {...restProps}
        />
    )
}
