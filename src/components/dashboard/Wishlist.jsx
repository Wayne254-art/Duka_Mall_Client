import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { FaEye } from 'react-icons/fa'
import { FaRegTrashCan } from 'react-icons/fa6'
import { MdFavoriteBorder } from 'react-icons/md'
import Ratings from '../Ratings'
import { 
    get_wishlist_products, 
    remove_wishlist, 
    messageClear
} from '../../store/reducers/cartReducer'

const Wishlist = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.auth);
    const { wishlist, successMessage } = useSelector(state => state.cart);

    useEffect(() => {
        if (userInfo?.id) {
            dispatch(get_wishlist_products(userInfo.id));
        }
    }, [dispatch, userInfo]);

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
    }, [successMessage, dispatch]);

    return (
        <div className="w-full flex flex-col items-center">
            {wishlist.length > 0 ? (
                <div className="w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
                    {wishlist.map((product) => (
                        <div key={product._id} className="border group transition-all duration-500 hover:shadow-md hover:-mt-3 bg-white">
                            <div className="relative overflow-hidden">
                                {product.discount !== 0 && (
                                    <div className="absolute left-2 top-2 flex justify-center items-center text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs">
                                        {product.discount}%
                                    </div>
                                )}
                                <img className="sm:h-full w-full h-[240px] object-contain" src={product.image} alt={product.name} />
                                <ul className="absolute w-full flex justify-center items-center gap-2 transition-all duration-700 -bottom-10 group-hover:bottom-3">
                                    <li 
                                        onClick={() => dispatch(remove_wishlist(product._id))} 
                                        className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all"
                                    >
                                        <FaRegTrashCan />
                                    </li>
                                    <Link 
                                        to={`/product/details/${product.slug}`} 
                                        className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all"
                                    >
                                        <FaEye />
                                    </Link>
                                </ul>
                            </div>
                            <div className="py-3 text-slate-600 px-2">
                                <h2>{product.name}</h2>
                                <div className="flex justify-start items-center gap-3">
                                    <span className="text-lg font-bold">Ksh.{product.price}</span>
                                    <Ratings ratings={product.rating} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center text-gray-600 mt-4">
                    <MdFavoriteBorder className="text-6xl text-gray-400 mb-4" />
                    <h2 className="text-2xl font-semibold">Your Wishlist is Empty</h2>
                    <p className="text-lg text-gray-500 mt-2">Looks like you haven’t added anything yet.</p>
                    <Link to="/shops" className="mt-6 px-6 py-3 bg-purple-500 text-white rounded-lg text-lg shadow-md hover:bg-indigo-600 transition-all">
                        Browse Products
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Wishlist;
