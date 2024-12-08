import React, { ChangeEvent, useMemo } from 'react'
import {
    ProForm, ProFormDigit, ProFormText
} from '@ant-design/pro-form';
import { FormattedMessage, useIntl } from 'react-intl'
import { NUMBER_INPUT_TYPE } from '../../constants';
export const NumberInput = (props) => {
    //state
    const {
        fieldProps,
        type = NUMBER_INPUT_TYPE.TEXT_NUMBER,
        isNonTypingZero = false,
        convertValue,
        isDotNumberFormat = false,
        accept = '[^0-9]',
        isLower = true,
        autoRequired,
        ...restprops
    } = props
    const intl = useIntl()
    const form = ProForm.useFormInstance()

    //function
    const handleConvertValue = (value = '') => {
        if (isNonTypingZero && value && value.toString().startsWith('0')) {
            while (value.toString().startsWith('0')) {
                value = value.substring(1, value.length)
            }
            return value
        }
        if (value && isDotNumberFormat) {
            if (value == '-') {
                return '-'
            }
            if (value.includes('-')) {
                if (value.startsWith('-')) {
                    value = '-' + value.slice(1).replace(/-/g, '')
                    if (value == '-') {
                        return '-'
                    }
                } else value = value.replace(/-/g, '')
            }
            return intl.formatNumber(value.toString().replace(/\./g, '').replace(/,/g, ''))
                .toString()
        }

        return value
    }

    const handleChange = (
        event
    ) => {
        if (!event) {
            return
        }
        if (typeof event === 'number' || typeof event === 'string') {
            console.log('1');

            form.setFieldValue(props.name, event)
            if (fieldProps && fieldProps.onChange) {
                fieldProps?.onChange(event)
            }
        } else {
            console.log('2');
            let parseValue = event.target.value
            parseValue = parseValue.replace(new RegExp(accept, 'g'), '')
            form.setFieldValue(props.name, handleConvertValue(parseValue))
            if (fieldProps && fieldProps.onChange) {

                event.target.value = parseValue
                fieldProps?.onChange(event)
            }
        }
    }

    const handleBlur = (event) => {
        const value = form && form.getFieldValue(props.name)
        if (value && typeof value === 'string') {
            form.setFieldValue(props.name, value?.trim())
        }
        if (fieldProps && fieldProps.onBlur) {
            fieldProps.onBlur(event)
        }
    }
    const handleFormatter = (
        number,
        info
    ) => {
        if (number && !info.userTyping) {
            return intl.formatNumber(number).toString()
        }
        return String(number)
    }

    const placeholder = useMemo(() => {
        let label = props?.label
        if (isLower) label = label?.toString().toLowerCase()
        return "Chọn giá trị"
    }, [props.label, isLower])

    if (autoRequired) {
        restprops.rules = [
            ...(restprops.rules ?? []),
            {
                required: true,
                message: "Không được để trống !",
            },
        ]
    }

    ///render
    if (type === NUMBER_INPUT_TYPE.NUMBER) {
        return (
            <ProFormDigit
                allowClear
                placeholder={placeholder}
                fieldProps={{
                    ...fieldProps,
                    //@ts-ignore
                    onChange: handleChange,
                    onBlur: handleBlur,
                    // formatter: handleFormatter,
                }}
                formItemProps={{
                    style: {
                        marginBottom: 4,
                    },
                    ...props.formItemProps,
                }}
                {...restprops}
            />
        )
    } else {
        return (
            <ProFormText
                allowClear
                placeholder={placeholder}
                fieldProps={{
                    ...fieldProps,
                    onChange: handleChange,
                    onBlur: handleBlur,
                }}
                formItemProps={{
                    style: {
                        marginBottom: 4,
                    },
                    ...props.formItemProps,
                }}
                {...restprops}
            />
        )
    }
}
