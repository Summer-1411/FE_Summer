import {
    ProFormSelect
} from '@ant-design/pro-form';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { Spin, Table, Typography } from 'antd'
import { useImmer } from 'use-immer'
import { debounce, isEmpty } from 'lodash'
import { useWatch } from 'antd/es/form/Form'

export default function SelectInput(props) {
    const {
        form,
        name,
        fetchOptions,
        debounceTimeout = 800,
        prefixLabel = '',
        labelTitleKey = 'name',
        valueTitleKey = 'code',
        fieldProps,
        isReturnObject = true,
        isDropdownTable = false,
        valueKey = 'value',
        prefixLabelKey,
        labelKey = 'label',
        convertValue,
        onChangePage,
        columns,
        searchKey = ['label'],
        isLower = true,
        autoRequired,
        ...restProps
    } = props

    const intl = useIntl()
    const [value, setValue] = useState()
    const [isOpen, setIsOpen] = useImmer(false)
    const [fetching, setFetching] = useState(false)
    const [pageNumber, setPageNumber] = useState(0)
    const fetchRef = useRef(0)
    const valueInForm = useWatch(name, form)

    const convertOptions = useMemo(() => {
        if (props.options?.length > 0) {
            return props.options?.map((item) => {
                return {
                    ...item,
                    label:
                        prefixLabelKey && item[prefixLabelKey]
                            ? `${item[prefixLabelKey]} - ${item[labelKey]}`
                            : prefixLabel
                                ? prefixLabel + item[labelKey]
                                : item[labelKey],
                    value: item[valueKey],
                }
            })
        }
        return []
    }, [props.options])

    const [options, setOptions] = useState(convertOptions)

    const onScrollEnd = () => {
        setPageNumber(pageNumber + 1)
    }

    const searchKeys = useMemo(() => {
        if (!columns) {
            return []
        }
        return columns
            .filter((column) => column.dataIndex !== undefined)
            .map((column) => (column.dataIndex ? column.dataIndex.toString() : ""));
    }, [columns])

    const defaultColums = [
        {
            title: valueTitleKey,
            hidden: true,
            dataIndex: valueKey,
            key: 'value',
        },
        {
            title: labelTitleKey,
            dataIndex: labelKey,
            key: 'label',
        },
    ]

    const onVisibleChange = (value) => {
        setIsOpen(value)
    }
    const onSelectClear = () => {
        setValue(null)
        setIsOpen(false)
    }

    const debounceFetcher = useMemo(() => {
        if (fetchOptions) {
            const loadOptions = (value) => {
                fetchRef.current += 1
                setOptions([])
                const fetchId = fetchRef.current
                setFetching(true)
                fetchOptions(value).then((newOptions) => {
                    if (fetchId !== fetchRef.current) {
                        return
                    }
                    setOptions(newOptions)
                    setFetching(false)
                })
            }
            return debounce(loadOptions, debounceTimeout)
        } else {
            const loadLocalOptions = (value) => {
                setFetching(true)
                if (value && !isEmpty(value)) {
                    setOptions(
                        convertOptions?.filter((item) => {
                            return (
                                searchKey.some((key) => {
                                    console.log(item[key])
                                    const itemValue = JSON.stringify(item[key]?.toLowerCase())
                                    return itemValue && itemValue.includes(value?.toLowerCase())
                                }) ||
                                (isDropdownTable &&
                                    searchKeys.some((key) => {
                                        const itemValue = JSON.stringify(item[key]?.toLowerCase())
                                        return itemValue && itemValue.includes(value?.toLowerCase())
                                    }))
                            )
                        })
                    )
                    setFetching(false)
                } else {
                    setOptions(convertOptions)
                    setFetching(false)
                }
            }
            return debounce(loadLocalOptions, debounceTimeout)
        }
    }, [
        fetchOptions,
        debounceTimeout,
        convertOptions,
        prefixLabelKey,
        labelKey,
        prefixLabel,
    ])

    //Reset option
    useEffect(() => {
        setOptions(convertOptions)
    }, [convertOptions])

    //Reset Value
    useEffect(() => {
        if (fieldProps?.value) {
            setValue({
                label: fieldProps?.value[labelKey],
                value: fieldProps?.value[valueKey],
            })
        }
    }, [labelKey, fieldProps?.value, valueKey])

    useEffect(() => {
        setValue(valueInForm)
    }, [valueInForm])

    useEffect(() => {
        if (onChangePage) {
            onChangePage(pageNumber)
        }
    }, [pageNumber])

    const handleChange = (value, option) => {
        setValue(value)
        form?.setFieldValue(`${name}Opt`, option)
        form?.validateFields([`${name}Opt`]).then(() => { })
    }

    const renderDropdown = () => {
        return (
            <div>
                <Table
                    scroll={{ y: 240 }}
                    rowKey={'value'}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                setValue(record[valueKey])
                                setIsOpen(false)
                                form?.setFieldValue(
                                    name,
                                    // @ts-ignore
                                    isReturnObject ? record : record[valueKey]
                                )
                                // @ts-ignore
                                form?.setFieldValue(
                                    `${name}Opt`,
                                    // @ts-ignore
                                    options?.find((rc) => rc[valueKey] === record[valueKey])
                                )
                                form?.validateFields([name]).then(() => { })
                                form?.validateFields([`${name}Opt`]).then(() => { })
                            },
                        }
                    }}
                    bordered={true}
                    pagination={false}
                    dataSource={options}
                    columns={columns || defaultColums}
                />
            </div>
        )
    }

    const placeholder = useMemo(() => {
        let label = props?.label
        if (isLower) label = label ? label.toString().toLowerCase() : ''
        return 'Chọn giá trị ' + `${props?.label ? label : ''}`
    }, [props.label, isLower])

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
        <ProFormSelect
            allowClear
            formItemProps={{
                style: {
                    marginBottom: 4,
                },
            }}
            fieldProps={{
                onSearch: debounceFetcher,
                notFoundContent: fetching ? (
                    <Spin size={'small'} />
                ) : (
                    <Typography
                        style={{ opacity: 0.8, fontStyle: 'italic', margin: '4px' }}
                    >
                        Không có dữ liệu
                    </Typography>
                ),
                showSearch: true,
                filterOption: false,
                onClear: onSelectClear,
                onChange: handleChange,
                open: isOpen,
                value: value,
                onDropdownVisibleChange: onVisibleChange,
                dropdownRender: (menu) => {
                    if (!isDropdownTable) {
                        return menu
                    }
                    return renderDropdown()
                },
                ...fieldProps,
                onPopupScroll: (e) => {
                    e.persist()
                    let target = e.target

                    if (
                        target.scrollTop + target.offsetHeight >=
                        target.scrollHeight - 100
                    ) {
                        onScrollEnd()
                    }
                },
            }}
            placeholder={placeholder}
            name={name}
            {...restProps}
            rules={restProps.rules}
            options={options}
            convertValue={convertValue}
        />
    )
}
