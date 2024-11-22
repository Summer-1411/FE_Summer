import './style.scss';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/login/Login';
import Register from './pages/register/Register';

import Home from './pages/home/Home';
import ProductDetail from './pages/productDetail/ProductDetail';
import Cart from './pages/cart/Cart';
import User from './pages/user/User';
import Profile from './components/profile/Profile';
import Purchase from './components/purchase/Purchase';

import Order from './pages/order/Order';

import Layout from './layout/Layout';
import LayoutAdmin from './layout/LayoutAdmin';

import OrderPage from './Admin/pages/order/OrderPage';
import DashBoardPage from './Admin/pages/dashboard/DashBoardPage';
import OrderSuccess from './Admin/pages/orderSuccess/OrderSuccess';
import OrderRefuse from './Admin/pages/orderRefuse/OrderRefuse';
import OrderPending from './Admin/pages/orderPending/OrderPending';
import OrderConfirn from './Admin/pages/orderConfirm/OrderConfirn';
import OrderCancel from './Admin/pages/orderCancel/OrderCancel';


// import CompletedOrder from './pages/completedOrder/CompletedOrder';
// import ToShipOrder from './pages/toShipOrder/ToShipOrder';
// import PendingOrder from './pages/pendingOrder/PendingOrder';
// import CancelledOrder from './pages/cancelledOrder/CancelledOrder';

import 'react-toastify/dist/ReactToastify.css';
// import UserAdmin from './Admin/pages/user/UserAdmin';
// import NewProduct from './Admin/pages/newProduct/NewProduct';
// import ListProduct from './Admin/components/listProduct/ListProduct';
// import CountProductDeletedProvider from './context/countProductDeleted';

// import ListUser from './Admin/components/listUser/ListUser';
// import ListProductDeleted from './Admin/components/listProduct/ListProductDeleted';
// import ListUserDeleted from './Admin/components/listUser/ListUserDeleted';
// import CountUserDeletedProvider from './context/countUserDeleted';
// import DetailProduct from './Admin/pages/detailProduct/DetailProduct';
// import UserDetail from './Admin/pages/userDetail/UserDetail';
import OrderResult from './pages/OrderSuccess/OrderSuccess';
// import ScrollToTop from './ui/ScrollToTop/ScrollToTop';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import ChangePassword from './components/changePassword/ChangePassword';
import CategoryRoot from './Admin/pages/category';
import ProducerRoot from './Admin/pages/producer';
import Revenue from './Admin/pages/revenue/Revenue';
import CustomerStatistics from './Admin/pages/customerStatistics/CustomerStatistics';
import DemoForm from './pages/DemoForm';
import ProductRoot from './Admin/pages/manageProduct';
import TrackingLog from './Admin/pages/trackingLog';
import UserRoot from './Admin/pages/manageUser';
import ChatAdmin from './Admin/pages/chat';
import useCurrentUser from './hooks/useCurrentUser';
import { useSetupNotifications } from './firebase';
import BlogEditor from './pages/blog';

function App() {
  const currentUser = useCurrentUser()

  useSetupNotifications()

  // Nếu chưa đăng nhập trả về màn login
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children
  }
  //Nếu chưa đăng nhập trả về màn home
  const IsLogin = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/" />
    }
    return children
  }
  const AdminRoute = ({ children }) => {
    if (!currentUser.isAdmin) {
      return <Navigate to="/" />
    }
    // toast.success("Bạn đã đăng nhập với vai trò Admin", toastOption)
    return children
  }

  const Logged = ({ children }) => {
    if (currentUser) {
      return <Navigate to="/" />
    }
    return children
  }



  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/blog",
          element: <BlogEditor />
        },
        {
          path: "/product/:id",
          element: <ProductDetail />
        },
        {
          path: "/cart",
          element: <ProtectedRoute><Cart /></ProtectedRoute>
        },
        {
          path: "/order",
          element: <ProtectedRoute><Order /></ProtectedRoute>
        },
        {
          path: "/success-order",
          element: <ProtectedRoute><OrderResult /></ProtectedRoute>
        },
        {
          path: "/user",
          element: <IsLogin><User /></IsLogin>,
          children: [
            {
              path: "profile",
              element: <Profile />
            },
            {
              path: "purchase",
              element: <Purchase />,

            },
            {
              path: "change-password",
              element: <ChangePassword />,

            },
            {
              path: "logout",
              element: <h1>Đăng xuất</h1>
            }
          ]
        }
      ]
    },
    {
      path: "/2020606605/admin",
      element: <ProtectedRoute><AdminRoute><LayoutAdmin /></AdminRoute></ProtectedRoute>,
      children: [
        {
          path: "dashboard",
          element: <DashBoardPage />
        },
        {
          path: "chat",
          element: <ChatAdmin />
        },
        {
          path: "revenue",
          element: <Revenue />
        },
        {
          path: "customer-statistics",
          element: <CustomerStatistics />
        },
        {
          path: "category",
          element: <CategoryRoot />,
        },
        {
          path: "manage-product",
          element: <ProductRoot />,
        },
        {
          path: "tracking-log",
          element: <TrackingLog />,
        },
        {
          path: "manage-user",
          element: <UserRoot />,
        },
        {
          path: "producer",
          element: <ProducerRoot />,
        },
        // {
        //   path: "products",
        //   element: <CountProductDeletedProvider><ProductPage /></CountProductDeletedProvider>,
        //   children: [
        //     {
        //       path: "",
        //       element: <ListProduct />
        //     },
        //     {
        //       path: "new-product",
        //       element: <NewProduct />
        //     },
        //     {
        //       path: "deleted-product",
        //       element: <ListProductDeleted />
        //     },
        //     {
        //       path: "detail-product/:id",
        //       element: <DetailProduct />
        //     }
        //   ]
        // },
        // {
        //   path: "users",
        //   element: <CountUserDeletedProvider><UserAdmin /></CountUserDeletedProvider>,
        //   children: [
        //     {
        //       path: "",
        //       element: <ListUser />
        //     },
        //     {
        //       path: "deleted-user",
        //       element: <ListUserDeleted />
        //     },
        //     {
        //       path: "detail-user/:id",
        //       element: <UserDetail />
        //     }
        //   ]
        // },
        {
          path: "orders",
          element: <OrderPage />,
          children: [
            {
              path: "",
              element: <OrderPending />
            },
            {
              path: "confirmed",
              element: <OrderConfirn />
            },
            {
              path: "success",
              element: <OrderSuccess />
            },
            {
              path: "refuse",
              element: <OrderRefuse />
            },
            {
              path: "cancel",
              element: <OrderCancel />
            }
          ]
        }
      ]
    },

    {
      path: "/login",
      element: <Logged><Login /></Logged>,
    },
    {
      path: "/demo",
      element: <DemoForm />,
    },
    {
      path: "/forgot-password",
      element: <Logged><ForgotPassword /></Logged>,
    },
    {
      path: "/register",
      element: <Logged><Register /></Logged>,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
