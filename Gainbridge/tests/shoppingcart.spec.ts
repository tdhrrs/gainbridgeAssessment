import { test, expect } from '@playwright/test';
import { ShoppingCartPage } from '../pageObjects/shoppingCart.ts';

const shoppingCartPage = new ShoppingCartPage();

test.beforeEach(async ({ page }) => {
    await page.goto('https://gb-saa-test.vercel.app/');
});


test('Assert navigation bars are present', async ({ page }) => {
    await expect(page.locator(shoppingCartPage.getNav())).toContainText("Home");
    await expect(page.locator(shoppingCartPage.getNav())).toContainText("Products");
    await expect(page.locator(shoppingCartPage.getNav())).toContainText("Cart");
    await expect(page.locator(shoppingCartPage.getNav())).toContainText("Profile");
});

test('Assert cart is displayed', async ({ page }) => {
    await expect(page.locator(shoppingCartPage.getLogo())).toHaveText("Your Shopping Cart");
    await expect(page.locator(shoppingCartPage.getCart())).toBeVisible();
});

test('Assert checkout is disabled if item is out of stock', async ({ page }) => {
    await expect(page.locator(shoppingCartPage.getCheckoutBtn())).toBeDisabled();
    await page.locator(shoppingCartPage.getOutOfStock()).locator(shoppingCartPage.getRemoveItem()).click();
    await page.locator(shoppingCartPage.getConfirmRemove()).click();
    await expect(page.locator(shoppingCartPage.getCheckoutBtn())).toBeEnabled();
});

//This test will fail, due to a bug where the total amount is not updated correctly when an item is removed.
test('Assert total updates when item is removed  ', async ({ page }) => {
    await page.locator(shoppingCartPage.getShirt()).locator(shoppingCartPage.getRemoveItem()).click();
    await page.locator(shoppingCartPage.getConfirmRemove()).click();
    let totalAmount = await page.locator(shoppingCartPage.getTotalAmount()).textContent();
    expect(totalAmount).toBe('86.00');
});

test('Assert totals are updated when amounts are updated', async ({ page }) => {
    await page.locator(shoppingCartPage.getShirt()).locator(shoppingCartPage.getQuantity()).fill('2');
    let totalAmount = await page.locator(shoppingCartPage.getTotalAmount()).textContent();
    expect(totalAmount).toBe('125.98');
});

//This test will fail, due to a bug that allows negative quantities.
test('Assert totals can not be negitive', async ({ page }) => {
    await page.locator(shoppingCartPage.getShirt()).locator(shoppingCartPage.getQuantity()).fill('-999');
    let totalAmount = Number(await page.locator(shoppingCartPage.getTotalAmount()).textContent());
    expect(totalAmount).toBeGreaterThanOrEqual(0.00);
});


