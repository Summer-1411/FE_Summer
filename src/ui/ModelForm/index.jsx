import React, { useMemo, useRef } from 'react'
import { ModalForm } from '@ant-design/pro-form'
import { useIntl } from 'react-intl'
import { CloseOutlined, SaveFilled } from '@ant-design/icons'

const CustomModalForm = (props) => {
    const intl = useIntl()
    const form = useRef(null)
    const {
        children,
        title,
        onCancel,
        onReset,
        customButton,
        submitterConfig,
        labelCol = { md: 12, xl: 12, xxl: 12 },
        colProps = {
            md: 12,
            xl: 12,
            xxl: 12,
        },
        rowProps = {
            gutter: 16,
            wrap: true,
        },
        resetText = "Làm mới",
        submitText = "Lưu dữ liệu",
        resetIcon = <CloseOutlined style={{ marginRight: 6 }} />,
        submitIcon = <SaveFilled style={{ marginRight: 6, marginLeft: 6 }} />,
        onFinish,
        modalProps = {},
        isDisable,
        trigger,
        isLoading = false,
    } = props


    //get value form when submit
    const handleFinish = async () => {
        if (onFinish && form.current) {
            onFinish(form.current.getFieldsValue())
        }
    }

    return useMemo(
        () => (
            <>
                {!!props?.customTrigger && props.customTrigger}
                <ModalForm
                    style={{
                        marginRight: -8,
                        zIndex: -999,
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        ...props.style,
                    }}
                    size={'middle'}
                    title={title}
                    formRef={form}
                    loading={false}
                    autoFocusFirstInput
                    trigger={!props?.customTrigger ? trigger : undefined}
                    submitter={{
                        resetButtonProps: {
                            onClick: () => onReset?.(),
                            disabled: false,
                        },
                        submitButtonProps: { disabled: isDisable, loading: isLoading },
                        searchConfig: {
                            resetText: (
                                <div>
                                    {resetIcon}
                                    {!(props.readonly || props.disabled)
                                        ? resetText
                                        : "Hủy"}
                                </div>
                            ),
                            submitText: (
                                <div>
                                    {submitIcon}
                                    {submitText}
                                </div>
                            ),
                        },
                        render: (_, doms) => {
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
                                    {doms[0]}
                                    {customButton}
                                    {(!props.readonly || !props.disabled) && doms[1]}
                                </div>
                            )
                        },
                        ...submitterConfig,
                    }}
                    {...props}
                    modalProps={{
                        wrapClassName: 'bss-form-modal',
                        destroyOnClose: true,
                        onCancel: () => onCancel?.(),
                        closeIcon: <CloseOutlined />,
                        ...modalProps,
                    }}
                    colProps={{ ...{ xs: 24, sm: 24 }, ...colProps }}
                    labelCol={{ ...{ xs: 24, sm: 24 }, ...labelCol }}
                    rowProps={rowProps}
                    onFinish={handleFinish}
                    dateFormatter={false}
                >
                    {children}
                </ModalForm>
            </>
        ),
        [
            props,
            title,
            resetIcon,
            resetText,
            intl,
            submitIcon,
            submitText,
            colProps,
            labelCol,
            rowProps,
            onCancel,
            customButton,
            onFinish,
        ]
    )
}


export default CustomModalForm;