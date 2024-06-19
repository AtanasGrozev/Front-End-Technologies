const NAVBAR = {
NAV_NAVBAR: 'nav.navbar',
ALL_BOOKS_LINK: 'a[href="/catalog"]',
LOGIN_BUTTON: 'a[href="/login"]',
REGISTER_BUTTON: 'a[href="/register"]'
}

const LOGIN_FORM = {

LOGIN_FORM : '#login-form',
EMAIL : 'input[id="email"]',
PASSWORD : 'input[id="password"]',
LOGIN_B : '#login-form input[type="submit"]'

}
const REGISTER_FORM = {
    Register_FORM_blank : '#register-form',
    Register_FORM_EMAIL : 'input[id="email"]',
    Register_FORM_PASSWORD : 'input[id="password"]',
    Register_FORM_REPEAT_PASSWORD : 'input[id="repeat-pass"]',
    Register_FORM_button : 'input[type="submit"]'
}
const LoggedUserNAVBAR = {

    MY_BOOK : 'a[href="/profile"]',
    ADD_BOOK: 'a[href="/create"]',
    USER_MAIL: '//span[text()]',
    ALL_BOOKSs : '#site-header > nav > section > a',
    LOGOUT_Button : '#logoutBtn'

}

const  ADD_NEW_BOOK_FORM = {

    ADD_NEW_B_FORM : '#create-form > fieldset > legend',
    TITLE : '#title',
    DESCRIPTION : '#description',
    IMAGE : '#image',
    TYPE :'#type'   ,
    ADD_BOOK_B : '#create-form > fieldset > input'

}

const ALL_BOOKS_LIST = '#dashboard-page > ul'

const DETAILS_BUTTONS = '#dashboard-page > ul > li:nth-child(2) > a'

const DETAIL_DESCRIPTION = '#details-page > div.book-description > h3'

export{

    NAVBAR,
    LOGIN_FORM,
    LoggedUserNAVBAR,
    REGISTER_FORM,
    ADD_NEW_BOOK_FORM,
    ALL_BOOKS_LIST,
    DETAILS_BUTTONS,
    DETAIL_DESCRIPTION
}
