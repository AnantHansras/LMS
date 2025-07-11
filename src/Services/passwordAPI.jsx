import { apiConnector } from './apiConnector'
import { passwordEndpoints } from './apis'
import {toast} from 'react-hot-toast'
const {RESETPASSWORD_API,PASSWORDTOKEN_API} = passwordEndpoints;

export function tokenPassword(email,setEmailSent) {
    return async (dispatch) => {
        try{
          
        const response = await apiConnector("POST", PASSWORDTOKEN_API, {
          email
        })
        console.log("PASSWORDTOKEN API RESPONSE............", response)
        
        console.log(response.data.success)
        setEmailSent(true)
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Email sent Successfully",{theme: "dark"})
      } catch (error) {
        console.log("PASSWORDTOKEN API ERROR............", error)
        toast.error(error.response.data.message,{theme: "dark",position: "top-center",})
      }
    }
}
  

export function resetPassword(password,confirmPassword,token,navigate) {
  return async (dispatch) => {
    // const toastId = toast.loading("Loading...")
      try{
        
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,confirmPassword,token
      })
      console.log("RESETPASSWORD API RESPONSE............", response)
      
      console.log(response.data.success)
      navigate('/')
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Passowrd reset done",{theme: "dark",position: "top-center",})
    } catch (error) {
      console.log("RESETPASSWORD API ERROR............", error)
      toast.error(error.response.data.message,{theme: "dark",position: "top-center",})
    }
  }
}