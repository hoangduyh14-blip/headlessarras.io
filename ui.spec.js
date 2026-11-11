const { test, expect } = require('@playwright/test');
const path = require('node:path');

test('notes panel can be shown, hidden, and edited', async ({ page }) => {
  await page.goto('file://' + path.resolve(__dirname, 'fixture.html'));
  await page.addScriptTag({ path: path.resolve(__dirname, '../userscripts/arras-ui-panel.user.js') });

  const panel = page.locator('#arras-ui-notes');
  await expect(panel).toBeVisible();
  await panel.locator('textarea').fill('test note');
  await expect(panel.locator('small')).toHaveText('Saved in this tab');

  await panel.locator('#arras-ui-hide').click();
  await expect(panel).toBeHidden();
  await page.locator('#arras-ui-show').click();
  await expect(panel).toBeVisible();
});
