import { apiConnector } from './apiConnector'
import { bookEndpoints } from './apis'
import {toast} from 'react-hot-toast'
const {GETBOOKS_API,ADDBOOK_API,REMOVEBOOK_API,GETISSUEDBOOKS_API,ISSUEBOOK_API,RETURNBOOK_API,CHANGEAVAILABLE_API} = bookEndpoints;

export function getallbooks(token) {
    return async (dispatch) => {
        try{
        const response = await apiConnector("POST", GETBOOKS_API, {},{ Authorization: `Bearer ${token}` })
        console.log("GETBOOKS API RESPONSE............", response)

        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("📚 Book Fetched Successfully!", {
          position: "top-center",
          theme: "dark",
        });
        return response.data
      } catch (error) {
        console.log("GETBOOKS API ERROR............", error)
        toast.error(error.response.data.message,{theme: "dark"})
      }
    }
}

export function addbook(title,author,genre,publishedYear,token) {
  return async (dispatch) => {
    try{
    const response = await apiConnector("POST", ADDBOOK_API, {
      title,author,genre,publishedYear
    },{ Authorization: `Bearer ${token}` })
    console.log("ADDBOOK API RESPONSE............", response)
    
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("📚 Book Added Successfully!", {
      position: "top-center",
      theme: "dark",
    });
    return response.data;
  } catch (error) {
    console.log("ADDBOOK API ERROR............", error)
    toast.error(error.response.data.message,{theme: "dark"})
  }
}
}
  
export function removebook(bookId,token) {
  return async (dispatch) => {
    try{
    const response = await apiConnector("POST", REMOVEBOOK_API, {
      bookId
    },{ Authorization: `Bearer ${token}` })
    console.log("REMOVEBOOK API RESPONSE............", response)
    
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("🚀 Alert... Book Removed Successfully!", {
      position: "top-center",  
      theme: "dark",
      autoClose: 3000,        
      hideProgressBar: false, 
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    return response.data;
  } catch (error) {
    console.log("REMOVEBOOK API ERROR............", error)
    toast.error(error.response.data.message,{theme: "dark"})
  }
  } 
} 

export function returnbook(bookId,token) {
  return async (dispatch) => {
    try{
    const response = await apiConnector("POST", RETURNBOOK_API, {
      bookId
    },{ Authorization: `Bearer ${token}` })
    console.log("RETURNBOOK API RESPONSE............", response)
    
    console.log(response.data.success)
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("📚 Book Returned Successfully!", {
      position: "top-center",  
      theme: "dark",
      autoClose: 3000, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    
    return response.data;
  } catch (error) {
    console.log("RETURNBOOK API ERROR............", error)
    toast.error(error.response.data.message,{theme: "dark"})
  }
  } 
}

export function issueBook(bookId,token) {
  return async (dispatch) => {
    try{
    const response = await apiConnector("POST", GETISSUEDBOOKS_API, {bookId},{ Authorization: `Bearer ${token}` })
    console.log("GETISSUEDBOOKS API RESPONSE............", response)
    
    console.log(response.data.success)
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("📚 Book issue Successfully!", {
      position: "top-center",
      theme: "dark",
      autoClose: 3000, 
      hideProgressBar: false, 
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    return response.data
  } catch (error) {
    console.log("GETISSUEDBOOKS API ERROR............", error)
    toast.error(error.response.data.message,{theme: "dark"})
  }
}
}

export function togglebookAvailability(bookId,token) {
  return async (dispatch) => {
    try{
    const response = await apiConnector("POST", TOGGLEBOOKAVAILABILITY_API, {bookId},{ Authorization: `Bearer ${token}` })
    console.log("TOGGLEBOOKAVAILABILITY API RESPONSE............", response)
    
    console.log(response.data.success)
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("📚 Book toggle Successfully!", {
      position: "top-center",
      theme: "dark",
      autoClose: 3000, 
      hideProgressBar: false, 
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    
    return response.data
  } catch (error) {
    console.log("TOGGLEBOOKAVAILABILITY API ERROR............", error)
    toast.error(error.response.data.message,{theme: "dark"})
  }
}
}

export function fetchIssuedBooksToUser(token) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("GET", GETISSUEDBOOKS_API, {},{ Authorization: `Bearer ${token}` });

      console.log("FETCH ISSUED BOOKS API RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("📚 Issued Books Fetched Successfully!", {
        position: "top-center",
        theme: "dark",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      return response.data;
    } catch (error) {
      console.log("FETCH ISSUED BOOKS API ERROR:", error);
      toast.error(error.response?.data?.message || "Failed to fetch issued books", {
        theme: "dark",
      });
    }
  };
}
