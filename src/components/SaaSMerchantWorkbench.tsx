import React, { useState } from 'react';
import { 
  Pencil, 
  Plus, 
  Trash, 
  Settings, 
  CreditCard, 
  Globe, 
  Sparkles, 
  CheckCircle2, 
  Coins, 
  AlertCircle, 
  ArrowRight, 
  Clock, 
  Gift, 
  Truck, 
  ExternalLink, 
  Eye, 
  RefreshCw,
  ShoppingBag,
  DollarSign,
  UserCheck,
  Check,
  Percent,
  TrendingUp,
  X
} from 'lucide-react';
import { IndustryType, ProductItem, OrderItem } from '../types';

interface SaaSMerchantWorkbenchProps {
  selectedIndustry: IndustryType;
  companyName: string;
  onUpdateCompanyName: (name: string) => void;
  products: ProductItem[];
  orders: OrderItem[];
  onAddProduct: (title: string, sku: string, stock: number, price: number) => void;
  onPopulateSampleData: () => void;
  onRestockProduct: (sku: string) => void;
  onAuditOrder: (orderId: string) => void;
  onOpenOnlineStorefront: () => void;
  addLog: (agent: string, action: string, details: string, type: 'info' | 'success' | 'warning' | 'error' | 'tool') => void;
  isCommandCenterOpen: boolean;
  onToggleCommandCenter: () => void;
}

export default function SaaSMerchantWorkbench({
  selectedIndustry,
  companyName,
  onUpdateCompanyName,
  products,
  orders,
  onAddProduct,
  onPopulateSampleData,
  onRestockProduct,
  onAuditOrder,
  onOpenOnlineStorefront,
  addLog,
  isCommandCenterOpen,
  onToggleCommandCenter
}: SaaSMerchantWorkbenchProps) {
  // Local interface states
  const [showOfferBanner, setShowOfferBanner] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempCompanyName, setTempCompanyName] = useState(companyName);
  
  // New Product Form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSKU, setNewSKU] = useState('');
  const [newStock, setNewStock] = useState(35);
  const [newPrice, setNewPrice] = useState(49.00);

  // Configuration statuses (SaaS simulation states triggers)
  const [paymentActivated, setPaymentActivated] = useState(false);
  const [shippingChecked, setShippingChecked] = useState(false);
  const [domainBound, setDomainBound] = useState(false);
  const [customDomainName, setCustomDomainName] = useState(`${ companyNameHex() || 'my-shop-prod' }.vitesse.shopify.dev`);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const [activeThemeColor, setActiveThemeColor] = useState<'green' | 'indigo' | 'cyber' | 'dark'>('green');

  function companyNameHex() {
    return companyName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  }

  const handleUpdateNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempCompanyName.trim()) {
      onUpdateCompanyName(tempCompanyName.trim());
      setIsEditingName(false);
      addLog('SaaS Platform', '更新店铺名称', `您的连锁店铺主品牌名称已安全修改为「${tempCompanyName}」`, 'success');
    }
  };

  const handleFormProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSKU.trim()) return;
    onAddProduct(newTitle.trim(), newSKU.trim(), newStock, newPrice);
    setNewTitle('');
    setNewSKU('');
    setShowAddForm(false);
    addLog('AI Warehouse Manager', '手动上架商品', `成功手动注册并同步一件新品类 ${newTitle} [${newSKU}] 到 ERP 中台`, 'success');
  };

  const handleThemeChange = (color: 'green' | 'indigo' | 'cyber' | 'dark') => {
    setActiveThemeColor(color);
    addLog('AI Designer', '切换UI主题配色', `客户端在线网站的主题色已动态覆盖为 ${color === 'green' ? '经典翡翠绿' : color === 'indigo' ? '极光电磁蓝' : color === 'cyber' ? '赛博落日金' : '尊贵深邃黑'}，已自动刷新 CDN 缓存。`, 'success');
  };

  return (
    <div className="space-y-6 select-none animate-fadeIn max-w-7xl mx-auto pb-12">
      
      {/* 🎯 顶层红利滚动Banner (Shopify €1 Offer Banner) */}
      {showOfferBanner && (
        <div id="saas-onboarding-offer-banner" className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl relative overflow-hidden">
          {/* Neon absolute decorative background light */}
          <div className="absolute top-0 right-0 w-64 h-16 bg-gradient-to-l from-emerald-500/10 to-transparent blur-2xl rounded-full"></div>
          
          <div className="flex items-center gap-3.5 z-10">
            <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center font-bold text-lg text-emerald-400 shrink-0">
              💎
            </div>
            <div className="text-left">
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">首季超级大礼包</span>
              <p className="text-sm font-extrabold text-white mt-1">限时福利：首个季度 3 个月仅需每月 <span className="text-emerald-400 text-lg font-mono">1 欧元</span> 即可全面自动托管所有 AI 运营流程！</p>
              <p className="text-xs text-slate-400 mt-0.5">支付模块已由 Stripe 沙箱对接就绪，可立即升级激活以解除试用期限额限制。</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 z-10 w-full md:w-auto">
            <button 
              id="activate-discount-offer"
              onClick={() => {
                addLog('SaaS Platform', '限时特价激活', '用户成功选用 €1/月 专属优惠，首批 AI 财务及运营流程托管特权已授信。', 'success');
                alert('🎉 本地模拟沙箱：Stripe 已免签成功扣款 €1 欧元，您的专业商业操作系统已升级为终身无限额版本！');
                setShowOfferBanner(false);
              }}
              className="flex-1 md:flex-none justify-center bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black px-4 py-2 rounded-xl active:scale-95 transition-all shadow-lg cursor-pointer flex items-center gap-1.5"
            >
              <span>立即激活</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setShowOfferBanner(false)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      <div id="saas-merchant-welcome-header" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="text-left">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>嗨，{companyName}，我们开始吧。</span>
            <span className="animate-bounce">👋</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            您的商户自愈式SaaS操作系统已自动运行。在此配置中心调整您的品牌、核心货源安全线与清结算网关。可在左方侧边栏配置 24/7 独立决策的各类 AI 岗位员工。
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 text-slate-600 border border-slate-200 px-3.5 py-1.5 rounded-xl text-xs font-bold leading-none shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>问题? 800 836 977 (免漫游费)</span>
        </div>
      </div>

      {/* 🔍 Sidekick 智能输入框 (仅在右侧命令中心 Sidekick 关闭时展示，点击可瞬间收缩为主体两栏，右侧拉出指令中枢) */}
      {!isCommandCenterOpen && (
        <div 
          id="saas-sidekick-quick-entry" 
          onClick={onToggleCommandCenter}
          className="w-full bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 select-none animate-fadeIn"
          title="点击随时调起 AI Sidekick 系统操作对话"
        >
          <div className="flex items-center gap-3.5 flex-1 text-left">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-120 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
            </div>
            <div className="flex-1">
              <span className="text-slate-500 font-semibold text-xs sm:text-sm block">有什么想问的吗？</span>
              <span className="text-[10px] text-slate-400 font-medium block">点击此输入条可立即开启 Sidekick 3栏网页智能网格控制系统</span>
            </div>
          </div>
          
          <div className="className flex items-center gap-3.5 shrink-0">
            <button 
              type="button" 
              className="p-1.5 hover:bg-slate-50 border border-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-all cursor-pointer flex items-center justify-center"
              onClick={(e) => { e.stopPropagation(); onToggleCommandCenter?.(); }}
            >
              <Plus className="w-4 h-4" />
            </button>
            <button 
              type="button" 
              className="p-1.5 bg-slate-900 hover:bg-indigo-600 text-white hover:text-white rounded-lg transition-all cursor-pointer flex items-center justify-center"
              onClick={(e) => { e.stopPropagation(); onToggleCommandCenter?.(); }}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* Step 1: "添加店铺名称 📝" Master Card - Holds 2 Inner Cards */}
      {/* ========================================================== */}
      <div id="master-step-one-container" className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 space-y-6">
        
        {/* Onboarding Master Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-4 gap-4 text-left">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                <span>添加店铺名称 📝</span>
              </h3>
              <span className="text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded-full font-bold">
                1 步（共 5 步）
              </span>
            </div>
            <p className="text-xs text-slate-500">
              添加店铺名称、主营产品数量，并自定义您的网上商店，在底层云架构快速配置完成您在海外的独立品牌矩阵。
            </p>
          </div>

          {/* Quick shop renaming action aligned beautifully */}
          <div className="shrink-0">
            {isEditingName ? (
              <form onSubmit={handleUpdateNameSubmit} className="flex items-center gap-2">
                <input 
                  type="text"
                  required 
                  value={tempCompanyName}
                  onChange={(e) => setTempCompanyName(e.target.value)}
                  className="bg-slate-50 border border-slate-300 font-bold rounded-lg px-2.5 py-1 text-xs focus:ring-1 focus:ring-indigo-500 text-slate-900 focus:outline-none"
                  placeholder="请输入店铺名称"
                />
                <button type="submit" className="bg-slate-900 text-white font-extrabold text-[10px] px-2.5 py-1.5 rounded-lg">保存</button>
                <button type="button" onClick={() => { setIsEditingName(false); setTempCompanyName(companyName); }} className="text-slate-400 text-xs hover:text-slate-650">取消</button>
              </form>
            ) : (
              <button 
                onClick={() => setIsEditingName(true)}
                className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold py-1.5 px-3 rounded-xl text-xs active:scale-95 transition-all cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5 text-slate-500" />
                <span>编辑店铺名 (当前: <b className="text-slate-900 font-black">{companyName}</b>)</span>
              </button>
            )}
          </div>
        </div>

        {/* 2-Column Inner Sub-Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card A: "添加您的第一个产品" */}
          <div className="bg-slate-50/50 border border-slate-150 rounded-2xl p-5 hover:bg-white hover:border-slate-250 transition-all duration-300 flex flex-col justify-between gap-4 text-left relative overflow-hidden">
            {/* Visual tag mockup */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 border border-orange-200/40 flex items-center justify-center shrink-0 text-xl shadow-inner">
                🏷️
              </div>
              <div className="space-y-1.5">
                <h4 className="font-extrabold text-[#303030] text-sm">添加您的第一个产品</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  首先在销售终端上架元产品。您也可以选用已经为您定制的行业样品冷启动测试。
                </p>
                <button 
                  onClick={() => {
                    onPopulateSampleData();
                    addLog('AI Sourcing Manager', '一键预置样品产品', `已匹配行业 [${selectedIndustry}] 铺新，自动注入4件热销沙箱样品产品。`, 'success');
                  }}
                  className="text-[11px] text-indigo-650 hover:text-indigo-800 font-extrabold flex items-center gap-0.5 mt-1 cursor-pointer hover:underline"
                >
                  💡 先从样品产品开始？一键智能分析快速铺货 ({products.length > 0 ? `已上架 ${products.length} 款` : '推荐一键铺货'})
                </button>
              </div>
            </div>

            {/* Sub product form inside */}
            {showAddForm ? (
              <form onSubmit={handleFormProductSubmit} className="space-y-2 bg-white p-3 border border-slate-200 rounded-xl shadow-inner mt-2">
                <input 
                  type="text"
                  placeholder="产品名称 (例如 Summer T-Shirt)"
                  required
                  value={newTitle}
                  onChange={(e) => {
                    setNewTitle(e.target.value);
                    if (!newSKU) {
                      setNewSKU(`SKU-${Date.now().toString().slice(-4)}`);
                    }
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="number"
                    placeholder="售价 $"
                    required
                    min="1"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none"
                  />
                  <input 
                    type="number"
                    placeholder="初始库存"
                    required
                    min="1"
                    value={newStock}
                    onChange={(e) => setNewStock(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none"
                  />
                </div>
                <div className="flex gap-1.5 pt-1">
                  <button type="submit" className="flex-1 bg-slate-900 text-white font-extrabold text-[11px] py-1.5 rounded-lg active:scale-95 transition-all">确认上架 SKU</button>
                  <button type="button" onClick={() => setShowAddForm(false)} className="px-3 bg-slate-100 text-slate-500 text-[11px] rounded-lg">取消</button>
                </div>
              </form>
            ) : (
              <div className="pt-2">
                <button 
                  onClick={() => setShowAddForm(true)}
                  className="bg-slate-900 hover:bg-slate-850 text-white font-extrabold py-2 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer self-start"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>添加产品</span>
                </button>
              </div>
            )}
          </div>

          {/* Card B: "定制您的网上商店" */}
          <div className="bg-slate-50/50 border border-slate-150 rounded-2xl p-5 hover:bg-white hover:border-slate-250 transition-all duration-300 flex flex-col justify-between gap-4 text-left relative overflow-hidden">
            {/* Theme / Brand swatch details */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 border border-purple-200/40 flex items-center justify-center shrink-0 text-xl shadow-inner">
                🎨
              </div>
              <div className="space-y-1.5 flex-1">
                <h4 className="font-extrabold text-[#303030] text-sm">定制您的网上商店</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  选择或生成自定义主题模式，然后添加您的徽标、配色并在线极速测试。
                </p>

                {/* Inline color selections */}
                <div className="flex items-center gap-2.5 pt-1.5">
                  <span className="text-[10px] text-slate-400 font-bold">主题色:</span>
                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={() => handleThemeChange('green')}
                      className={`w-3.5 h-3.5 rounded-full bg-emerald-500 border relative ${activeThemeColor === 'green' ? 'ring-2 ring-emerald-600 ring-offset-1 scale-110' : ''}`}
                      title="翡翠经典"
                    />
                    <button 
                      onClick={() => handleThemeChange('indigo')}
                      className={`w-3.5 h-3.5 rounded-full bg-indigo-600 border relative ${activeThemeColor === 'indigo' ? 'ring-2 ring-indigo-600 ring-offset-1 scale-110' : ''}`}
                      title="极光蓝调"
                    />
                    <button 
                      onClick={() => handleThemeChange('cyber')}
                      className={`w-3.5 h-3.5 rounded-full bg-amber-500 border relative ${activeThemeColor === 'cyber' ? 'ring-2 ring-amber-600 ring-offset-1 scale-110' : ''}`}
                      title="太阳海滩"
                    />
                    <button 
                      onClick={() => handleThemeChange('dark')}
                      className={`w-3.5 h-3.5 rounded-full bg-slate-950 border relative ${activeThemeColor === 'dark' ? 'ring-2 ring-slate-950 ring-offset-1 scale-110' : ''}`}
                      title="暗黑尊贵"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button 
                onClick={onOpenOnlineStorefront}
                className="bg-slate-900 hover:bg-slate-850 text-white font-extrabold py-2 px-4 rounded-xl text-xs flex items-center justify-center gap-1 transition-all cursor-pointer self-start"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>自定义主题</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================== */}
      {/* 2. 下层：3格并排技术合规辅助卡 (Payments, Shipping, Domain bound) */}
      {/* ========================================================== */}
      <div id="onboarding-three-item-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: 设置 Shopify Payments */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-4 text-left">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-slate-800" />
              <h4 className="font-extrabold text-[#303030] text-sm">设置 Shopify Payments</h4>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              激活由系统代管的网银收单网关。本模拟环境已预先兼容了 VISA、Klarna 信用卡及 Shop Pay 等跨境代付手段。
            </p>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-50">
            <div className="flex items-center gap-1 font-mono text-[9px] text-[#969696] font-bold select-none saturate-50">
              <span className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-150">VISA</span>
              <span className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-150">KLARNA</span>
              <span className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-150">GPAY</span>
            </div>

            <button 
              type="button"
              onClick={() => {
                setPaymentActivated(!paymentActivated);
                addLog('System Gateway', '支付网关切换', paymentActivated ? '已暂时关闭 Stripe/Shopify 支付通道收单。' : '已成功在后台激活多币种数字沙箱支付收单中枢！支持信用卡。', paymentActivated ? 'warning' : 'success');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all active:scale-95 cursor-pointer ${paymentActivated ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-slate-900 border border-slate-900 hover:bg-slate-850 text-white'}`}
            >
              {paymentActivated ? '已激活' : '激活网关'}
            </button>
          </div>
        </div>

        {/* Card 2: 查看您的运费 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-4 text-left">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-slate-800" />
              <h4 className="font-extrabold text-[#303030] text-sm">查看您的运费</h4>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              为您匹配最优冷启动发货策略。系统底层已智能装配 🇫🇷 FR 巴黎仓及 🇮🇹 IT 米兰中转海关报税离岸物流计费体系。
            </p>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-50">
            <div className="flex items-center gap-2 text-xs select-none">
              <span className="font-semibold text-slate-650 flex items-center gap-0.5" title="法国运费体系">🇫🇷 <b className="font-mono text-[9px]">FR</b></span>
              <span className="font-semibold text-slate-650 flex items-center gap-0.5" title="意大利运费体系">🇮🇹 <b className="font-mono text-[9px]">IT</b></span>
              <span className="font-semibold text-slate-650 flex items-center gap-0.5" title="全球发货中枢">🇨🇳 <b className="font-mono text-[9px]">CN</b></span>
            </div>

            <button 
              type="button"
              onClick={() => {
                setShippingChecked(true);
                addLog('AI Freight Auditor', '运价审查成功', '意大利及法国离岸海关理赔模版与供应链货源计费就位。', 'success');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all active:scale-95 cursor-pointer ${shippingChecked ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' : 'bg-slate-900 hover:bg-slate-850 text-white'}`}
            >
              {shippingChecked ? '已审查完毕' : '审查运费'}
            </button>
          </div>
        </div>

        {/* Card 3: 自定义域 (获得 15 欧元红包) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-4 text-left relative overflow-hidden">
          
          {/* €15 Claim Ribbon overlay matching screenshot */}
          <div className="absolute top-1 right-1 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-[9px] px-2.0 py-0.5 rounded-lg border border-amber-300 shadow-sm animate-pulse z-20">
            获得 15 欧元
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-800" />
              <h4 className="font-extrabold text-[#303030] text-sm">自定义域</h4>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              将长串默认临时沙箱子域名一键变更为您品牌的全球专有高速独立二级域名，并自动签发 SSL 证书。
            </p>
          </div>

          {/* Core inline URL input display with copy double paper mock */}
          <div className="space-y-2.5 pt-1 border-t border-slate-50">
            <div className="flex items-center justify-between bg-slate-50 rounded-xl p-1.5 border border-slate-150 text-[10px] font-mono font-bold text-slate-600">
              <span className="truncate max-w-[130px]" title={customDomainName}>{customDomainName}</span>
              <span className="text-indigo-600 hover:text-indigo-800 cursor-pointer select-none text-[8px] tracking-tight shrink-0 font-sans" onClick={() => {
                const newDom = prompt("请输入您想要的专有域名 (不带 https):", customDomainName);
                if (newDom && newDom.trim()) {
                  setCustomDomainName(newDom.trim());
                  setDomainBound(true);
                  addLog('Cloud DNS Server', '高级域名更改', `专有域名已自动变更，安全证书匹配完毕。`, 'success');
                }
              }}>更改域</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[10px] text-amber-600 font-extrabold font-mono leading-none">
                {rewardClaimed ? '€15 红包已领' : '申领首发红包: €15'}
              </span>
              <button 
                type="button"
                onClick={() => {
                  setRewardClaimed(true);
                  addLog('SaaS Platform', '新手红包申领成功', '用户申领 15 欧元体验金金，已注入商家自营金融池。', 'success');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all active:scale-95 cursor-pointer ${rewardClaimed ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-600 text-slate-950'}`}
              >
                {rewardClaimed ? '已申领' : '定制'}
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================== */}
      {/* 3. Onboarding Progress list: "优化您在意大利的店铺" (Matching screenshots) */}
      {/* ========================================================== */}
      <div id="saas-italian-checklist-banner" className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative text-left">
        
        {/* Core header split in 2 columns: left is text instructions, right is map badges graphic placeholder */}
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-6">
          <div className="space-y-2 flex-1">
            
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center font-bold text-slate-400 text-xs">
                ○
              </span>
              <span className="text-xs text-slate-500 font-bold">6项任务中已完成0项</span>
            </div>

            <h3 className="text-base font-black text-slate-900">优化您在意大利的店铺</h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
              领先一步，掌握合规和跨境销售之道。添加适当的公司退货声明、合规责任条款与退款保障政策，赢得消费群体高维度的绝对品牌忠诚。
            </p>

            {/* Sub checklist inner helper box matching layout references */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-150 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full inline-block mt-2"></span>
                <div className="text-left">
                  <h4 className="text-xs font-extrabold text-[#303030]">主要任务：添加建议政策</h4>
                  <p className="text-[10px] text-slate-400 leading-normal mt-0.5">
                    从 SaaS 推荐模板库快速一键同步合规声明并上架到前台零售页面。
                  </p>
                </div>
              </div>
              
              <button 
                type="button"
                onClick={() => {
                  addLog('Legal Compliance API', '添加建议政策', '意大利本土退换货规范政策协议条款已自动绑定并下发至前端。', 'success');
                  alert('✓ 建议政策同步成功！已自动往您的店面消费者前端注入《意大利商事服务消费者保障政策(EU Compliance)》。');
                }}
                className="bg-slate-900 border border-slate-900 hover:bg-slate-850 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition-all active:scale-95 shrink-0"
              >
                开始使用
              </button>
            </div>

          </div>

          {/* Right Column: Custom map delivery graphic placeholder made cleanly with CSS */}
          <div className="w-full md:w-56 shrink-0 flex items-center justify-center">
            <div className="w-full h-36 border border-slate-150 rounded-2xl bg-[#fffaf5] p-3 flex flex-col justify-between overflow-hidden relative shadow-inner">
              {/* Neon styled grids representing locations */}
              <div className="absolute inset-0 select-none opacity-20 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              <div className="flex items-center justify-between z-10">
                <span className="text-[10px] bg-rose-50 border border-rose-100 text-rose-600 font-black px-2 py-0.5 rounded-lg font-mono">
                  IT CENTRAL
                </span>
                <span className="text-xs font-bold text-slate-400">MILANO</span>
              </div>

              {/* Graphic center lines representing postal parcel delivery with pins */}
              <div className="flex items-center justify-center gap-1.5 z-10 py-2">
                <div className="w-10 h-10 bg-rose-100 border border-rose-200 text-rose-600 rounded-xl flex items-center justify-center font-bold text-lg shadow-sm">
                  📦
                </div>
                <div className="w-6 border-t-2 border-dashed border-rose-300"></div>
                <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></div>
                <div className="w-6 border-t-2 border-dashed border-rose-300"></div>
                <div className="w-10 h-10 bg-slate-900 border border-slate-800 text-white rounded-xl flex items-center justify-center font-bold text-base shadow-lg">
                  🏰
                </div>
              </div>

              <div className="text-[9px] text-slate-400 font-bold z-10 flex justify-between items-center bg-white border border-slate-100 rounded-lg p-1">
                <span>安全路线: 100% SECURE</span>
                <span className="text-emerald-500 font-semibold">• ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================== */}
      {/* 3. 中控台底层：真实交易状态监控及实时商品库存列表 (Active Enterprise Logs) */}
      {/* ========================================================== */}
      <div id="saas-replicated-monitoring-console" className="grid grid-cols-1 xl:grid-cols-12 gap-6 pt-4">
        
        {/* 左半区：服装款式与库存精细控制表 */}
        <div className="xl:col-span-7 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="text-left">
              <h3 className="font-extrabold text-slate-800 text-sm">ERP 实时 SKU 产品信息与自愈补货中枢</h3>
              <p className="text-[10px] text-slate-500 mt-0.5">对应上面【步骤二】。上架后，买家可在右上角“在线商店”直接点击购买，此仓库数据将自动扣减。</p>
            </div>
            <button 
              onClick={() => {
                setShowAddForm(true);
                addLog('Command Center', '打开添加画笔', '已调起添加产品表单窗口。', 'info');
              }}
              className="bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>添加新规格</span>
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-150 text-[9px] font-bold text-slate-405 uppercase tracking-wider">
                  <th className="p-3">SKU代码</th>
                  <th className="p-3">产品描述</th>
                  <th className="p-3">销量</th>
                  <th className="p-3">实时库存状态</th>
                  <th className="p-3 text-right">标价 (USD)</th>
                  <th className="p-3 text-center">AI自愈采购</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-400">
                      <p className="text-xs">暂无在售产品商品。点击上方“极速铺货”或者“添加产品”即可实现秒级注入。</p>
                    </td>
                  </tr>
                ) : (
                  products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 font-mono font-bold text-indigo-600">{p.sku}</td>
                      <td className="p-3">
                        <span className="font-extrabold text-slate-800 block text-xs truncate max-w-[140px]">{p.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">ID: {p.id.slice(0, 5)}</span>
                      </td>
                      <td className="p-3 font-mono font-semibold text-slate-650">{p.sales} 件</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${p.stock <= 0 ? 'bg-rose-500 animate-pulse' : p.stock <= p.minStockThreshold ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'}`}></span>
                          <span className="font-bold text-slate-800 font-mono">
                            {p.stock} 件 ({p.status})
                          </span>
                        </div>
                      </td>
                      <td className="p-3 text-right font-mono font-black text-slate-900">${p.price.toFixed(2)}</td>
                      <td className="p-3 text-center">
                        {p.stock <= p.minStockThreshold ? (
                          <button 
                            onClick={() => {
                              onRestockProduct(p.sku);
                              addLog('SaaS Platform', '触发补货协议', `已自动向备份工厂下达 SKU ${p.sku} 的采购委派指令，资金通过 CRM 抵扣。`, 'tool');
                            }}
                            className="bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 font-bold px-2 py-1 rounded text-[9px] flex items-center gap-1.5 mx-auto transition-transform active:scale-95"
                          >
                            <RefreshCw className="w-3 h-3 text-amber-700 animate-spin" />
                            <span>立即补库</span>
                          </button>
                        ) : (
                          <span className="text-[9px] text-[#969696] font-bold">库存安全</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 右半区：客户订单与 AI 审计风控跟踪 */}
        <div className="xl:col-span-5 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="text-left">
              <h3 className="font-extrabold text-slate-800 text-sm">最新交易订单与 AI 风控审计日志</h3>
              <p className="text-[10px] text-slate-500 mt-0.5">展示顾客即时购买产生的进账。AI 可对欺诈高发IP与物流理赔漏洞进行自动捕集。</p>
            </div>
          </div>

          <div className="divide-y divide-slate-100 overflow-y-auto flex-1 max-h-[350px]">
            {orders.length === 0 ? (
              <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
                <span className="text-3xl">🛒</span>
                <p className="text-xs">当前系统暂未产生订单记录。</p>
                <p className="text-[10px] text-slate-500 max-w-xs leading-normal">
                  请点击右上角「在线商店」进入客户端 Sandbox 模拟器，随意点击订购一件商品，沙盒将实时秒级派发订单到此列表中！
                </p>
              </div>
            ) : (
              orders.map((or) => {
                const isHighRisk = or.riskScore > 35;
                return (
                  <div key={or.id} className="p-3.5 hover:bg-slate-50/50 transition-colors space-y-2 text-left">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-slate-850 text-xs">{or.id}</span>
                        <span className="text-[9px] text-[#969696] font-semibold">| 订单入库于: {or.createdAt}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black ${
                        or.status === 'AI Confirmed' ? 'bg-emerald-100 text-emerald-800' : or.status === 'Refunded' ? 'bg-slate-100 text-slate-500' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {or.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <div className="font-black text-slate-800">{or.customerName}</div>
                        <div className="text-[9px] text-[#969696] font-mono leading-none mt-0.5">联系细节: {or.contact}</div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-black text-slate-900">${or.total.toFixed(2)}</span>
                        <div className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">实进资金</div>
                      </div>
                    </div>

                    {/* Threat Assessment AI risk rating container block */}
                    <div className="p-2 bg-slate-50 border border-slate-150 rounded-lg flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] font-black px-1.5 py-0.2 rounded uppercase ${isHighRisk ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-800'}`}>
                          风控: {or.riskScore}%
                        </span>
                        <span className="text-[9px] text-slate-500 font-semibold leading-none truncate max-w-[140px]">
                          {isHighRisk ? '警报：海外理赔拒付几率偏高' : '安全：真实网民行为审计'}
                        </span>
                      </div>

                      {or.status === 'Pending' && (
                        <button 
                          onClick={() => {
                            onAuditOrder(or.id);
                            addLog('AI Fraud Auditor', '全维反欺诈分析', `自动对订单 ${or.id} 开启信用卡高维追溯检测，规避黑卡申诉。`, 'success');
                          }}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[9px] py-1 px-2 rounded-lg transition-transform active:scale-95 cursor-pointer"
                        >
                          AI 核单
                        </button>
                      )}
                    </div>

                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
