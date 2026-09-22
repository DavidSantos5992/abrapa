// Run against npm run dev. Supply PLAYWRIGHT_MODULE if Playwright is installed externally.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();
  const origin = process.env.SITE_URL || 'http://127.0.0.1:5180';
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error') errors.push(message.text());
  });
  // Observe message preparation without opening WhatsApp or sending information.
  await page.addInitScript(() => {
    window.open = url => { window.preparedContactUrl = String(url); return null; };
  });
  try {
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of ['/', '/sobre', '/parceiros', '/campanhas', '/doacao', '/galeria', '/contato']) {
        await page.goto(origin + route);
        await page.waitForTimeout(700);
        assert.equal(await page.locator('h1').count(), 1, route + ': one H1');
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
        assert.equal(overflow, false, route + ': overflow at ' + width);
        assert.equal(new URL(await page.locator('link[rel=canonical]').getAttribute('href')).href, 'https://abrapajundiai.org.br' + route);
        assert(!/unic[aâ]ncer|uni cancer/i.test(await page.content()), route + ': previous brand');
        for (const image of await page.locator('img').all()) {
          await image.scrollIntoViewIfNeeded();
          await image.evaluate(img => img.decode());
          assert(await image.getAttribute('alt'), route + ': alt text');
        }
      }
      console.log('PASS: routes, images and SEO at ' + width + 'px');
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(origin);
    await page.getByRole('button', { name: 'Abrir menu', exact: true }).click();
    await page.locator('nav').getByRole('link', { name: 'Galeria', exact: true }).last().click();
    assert(page.url().endsWith('/galeria'));
    await page.getByRole('combobox', { name: 'Filtrar por categoria' }).click();
    await page.getByRole('option', { name: 'Projetos', exact: true }).click();
    await page.waitForFunction(() => document.querySelectorAll('button[aria-label^="Ampliar imagem:"]').length === 3);
    assert.equal(await page.getByRole('button', { name: /^Ampliar imagem:/ }).count(), 3);
    await page.getByRole('combobox', { name: 'Filtrar por ano' }).click();
    await page.getByRole('option', { name: 'Sem data', exact: true }).click();
    await page.getByRole('button', { name: /^Ampliar imagem:/ }).first().click();
    const first = await page.getByRole('dialog').getByRole('heading').textContent();
    await page.keyboard.press('ArrowRight');
    assert.notEqual(await page.getByRole('dialog').getByRole('heading').textContent(), first);
    await page.getByRole('button', { name: 'Imagem anterior', exact: true }).click();
    assert.equal(await page.getByRole('dialog').getByRole('heading').textContent(), first);
    const download = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Baixar imagem', exact: true }).click();
    assert((await download).suggestedFilename().endsWith('.png'));
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: 'Limpar', exact: true }).click();
    await page.waitForFunction(() => document.querySelectorAll('button[aria-label^="Ampliar imagem:"]').length === 6);
    assert.equal(await page.getByRole('button', { name: /^Ampliar imagem:/ }).count(), 6);
    await page.goto(origin + '/galeria#imagem-1');
    await page.getByRole('dialog').waitFor();
    await page.keyboard.press('Escape');
    await page.getByRole('dialog').waitFor({ state: 'hidden' });
    assert.equal(new URL(page.url()).hash, '');
    await page.goto(origin + '/galeria#imagem-1');
    await page.getByRole('dialog').waitFor();
    await page.goto(origin + '/galeria#imagem-2');
    await page.getByRole('dialog').getByRole('heading', { name: 'Dia das Crianças', exact: true }).waitFor();
    await page.goto(origin + '/campanhas');
    await page.getByRole('button', { name: 'Ver detalhes', exact: true }).first().click();
    await page.getByRole('dialog').waitFor();
    await page.getByRole('button', { name: 'Compartilhar', exact: true }).click();
    await page.getByRole('dialog').getByRole('heading', { name: 'Compartilhar', exact: true }).waitFor();
    await page.keyboard.press('Escape');
    await page.keyboard.press('Escape');
    await page.goto(origin + '/doacao');
    await page.getByRole('button', { name: 'Copiar PIX e Doar', exact: true }).click();
    assert((await page.getByRole('dialog').textContent()).includes('07.055.645/0001-70'));
    assert((await page.getByRole('dialog').locator('code').textContent()).trim().startsWith('000201'));
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    await page.keyboard.press('Escape');
    await page.goto(origin + '/parceiros');
    await page.getByRole('button', { name: 'Abrir WhatsApp', exact: true }).click();
    assert.equal(await page.evaluate(() => window.preparedContactUrl), undefined);
    await page.getByLabel('Nome Completo').fill('Teste de interface');
    await page.getByLabel('Email', { exact: true }).fill('teste@example.com');
    await page.getByLabel('Telefone', { exact: true }).fill('11999999999');
    await page.getByLabel('Mensagem', { exact: true }).fill('Mensagem de teste local, não enviada.');
    await page.getByRole('button', { name: 'Abrir WhatsApp', exact: true }).click();
    assert((await page.evaluate(() => window.preparedContactUrl)).startsWith('https://wa.me/5511964968794?text='));
    await page.goto(origin + '/contato');
    await page.getByLabel('Nome', { exact: true }).fill('Teste de interface');
    await page.getByLabel('E-mail', { exact: true }).fill('teste@example.com');
    await page.getByLabel('Mensagem', { exact: true }).fill('Teste local, não enviado.');
    await page.getByRole('button', { name: 'Abrir WhatsApp', exact: true }).click();
    assert((await page.evaluate(() => window.preparedContactUrl)).startsWith('https://wa.me/5511964968794?text='));
    assert.deepEqual(errors, []);
    console.log('PASS: seven routes, five widths, images, SEO, menu, gallery, dialogs, PIX and forms. No messages sent.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
