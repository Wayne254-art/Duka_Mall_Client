import React, { useEffect } from 'react'
import { AiFillHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye } from 'react-icons/fa'
import Ratings from '../Ratings'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { add_to_cart, messageClear, add_to_wishlist } from '../../store/reducers/cartReducer'
import { MdVerified } from 'react-icons/md'

const ShopProducts = ({ styles, products }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.auth)
    const { successMessage, errorMessage } = useSelector(state => state.cart)

    const add_cart = (id) => {

        if (userInfo) {
            dispatch(add_to_cart({
                userId: userInfo.id,
                quantity: 1,
                productId: id
            }))
        } else {
            navigate('/login')
        }
    }
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
    }, [errorMessage, successMessage, dispatch])

    const add_wishlist = (pro) => {

        dispatch(add_to_wishlist({
            userId: userInfo.id,
            productId: pro._id,
            name: pro.name,
            price: pro.price,
            image: pro.images[0],
            discount: pro.discount,
            rating: pro.rating,
            slug: pro.slug
        }))
    }

    return (
        <div className={`w-full grid ${styles === 'grid' ? 'grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2' : 'grid-cols-1 md-lg:grid-cols-2 md:grid-cols-2'} gap-3`}>
            {
                products.map((p, i) => <div key={i} className={`flex transition-all duration-1000 hover:shadow-md hover:-translate-y-2 ${styles === 'grid' ? 'flex-col justify-start items-start' : 'justify-start items-center md-lg:flex-col md-lg:justify-start md-lg:items-start'} w-full gap-4 bg-white p-1 rounded-md`}>
                    <div className={styles === 'grid' ? 'w-full relative group h-[210px] md:h-[270px] xs:h-[170px] overflow-hidden' : 'md-lg:w-full relative group h-[210px] md:h-[270px] overflow-hidden'}>
                        <img className='h-[240px] rounded-md md:h-[270px] xs:h-[170px] w-full object-contain' src={p.images[0]} alt={p.name} />
                        <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                            <li onClick={() => add_wishlist(p)} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all'><AiFillHeart /></li>
                            <Link to={`/product/details/${p.slug}`} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all'><FaEye /></Link>
                            <li onClick={() => add_cart(p._id)} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all'><AiOutlineShoppingCart /></li>
                        </ul>
                    </div>
                    <div className='flex flex-wrap justify-start items-start flex-col gap-1'>
                        <h2 className='text-md text-slate-700 font-medium truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px]'>{p.name}</h2>
                        <span className="text-md font-light text-slate-700 line-through">Ksh.{p.price.toLocaleString()}</span>
                        <div className="flex lg:flex-col md:flex-col justify-start items-start md:items-start gap-2">
                            <span className='text-lg font-bold'>
                                Ksh.{(p.price - (p.price * (p.discount / 100))).toLocaleString()}
                            </span>
                            <div className="flex text-lg">
                                <Ratings ratings={p.rating} />
                            </div>
                        </div>
                        <div className='px-1 border border-purple-500 max-w-fit rounded-sm bg-purple-300 text-black text-sm flex flex-row items-center gap-2 capitalize'>approved <MdVerified className='text-green-500' /></div>
                    </div>
                </div>)
            }
        </div>
    )
}

export default ShopProducts