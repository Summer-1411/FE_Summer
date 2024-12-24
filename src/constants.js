import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import CategoryIcon from '@mui/icons-material/Category';
import StoreIcon from '@mui/icons-material/Store';
import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
const toastOption = {
    position: "top-center",
    autoClose: 3000,
    pauseOnHover: false,
    draggable: false,
    theme: 'light'
}
const toastOptionRight = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: false,
    draggable: false,
    theme: 'light'
}

//-1: Đơn hàng khách huỷ
//0: Đang chờ xử ý
//1: Đã duyệt đơn
//2: Đã hoàn thành
//-2: Không chấp nhận direct payment

const PAYMENT_METHOD = {
    ONLINE_PAYMENT: '2', //thanh toán khi nhận hàng
    DIRECT_PAYMENT: '1' // thanh toán trực tuyến
}


const genders = [
    {
        id: 1,
        title: "Nam"
    },
    {
        id: 2,
        title: "Nữ"
    },
    {
        id: 3,
        title: "Khác"
    }
]

const routeUserPage = [
    {
        id: 1,
        icon: AccountCircleOutlinedIcon,
        title: "Tài khoản của tôi",
        path: "profile"
    },
    {
        id: 2,
        icon: InventoryOutlinedIcon,
        title: "Đơn mua",
        path: "purchase"
    },
    {
        id: 3,
        icon: SettingsIcon,
        title: "Đổi mật khẩu",
        path: "change-password"
    }
]

const sideBarAdmin = [
    {
        id: 1,
        icon: DashboardOutlinedIcon,
        title: "Trang chủ",
        path: "dashboard"
    },
    // {
    //     id: 12,
    //     icon: MessageOutlinedIcon,
    //     title: "Tin nhắn",
    //     path: "chat"
    // },
    {
        id: 9,
        icon: BarChartIcon,
        title: "Thống kê",
        path: "revenue"
    },
    {
        id: 8,
        icon: TrendingUpIcon,
        title: "Thống kê khách hàng",
        path: "customer-statistics"
    },
    // {
    //     id: 2,
    //     icon: SmartphoneIcon,
    //     title: "Sản phẩm",
    //     path: "products"
    // },
    {
        id: 7,
        icon: SmartphoneIcon,
        title: "Quản lý sản phẩm",
        path: "manage-product"
    },
    {
        id: 10,
        icon: AccountCircleOutlinedIcon,
        title: "Quản lý khách hàng",
        path: "manage-user"
    },
    {
        id: 11,
        icon: ManageHistoryIcon,
        title: "Theo dõi hệ thống",
        path: "tracking-log"
    },
    {
        id: 13,
        icon: ShoppingCartOutlinedIcon,
        title: "Quản lý đơn hàng",
        path: "manage-order"
    },
    {
        id: 14,
        icon: WhatshotOutlinedIcon,
        title: "Quản lý voucher",
        path: "manage-voucher"
    },
    // {
    //     id: 4,
    //     icon: ShoppingCartOutlinedIcon,
    //     title: "Đơn hàng",
    //     path: "orders"
    // },
    {
        id: 5,
        icon: StoreIcon,
        title: "Nhà sản xuất",
        path: "producer"
    },
    {
        id: 6,
        icon: CategoryIcon,
        title: "Loại sản phẩm",
        path: "category"
    }
]


const routeOrderAdmin = [
    {
        id: 1,
        path: "",
        title: "Chờ xử lý"
    },
    {
        id: 2,
        path: "confirmed",
        title: "Đã xác nhận"
    },
    {
        id: 3,
        path: "success",
        title: "Thành công"
    },
    {
        id: 4,
        path: "refuse",
        title: "Đã huỷ bỏ"
    },
    {
        id: 5,
        path: "cancel",
        title: "Khách huỷ"
    }
]

const routesPurchasePage = [
    {
        id: 1,
        path: "",
        title: "Chờ xác nhận"
    },
    {
        id: 2,
        path: "toship",
        title: "Đang giao"
    },
    {
        id: 3,
        path: "complete",
        title: "Hoàn thành"
    },
    {
        id: 4,
        path: "cancel",
        title: "Đã huỷ"
    },
]

const categorys = [
    {
        name: "Android",
        id: 1
    },
    {
        name: "iPhone (IOS)",
        id: 2
    },
    {
        name: "Khác",
        id: 3
    }
]

const METHOD_API = [
    {
        value: 'POST',
        label: 'POST'
    },
    {
        value: 'PUT',
        label: 'PUT'
    },
    {
        value: 'DELETE',
        label: 'DELETE'
    },
    {
        value: 'GET',
        label: 'GET'
    }
]

const producers = [
    {
        id: 1,
        name: "iPhone"
    },
    {
        id: 2,
        name: "SAMSUNG"
    },
    {
        id: 3,
        name: "OPPO"
    },
    {
        id: 4,
        name: "XIAOMI"
    },
    {
        id: 5,
        name: "VIVO"
    },
    {
        id: 6,
        name: "Realme"
    },
    {
        id: 7,
        name: "NOKIA"
    },
    {
        id: 8,
        name: "iTel"
    },
    {
        id: 9,
        name: "Masstel"
    },
]
const listStatus = [
    {
        value: 1,
        label: "Hoạt động",
    },
    {
        value: 0,
        label: "Không hoạt động",
    }
]

const listGender = [
    {
        value: 1,
        label: "Nam",
    },
    {
        value: 2,
        label: "Nữ",
    },
    {
        value: 3,
        label: "Khác",
    }
]



const NUMBER_INPUT_TYPE = {
    TEXT_NUMBER: 'TEXT_NUMBER',
    NUMBER: 'NUMBER',
}

const ModalType = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    WARNING: 'WARNING',
    DELETE: 'DELETE',
    INFO: 'INFO',
}

const ACTION_TYPE = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    VIEW: 'VIEW'
}


const DELETE_ITEM = {
    COLOR: 'COLOR',
    SIZE: 'SIZE'
}

const INFOR_PRODUCT = {
    COLOR: 'color',
    SIZE: 'size'
}
//-1: Đơn hàng khách huỷ
//0: Đang chờ xử ý
//1: Đã duyệt đơn
//2: Đã hoàn thành
//-2: Không chấp nhận
const STATUS_ORDER = [
    {
        label: 'Chờ duyệt',
        value: 0
    },
    {
        label: 'Đang giao hàng',
        value: 1
    },
    {
        label: 'Đã hoàn thành',
        value: 2
    },
    {
        label: 'Đã hủy bỏ',
        value: -2
    },
    {
        label: 'Khách hủy đơn',
        value: -1
    },
    {
        label: 'Chờ thanh toán',
        value: 10
    }
]

const PAYMENT_TYPE = [
    {
        label: 'Thanh toán khi nhận hàng',
        value: "1"
    },
    {
        label: 'Thanh toán online',
        value: "2"
    }
]



const STATUS = {
    ACTIVE: 1,
    INACTIVE: 0
}

const SUMMER_SHOP = "summerShop"

export const DATE_FORMAT = 'DD/MM/YYYY'
export const DATE_FORMAT_2 = 'DDMMYYYY'
export const DATE_FORMAT_3 = 'YYYY-MM-DD'
export const DATE_FORMAT_4 = 'MM/YYYY'
export const DATE_FORMAT_5 = 'DD-MM-YYYY'
export const TIME_FORMAT = 'HH:mm:ss'
export const DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm:ss'
export const DATE_TIME_FORMAT2 = 'DD-MM-YYYY HH:mm:ss'
export const DATE_TIME_FORMAT3 = 'YYYY-MM-DD HH:mm:ss'
export const DATE_TIME_FORMAT_FIX_TIME = 'DD/MM/YYYY 00:00:00'
export const DATE_TIME_FORMAT_FIX_END_TIME = 'DD/MM/YYYY 23:59:59'
export {
    genders,
    routesPurchasePage,
    routeUserPage,
    SUMMER_SHOP,
    sideBarAdmin,
    routeOrderAdmin,
    toastOption,
    categorys,
    producers,
    listStatus,
    NUMBER_INPUT_TYPE,
    PAYMENT_METHOD,
    ModalType,
    ACTION_TYPE,
    DELETE_ITEM,
    INFOR_PRODUCT,
    listGender,
    STATUS,
    METHOD_API,
    toastOptionRight,
    STATUS_ORDER,
    PAYMENT_TYPE
}

