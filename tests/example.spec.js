// @ts-check
const { test, expect } = require('@playwright/test');

const URL = 'http://localhost:8080';

test('has title', async ({ page }) => {
  await page.goto(URL);

  await expect(page).toHaveTitle(/Notes/);
});

test('initial notes should be visible', async ({ page }) => {
  await page.goto(URL);
  await expect(
    page.getByRole('cell', { name: 'Shopping', exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole('cell', { name: 'Random thought' }).first()
  ).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Doctor' })).toBeVisible();
  await expect(
    page.getByRole('cell', { name: 'Note #4', exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole('cell', { name: 'Note #5', exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole('cell', { name: 'Dentist appointment', exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole('cell', { name: 'Note #7', exact: true })
  ).toBeVisible();
});

test('add note', async ({ page }) => {
  await page.goto(URL);
  await expect(page.getByRole('cell', { name: 'Test123' })).toBeHidden();
  await page.getByRole('button', { name: 'New note' }).click();
  await page.getByPlaceholder('Name').click();
  await page.getByPlaceholder('Name').fill('Test123');
  await page.getByPlaceholder('Content').click();
  await page.getByPlaceholder('Content').fill('Test123');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(
    page.getByRole('cell', { name: 'Test123' }).first()
  ).toBeVisible();
});

test('archive/unarchive note', async ({ page }) => {
  await page.goto(URL);
  await page
    .getByRole('row', {
      name: 'Category icon Shopping 10/9/2023 Task Go shopping on 02/03/2022 or 05/03/2022.',
    })
    .getByRole('button')
    .nth(1)
    .click();
  await page.getByRole('cell', { name: 'Random thought' }).first().click();

  await expect(
    page.getByRole('row', {
      name: 'Category icon Shopping 10/9/2023 Task Go shopping on 02/03/2022 or 05/03/2022.',
    })
  ).toBeHidden();

  await page.locator('#head-archive-button').click();

  await expect(
    page.getByRole('row', {
      name: 'Category icon Shopping 10/9/2023 Task Go shopping on 02/03/2022 or 05/03/2022.',
    })
  ).toBeVisible();

  await page
    .getByRole('row', {
      name: 'Category icon Shopping 10/9/2023 Task Go shopping on 02/03/2022 or 05/03/2022.',
    })
    .getByRole('button')
    .nth(1)
    .click();

  await expect(
    page.getByRole('row', {
      name: 'Category icon Shopping 10/9/2023 Task Go shopping on 02/03/2022 or 05/03/2022.',
    })
  ).toBeHidden();

  await page.locator('#head-archive-button').click();

  await expect(
    page.getByRole('row', {
      name: 'Category icon Shopping 10/9/2023 Task Go shopping on 02/03/2022 or 05/03/2022.',
    })
  ).toBeVisible();

  await expect(
    page.getByRole('cell', { name: 'Random thought' }).first()
  ).toBeVisible();
});

test('delete note', async ({ page }) => {
  await page.goto(URL);

  await expect(
    page.getByRole('cell', { name: 'Shopping', exact: true })
  ).toBeVisible();

  await page
    .getByRole('row', {
      name: 'Category icon Shopping 10/9/2023 Task Go shopping on 02/03/2022 or 05/03/2022.',
    })
    .getByRole('button')
    .nth(2)
    .click();

  await expect(
    page.getByRole('cell', { name: 'Shopping', exact: true })
  ).toBeHidden();
});

test('edit note', async ({ page }) => {
  await page.goto(URL);

  await expect(
    page.getByRole('cell', { name: 'Shopping', exact: true })
  ).toBeVisible();

  await page
    .getByRole('row', {
      name: 'Category icon Shopping 10/9/2023 Task Go shopping on 02/03/2022 or 05/03/2022.',
    })
    .getByRole('button')
    .first()
    .click();
  await page.getByPlaceholder('Name').fill('Test 123');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(
    page.getByRole('cell', { name: 'Shopping', exact: true })
  ).toBeHidden();

  await expect(
    page.getByRole('cell', { name: 'Test 123', exact: true })
  ).toBeVisible();
});
