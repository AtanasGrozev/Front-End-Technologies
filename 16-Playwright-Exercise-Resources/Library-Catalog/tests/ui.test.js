const {test, expect} = require(`@playwright/test`);
import { LOGIN_FORM, LoggedUserNAVBAR, NAVBAR, REGISTER_FORM, ADD_NEW_BOOK_FORM , ALL_BOOKS_LIST, DETAILS_BUTTONS, DETAIL_DESCRIPTION} from "../utils/locators.js";
import { ALERT, BASEURL, TEST_URL, TEST_USER, TEST_BOOK } from "../utils/constants.js";


test('Verify All Books link is visible example 1', async ({page}) => {

    //arrange
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
    //act
    let allBooksLink = await page.$('a[href="/catalog"]');     
    let isLinkVisible = await allBooksLink.isVisible();
    //assert
    expect(isLinkVisible).toBe(true);

});
test('Verify All Books link is visible example 2 ', async ({page}) => {

    await page.goto(BASEURL);
    await expect(page.locator(NAVBAR.NAV_NAVBAR)).toBeVisible();
    await expect(page.locator(NAVBAR.ALL_BOOKS_LINK)).toBeVisible();
  
});
test('Verify Login button is visible  ', async ({page}) => {

    await page.goto(BASEURL);
    await expect(page.locator(NAVBAR.NAV_NAVBAR)).toBeVisible();
    await expect(page.locator(NAVBAR.LOGIN_BUTTON)).toBeVisible();
  
});
test('Verify Register button is visible  ', async ({page}) => {

    await page.goto(BASEURL);
    await expect(page.locator(NAVBAR.NAV_NAVBAR)).toBeVisible();
    await expect(page.locator(NAVBAR.REGISTER_BUTTON)).toBeVisible();
  
});

test('Verify All books link is visible after user login', async ({page}) => {

    await page.goto(BASEURL);
    await expect(page.locator(NAVBAR.LOGIN_BUTTON)).toBeVisible();
    await page.locator(NAVBAR.LOGIN_BUTTON).click();
    await page.locator(LOGIN_FORM.LOGIN_FORM).toBeVisible;
    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);   
    await page.locator(LOGIN_FORM.LOGIN_B).click(); 
 
    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    await expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);
  
});

test('Verify "My Books" link is visible after user login', async ({page}) => {

    await page.goto(BASEURL);
    await expect(page.locator(NAVBAR.LOGIN_BUTTON)).toBeVisible();
    await page.locator(NAVBAR.LOGIN_BUTTON).click();
    await page.locator(LOGIN_FORM.LOGIN_FORM).toBeVisible;
    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);   
    await page.locator(LOGIN_FORM.LOGIN_B).click(); 
 
    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    await expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);

    await expect(page.locator(LoggedUserNAVBAR.MY_BOOK)).toBeVisible();
  
});
test('Verify "Add book " link is visible after user login', async ({page}) => {

    await page.goto(BASEURL);
    await expect(page.locator(NAVBAR.LOGIN_BUTTON)).toBeVisible();
    await page.locator(NAVBAR.LOGIN_BUTTON).click();
    await page.locator(LOGIN_FORM.LOGIN_FORM).toBeVisible;
    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);   
    await page.locator(LOGIN_FORM.LOGIN_B).click(); 
 
    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    await expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);
    await expect(page.locator(LoggedUserNAVBAR.ADD_BOOK)).toBeVisible();
  
});


test('Verify "Users email is visible" link is visible after user login', async ({page}) => {

    await page.goto(BASEURL);
    await expect(page.locator(NAVBAR.LOGIN_BUTTON)).toBeVisible();
    await page.locator(NAVBAR.LOGIN_BUTTON).click();
    await page.locator(LOGIN_FORM.LOGIN_FORM).toBeVisible;
    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);   
    await page.locator(LOGIN_FORM.LOGIN_B).click();  
    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    await expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);

    await expect(page.locator(LoggedUserNAVBAR.USER_MAIL)).toBeVisible();
  
});
test('Submit the Foam with Valid Credential', async ({page}) => {

    await page.goto(BASEURL);
    await expect(page.locator(NAVBAR.LOGIN_BUTTON)).toBeVisible();
    await page.locator(NAVBAR.LOGIN_BUTTON).click();
    await page.locator(LOGIN_FORM.LOGIN_FORM).toBeVisible;
    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);   
    await page.locator(LOGIN_FORM.LOGIN_B).click();  
    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    await expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);   
  
});
test('Submit the Form with Empty Input Field', async ({page}) => {

    await page.goto(BASEURL);

    await page.locator(NAVBAR.LOGIN_BUTTON).click();  
  
    await page.locator(LOGIN_FORM.LOGIN_B).click();  
 
    page.on('dialog', async dialog => {

        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE)
        await dialog.accept()
    })

    await page.waitForURL(TEST_URL.TEST_LOGIN_URL);
    expect(page.url()).toBe(TEST_URL.TEST_LOGIN_URL)  
});

test('Submit with empty email field', async ({page}) => {

    await page.goto(BASEURL);

    await page.locator(NAVBAR.LOGIN_BUTTON).click();  

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
  
    await page.locator(LOGIN_FORM.LOGIN_B).click();  
 
    page.on('dialog', async dialog => {

        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE)
        await dialog.accept()
    })

    await page.waitForURL(TEST_URL.TEST_LOGIN_URL);
    expect(page.url()).toBe(TEST_URL.TEST_LOGIN_URL)  
});

test('Submit with empty password field', async ({page}) => {

    await page.goto(BASEURL);

    await page.locator(NAVBAR.LOGIN_BUTTON).click();  

    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
  
    await page.locator(LOGIN_FORM.LOGIN_B).click();  
 
    page.on('dialog', async dialog => {

        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE)
        await dialog.accept()
    })

    await page.waitForURL(TEST_URL.TEST_LOGIN_URL);
    expect(page.url()).toBe(TEST_URL.TEST_LOGIN_URL)  
});

test('Submit the Register Form with Valid Values', async ({page}) => {

    await page.goto(BASEURL);

    await page.locator(NAVBAR.REGISTER_BUTTON).click(); 
    
    await page.locator(REGISTER_FORM.Register_FORM_blank).toBeVisible;

     await page.locator(REGISTER_FORM.Register_FORM_EMAIL).fill('asd4@asd.com');
     await page.locator(REGISTER_FORM.Register_FORM_PASSWORD).fill(TEST_USER.PASSWORD);
    await page.locator(REGISTER_FORM.Register_FORM_REPEAT_PASSWORD).fill(TEST_USER.PASSWORD);
  
     await page.locator(REGISTER_FORM.Register_FORM_button).click();  
  

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
     expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL)  
});
test('Submit the Form with Empty Values', async ({page}) => {

    await page.goto(BASEURL);
    await page.locator(NAVBAR.REGISTER_BUTTON).click();     
    await page.locator(REGISTER_FORM.Register_FORM_blank).toBeVisible;   
    await page.locator(REGISTER_FORM.Register_FORM_button).click(); 
    
    page.on('dialog', async dialog => {

        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE)
        await dialog.accept()
    }) 
  

    await page.waitForURL(TEST_URL.TEST_REGISTER_URL);
     expect(page.url()).toBe(TEST_URL.TEST_REGISTER_URL)  
});
test('Submit the Form with Empty Email', async ({page}) => {

    await page.goto(BASEURL);
    await page.locator(NAVBAR.REGISTER_BUTTON).click();     
    await page.locator(REGISTER_FORM.Register_FORM_blank).toBeVisible;   
    await page.locator(REGISTER_FORM.Register_FORM_EMAIL).fill('');
    await page.locator(REGISTER_FORM.Register_FORM_PASSWORD).fill(TEST_USER.PASSWORD);
    await page.locator(REGISTER_FORM.Register_FORM_REPEAT_PASSWORD).fill(TEST_USER.PASSWORD);

    await page.locator(REGISTER_FORM.Register_FORM_button).click(); 
    
    page.on('dialog', async dialog => {

        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE)
        await dialog.accept()
    }) 
  

    await page.waitForURL(TEST_URL.TEST_REGISTER_URL);
     expect(page.url()).toBe(TEST_URL.TEST_REGISTER_URL)  
});
test('Submit the Form with Empty Password', async ({page}) => {

    await page.goto(BASEURL);
    await page.locator(NAVBAR.REGISTER_BUTTON).click();     
    await page.locator(REGISTER_FORM.Register_FORM_blank).toBeVisible;   
    await page.locator(REGISTER_FORM.Register_FORM_EMAIL).fill(TEST_USER._USER);
    await page.locator(REGISTER_FORM.Register_FORM_PASSWORD).fill('');
    await page.locator(REGISTER_FORM.Register_FORM_REPEAT_PASSWORD).fill(TEST_USER.PASSWORD);

    await page.locator(REGISTER_FORM.Register_FORM_button).click(); 
    
    page.on('dialog', async dialog => {

        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE)
        await dialog.accept()
    }) 

});
test('Submit the Form with not match Passwords', async ({page}) => {

    await page.goto(BASEURL);
    await page.locator(NAVBAR.REGISTER_BUTTON).click();     
    await page.locator(REGISTER_FORM.Register_FORM_blank).toBeVisible;   
    await page.locator(REGISTER_FORM.Register_FORM_EMAIL).fill(TEST_USER.REGISTED_USER);
    await page.locator(REGISTER_FORM.Register_FORM_PASSWORD).fill('123');
    await page.locator(REGISTER_FORM.Register_FORM_REPEAT_PASSWORD).fill(TEST_USER.PASSWORD);

    await page.locator(REGISTER_FORM.Register_FORM_button).click(); 
    
    page.on('dialog', async dialog => {

        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_PassNotMatch)
        await dialog.accept()
    }) 
    await page.waitForURL(TEST_URL.TEST_REGISTER_URL);
    expect(page.url()).toBe(TEST_URL.TEST_REGISTER_URL) 


});
test('Add Book page with correct data', async ({page}) => {

    await page.goto(BASEURL);
    await page.locator(NAVBAR.LOGIN_BUTTON).click();     
  
    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
    await page.locator(LOGIN_FORM.LOGIN_B).click();   

    await page.locator(LoggedUserNAVBAR.ADD_BOOK).click(); 
    await page.locator(ADD_NEW_BOOK_FORM.TITLE).fill(TEST_BOOK.TITLE);
    await page.locator(ADD_NEW_BOOK_FORM.DESCRIPTION).fill(TEST_BOOK.DESCRIPTION);
    await page.locator(ADD_NEW_BOOK_FORM.IMAGE).fill(TEST_BOOK.IMAGE);
    await page.locator(ADD_NEW_BOOK_FORM.TYPE).selectOption(TEST_BOOK.TEST_BOOK_OPTIONS.FICTION);

    

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL)  


    

  

});
test('Add Book page with empty field', async ({page}) => {

    await page.goto(BASEURL);
    await page.locator(NAVBAR.LOGIN_BUTTON).click();     
  
    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
    await page.locator(LOGIN_FORM.LOGIN_B).click();   

    await page.locator(LoggedUserNAVBAR.ADD_BOOK).click(); 
    await page.locator(ADD_NEW_BOOK_FORM.TITLE).fill('');
    await page.locator(ADD_NEW_BOOK_FORM.DESCRIPTION).fill(TEST_BOOK.DESCRIPTION);
    await page.locator(ADD_NEW_BOOK_FORM.IMAGE).fill(TEST_BOOK.IMAGE);
    await page.locator(ADD_NEW_BOOK_FORM.TYPE).selectOption(TEST_BOOK.TEST_BOOK_OPTIONS.FICTION);
    await page.locator(ADD_NEW_BOOK_FORM.ADD_BOOK_B).click();

    page.on('dialog', async dialog => {

        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE)
        await dialog.accept()
    }) 
    
    await page.waitForURL('http://localhost:3000/create');
    expect(page.url()).toBe('http://localhost:3000/create')    
     

});
test('Verify That All Books Are Displayed', async ({page}) => {

    await page.goto(BASEURL);
    await page.locator(NAVBAR.LOGIN_BUTTON).click();     
  
    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
    await page.locator(LOGIN_FORM.LOGIN_B).click();   

   
    let booksCount = await page.locator('#dashboard-page > ul').count();
    expect(booksCount).toBeGreaterThan(0)
     

});
test('Verify That Logged-In User Sees Details Button and Button Works Correctly', async ({page}) => {

    await page.goto(BASEURL);
    await page.locator(NAVBAR.LOGIN_BUTTON).click();     
  
    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
    await page.locator(LOGIN_FORM.LOGIN_B).click();
    
    
    await page.locator(DETAILS_BUTTONS).first().click();
    await expect(page.locator(DETAIL_DESCRIPTION)).toBeVisible();        

});
test('Submit the Logout button is visible', async ({page}) => {

    await page.goto(BASEURL);
   
    await page.locator(NAVBAR.LOGIN_BUTTON).click();
   
    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);   
    await page.locator(LOGIN_FORM.LOGIN_B).click();  

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    await expect(page.locator('#logoutBtn')).toBeVisible(); 
   
  
});
test('Submit the Logout button redirect successfully', async ({page}) => {

    await page.goto(BASEURL);
   
    await page.locator(NAVBAR.LOGIN_BUTTON).click();
   
    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);   
    await page.locator(LOGIN_FORM.LOGIN_B).click();  

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    await expect(page.locator('#logoutBtn')).toBeVisible(); 
    await page.locator(LoggedUserNAVBAR.LOGOUT_Button).click(); 
    await page.waitForURL(TEST_URL.TEST_HOME_URL);
    await expect(page.url()).toBe(TEST_URL.TEST_HOME_URL)  
   
  
});









