import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import Headers from '../components/Headers';
import { Link } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import Products from '../components/products/Products';
import { get_products } from '../store/reducers/homeReducer';
import { fetch_random_discounted_products } from '../store/reducers/productReducer';
import { FaFacebook, FaShoppingCart, FaCommentDots } from "react-icons/fa";
import { SiStatuspal } from "react-icons/si";
import { IoMdPricetags, IoMdShare } from 'react-icons/io';
import Comments from '../components/Comments';
import logo from '../assets/logo.png'
import { FaXTwitter } from 'react-icons/fa6';

const Blog = () => {
  const { latest_product, topRated_product, discount_product } = useSelector((state) => state.home);
  const { discountedProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_products());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetch_random_discounted_products());
  }, [dispatch]);

  return (
    <div>
      <Headers />

      {/* Banner Section */}
      <section className='bg-[url("../public/images/banner/shop.gif")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
        <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
          <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
            <div className='flex flex-col justify-center items-center h-full w-full text-white'>
              <div className='h-[70px] flex justify-center items-center'>
                <Link to='/' className='w-[180px] h-[50px]'>
                  <img className='w-full h-full' src={logo} alt="" />
                </Link>
              </div>
              <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                <Link to='/'>Home</Link>
                <span className='pt-1'><MdOutlineKeyboardArrowRight /></span>
                <span>Blog</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto p-4 flex flex-row md:flex-col gap-6">
        {/* Blog Posts */}
        <div className="flex-1 space-y-6">
          {discountedProducts?.map((product) => (
            <div key={product._id}>
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.images?.[0] || "https://via.placeholder.com/400x200"}
                  alt={product.name}
                  className="w-full md:h-[250px] h-[500px] rounded-md object-contain"
                />
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                  {product.discount}% OFF
                </span>
              </div>
              <div key={product._id} className="border-b pb-6">
                <div className="mt-4">
                  <h2 className="text-2xl font-bold mb-4">Why Choose Duka Mall?</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="flex items-center space-x-1 text-gray-800">
                        <FaShoppingCart className="text-red-500" />
                        <span className="font-semibold">Duka Mall's Trusted Vendors</span>
                      </span>
                    </div>

                    <div className="flex items-center space-x-1">
                      <SiStatuspal className="text-blue-500" />
                      <span>Verified Products</span>
                    </div>

                    <div className="flex items-center space-x-1">
                      <FaCommentDots className="text-yellow-500" />
                      <span>Ratings  4.5/5</span>
                    </div>

                    <div className="flex items-center space-x-1 md:hidden">
                      <IoMdPricetags className="text-green-500" />
                      <span>Explore Now</span>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold mb-3">Why Duka Mall is Perfect for You!</h2>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>Wide variety of products at unbeatable prices.</li>
                    <li>Trusted vendors offering high-quality, verified items.</li>
                    <li>Secure and seamless online shopping experience.</li>
                    <li>Excellent customer service and fast delivery options.</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-4">Duka Mall brings you the best selection of products tailored to your needs, ensuring satisfaction with every purchase.</p>

                  <div className="flex items-center gap-4 mt-6">
                    <p className="font-bold">Share on:</p>

                    {/* Facebook Share */}
                    <FaFacebook
                      className="text-blue-500 text-xl cursor-pointer hover:scale-110 transition-transform"
                      onClick={() =>
                        window.open(
                          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                          "_blank"
                        )
                      }
                    />

                    {/* Twitter/X Share */}
                    <FaXTwitter
                      className="text-cyan-500 text-xl cursor-pointer hover:scale-110 transition-transform"
                      onClick={() =>
                        window.open(
                          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                            window.location.href
                          )}&text=Check out this amazing product on Duka Mall!`,
                          "_blank"
                        )
                      }
                    />
                    <IoMdShare
                      className="text-black font-bold text-xl cursor-pointer hover:scale-110 transition-transform"
                      onClick={() => {
                        if (navigator.share) {
                          navigator
                            .share({
                              title: "Check out this product on Duka Mall!",
                              text: "Amazing deals and quality products await you.",
                              url: window.location.href,
                            })
                            .then(() => console.log("Share successful"))
                            .catch((error) => console.error("Error sharing:", error));
                        } else {
                          alert("Sharing is not supported on this browser. Copy the URL manually.");
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Comments />
        </div>

        {/* Sidebar */}
        <aside className="w-[25%] lg:w-[20%] sticky top-4 space-y-6 md:hidden">
          <input
            type="text"
            placeholder="Enter any keyword"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-6">
              <Products title="Latest Products" products={latest_product} />
              <Products title="Top Rated Products" products={topRated_product} />
              <Products title="Discounted Products" products={discount_product} />
            </div>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;