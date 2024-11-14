import { IntlProvider as Provider } from 'react-intl'

export default function IntlProvider({ children }) {
    return (
        <Provider
            //   messages={flattenMessages(message)}
            defaultLocale="vi-VN"
            locale={'vi-VN'}
        >
            {children}
        </Provider>
    )
}
