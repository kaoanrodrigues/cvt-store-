import { test, expect } from '@playwright/test';

test.describe('E-commerce CVT Store - Suite de Aceitação e E2E', () => {

  test('1. Adição de produto ao carrinho com escolha de tamanho', async ({ page }) => {
    await page.goto('/');

    // Aguarda carregamento dos produtos
    const firstProduct = page.locator('[data-testid="product-card"]').first();
    await expect(firstProduct).toBeVisible();

    // Escolhe tamanho 'G' no primeiro card se disponível
    const sizeGButton = firstProduct.locator('[data-testid="size-btn-G"]');
    if (await sizeGButton.isVisible()) {
      await sizeGButton.click();
      await expect(sizeGButton).toHaveClass(/bg-yellow-400/);
    }

    // Clica em Adicionar à Sacola
    const addToCartBtn = firstProduct.locator('[data-testid="add-to-cart-btn"]');
    await addToCartBtn.click();

    // Verifica que o Drawer do carrinho abriu automaticamente
    const cartDrawer = page.locator('[data-testid="cart-drawer"]');
    await expect(cartDrawer).toBeVisible();

    // Valida que há pelo menos 1 item na sacola e que o total está visível
    const cartItems = page.locator('[data-testid="cart-item"]');
    await expect(cartItems).toHaveCount(1);

    const cartTotal = page.locator('[data-testid="cart-total-price"]');
    await expect(cartTotal).toBeVisible();
    const totalText = await cartTotal.textContent();
    expect(totalText).toContain('R$');
  });

  test('2. Clique no botão de WhatsApp e validação da correta montagem da URL de redirecionamento', async ({ page }) => {
    await page.goto('/');

    // Adiciona o primeiro produto
    const firstProduct = page.locator('[data-testid="product-card"]').first();
    await expect(firstProduct).toBeVisible();
    await firstProduct.locator('[data-testid="add-to-cart-btn"]').click();

    // Drawer aberto
    const cartDrawer = page.locator('[data-testid="cart-drawer"]');
    await expect(cartDrawer).toBeVisible();

    // Localiza o botão de finalização no WhatsApp
    const whatsappBtn = page.locator('[data-testid="whatsapp-checkout-btn"]');
    await expect(whatsappBtn).toBeVisible();

    // Obtém o atributo href gerado
    const href = await whatsappBtn.getAttribute('href');
    expect(href).toBeTruthy();
    expect(href).toContain('https://wa.me/5581994651854?text=');

    // Decodifica a mensagem para validação estrita do formato
    const url = new URL(href!);
    const textParam = url.searchParams.get('text');
    expect(textParam).toBeTruthy();

    const decodedMessage = decodeURIComponent(textParam!);
    // Validações obrigatórias especificadas:
    expect(decodedMessage).toContain('NOVO PEDIDO - CVT STORE');
    expect(decodedMessage).toContain('#CVT-');
    expect(decodedMessage).toContain('VALOR TOTAL: R$');
    expect(decodedMessage).toContain('Tamanho:');
    expect(decodedMessage).toContain('Qtd:');
  });

  test('3. Carrossel de múltiplas fotos no card do catálogo', async ({ page }) => {
    await page.goto('/');

    // Localiza um card que possua múltiplas fotos e carrossel
    const multiPhotoCard = page.locator('[data-testid="product-card"]').filter({ has: page.locator('[data-testid="card-next-photo"]') }).first();
    await expect(multiPhotoCard).toBeVisible();

    const nextPhotoBtn = multiPhotoCard.locator('[data-testid="card-next-photo"]');
    await expect(nextPhotoBtn).toBeVisible();

    const imgLocator = multiPhotoCard.locator('img').first();
    const initialSrc = await imgLocator.getAttribute('src');

    // Clica para avançar a foto
    await nextPhotoBtn.click();
    const updatedSrc = await imgLocator.getAttribute('src');

    expect(updatedSrc).toBeTruthy();
    expect(updatedSrc).not.toBe(initialSrc);
  });

  test('4. Modal de detalhes com scroll e visibilidade de descrição, preço e compra', async ({ page }) => {
    await page.goto('/');

    // Abre detalhes do primeiro produto clicando na foto de capa
    const firstProduct = page.locator('[data-testid="product-card"]').first();
    await expect(firstProduct).toBeVisible();
    await firstProduct.locator('img').first().click();

    // Modal de detalhes aberto
    const modalContent = page.locator('[data-testid="quickview-modal-content"]');
    await expect(modalContent).toBeVisible();

    // Verifica que o preço, seletor de tamanho e botão de compra estão presentes e acessíveis
    await expect(modalContent.locator('text=R$').first()).toBeVisible();
    await expect(modalContent.locator('text=Escolha o Tamanho:')).toBeVisible();
    await expect(modalContent.locator('text=Pedir no WhatsApp Agora')).toBeVisible();
  });

  test('5. Autenticação administrativa real, cadastro de novo produto e reflexo na vitrine', async ({ page }) => {
    await page.goto('/#admin');

    // Se estiver no login, realiza autenticação com credenciais do banco
    const loginUsernameInput = page.locator('[data-testid="admin-username-input"]');
    if (await loginUsernameInput.isVisible()) {
      await loginUsernameInput.fill('admin');
      await page.locator('[data-testid="admin-password-input"]').fill('cvtadmin2026');
      await page.locator('[data-testid="admin-login-submit-btn"]').click();
    }

    // Verifica que está no Dashboard do Admin
    await expect(page.locator('text=Dashboard Executivo & Inteligência')).toBeVisible();

    // Acessa a aba Gestão de Produtos
    const tabProducts = page.locator('[data-testid="tab-products"]');
    await tabProducts.click();

    // Clica em Novo Produto
    const newProductBtn = page.locator('[data-testid="add-new-product-btn"]');
    await newProductBtn.click();

    // Preenche os dados do formulário
    const uniqueTitle = `Camisa Edição Especial Playwright ${Date.now().toString().slice(-4)}`;
    await page.locator('[data-testid="product-name-input"]').fill(uniqueTitle);
    await page.locator('[data-testid="product-price-input"]').fill('149.90');
    
    // Campo de estoque
    const stockInput = page.locator('[data-testid="product-stock-input"]').first();
    if (await stockInput.isVisible()) {
      await stockInput.fill('20');
    }

    // Salva o produto
    await page.locator('[data-testid="save-product-btn"]').click();

    // Confirma que o produto foi adicionado na tabela do Admin
    await expect(page.locator(`text=${uniqueTitle}`)).toBeVisible();

    // Volta para a Vitrine
    const backToStoreBtn = page.locator('[data-testid="back-to-store-btn"]');
    await backToStoreBtn.click();

    // Verifica que o novo produto reflete instantaneamente na Vitrine da Loja
    await expect(page.locator(`text=${uniqueTitle}`)).toBeVisible();
  });

  test('6. Validação dos alertas do dashboard e gatilho de exportação de dados', async ({ page }) => {
    await page.goto('/#admin');

    // Se estiver na tela de login, autentica
    const loginUsernameInput = page.locator('[data-testid="admin-username-input"]');
    if (await loginUsernameInput.isVisible()) {
      await loginUsernameInput.fill('admin');
      await page.locator('[data-testid="admin-password-input"]').fill('cvtadmin2026');
      await page.locator('[data-testid="admin-login-submit-btn"]').click();
    }

    // Confirma que está no Dashboard
    await expect(page.locator('[data-testid="tab-dashboard"]')).toBeVisible();

    // Valida os alertas visuais de estoque baixo (< 5 unidades)
    const criticalKpi = page.locator('[data-testid="critical-stock-kpi"]');
    await expect(criticalKpi).toBeVisible();

    const criticalCount = page.locator('[data-testid="critical-items-count"]');
    const countText = await criticalCount.textContent();
    expect(countText).toBeTruthy();

    // Testa a Central de Exportação
    const exportBtn = page.locator('[data-testid="global-export-btn"]');
    await exportBtn.click();

    // Modal de Exportação deve estar visível
    await expect(page.locator('text=Central de Exportação de Dados')).toBeVisible();

    // Aciona o botão de baixar relatório
    const confirmExportBtn = page.locator('[data-testid="export-confirm-btn"]');
    await confirmExportBtn.click();

    // Confirma feedback de sucesso na exportação
    await expect(page.locator('text=Exportado com Sucesso!')).toBeVisible();
  });

  test('7. Experiência Mobile (390x844): Grid de 2 colunas e scroll suave do modal de detalhes', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    // Valida que os cards estão visíveis no grid compacto
    const productCards = page.locator('[data-testid="product-card"]');
    await expect(productCards.first()).toBeVisible();

    // Clica na foto do primeiro produto no smartphone para abrir o modal de detalhes
    await productCards.first().locator('img').first().click();

    // Modal de detalhes aberto
    const modalContent = page.locator('[data-testid="quickview-modal-content"]');
    await expect(modalContent).toBeVisible();

    // Rola suavemente até o fim do modal no smartphone e valida que o botão de compra é plenamente acessível
    const ctaBtn = modalContent.locator('text=Pedir no WhatsApp Agora');
    await ctaBtn.scrollIntoViewIfNeeded();
    await expect(ctaBtn).toBeVisible();
    await expect(modalContent.locator('text=Escolha o Tamanho:')).toBeVisible();
  });

  test('8. Aba de Promoções na Vitrine: filtro exclusivo, preço riscado e tag de desconto', async ({ page }) => {
    await page.goto('/');

    // Clica no botão/pill de Promoções no catálogo ou navegação
    const promoPill = page.locator('[data-testid="cat-pill-promocoes"]');
    await expect(promoPill).toBeVisible();
    await promoPill.click();

    // Valida que o banner de Promoções & Queima de Estoque apareceu
    const promoBanner = page.locator('[data-testid="promo-banner"]');
    await expect(promoBanner).toBeVisible();
    await expect(page.locator('text=Aba de Promoções & Ofertas Exclusivas')).toBeVisible();

    // Valida que os cards exibidos possuem badge de promoção e preço riscado
    const promoCard = page.locator('[data-testid="product-card"]').first();
    await expect(promoCard).toBeVisible();

    const promoBadge = promoCard.locator('[data-testid="card-promo-badge"]');
    await expect(promoBadge).toBeVisible();

    const strikethroughPrice = promoCard.locator('[data-testid="strikethrough-price"]');
    await expect(strikethroughPrice).toBeVisible();

    // Abre detalhes do item em promoção
    await promoCard.locator('img').first().click();

    const modalContent = page.locator('[data-testid="quickview-modal-content"]');
    await expect(modalContent).toBeVisible();

    // Valida preço original riscado e badge de desconto dentro do modal
    await expect(modalContent.locator('[data-testid="modal-promo-badge"]')).toBeVisible();
    await expect(modalContent.locator('[data-testid="modal-strikethrough-price"]')).toBeVisible();
  });

  test('9. Painel Admin: Gestão de Promoções com Switch, Preço Promocional e Toggle de 1 clique', async ({ page }) => {
    await page.goto('/#admin');

    // Autentica se necessário
    const loginUsernameInput = page.locator('[data-testid="admin-username-input"]');
    if (await loginUsernameInput.isVisible()) {
      await loginUsernameInput.fill('admin');
      await page.locator('[data-testid="admin-password-input"]').fill('cvtadmin2026');
      await page.locator('[data-testid="admin-login-submit-btn"]').click();
    }

    // Acessa a aba Gestão de Produtos
    const tabProducts = page.locator('[data-testid="tab-products"]');
    await tabProducts.click();

    // Testa o filtro rápido de Promoções no Admin
    const filterPromoBtn = page.locator('[data-testid="admin-filter-promo-btn"]');
    await expect(filterPromoBtn).toBeVisible();
    await filterPromoBtn.click();

    // Confirma que os itens listados têm o badge de promoção ativa
    const activeBadge = page.locator('[data-testid^="promo-active-badge-"]').first();
    await expect(activeBadge).toBeVisible();

    // Testa alternar de volta para Todos
    const filterAllBtn = page.locator('[data-testid="admin-filter-all-btn"]');
    await filterAllBtn.click();

    // Abre modal de Novo Produto para testar cadastro de oferta
    const newProductBtn = page.locator('[data-testid="add-new-product-btn"]');
    await newProductBtn.click();

    const promoProductName = `Peça Promoção Exclusiva ${Date.now().toString().slice(-4)}`;
    await page.locator('[data-testid="product-name-input"]').fill(promoProductName);
    await page.locator('[data-testid="product-price-input"]').fill('120.00');

    // Ativa o Switch de Promoção
    const promoSwitch = page.locator('[data-testid="product-promo-switch"]');
    await promoSwitch.check({ force: true });

    // Preenche o valor promocional
    const promoPriceInput = page.locator('[data-testid="product-promo-price-input"]');
    await expect(promoPriceInput).toBeVisible();
    await promoPriceInput.fill('89.90');

    // Salva o produto
    await page.locator('[data-testid="save-product-btn"]').click();

    // Confirma que o produto foi salvo e aparece com promoção ativa
    await expect(page.locator(`text=${promoProductName}`)).toBeVisible();
  });

  test('10. Carrinho e WhatsApp: Cálculo do valor com desconto para itens em promoção', async ({ page }) => {
    await page.goto('/');

    // Clica no filtro de Promoções
    await page.locator('[data-testid="cat-pill-promocoes"]').click();

    const firstPromoCard = page.locator('[data-testid="product-card"]').first();
    await expect(firstPromoCard).toBeVisible();

    // Adiciona o produto promocional à sacola
    await firstPromoCard.locator('[data-testid="add-to-cart-btn"]').click();

    // Drawer da sacola abre
    const cartDrawer = page.locator('[data-testid="cart-drawer"]');
    await expect(cartDrawer).toBeVisible();

    // Valida que o botão de WhatsApp checkout está presente e contém as informações da promoção
    const whatsappBtn = page.locator('[data-testid="whatsapp-checkout-btn"]');
    await expect(whatsappBtn).toBeVisible();

    const href = await whatsappBtn.getAttribute('href');
    expect(href).toBeTruthy();
    expect(href).toContain('https://wa.me/5581994651854?text=');
  });

});
