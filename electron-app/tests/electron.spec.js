const { _electron: electron, expect, test } = require('@playwright/test');
const path = require('path');

test.describe('ClipChronicle Electron App', () => {
  let app, window;

  test.beforeEach(async () => {
    // Launch Electron app
    app = await electron.launch({
      args: ['.'],
      cwd: path.join(__dirname, '..', 'electron-app'),
    });
    // Grab the first BrowserWindow
    window = await app.firstWindow();
    await window.waitForLoadState('domcontentloaded');
  });

  test.afterEach(async () => {
    // Close app after each test
    await app.close();
  });

  test('main window has correct title', async () => {
    await expect(window).toHaveTitle(/ClipChronicle/);
  });

  test('opens global HUD on hotkey and can search', async () => {
    // Press the configured hyper-key (Shift)
    await window.keyboard.press('Shift');
    // Wait for the HUD input to appear
    const hudInput = window.locator('input[placeholder="Search snippets…"]');
    await expect(hudInput).toBeVisible({ timeout: 5000 });
    // Type a test query
    await hudInput.fill('test-snippet');
    // Submit (Enter) and expect no crash
    await window.keyboard.press('Enter');
    // HUD should close or show results list
    const results = window.locator('.hud-result');
    await expect(results.first()).toBeVisible({ timeout: 5000 });
  });

  test('can write to and read from clipboard via native module', async () => {
    // Use evaluate to call our clipboard bindings
    const textToWrite = 'playwright-test';
    await window.evaluate(async (text) => {
      // @ts-ignore
      await window.clipboardAPI.writeClipboard(text);
    }, textToWrite);

    const readText = await window.evaluate(async () => {
      // @ts-ignore
      return await window.clipboardAPI.readClipboard();
    });
    expect(readText).toBe(textToWrite);
  });

  test('magic paste strips formatting', async () => {
    // Write HTML-formatted text
    const html = '<b>bold</b> <i>italic</i>';
    await window.evaluate(async (h) => {
      // @ts-ignore
      await window.clipboardAPI.writeClipboard(h);
    }, html);

    // Open HUD
    await window.keyboard.press('Shift');
    // Wait for HUD and open actions menu
    await window.keyboard.press('Control+Space');
    // Select "Magic Paste" action (first menu item)
    await window.keyboard.press('ArrowDown');
    await window.keyboard.press('Enter');
    // Now paste into a dummy input in the HUD
    const hudInput = window.locator('input[placeholder="Search snippets…"]');
    await hudInput.fill('');
    await window.keyboard.press('Control+V');
    // Expect plain-text "bold italic"
    const pasted = await hudInput.inputValue();
    expect(pasted).toBe('bold italic');
  });
});
