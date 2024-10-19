import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login';

const chromium = require('playwright').chromium;

test.describe('Login', () => {
      //Launch the browser

  test('login with correct username and password', async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Navigate to the login page
    const loginPage = new LoginPage(page);
    // Go to the URL
    await page.goto('https://www.saucedemo.com');
  
    const username = loginPage.usernames[Math.floor(Math.random() * loginPage.usernames.length)];
  
    await page.fill('#user-name', username);
    await page.fill('#password', loginPage.password);
    await page.click('#login-button');
  
    const inventoryVisible = await page.isVisible('.inventory_list');
    expect(inventoryVisible).toBeTruthy();
    await browser.close();
  });


  
})

