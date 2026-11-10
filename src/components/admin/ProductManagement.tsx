import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  Upload,
  Image as ImageIcon,
  Check,
  AlertCircle,
  Star,
  Layers,
  Flame,
  Tag,
} from 'lucide-react';
import { useStore } from '../../data/storeContext';
import { Product } from '../../types';
import { CATEGORIES } from '../../data/products';

const DEFAULT_SIZES = ['P', 'M', 'G', 'GG', 'XG', '38', '40', '42', '44', '46', 'Único Regulável'];

export const ProductManagement: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, togglePromo } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('todas');
  const [filterPromoOnly, setFilterPromoOnly] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('DLZ');
  const [category, setCategory] = useState<'camisas' | 'polos' | 'calcas' | 'bermudas' | 'bones'>('camisas');
  const [price, setPrice] = useState('89.90');
  const [originalPrice, setOriginalPrice] = useState('');
  const [promoPrice, setPromoPrice] = useState('');
  const [isPromo, setIsPromo] = useState(false);
  const [costPrice, setCostPrice] = useState('40.00');
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
  ]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [badge, setBadge] = useState('');
  const [description, setDescription] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['P', 'M', 'G', 'GG']);
  const [stockBySize, setStockBySize] = useState<Record<string, number>>({
    P: 4,
    M: 6,
    G: 5,
    GG: 3,
  });
  const [formError, setFormError] = useState('');

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.brand && p.brand.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCat === 'todas' || p.category === selectedCat;
    const matchesPromo = !filterPromoOnly || Boolean(p.isPromo);
    return matchesSearch && matchesCategory && matchesPromo;
  });

  const openNewProductModal = () => {
    setEditingProduct(null);
    setName('');
    setBrand('DLZ');
    setCategory('camisas');
    setPrice('89.90');
    setOriginalPrice('');
    setPromoPrice('');
    setIsPromo(false);
    setCostPrice('40.00');
    setImages([
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    ]);
    setNewImageUrl('');
    setBadge('Lançamento');
    setDescription('Peça com acabamento premium e caimento impecável.');
    setSelectedSizes(['P', 'M', 'G', 'GG']);
    setStockBySize({ P: 4, M: 6, G: 5, GG: 3 });
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setBrand(p.brand || 'CVT Collection');
    setCategory(p.category);
    setPrice(p.price.toString());
    setOriginalPrice(p.originalPrice ? p.originalPrice.toString() : '');
    setPromoPrice(p.promoPrice ? p.promoPrice.toString() : '');
    setIsPromo(Boolean(p.isPromo));
    setCostPrice(p.costPrice ? p.costPrice.toString() : '');
    
    const prodImages = (p.images && p.images.length > 0) ? p.images : [p.image];
    setImages(prodImages);
    setNewImageUrl('');
    setBadge(p.badge || '');
    setDescription(p.description);
    
    const sizes = p.sizes || ['M'];
    setSelectedSizes(sizes);
    
    const initialStocks: Record<string, number> = {};
    sizes.forEach((sz) => {
      initialStocks[sz] = p.stockBySize?.[sz] !== undefined ? p.stockBySize[sz] : Math.max(1, Math.floor(p.stock / sizes.length));
    });
    setStockBySize(initialStocks);
    
    setFormError('');
    setIsModalOpen(true);
  };

  const handleAddImageUrl = () => {
    if (!newImageUrl.trim()) return;
    setImages([...images, newImageUrl.trim()]);
    setNewImageUrl('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        setFormError('A imagem deve ter no máximo 3MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImages([...images, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index: number) => {
    if (images.length <= 1) {
      setFormError('O produto deve ter pelo menos uma imagem.');
      return;
    }
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSetPrimaryImage = (index: number) => {
    if (index === 0) return;
    const selected = images[index];
    const rest = images.filter((_, i) => i !== index);
    setImages([selected, ...rest]);
  };

  const toggleSize = (sz: string) => {
    if (selectedSizes.includes(sz)) {
      if (selectedSizes.length > 1) {
        setSelectedSizes(selectedSizes.filter((s) => s !== sz));
        const nextStocks = { ...stockBySize };
        delete nextStocks[sz];
        setStockBySize(nextStocks);
      }
    } else {
      setSelectedSizes([...selectedSizes, sz]);
      setStockBySize({
        ...stockBySize,
        [sz]: 5,
      });
    }
  };

  const handleStockChange = (sz: string, val: string) => {
    const qty = Math.max(0, parseInt(val, 10) || 0);
    setStockBySize({
      ...stockBySize,
      [sz]: qty,
    });
  };

  const totalCalculatedStock = Object.values(stockBySize).reduce((a, b) => a + b, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('O nome do produto é obrigatório.');
      return;
    }
    const parsedPrice = parseFloat(price.replace(',', '.'));
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setFormError('Informe um preço válido.');
      return;
    }
    if (images.length === 0) {
      setFormError('Adicione pelo menos uma foto para o produto.');
      return;
    }

    let parsedPromoPrice: number | undefined = undefined;
    if (isPromo) {
      if (!promoPrice.trim()) {
        setFormError('Informe o valor promocional da peça.');
        return;
      }
      parsedPromoPrice = parseFloat(promoPrice.replace(',', '.'));
      if (isNaN(parsedPromoPrice) || parsedPromoPrice <= 0) {
        setFormError('Informe um valor promocional válido.');
        return;
      }
      if (parsedPromoPrice >= parsedPrice) {
        setFormError('O preço promocional deve ser menor que o preço de venda da peça.');
        return;
      }
    }

    const catObj = CATEGORIES.find((c) => c.id === category);
    const categoryLabel = catObj ? catObj.label : 'Geral';

    const productPayload = {
      name: name.trim(),
      brand: brand.trim(),
      category,
      categoryLabel,
      price: parsedPrice,
      originalPrice: originalPrice ? parseFloat(originalPrice.replace(',', '.')) : undefined,
      promoPrice: isPromo ? parsedPromoPrice : undefined,
      isPromo,
      costPrice: costPrice ? parseFloat(costPrice.replace(',', '.')) : undefined,
      stock: totalCalculatedStock,
      stockBySize,
      image: images[0],
      images,
      badge: badge.trim() || undefined,
      description: description.trim(),
      sizes: selectedSizes,
    };

    if (editingProduct) {
      await updateProduct(editingProduct.id, productPayload);
    } else {
      await addProduct({
        ...productPayload,
        sku: `CVT-${category.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
        salesCount: 0,
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, prodName: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o produto "${prodName}"?`)) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider font-athletic">
            Gestão de Produtos (Catálogo Relacional)
          </h2>
          <p className="text-xs text-zinc-400 font-sans mt-0.5">
            Cadastre peças com múltiplas fotos, preços e estoque discriminado por tamanho.
          </p>
        </div>

        <button
          data-testid="add-new-product-btn"
          onClick={openNewProductModal}
          className="flex items-center gap-2 px-4 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-wider rounded-lg transition-all shadow-md active:scale-95 font-athletic"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Produto</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Buscar por nome, SKU ou marca..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-400 font-sans"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            data-testid="admin-filter-all-btn"
            onClick={() => setFilterPromoOnly(false)}
            className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-black uppercase font-athletic transition-colors whitespace-nowrap ${
              !filterPromoOnly
                ? 'bg-yellow-400 text-black'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
            }`}
          >
            Todos ({products.length})
          </button>

          <button
            type="button"
            data-testid="admin-filter-promo-btn"
            onClick={() => setFilterPromoOnly(true)}
            className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-black uppercase font-athletic transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              filterPromoOnly
                ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-md'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-yellow-400'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-yellow-400 fill-current" />
            <span>Promoções ({products.filter((p) => p.isPromo).length})</span>
          </button>

          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-400 font-athletic uppercase"
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950 text-zinc-400 uppercase tracking-wider border-b border-zinc-800 font-athletic">
              <tr>
                <th className="py-3 px-4">Peça / Fotos</th>
                <th className="py-3 px-4">Marca / Categoria</th>
                <th className="py-3 px-4">Preço Original</th>
                <th className="py-3 px-4">Promoção (1-Clique)</th>
                <th className="py-3 px-4">Grade de Estoque</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-200">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-zinc-500">
                    Nenhum produto encontrado.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const pImages = (p.images && p.images.length > 0) ? p.images : [p.image];
                  return (
                    <tr key={p.id} className="hover:bg-zinc-800/40 transition-colors">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <div className="relative w-12 h-14 rounded bg-black border border-zinc-800 shrink-0 overflow-hidden">
                          <img
                            src={pImages[0] || p.image}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                          {pImages.length > 1 && (
                            <span className="absolute bottom-0.5 right-0.5 bg-black/80 text-yellow-400 text-[9px] font-bold px-1 rounded font-mono">
                              +{pImages.length - 1}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-white text-sm truncate max-w-[200px]" title={p.name}>
                            {p.name}
                          </p>
                          <p className="text-[11px] text-zinc-400 font-mono mt-0.5">{p.sku}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            {p.badge && (
                              <span className="bg-yellow-400/10 text-yellow-400 text-[9px] font-bold px-1.5 py-0.2 rounded font-athletic uppercase">
                                {p.badge}
                              </span>
                            )}
                            <span className="text-[10px] text-zinc-500 font-sans">
                              {pImages.length} {pImages.length === 1 ? 'foto' : 'fotos'}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-sans">
                        <span className="font-bold text-white block">{p.brand || 'CVT'}</span>
                        <span className="text-zinc-400 text-[11px] uppercase font-athletic">{p.categoryLabel}</span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="text-sm font-black text-white font-athletic text-yellow-400">
                          R$ {p.price.toFixed(2).replace('.', ',')}
                        </span>
                        {p.originalPrice && (
                          <span className="block text-[11px] text-zinc-500 line-through">
                            R$ {p.originalPrice.toFixed(2).replace('.', ',')}
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 font-sans">
                        {p.isPromo && p.promoPrice ? (
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5">
                              <span 
                                data-testid={`promo-active-badge-${p.id}`}
                                className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-red-600/30 to-amber-500/20 text-yellow-400 border border-yellow-400/50 rounded font-black text-[11px] font-athletic"
                              >
                                <Flame className="w-3 h-3 text-yellow-400 fill-current" />
                                <span>R$ {p.promoPrice.toFixed(2).replace('.', ',')}</span>
                                <span className="text-[10px] text-red-400 font-sans">
                                  (-{Math.round(((p.price - p.promoPrice) / p.price) * 100)}%)
                                </span>
                              </span>
                            </div>
                            <button
                              type="button"
                              data-testid={`toggle-promo-${p.id}`}
                              onClick={() => togglePromo(p.id, false)}
                              className="text-[10px] text-zinc-400 hover:text-red-400 underline font-athletic uppercase block transition-colors"
                            >
                              Desativar Oferta
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <span className="text-[10px] text-zinc-500 font-athletic uppercase block">Inativa</span>
                            <button
                              type="button"
                              data-testid={`toggle-promo-${p.id}`}
                              onClick={() => {
                                const promoDiscount = Math.round(p.price * 0.8 * 100) / 100;
                                togglePromo(p.id, true, promoDiscount);
                              }}
                              className="px-2 py-1 bg-zinc-800 hover:bg-yellow-400 hover:text-black text-zinc-300 rounded text-[10px] font-black uppercase font-athletic transition-all flex items-center gap-1"
                              title="Ativar com 20% OFF rápido"
                            >
                              <Flame className="w-3 h-3 text-yellow-400" />
                              <span>+ Ativar Oferta</span>
                            </button>
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {p.sizes.map((s) => {
                            const sizeStock = p.stockBySize?.[s] !== undefined ? p.stockBySize[s] : '?';
                            const isCrit = typeof sizeStock === 'number' && sizeStock < 3;
                            return (
                              <span
                                key={s}
                                className={`text-[10px] px-1.5 py-0.5 rounded font-athletic font-bold border ${
                                  isCrit
                                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                    : 'bg-zinc-950 text-zinc-300 border-zinc-800'
                                }`}
                                title={`Tamanho ${s}: ${sizeStock} un.`}
                              >
                                {s}: {sizeStock}
                              </span>
                            );
                          })}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`text-xs font-black px-2 py-0.5 rounded font-athletic ${
                            p.stock < 5
                              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse'
                              : 'bg-zinc-950 text-zinc-300 border border-zinc-800'
                          }`}
                        >
                          {p.stock} un.
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditModal(p)}
                            className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded transition-colors"
                            title="Editar Peça"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id, p.name)}
                            className="p-1.5 bg-zinc-800 hover:bg-rose-950 hover:text-rose-400 text-zinc-400 rounded transition-colors"
                            title="Excluir Peça"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CRUD Product Modal with Multi-Photo & Variant Stock */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div 
            className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl p-6 text-white my-8 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div>
                <h3 className="text-lg font-bold font-athletic uppercase tracking-wider text-yellow-400">
                  {editingProduct ? 'Editar Produto e Imagens' : 'Cadastrar Novo Produto'}
                </h3>
                <p className="text-xs text-zinc-400">Banco de Dados Relacional: `products`, `product_images`, `product_variants`</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="my-3 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="py-4 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1 font-athletic">
                    Nome da Peça *
                  </label>
                  <input
                    type="text"
                    required
                    data-testid="product-name-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Camisa Polo DLZ Piquet Nobre"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-400 font-sans"
                  />
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1 font-athletic">
                    Marca / Linha
                  </label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-400 font-sans"
                  >
                    <option value="DLZ">DLZ (Revendedor Autorizado)</option>
                    <option value="Mioche">Mioche (Revendedor Autorizado)</option>
                    <option value="CVT Collection">CVT Collection (Marca Própria)</option>
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1 font-athletic">
                    Categoria
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-400 font-sans"
                  >
                    <option value="camisas">Camisas</option>
                    <option value="polos">Polos</option>
                    <option value="calcas">Calças</option>
                    <option value="bermudas">Bermudas</option>
                    <option value="bones">Bonés</option>
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1 font-athletic">
                    Preço de Venda (R$) *
                  </label>
                  <input
                    type="text"
                    required
                    data-testid="product-price-input"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="89.90"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-400 font-sans"
                  />
                </div>

                {/* Original Price */}
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1 font-athletic">
                    Preço Original / De (R$) - Opcional
                  </label>
                  <input
                    type="text"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="109.90"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-400 font-sans"
                  />
                </div>

                {/* Badge */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1 font-athletic">
                    Selo / Badge Promocional
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="Ex: Lançamento, Mais Vendida, Destaque"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-400 font-sans"
                  />
                </div>

                {/* PROMOTION / SALE SECTION */}
                <div className="md:col-span-2 p-4 bg-zinc-900 border border-zinc-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-yellow-400 fill-yellow-400 animate-pulse" />
                      <div>
                        <span className="text-xs font-black uppercase tracking-wider text-white font-athletic block">
                          Colocar em Promoção / Queima de Estoque
                        </span>
                        <span className="text-[11px] text-zinc-400 font-sans">
                          Ativa o produto em destaque na aba "Promoções" com preço promocional exclusivo.
                        </span>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        data-testid="product-promo-switch"
                        checked={isPromo}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setIsPromo(checked);
                          if (checked && !promoPrice && price) {
                            const currentP = parseFloat(price.replace(',', '.')) || 0;
                            if (currentP > 0) {
                              setPromoPrice((currentP * 0.8).toFixed(2));
                            }
                          }
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                    </label>
                  </div>

                  {isPromo && (
                    <div className="pt-3 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-in fade-in duration-200">
                      <div>
                        <label className="block text-xs font-bold text-yellow-400 uppercase tracking-wider mb-1 font-athletic">
                          Preço Promocional (R$) *
                        </label>
                        <input
                          type="text"
                          data-testid="product-promo-price-input"
                          value={promoPrice}
                          onChange={(e) => setPromoPrice(e.target.value)}
                          placeholder="Ex: 69.90"
                          className="w-full bg-zinc-950 border border-yellow-400/50 rounded-lg px-3 py-2 text-sm text-yellow-400 font-bold focus:outline-none focus:border-yellow-400 font-sans"
                        />
                        <span className="text-[11px] text-zinc-500 font-sans mt-0.5 block">
                          Este será o valor cobrado no checkout do WhatsApp.
                        </span>
                      </div>

                      <div className="flex flex-col justify-center">
                        {(() => {
                          const curP = parseFloat(price.replace(',', '.')) || 0;
                          const promP = parseFloat(promoPrice.replace(',', '.')) || 0;
                          if (curP > 0 && promP > 0 && promP < curP) {
                            const diff = curP - promP;
                            const pct = Math.round((diff / curP) * 100);
                            return (
                              <div className="p-2.5 bg-yellow-400/10 border border-yellow-400/30 rounded-lg text-xs font-sans text-yellow-400">
                                <span className="font-bold flex items-center gap-1 font-athletic uppercase text-sm">
                                  <Flame className="w-4 h-4 fill-current" />
                                  Desconto de {pct}% Ativo
                                </span>
                                <span className="text-zinc-300 block text-[11px] mt-0.5">
                                  Economia de R$ {diff.toFixed(2).replace('.', ',')} para o cliente.
                                </span>
                              </div>
                            );
                          }
                          return (
                            <span className="text-xs text-zinc-500 italic">
                              Informe um preço promocional menor que R$ {price || '0,00'}.
                            </span>
                          );
                        })()}
                      </div>
                    </div>
                  )}
                </div>

                {/* MULTI-PHOTO GALLERY MANAGEMENT */}
                <div className="md:col-span-2 p-4 bg-zinc-900/90 border border-zinc-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-yellow-400 uppercase tracking-wider font-athletic flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4" />
                      <span>Galeria de Fotos do Produto (`product_images`)</span>
                    </label>
                    <span className="text-[11px] text-zinc-400">
                      {images.length} {images.length === 1 ? 'imagem cadastrada' : 'imagens cadastradas'}
                    </span>
                  </div>

                  {/* Existing Images Thumbnails */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {images.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        className={`relative aspect-[3/4] rounded-lg overflow-hidden border-2 bg-black group ${
                          idx === 0 ? 'border-yellow-400 shadow-md' : 'border-zinc-800'
                        }`}
                      >
                        <img src={imgUrl} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                        
                        {/* Primary Badge */}
                        {idx === 0 && (
                          <span className="absolute top-1 left-1 bg-yellow-400 text-black text-[9px] font-black px-1.5 py-0.2 rounded font-athletic uppercase">
                            Capa
                          </span>
                        )}

                        {/* Controls Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1.5">
                          {idx !== 0 ? (
                            <button
                              type="button"
                              onClick={() => handleSetPrimaryImage(idx)}
                              className="self-start text-[10px] bg-zinc-800 hover:bg-yellow-400 hover:text-black text-white px-1.5 py-0.5 rounded font-athletic font-bold"
                              title="Definir como foto de capa"
                            >
                              Tornar Capa
                            </button>
                          ) : <div />}

                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="self-end p-1 bg-rose-600 hover:bg-rose-500 text-white rounded"
                            title="Remover foto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Image Inputs */}
                  <div className="pt-2 border-t border-zinc-800/80 flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      placeholder="Colar link de nova imagem (https://...)"
                      className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-yellow-400 font-mono"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-lg uppercase font-athletic shrink-0"
                    >
                      Adicionar URL
                    </button>

                    <label className="cursor-pointer px-3 py-1.5 bg-yellow-400/10 hover:bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 uppercase font-athletic shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload do PC</span>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </div>
                </div>

                {/* SIZES AND SPECIFIC STOCK BY SIZE */}
                <div className="md:col-span-2 p-4 bg-zinc-900/90 border border-zinc-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-yellow-400 uppercase tracking-wider font-athletic flex items-center gap-1.5">
                      <Layers className="w-4 h-4" />
                      <span>Estoque por Tamanho (`product_variants`)</span>
                    </label>
                    <span className="text-xs font-black text-white font-athletic">
                      Total: <span className="text-yellow-400">{totalCalculatedStock} peças</span>
                    </span>
                  </div>

                  {/* Size chips toggle */}
                  <div className="flex flex-wrap gap-1.5 pb-2 border-b border-zinc-800">
                    {DEFAULT_SIZES.map((sz) => {
                      const isSel = selectedSizes.includes(sz);
                      return (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => toggleSize(sz)}
                          className={`px-3 py-1 text-xs font-black rounded uppercase font-athletic transition-all ${
                            isSel
                              ? 'bg-yellow-400 text-black shadow-sm'
                              : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:border-zinc-700'
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>

                  {/* Stock inputs per selected size */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                    {selectedSizes.map((sz) => {
                      const currentQty = stockBySize[sz] !== undefined ? stockBySize[sz] : 0;
                      return (
                        <div key={sz} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg">
                          <div className="flex items-center justify-between text-xs mb-1 font-athletic uppercase">
                            <span className="font-bold text-white">Tam {sz}</span>
                            <span className={currentQty < 3 ? 'text-rose-400 font-bold' : 'text-zinc-500'}>
                              {currentQty < 3 ? 'Baixo' : 'Ok'}
                            </span>
                          </div>
                          <input
                            type="number"
                            min="0"
                            data-testid={sz === 'M' ? 'product-stock-input' : undefined}
                            value={currentQty}
                            onChange={(e) => handleStockChange(sz, e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-sm font-bold text-white focus:outline-none focus:border-yellow-400 font-mono text-center"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1 font-athletic">
                    Descrição Detalhada & Composição
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Informações sobre tecido, acabamento, caimento..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400 font-sans"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-zinc-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  data-testid="save-product-btn"
                  className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-wider rounded-lg font-athletic shadow-md active:scale-95"
                >
                  {editingProduct ? 'Salvar Alterações' : 'Cadastrar e Publicar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
