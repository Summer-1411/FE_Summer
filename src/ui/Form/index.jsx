import { ProForm } from '@ant-design/pro-form'
import React, { useRef } from 'react'
import { CloseOutlined, SaveFilled } from '@ant-design/icons'
export function BForm() {
    const {
        children,
        onCancel,
        isResetBtn = false,
        submitIcon = <SaveFilled />,
        resetIcon = <CloseOutlined />,
        submitterConfig,
        customButton,
        resetText,
        submitText,
        onFinish = () => { },
        grid = true,
        labelCol = { md: 12, xl: 12, xxl: 12 },
        colProps = { md: 12, xl: 12, xxl: 12 },
        rowProps = { gutter: 16, wrap: true },
        focusTo,
        submitOnEnter = false,
        ...restProps
    } = props
    const intl = useIntl()
    const form = useRef(null)
    //get value form when submit
    const handleFinish = async () => {
        if (onFinish && form.current) {
            onFinish(form.current.getFieldsValue())
        }
    }
    return (
        <ProForm
            formRef={form}
            onKeyDown={(event) => {
                if (event.key === 'Enter' && submitOnEnter) {
                    restProps?.form?.submit()
                }
            }}
            submitter={{
                resetButtonProps: {
                    onClick: () => (onCancel ? onCancel() : null),
                    disabled: false,
                },
                submitButtonProps: {
                    loading: false,
                },
                searchConfig: {
                    resetText: (
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ marginRight: 6 }}>{resetIcon}</div>
                            {resetText
                                ? resetText
                                : "Làm mới"}
                        </div>
                    ),
                    submitText: (
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ marginRight: 6 }}>{submitIcon}</div>
                            {submitText
                                ? submitText
                                : "Tìm kiếm"}
                        </div>
                    ),
                },
                render: (props, doms) => {
                    return (
                        <div
                            style={{
                                display: 'flex',
                                gap: 8,
                                alignItems: 'center',
                                flex: 1,
                                justifyContent: 'flex-end',
                            }}
                        >
                            <div>{isResetBtn && doms[0]}</div>
                            <div>
                                {customButton ? customButton : <></>}
                                {doms[1]}
                            </div>
                        </div>
                    )
                },
                ...submitterConfig,
            }}
            {...restProps}
            colProps={{ ...colProps, ...{ xs: 24, sm: 24 } }}
            labelCol={{ ...labelCol, ...{ xs: 24, sm: 24 } }}
            rowProps={rowProps}
            grid={grid}
            onFinish={handleFinish}
        >
            {children}
        </ProForm>
    )
}

