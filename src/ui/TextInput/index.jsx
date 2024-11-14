import { ProForm, ProFormText } from '@ant-design/pro-form'
import React, { memo, useCallback, useMemo } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { removevietnamese } from '../../utils/StringUtils'

const TextInput = (props) => {
    const {
        regexInput = /[!@#$%^&*()_+{}\[\]:;<>,.?~\-=/\\|]/g,
        replacementChar = '',
        isLowerCase = false,
        isUpperCase = false,
        blockSpecialChar = false,
        replaceSignCharacter = false,
        formItemProps,
        convertValue,
        fieldProps,
        accept = undefined,
        isLower = true,
        autoRequired,
        ...restprops
    } = props
    const intl = useIntl()
    const form = ProForm.useFormInstance()
    const replaceSpecialChars = useCallback(
        (inputString) => {
            // Use the replace() method to replace special characters
            if (replaceSignCharacter) {
                return removevietnamese(inputString.replace(regexInput, ''))
            } else {
                return inputString.replace(regexInput, '')
            }
        },
        [regexInput, replacementChar, replaceSignCharacter]
    )

    const handleConvertValue = useMemo(
        () => (value) => {
            if (blockSpecialChar && value) {
                value = replaceSpecialChars(value)
            }
            if (isUpperCase && value) {
                value = value.toUpperCase()
            }
            if (isLowerCase && value) {
                value = value.toLowerCase()
            }
            return value
        },
        [
            blockSpecialChar,
            isUpperCase,
            isLowerCase,
            replaceSpecialChars,
            replaceSignCharacter,
        ]
    )

    const handleChange = (event) => {
        let parseValue = event.target.value
        if (accept) {
            if (replaceSignCharacter) {
                parseValue = removevietnamese(parseValue, accept)
            } else {
                parseValue = parseValue.replace(new RegExp(accept, 'gm'), '')
            }
            form?.setFieldValue?.(
                props.name,
                handleConvertValue(parseValue)
            )
            if (fieldProps && fieldProps.onChange) {
                fieldProps?.onChange(event)
            }
        } else {
            form?.setFieldValue?.(
                props.name,
                handleConvertValue(parseValue)
            )
            if (fieldProps && fieldProps.onChange) {
                fieldProps?.onChange(event)
            }
        }
    }
    const handleBlur = (event) => {
        const value = form && form.getFieldValue(props.name)
        if (value) {
            form.setFieldValue(props.name, value?.trim())
        }
        if (fieldProps && fieldProps.onBlur) {
            fieldProps.onBlur(event)
        }
    }

    const placeholder = useMemo(() => {
        let label = props?.label

        if (isLower) label = label?.toString().toLowerCase()
        return 'Nhập ' + `${label ? label : ''}`
    }, [props.label, isLower])

    if (autoRequired) {
        restprops.rules = [
            ...(restprops.rules ?? []),
            {
                required: true,
                message: "Không được để trống",
            },
        ]
    }

    return (
        <ProFormText
            allowClear
            placeholder={placeholder}
            formItemProps={{
                style: {
                    marginBottom: 4,
                },
                ...formItemProps,
            }}
            {...restprops}
            fieldProps={{
                ...fieldProps,
                onChange: handleChange,
                onBlur: handleBlur,
            }}
        />
    )
}

export default memo(TextInput)