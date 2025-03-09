/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from 'react'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { useDispatch, useSelector } from 'react-redux'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules';
import Ratings from '../components/Ratings'
import { AiFillHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import { FaEye, FaFacebookF, FaInstagram } from 'react-icons/fa'
import { FaMoneyBillTrendUp, FaXTwitter } from 'react-icons/fa6'
import Reviews from '../components/Reviews'
import { get_product } from '../store/reducers/homeReducer'
import { add_to_cart, messageClear, add_to_wishlist } from '../store/reducers/cartReducer'
import { FaCartArrowDown } from "react-icons/fa";
import toast from 'react-hot-toast'
import logo from '../assets/logo.png'
import LipiaMdogoMdogoForm from './LipiaMdogo'
import { RxCross2 } from "react-icons/rx"
import { motion, AnimatePresence } from "framer-motion"


const Details = () => {

    const navigate = useNavigate()
    const { slug } = useParams()
    const dispatch = useDispatch()
    const { product, relatedProducts, moreProducts } = useSelector(state => state.home)
    const { userInfo } = useSelector(state => state.auth)
    const { errorMessage, successMessage } = useSelector(state => state.cart)

    const [image, setImage] = useState('')
    const [state, setState] = useState('reviews')

    const [selectedSize, setSelectedSize] = useState(product.size?.[0]?.value || null)
    const shareUrl = encodeURIComponent(window.location.href)
    const productTitle = encodeURIComponent(product.name || "Product")

    useEffect(() => {
        if (product.size && product.size.length > 0) {
            setSelectedSize(product.size[0].value);
        }
    }, [product.size]);

    const handleFacebookShare = () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        window.open(facebookUrl, '_blank');
    }

    const handleTwitterShare = () => {
        const twitterUrl = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${productTitle}`
        window.open(twitterUrl, '_blank');
    };

    const handleInstagramShare = () => {
        const instagramUrl = `mailto:?subject=${productTitle}&body=Check out this product: ${shareUrl}`;
        window.open(instagramUrl, '_blank');
    };

    const [selectedColor, setSelectedColor] = useState(
        product.color?.[0]?.name?.split(',')[0] || null
    );

    useEffect(() => {
        if (product.color && product.color.length > 0) {
            setSelectedColor(product.color[0].name.split(',')[0]);
        }
    }, [product.color]);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 7
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4
        },
        mdtablet: {
            breakpoint: { max: 991, min: 464 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 4
        },
        smmobile: {
            breakpoint: { max: 640, min: 0 },
            items: 3
        },
        xsmobile: {
            breakpoint: { max: 440, min: 0 },
            items: 3
        }
    }

    const [quantity, setQuantity] = useState(1)

    const inc = () => {
        if (quantity >= product.stock) {
            toast.error('Out of stock')
        } else {
            setQuantity(quantity + 1)
        }
    }

    const dec = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const add_cart = () => {
        if (userInfo) {
            dispatch(add_to_cart({
                userId: userInfo.id,
                quantity,
                productId: product._id
            }))
        } else {
            navigate('/login')
        }
    }

    const add_wishlist = () => {
        if (userInfo) {
            dispatch(add_to_wishlist({
                userId: userInfo.id,
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                discount: product.discount,
                rating: product.rating,
                slug: product.slug
            }))
        } else {
            navigate('/login')
        }

    }

    useEffect(() => {
        dispatch(get_product(slug))
    }, [slug, dispatch])

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
        }
    }, [errorMessage, successMessage, dispatch])

    const buy = () => {
        if (userInfo) {
            let price = 0;
            if (product.discount !== 0) {
                price = product.price - Math.floor((product.price * product.discount) / 100)
            } else {
                price = product.price
            }
            const obj = [
                {
                    sellerId: product.sellerId,
                    shopName: product.shopName,
                    price: quantity * (price - Math.floor((price * 5) / 100)),
                    products: [
                        {
                            quantity,
                            productInfo: product
                        }
                    ]
                }
            ]
            navigate('/shipping', {
                state: {
                    products: obj,
                    price: price * quantity,
                    shipping_fee: 85 + (25 * quantity),
                    items: quantity
                }
            })
        } else {
            navigate('/login')
        }
    }

    const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 })
    const [zoomImage, setZoomImage] = useState(false)
    const handleZoomImage = useCallback((e) => {
        setZoomImage(true);
        const { left, top, width, height } = e.target.getBoundingClientRect()

        const x = ((e.clientX - left) / width) * 100
        const y = ((e.clientY - top) / height) * 100

        setZoomImageCoordinate({ x, y })
    }, [])

    const handleLeaveImageZoom = () => {
        setZoomImage(false)
    };

    const [isFormOpen, setIsFormOpen] = useState(false);
    const handleButtonClick = () => {
        setIsFormOpen(true)
    }

    const handleButtonClose = () => {
        setIsFormOpen(false)
    }



    return (
        <div>
            <Headers />
            <div className='bg-[url("../public/images/banner/order.jpg")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
                <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
                    <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                        <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
                            <div className='h-[70px] flex justify-center items-center'>
                                <Link to='/' className='w-[180px] h-[50px]'>
                                    <img className='w-full h-full' src={logo} alt="company_logo" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-slate-100 py-5 mb-5'>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                    <div className='flex justify-start items-center text-md text-slate-600 w-full'>
                        <Link to='/'>Home</Link>
                        <span className='pt-1'><MdOutlineKeyboardArrowRight /></span>
                        <Link to='/'>{product.category}</Link>
                        <span className='pt-1'><MdOutlineKeyboardArrowRight /></span>
                        <span>{product.name}</span>
                    </div>
                </div>
            </div>
            <section>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16'>
                    <div className='grid grid-cols-2 md-lg:grid-cols-1 gap-8'>
                        <div>
                            <div className="p-5 border relative">
                                <img
                                    className="h-[450px] md:h-[250px] w-full object-contain"
                                    src={image ? image : product.images?.[0]}
                                    alt={product.name}
                                    onMouseMove={handleZoomImage}
                                    onMouseLeave={handleLeaveImageZoom}
                                />

                                {zoomImage && (
                                    <div
                                        className="md-lg:hidden absolute w-[500px] h-[500px] border-2 border-gray-400 bg-white shadow-lg pointer-events-none"
                                        style={{
                                            top: "10px",
                                            left: "100%",
                                            backgroundImage: `url(${image ? image : product.images?.[0]})`,
                                            backgroundSize: "250%",
                                            backgroundPosition: `${zoomImageCoordinate.x}% ${zoomImageCoordinate.y}%`,
                                        }}
                                    />
                                )}
                            </div>
                            <div className='py-3'>
                                {
                                    product.images &&
                                    <Carousel
                                        autoPlay={true}
                                        infinite={true}
                                        responsive={responsive}
                                        transitionDuration={500}
                                    >
                                        {
                                            product.images.map((img, i) => {
                                                return (
                                                    <div key={i} onClick={() => setImage(img)}>
                                                        <img className='h-[120px] cursor-pointer' src={img} alt="" />
                                                    </div>
                                                )
                                            })
                                        }
                                    </Carousel>
                                }
                            </div>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <div className='text-3xl text-slate-600 font-bold'>
                                <h2>{product.name}</h2>
                            </div>
                            <div className='flex justify-start items-center gap-4'>
                                <div className='flex text-xl'>
                                    <Ratings ratings={product.rating} />
                                </div>
                                <span className='text-green-500'>({product.rating ? product.rating : '0'})</span>
                                <span className='text-purple-500'>({product.reviews ? product.reviews : '0'}) Review</span>
                            </div>
                            <div className='text-2xl text-red-500 font-bold flex gap-3'>
                                {
                                    product?.discount !== 0 ? (
                                        <>
                                            <h2 className='line-through'>
                                                Ksh.{(product?.price ?? 0).toLocaleString()}
                                            </h2>
                                            <h2>
                                                Ksh.{((product?.price ?? 0) - Math.floor(((product?.price ?? 0) * (product?.discount ?? 0)) / 100)).toLocaleString()}
                                                (-{product?.discount ?? 0}%)
                                            </h2>
                                        </>
                                    ) : (
                                        <h2>Price: Ksh.{(product?.price ?? 0).toLocaleString()}</h2>
                                    )
                                }
                            </div>
                            <div className='text-slate-600'>
                                <p>{product.description}</p>
                                <div className="max-w-fit flex flex-row items-center gap-2 border border-purple-500 rounded-md px-2 bg-slate-200 mt-4 p-2">
                                    <span>Color: </span>
                                    <img className="h-[40px] w-[40px] object-contain pr-2" src={image ? image : product.images?.[0]} alt={product.name} />
                                    <div className="flex flex-wrap gap-2">
                                        {product.color && product.color.length > 0 ? (
                                            product.color[0].name.split(',').map((color, index) => (
                                                <button
                                                    key={index}
                                                    className={`px-3 py-1 rounded-md border ${selectedColor === color.trim()
                                                        ? "bg-purple-500 text-white border-purple-700"
                                                        : "bg-white text-purple-500 border-purple-500"
                                                        } transition duration-200 ease-in-out hover:bg-purple-600 hover:text-white`}
                                                    onClick={() => setSelectedColor(color.trim())}
                                                >
                                                    {color.trim()}
                                                </button>
                                            ))
                                        ) : (
                                            <span className="text-gray-500">N/A</span>
                                        )}
                                    </div>
                                </div>
                                <div className="max-w-fit flex flex-row items-center gap-2 border border-purple-500 rounded-md px-2 bg-slate-200 mt-4 p-2">
                                    <span>Size: </span>
                                    <img className="h-[40px] w-[40px] object-contain pr-2" src={image ? image : product.images?.[0]} alt={product.name} />
                                    <div className="flex flex-wrap gap-2 uppercase">
                                        {product.size && product.size.length > 0 ? (
                                            product.size.map((s) => (
                                                <button
                                                    key={s.value}
                                                    className={`px-3 py-1 rounded-md border ${selectedSize === s.value
                                                        ? "bg-purple-500 text-white border-purple-700"
                                                        : "bg-white text-purple-500 border-purple-500"
                                                        } transition duration-200 ease-in-out hover:bg-purple-600 hover:text-white uppercase`}
                                                    onClick={() => setSelectedSize(s.value)}
                                                >
                                                    {s.value}
                                                </button>
                                            ))
                                        ) : (
                                            <span className="text-gray-500">N/A</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="grid w-full md:grid-cols-1 grid-cols-2 gap-3 pb-10 border-b items-center">
                                {product.stock ? (
                                    <>
                                        {/* Quantity Control */}
                                        <div className="flex bg-slate-200 h-12 justify-center items-center text-xl rounded-md w-full">
                                            <div onClick={quantity > 1 ? dec : null} className={`px-6 select-none ${quantity <= 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
                                                -
                                            </div>
                                            <div className="px-5">{quantity}</div>
                                            <div onClick={quantity < product.stock ? inc : null} className={`px-6 select-none ${quantity >= product.stock ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
                                                +
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <button
                                                onClick={add_cart}
                                                className="flex items-center justify-center gap-2 px-6 py-2 w-full h-12 cursor-pointer hover:shadow-lg hover:shadow-purple-500/40 bg-purple-500 text-white rounded-md"
                                            >
                                                <FaCartArrowDown /> Add To Cart
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    ""
                                )}
                                <div className="w-full">
                                    <button
                                        onClick={add_wishlist}
                                        className="flex items-center justify-center gap-2 px-6 py-2 w-full h-12 cursor-pointer hover:shadow-lg hover:shadow-cyan-500/40 bg-cyan-500 text-white rounded-md"
                                    >
                                        <AiFillHeart />Add to wishlist
                                    </button>
                                </div>
                                <div className="w-full">
                                    <button
                                        onClick={handleButtonClick}
                                        className="flex items-center justify-center gap-2 px-6 py-2 w-full h-12 cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-green-500 text-white rounded-md"
                                    >
                                        <FaMoneyBillTrendUp /> Lipia Mdogo Mdogo
                                    </button>
                                    <AnimatePresence>
                                        {isFormOpen && (
                                            <motion.div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-[1000]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                                <motion.div className="relative bg-black/30 rounded-2xl shadow-lg max-w-lg w-full md:w-[95%]" initial={{ opacity: 0, scale: 0.8 }}  animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                                                    <button
                                                        onClick={handleButtonClose}
                                                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                                    >
                                                        <RxCross2 className='text-2xl font-bold text-orange-600' />
                                                    </button>
                                                    <LipiaMdogoMdogoForm selectedProduct={product} />
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                            <div className='flex py-5 gap-5'>
                                <div className='w-[150px] text-black font-bold text-xl flex flex-col gap-5'>
                                    <span>Availability</span>
                                    <span>Share on</span>
                                </div>
                                <div className='flex flex-col gap-5'>
                                    <span className={`text-${product.stock ? 'green' : 'red'}-500`}>
                                        {product.stock ? `In Stock(${product.stock})` : 'Out of Stock'}
                                    </span>
                                    <ul className='flex justify-start items-center gap-3'>
                                        <li>
                                            <button
                                                className='w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-indigo-500 rounded-full text-white'
                                                onClick={handleFacebookShare}
                                            >
                                                <FaFacebookF />
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className='w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-cyan-500 rounded-full text-white'
                                                onClick={handleTwitterShare}
                                            >
                                                <FaXTwitter />
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className='w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-purple-500 rounded-full text-white'
                                                onClick={handleInstagramShare}
                                            >
                                                <FaInstagram />
                                            </button>
                                        </li>
                                        {/* <li>
                                            <a className='w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-blue-500 rounded-full text-white' href="#"><AiFillGithub /></a>
                                        </li> */}
                                    </ul>
                                </div>
                            </div>
                            <div className='flex gap-3'>
                                {
                                    product.stock ? <button onClick={buy} className='px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-emerald-500/40 bg-emerald-500 text-white rounded-md'>Buy Now</button> : ""
                                }
                                <Link to={`/dashboard/chat/${product.sellerId}`} className='px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-lime-500/40 bg-lime-500 text-white block rounded-md'>Chat Seller</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16'>
                    <div className='flex flex-wrap'>
                        <div className='w-[72%] md-lg:w-full'>
                            <div className='pr-4 md-lg:pr-0'>
                                <div className='grid grid-cols-2'>
                                    <button onClick={() => setState('reviews')} className={`py-1 hover:text-white px-5 hover:bg-green-500 ${state === 'reviews' ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-700'} rounded-sm`}>Reviews</button>
                                    <button onClick={() => setState('description')} className={`py-1 px-5 hover:text-white hover:bg-green-500 ${state === 'description' ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-700'} rounded-sm`}>Description</button>
                                </div>
                                <div>
                                    {
                                        state === 'reviews' ? <Reviews product={product} />
                                            :
                                            <div className="p-5 bg-white shadow-md rounded-md">
                                                <h2 className="text-xl font-semibold text-gray-700">Product Details</h2>
                                                <p className="py-3 text-slate-600">{product.description}</p>

                                                <table className="w-full border border-gray-300">
                                                    <tbody>
                                                        <tr>
                                                            <td className="p-3 font-semibold border">Category</td>
                                                            <td className="p-3 border">{product.category}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="p-3 font-semibold border">Name</td>
                                                            <td className="p-3 border">{product.name}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="p-3 font-semibold border">Discount</td>
                                                            <td className="p-3 border">- {product.discount} %</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="p-3 font-semibold border">Price</td>
                                                            <td className="p-3 border">Kes. {product.price - Math.floor((product.price * product.discount) / 100)}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="p-3 font-semibold border">Stock</td>
                                                            <td className="p-3 border">{product.stock}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="p-3 font-semibold border">Colors</td>
                                                            <td className="p-3 border">
                                                                {product.color && product.color.length > 0
                                                                    ? product.color.map((c) => c.name).join(", ")
                                                                    : "N/A"}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="p-3 font-semibold border">Sizes</td>
                                                            <td className="p-3 border">
                                                                {product.size && product.size.length > 0
                                                                    ? product.size.map((s) => s.value).join(", ")
                                                                    : "N/A"}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='w-[28%] md-lg:w-full'>
                            <div className='pl-4 md-lg:pl-0'>
                                <div className='px-3 py-2 mt-2 text-slate-600 bg-slate-200'>
                                    <h2> Products Posted by <span className='font-bold'>{product.shopName}</span> shop</h2>
                                </div>
                                <div className="flex flex-col gap-5 mt-3 border p-3">
                                    {
                                        moreProducts
                                            .filter((p) => p.isActive === true || p.isActive.toLowerCase() === 'true')
                                            .map((p, i) => (
                                                <div className="block border-b border-gray-500 relative group" key={i}>
                                                    <div className="relative h-[270px] overflow-hidden">
                                                        {p.discount ? (
                                                            <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                                                                {p.discount}%
                                                            </div>
                                                        ) : null}
                                                        <img
                                                            className="sm:w-full w-full h-[240px] object-contain"
                                                            src={p.images[0]}
                                                            alt={p.name}
                                                        />
                                                        {/* Icons Container */}
                                                        <ul className="flex transition-all duration-700 bottom-[-50px] group-hover:bottom-3 justify-center items-center gap-2 absolute w-full">
                                                            <li
                                                                onClick={() => add_wishlist(p)}
                                                                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all"
                                                            >
                                                                <AiFillHeart />
                                                            </li>
                                                            <Link
                                                                to={`/product/details/${p.slug}`}
                                                                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all"
                                                            >
                                                                <FaEye />
                                                            </Link>
                                                            <li
                                                                onClick={() => add_cart(p._id)}
                                                                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all"
                                                            >
                                                                <AiOutlineShoppingCart />
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <h2 className="text-slate-600 py-1 truncate overflow-hidden text-ellipsis whitespace-nowrap">
                                                        {p.name}
                                                    </h2>
                                                    <div className="flex gap-2">
                                                        <h2 className="text-[#6699ff] text-lg font-bold">Ksh.{p.price}</h2>
                                                        <div className="flex items-center gap-2">
                                                            <Ratings ratings={p.rating} />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                    <h2 className='text-2xl py-8 text-slate-600'>Recommended Products</h2>
                    <div>
                        <Swiper
                            slidesPerView='auto'
                            breakpoints={{
                                1280: {
                                    slidesPerView: 3
                                },
                                565: {
                                    slidesPerView: 2
                                }
                            }}
                            spaceBetween={25}
                            loop={true}
                            pagination={{
                                clickable: true,
                                el: '.custom_bullet'
                            }}
                            modules={[Pagination]}
                            className='mySwiper'
                        >
                            {
                                relatedProducts.map((p, i) => {
                                    return (
                                        <SwiperSlide key={i}>
                                            <Link className='block'>
                                                <div className='relative h-[270px]'>
                                                    <div className='w-full h-full'>
                                                        <img className='w-full h-full object-contain' src={p.images[0]} alt={p.name} />
                                                        <div className='absolute h-full w-full top-0 left-0 bg-[#000] opacity-25 hover:opacity-50 transition-all duration-500'></div>
                                                    </div>
                                                    {
                                                        p.discount !== 0 && <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>{p.discount}%</div>
                                                    }
                                                </div>
                                                <div className='p-4 flex flex-col gap-1'>
                                                    <h2 className='text-slate-600 text-lg font-semibold'>{p.name}</h2>
                                                    <div className='flex justify-start items-center gap-3'>
                                                        <h2 className='text-[#6699ff] text-lg font-bold'>Ksh.{p.price}</h2>
                                                        <div className='flex'>
                                                            <Ratings ratings={p.rating} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    </div>
                    <div className='w-full flex justify-center items-center py-10'>
                        <div className='custom_bullet justify-center gap-3 !w-auto'></div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Details