import { apiConnector } from './apiConnector'
import { bookEndpoints } from './apis'
import {toast} from 'react-hot-toast'
const {GETBOOKS_API,ADDBOOK_API,REMOVEBOOK_API,GETISSUEDBOOKS_API,RETURNBOOK_API,CHANGEAVAILABLE_API,
  REQUEST_BOOK_API,APPROVE_BOOK_REQUEST_API,GET_ALL_BOOK_REQUESTS_API,GET_USER_TRANSACTIONS_API
} = bookEndpoints;

export function getAllBookRequest(token) {
  return async (dispatch) => {
      try{
      const response = await apiConnector("POST", GET_ALL_BOOK_REQUESTS_API, {},{ Authorization: `Bearer ${token}` })
      console.log("GET_ALL_BOOK_REQUESTS_API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      return response.data
    } catch (error) {
      console.log("GET_ALL_BOOK_REQUESTS API ERROR............", error)
      toast.error(error.response.data.message,{theme: "dark"})
    }
  }
}

export function requestBook(bookId,token) {
  return async (dispatch) => {
      try{
      const response = await apiConnector("POST", REQUEST_BOOK_API, {bookId},{ Authorization: `Bearer ${token}` })
      console.log("REQUEST_BOOK API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("📚 Book Request Sent Successfully!", {
        position: "top-center",
        theme: "dark",
      });
      return response.data
    } catch (error) {
      console.log("REQUEST_BOOK API ERROR............", error)
      toast.error(error.response.data.message,{theme: "dark"})
    }
  }
}

export function allTransactions(token) {
  return async (dispatch) => {
      try{
      const response = await apiConnector("POST", GET_USER_TRANSACTIONS_API, {},{ Authorization: `Bearer ${token}` })
      console.log("GET_USER_TRANSACTIONS API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      return response.data
    } catch (error) {
      console.log("GET_USER_TRANSACTIONS API ERROR............", error)
      toast.error(error.response.data.message,{theme: "dark"})
    }
  }
}

export function approveRequest(transactionID,token) {
  return async (dispatch) => {
      try{
      const response = await apiConnector("POST", APPROVE_BOOK_REQUEST_API, {transactionID},{ Authorization: `Bearer ${token}` })
      console.log("APPROVE_BOOK_REQUEST API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("📚 Book Request Approved Successfully!", {
        position: "top-center",
        theme: "dark",
      });
      return response.data
    } catch (error) {
      console.log("APPROVE_BOOK_REQUEST API ERROR............", error)
      toast.error(error.response.data.message,{theme: "dark"})
    }
  }
}

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

export function addbook(title,author,genre,publishedYear,keywords,token) {
  return async (dispatch) => {
    try{
    const response = await apiConnector("POST", ADDBOOK_API, {
      title,author,genre,publishedYear,keywords
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

// export function issueBook(bookId,token) {
//   return async (dispatch) => {
//     try{
//     const response = await apiConnector("POST", GETISSUEDBOOKS_API, {bookId},{ Authorization: `Bearer ${token}` })
//     console.log("GETISSUEDBOOKS API RESPONSE............", response)
    
//     console.log(response.data.success)
//     if (!response.data.success) {
//       throw new Error(response.data.message)
//     }
//     toast.success("📚 Book issue Successfully!", {
//       position: "top-center",
//       theme: "dark",
//       autoClose: 3000, 
//       hideProgressBar: false, 
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//     });
//     return response.data
//   } catch (error) {
//     console.log("GETISSUEDBOOKS API ERROR............", error)
//     toast.error(error.response.data.message,{theme: "dark"})
//   }
// }
// }

export function togglebookAvailability(bookId,token) {
  return async (dispatch) => {
    try{
    const response = await apiConnector("POST", CHANGEAVAILABLE_API, {bookId},{ Authorization: `Bearer ${token}` })
    console.log("CHANGEAVAILABLE API RESPONSE............", response)
    
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
    console.log("CHANGEAVAILABLE API ERROR............", error)
    toast.error(error.response.data.message,{theme: "dark"})
  }
}
}

export function fetchIssuedBooksToUser(token) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("POST", GETISSUEDBOOKS_API, {},{ Authorization: `Bearer ${token}` });

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

