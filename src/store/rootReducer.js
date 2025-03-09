import homeReducer from './reducers/homeReducer'
import authReducer from './reducers/authReducer'
import cartReducer from './reducers/cartReducer'
import orderReducer from './reducers/orderReducer'
import dashboardReducer from './reducers/dashboardReducer'
import chatReducer from './reducers/chatReducer'
import subscriptionReducer from './reducers/mailReducer'
import productReducer from './reducers/productReducer'
import commentReducer from './reducers/commentReducer'
import installmentReducer from './reducers/installmentReducer'
const rootReducers = {
    home: homeReducer,
    auth: authReducer,
    cart: cartReducer,
    order : orderReducer,
    dashboard : dashboardReducer,
    chat : chatReducer,
    subscription: subscriptionReducer,
    products: productReducer,
    comments: commentReducer,
    installments: installmentReducer,
}
export default rootReducers