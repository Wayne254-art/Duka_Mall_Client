import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Shops from './pages/Shops';
import Cart from './pages/Cart';
import Details from './pages/Details';
import Register from './pages/Register';
import Login from './pages/Login';
import Shipping from './pages/Shipping';
import { useDispatch } from 'react-redux';
import { get_category } from './store/reducers/homeReducer'
import CategoryShops from './pages/CategoryShop';
import SearchProducts from './pages/SearchProducts';
import Payment from './pages/Payment';
import Dashboard from './pages/Dashboard';
import ProtectUser from './utils/ProtectUser';
import Index from './components/dashboard/Index';
import Orders from './components/dashboard/Orders';
import Wishlist from './components/dashboard/Wishlist';
import ChangePassword from './components/dashboard/ChangePassword';
import InstallmentProducts from './components/dashboard/InstallmentProducts';
import Order from './components/dashboard/Order';
import Chat from './components/dashboard/Chat';
import ConfirmOrder from './pages/ConfirmOrder';
import Contact from './pages/Contact';
import About from './pages/About';
import Blog from './pages/Blog';
import NotFound from './pages/NotFound';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOTP from './pages/VerifyOtp';
import ResetPassword from './pages/ResetPassword';
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(get_category())
  }, [dispatch])
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/verify-otp' element={<VerifyOTP />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/shops' element={<Shops />} />
        <Route path='/products?' element={<CategoryShops />} />
        <Route path='/products/search?' element={<SearchProducts />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order/confirm?' element={<ConfirmOrder />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/product/details/:slug' element={<Details />} />

        <Route path='*' element={<NotFound />} />

        <Route path='/dashboard' element={<ProtectUser />}>
          <Route path='' element={<Dashboard />}>
            <Route path='' element={<Index />} />
            <Route path='my-orders' element={<Orders />} />
            <Route path='installment-products' element={<InstallmentProducts />} />
            <Route path='my-wishlist' element={<Wishlist />} />
            <Route path='order/details/:orderId' element={<Order />} />
            <Route path='chage-password' element={<ChangePassword />} />
            <Route path='chat' element={<Chat />} />
            <Route path='chat/:sellerId' element={<Chat />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
