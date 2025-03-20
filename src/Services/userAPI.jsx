import toast from "react-hot-toast";
import { apiConnector } from "./apiConnector"
import { userEndpoints } from './apis'

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API
} = userEndpoints

export function sendOtp(email, navigate,signupData) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      navigate("/otp", { state: { signupData: signupData } });

      toast.success("OTP Sent Successfully")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
  }
}

export function signUp(name,email,password,otp,navigate) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        name,
        email,
        password,
        otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
    toast.success("Signup Successful",{theme: "dark"})
      navigate("/")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
       toast.error("Signup Failed",{theme: "dark"})
      navigate("/signup")
    }
  }
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

       toast.success("Login Successful",{theme: "dark"})
    
      
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/")

    } catch (error) {
      console.log("LOGIN API ERROR............", error)
       toast.error("Login Failed",{theme: "dark"})
    }
  }
}

export function logout(navigate) {
    return (dispatch) => {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out",{theme: "dark"})
      navigate("/login")
    }
}
