import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login';

const chromium = require('playwright').chromium;

test.describe('Login', () => {
  let page;
  let browser;
  let context;
  let loginPage: LoginPage;

  test.beforeEach(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
    // Navigate to the login page
    loginPage = new LoginPage(page);
    // Go to the URL
    await page.goto('https://www.saucedemo.com');
  })

  test.afterEach(async () => { 
    await browser.close();
  });

  test('login with correct username and password', async () => {
    const username = loginPage.usernames[Math.floor(Math.random() * loginPage.usernames.length)];
    console.log(username);
    await loginPage.login(username, loginPage.password);
    const inventoryVisible = await page.isVisible('.inventory_list');
    expect(inventoryVisible).toBeTruthy();
  });

  test('login with incorrect username', async () => {
    const username = "thao";
    await loginPage.login(username, loginPage.password);
    const inventoryVisible = await page.isVisible('.inventory_list');
    expect(inventoryVisible).toBeFalsy();
  });

  test('login with incorrect password', async () => {
    const username = loginPage.usernames[Math.floor(Math.random() * loginPage.usernames.length)];
    await loginPage.login(username, "thao");
    const inventoryVisible = await page.isVisible('.inventory_list');
    expect(inventoryVisible).toBeFalsy();
  });

  test('login with incorrect username and password', async () => {
    const username = "standard_user_123";
    await loginPage.login(username, "secret_sauce_123");
    const inventoryVisible = await page.isVisible('.inventory_list');
    expect(inventoryVisible).toBeFalsy();
  });
  
})

