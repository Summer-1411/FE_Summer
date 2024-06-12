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
const toastOption = {
    position: "top-center",
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
        path: ""
    },
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
    {
        id: 2,
        icon: SmartphoneIcon,
        title: "Sản phẩm",
        path: "products"
    },
    {
        id: 3,
        icon: AccountCircleOutlinedIcon,
        title: "Khách hàng",
        path: "users"
    },
    {
        id: 4,
        icon: ShoppingCartOutlinedIcon,
        title: "Đơn hàng",
        path: "orders"
    },
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

const SUMMER_SHOP = "summerShop"
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
    PAYMENT_METHOD
}

