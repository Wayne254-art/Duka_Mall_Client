
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { messageClear, verify_otp } from "../store/reducers/authReducer";

const VerifyOtp = () => {
    const [otp, setOtp] = useState(Array(6).fill(""));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loader, successMessage, errorMessage, email } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!email) {
            navigate("/forgot-password")
        }
    }, [email, navigate]);

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            navigate("/reset-password");
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage, dispatch, navigate]);

    const handleChange = (index, event) => {
        const value = event.target.value;
        if (/^\d?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < 5) {
                document.getElementById(`otp-${index + 1}`).focus();
            }
        }
    };

    const handleKeyDown = (index, event) => {
        if (event.key === "Backspace") {
            if (!otp[index] && index > 0) {
                document.getElementById(`otp-${index - 1}`).focus();
            }
            const newOtp = [...otp];
            newOtp[index] = "";
            setOtp(newOtp);
        } else if (event.key === "ArrowRight" && index < 5) {
            document.getElementById(`otp-${index + 1}`).focus();
        } else if (event.key === "ArrowLeft" && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
        } else if (event.key === "Enter") {
            handle_otp_verify();
        }
    };

    const handle_otp_verify = () => {
        const otpCode = otp.join("");
        if (otpCode.length === 6 && email) {
            dispatch(verify_otp({ email, otp: otpCode }));
        } else {
            toast.error("Please enter a valid 6-digit OTP.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm text-center">
                <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Verify OTP</h2>
                <p className="text-gray-500 text-sm mb-6">Enter the 6-digit OTP sent to your email.</p>

                <div className="flex justify-center gap-2 flex-wrap mb-4">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(index, e)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-10 h-10 md:w-12 md:h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        />
                    ))}
                </div>

                <button 
                    onClick={handle_otp_verify} 
                    disabled={loader} 
                    className="bg-purple-600 text-white py-3 rounded-lg text-lg font-semibold uppercase tracking-wide hover:bg-purple-700 transition w-full"
                >
                    {loader ? "Verifying..." : "Verify OTP"}
                </button>

                <p className="text-gray-400 text-xs mt-4">
                    Didn't receive the OTP?{" "}
                    <Link 
                        to="#" 
                        onClick={(e) => e.preventDefault()}
                        className="text-purple-500 hover:underline"
                    >
                        Resend
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default VerifyOtp;
