
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import { add_to_cart, add_to_wishlist } from '../../store/reducers/cartReducer'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css';
import { FaEye } from 'react-icons/fa'
import { MdVerified } from 'react-icons/md'
import Ratings from '../Ratings'
// import Marquee from "react-fast-marquee"

const Adverts = ({ products }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userInfo } = useSelector(state => state.auth)

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

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 6,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 1,
        },
    };

    return (
        <div className='w-[87%] md:w-[98%] mx-auto relative bg-transparent rounded-md shadow-lg'>
            <div className='text-2xl font-bold py-2 px-5 text-white capitalize'>Up to 20% off</div>
            <Carousel
                autoPlay={true}
                infinite={true}
                arrows={true}
                responsive={responsive}
                transitionDuration={5000}
                containerClass='gap-x-4'
                itemClass='px-6 py-8'
            >
                {products?.length > 0 ? (
                    products.map((p, i) => (
                        <div key={i} className='border group transition-all duration-500 hover:shadow-md hover:-mt-3 rounded-md bg-slate-50'>
                            <div className='relative overflow-hidden'>
                                {p.discount ? (
                                    <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>
                                        {p.discount}%
                                    </div>
                                ) : ""}
                                <img className='sm:w-full w-full h-[240px] object-contain' src={p.images?.[0]} alt={p.name} />
                                <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                                    <li onClick={() => add_wishlist(p)} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all'><AiFillHeart /></li>
                                    <Link to={`/product/details/${p.slug}`} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all' ><FaEye /></Link>
                                    <li onClick={() => add_cart(p._id)} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all'><AiOutlineShoppingCart /></li>
                                </ul>
                            </div>
                            <div className='py-3 text-slate-600 px-2'>
                                <h2 className='text-md text-slate-700 font-medium truncate overflow-hidden text-ellipsis whitespace-nowrap'>{p.name}</h2>
                                <span className='text-lg  font-light line-through'>Ksh.{p.price.toLocaleString()}</span>
                                <div className='flex justify-start items-center gap-3'>
                                    <span className='text-lg font-bold'>
                                        Ksh.{(p.price - (p.price * (p.discount / 100))).toLocaleString()}
                                    </span>
                                    <div className='flex'>
                                        <Ratings ratings={p.rating} />
                                    </div>
                                </div>
                                <div className='px-1 border border-purple-500 max-w-fit rounded-sm bg-purple-300 text-black text-sm flex flex-row items-center gap-2 capitalize'>approved <MdVerified className='text-green-500' /></div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex justify-center items-center h-32">
                        <div className="w-10 h-10 border-4 border-gray-300 border-t-[#7fad39] rounded-full animate-spin"></div>
                    </div>
                )}
            </Carousel>
        </div>
    )
}

export default Adverts