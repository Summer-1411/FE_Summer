import React, { memo } from 'react'
import { ProFormList } from '@ant-design/pro-form'

function ListForm(
    props
) {
    const { listFormProps, initialValues, children, ...restProps } = props
    const creatorButtonStyle = {
        background: '#fff0f0',
    }

    if (children == undefined) {
        return <></>
    }

    return (
        <ProFormList
            {...restProps}
            creatorButtonProps={{
                prefixCls: 'bss-creator-form',
                style: creatorButtonStyle,
                creatorButtonText: "Thêm mới",
            }}
            copyIconProps={{
                tooltipText: "Sao chép",
            }}
            deleteIconProps={{
                tooltipText: "Xóa",
            }}
            alwaysShowItemLabel
            {...listFormProps}
            name={listFormProps?.name || []}
            initialValue={initialValues}
        >
            {children}
        </ProFormList>
    )
}


export default memo(ListForm)