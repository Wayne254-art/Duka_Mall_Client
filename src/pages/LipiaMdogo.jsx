import { useState, useEffect } from "react";
import { FaUser, FaPhone } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apply__for_installments } from "../store/reducers/installmentReducer";

const LipiaMdogoMdogoForm = ({ selectedProduct }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error } = useSelector((state) => state.installments)
    const { userInfo } = useSelector((state) => state.auth)

    // Redirect if not logged in
    useEffect(() => {
        if (!userInfo) {
            navigate("/login")
        }
    }, [userInfo, navigate]);

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        agreed: false,
    });

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value })
    };

    const calculateInstallments = () => {
        if (!selectedProduct?.price) return null

        const itemName = selectedProduct.slug
        const price = selectedProduct.price
        const discount = selectedProduct?.discount ?? 0
        const discountedPrice = price - (price * discount) / 100
        const shippingFee = 99
        const totalPrice = discountedPrice + shippingFee

        return {
            itemName,
            discountedPrice,
            shippingFee,
            totalPrice,
        }
    }

    const installmentDetails = calculateInstallments();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userInfo) {
            navigate("/login");
            return;
        }

        const applicationData = {
            ...formData,
            ...installmentDetails,
            productId: selectedProduct._id,
            sellerId: selectedProduct.sellerId,
            customerId: userInfo.id,
        }

        console.log('userInfo', userInfo)

        dispatch(apply__for_installments(applicationData));
    }

    // useEffect(() => {
    //     if (success) {
    //         navigate("/lipia-mdogo-mdogo")
    //         dispatch(resetInstallmentState())
    //     }
    // }, [success, navigate, dispatch])

    return (
        <div className="max-w-lg w-full md:w-[95%] p-4 rounded-2xl z-[1000]">
            <h2 className="text-xl font-semibold text-green-500 mb-4 text-center">
                Lipia Mdogo Mdogo - {selectedProduct?.name}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {installmentDetails && (
                    <div className="p-3 bg-gray-100 border rounded-lg">
                        {[
                            ["Item Name:", installmentDetails.itemName],
                            ["Item Price:", installmentDetails.discountedPrice.toLocaleString()],
                            ["Shipping Fee:", installmentDetails.shippingFee.toLocaleString()],
                            ["Total Price:", installmentDetails.totalPrice.toLocaleString()],
                        ].map(([label, value]) => (
                            <div key={label} className="flex justify-between">
                                <span className="font-semibold">{label}</span>
                                <span className="text-green-600 font-bold">{value}</span>
                            </div>
                        ))}
                    </div>
                )}
                <div className="relative">
                    <FaUser className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        required
                    />
                </div>
                <div className="relative">
                    <FaPhone className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        required
                    />
                </div>
                <div className="p-3 border border-gray-300 rounded-lg bg-white">
                    <p className="text-sm text-gray-600">
                        By submitting this form, you agree to the terms and conditions of the
                        <span className="text-green-600 font-semibold"> Lipia Mdogo Mdogo</span> program by <span className="text-black font-bold">Duka_Mall</span>.
                        We charge a daily interest rate of <b>0.15%</b> to all products in this program.
                    </p>
                    <label className="flex items-center mt-2">
                        <input
                            type="checkbox"
                            name="agreed"
                            checked={formData.agreed}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <span className="text-sm text-gray-700">I agree to the terms and conditions</span>
                    </label>
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <button
                    type="submit"
                    disabled={!formData.agreed || loading}
                    className={`w-full p-3 text-white font-semibold rounded-lg transition-all ${formData.agreed ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
                        }`}
                >
                    {loading ? "Submitting..." : "Submit Application"}
                </button>
            </form>
        </div>
    );
};

export default LipiaMdogoMdogoForm;
