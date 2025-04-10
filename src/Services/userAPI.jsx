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

      toast.success("OTP Sent Successfully",{position: "top-center",theme:'dark'})
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error(error.response.data.message,{theme: "dark",position: "top-center",})
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
      toast.error(error.response.data.message,{theme: "dark",position: "top-center",})
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

       toast.success("Login Successful",{theme: "dark",position: "top-center",})
    
      
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      if (response.data.user.email === "2023ucp1619@mnit.ac.in")
        {
        navigate("/AdminDashboard/admin")
      }
      else{
        navigate("/allbooks")
      }
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error(error.response.data.message,{theme: "dark",position: "top-center",})
    }
  }
}

export function logout(navigate) {
    return (dispatch) => {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      localStorage.removeItem("lastSearch")
      toast.success("Logged Out",{theme: "dark",position: "top-center",})
      navigate("/")
    }
}
