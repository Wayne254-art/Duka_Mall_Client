
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { forgot_password, messageClear } from "../store/reducers/authReducer";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import FadeLoader from 'react-spinners/FadeLoader'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loader, successMessage, errorMessage } = useSelector((state) => state.auth)

    const handle_forgot_password = (e) => {
        e.preventDefault()
        dispatch(forgot_password(email.trim()))
    }

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
            navigate("/verify-otp")
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
    }, [successMessage, errorMessage, dispatch, navigate])


    return (
        <div>
            {
                loader && <div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                    <FadeLoader />
                </div>
            }
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 p-4">
                <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm text-center">
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Forgot Password</h2>
                    <p className="text-gray-500 text-sm mb-6">
                        Enter your email below to receive a reset OTP.
                    </p>
                    <form onSubmit={handle_forgot_password} className="flex flex-col gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-purple-600 text-white py-3 rounded-lg text-lg font-semibold uppercase tracking-wide hover:bg-purple-700 transition"
                        >
                            {loader ? "Sending..." : "Send OTP"}
                        </button>
                    </form>
                    <p className="text-gray-400 text-xs mt-4">
                        Remember your password? <a href="/login" className="text-purple-500 hover:underline">Login here</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
