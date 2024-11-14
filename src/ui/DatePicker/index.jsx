import { DATE_FORMAT, DATE_FORMAT_2 } from '../../constants'
import {
  ProForm,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDateTimePicker,
  ProFormDateTimeRangePicker,
  ProFormTimePicker,
} from '@ant-design/pro-form'
import 'dayjs/locale/vi.js'
import locale from 'antd/es/date-picker/locale/vi_VN'
export const DateInput = (props) => {
  const {
    format = [DATE_FORMAT, DATE_FORMAT_2],
    fieldProps,
    formItemProps,
    autoRequired = false,
    ...restProps
  } = props
  let Picker
  const form = ProForm.useFormInstance()

  switch (props?.type) {
    case 'date-time-time':
      Picker = ProFormDateTimeRangePicker
      break
    case 'date-time':
      Picker = ProFormDateTimePicker
      break
    case 'time':
      Picker = ProFormTimePicker
      break
    case 'range':
      Picker = ProFormDateRangePicker
      break
    case 'normal':
      Picker = ProFormDatePicker
      break
    case 'month':
      Picker = ProFormDatePicker.Month
      break
    case 'year':
      Picker = ProFormDatePicker.Year
      break
    default:
      Picker = ProFormDatePicker
  }

  const handleChange = (date, dateString) => {
    form.setFieldValue(props.name, date)
    if (fieldProps && fieldProps.onChange) {
      fieldProps.onChange(date, dateString)
    }
  }

  if (autoRequired) {
    restProps.rules = [
      ...(restProps.rules ?? []),
      {
        required: true,
        message: "Vui lòng chọn dữ liệu",
      },
    ]
  }

  return (
    <Picker
      //@ts-ignore
      fieldProps={{
        format: format,
        style: {
          width: '100%',
        },
        ...fieldProps,
        onChange: handleChange,
        locale: locale,
      }}
      formItemProps={{
        style: {
          marginBottom: 4,
        },
        ...formItemProps,
      }}
      {...restProps}
      rules={restProps.rules}
    />
  )
}
