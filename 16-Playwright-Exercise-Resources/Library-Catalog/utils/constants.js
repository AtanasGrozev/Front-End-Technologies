const BASEURL = 'http://localhost:3000';

const TEST_URL = {

TEST_HOME_URL : BASEURL + '/',
TEST_LOGIN_URL: BASEURL + '/login',
TEST_REGISTER_URL: BASEURL + '/register',
TEST_CATALOG_URL: BASEURL + '/catalog',
TEST_DETAILS_URL: BASEURL + '/details'


}

function generateRandomUserName() {
    const randomNum = Math.floor(Math.random() * 100) + 1; 
    const userName = `Name${randomNum}`;
    return userName;
  } 

  let oldUser = generateRandomUserName();

const ALERT = {

    ALERT_MESSAGE : 'All fields are required!',
    ALERT_PassNotMatch : 'Password don`t match!'
}

const TEST_USER = {

    EMAIL : 'atgrozev@gmail.com',
    PASSWORD : '123456',
    REGISTED_USER : oldUser,

}

const TEST_BOOK = {

    TITLE : 'Harry Potter',
    DESCRIPTION : 'Magic Book',
    IMAGE: 'https://example.com/book-image.jpg',
    TEST_BOOK_OPTIONS: {
        FICTION : 'Fiction',
        ROMANCE : 'Romance'    
    }
}

export  {
    BASEURL,
    TEST_URL,
    TEST_USER,
    ALERT,
    TEST_BOOK
}