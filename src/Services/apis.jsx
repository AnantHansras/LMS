const BASE_URL = "http://localhost:5001";

export const userEndpoints = {
    SENDOTP_API : BASE_URL+"/user/sendotp",
    SIGNUP_API : BASE_URL+"/user/signup",
    LOGIN_API : BASE_URL+"/user/login"
}

export const passwordEndpoints = {
    PASSWORDTOKEN_API : BASE_URL + '/password/passwordtoken',
    RESETPASSWORD_API : BASE_URL + '/password/resetpassword'
}
export const bookEndpoints = {
    GETBOOKS_API : BASE_URL+"/book/getbooks",
    ADDBOOK_API : BASE_URL+"/book/addbook",
    REMOVEBOOK_API : BASE_URL+"/book/removebook",
    GETISSUEDBOOKS_API : BASE_URL+"/book/getissuedbooks",
    // ISSUEBOOK_API : BASE_URL+"/book/issuebook",
    RETURNBOOK_API : BASE_URL+"/book/returnbook",
    CHANGEAVAILABLE_API : BASE_URL+"/book/changeavailable",
    REQUEST_BOOK_API: BASE_URL + "/book/request-book",
    APPROVE_BOOK_REQUEST_API: BASE_URL + "/book/approve-book-request",
    GET_ALL_BOOK_REQUESTS_API: BASE_URL + "/book/get-all-book-requests",
    GET_USER_TRANSACTIONS_API: BASE_URL + "/book/get-user-transactions",
    GET_BOOKS_WITH_FINE_API: BASE_URL + "/book/getBooksWithFine"
}