// --- Constants ---
const TRADE_KEY = 'PD-50000';

const TRENDING_ASSETS = [
    { id: 'bitcoin', name: 'Bitcoin', ticker: 'BTC', price: 64230.12, change24h: 2.45, color: 'bg-orange-100 text-orange-600', sparkline: [40, 60, 45, 80, 55, 90, 70, 100, 85, 95] },
    { id: 'ethereum', name: 'Ethereum', ticker: 'ETH', price: 3450.45, change24h: -1.20, color: 'bg-blue-100 text-blue-600', sparkline: [80, 70, 90, 65, 75, 60, 50, 45, 55, 40] },
    { id: 'solana', name: 'Solana', ticker: 'SOL', price: 145.20, change24h: 5.82, color: 'bg-purple-100 text-purple-600', sparkline: [30, 40, 35, 50, 60, 55, 70, 85, 90, 100] },
    { id: 'cardano', name: 'Cardano', ticker: 'ADA', price: 0.45, change24h: 0.50, color: 'bg-blue-50 text-blue-500', sparkline: [50, 55, 52, 58, 54, 60, 58, 62, 60, 65] },
    { id: 'polkadot', name: 'Polkadot', ticker: 'DOT', price: 7.20, change24h: -2.15, color: 'bg-pink-100 text-pink-600', sparkline: [70, 65, 68, 60, 55, 58, 52, 48, 50, 45] },
    { id: 'avalanche', name: 'Avalanche', ticker: 'AVAX', price: 35.80, change24h: 3.40, color: 'bg-red-100 text-red-600', sparkline: [40, 45, 42, 50, 55, 60, 65, 70, 75, 80] },
];

const USD_ASSETS = [
    { name: 'Tether', ticker: 'USDT', price: 1.00, change24h: 0.01, color: 'bg-green-100 text-green-600' },
    { name: 'USD Coin', ticker: 'USDC', price: 1.00, change24h: 0.00, color: 'bg-blue-100 text-blue-600' },
    { name: 'Dai', ticker: 'DAI', price: 1.00, change24h: -0.01, color: 'bg-yellow-100 text-yellow-600' },
];

// --- Icons (SVG Strings) ---
const ICONS = {
    send: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`,
    download: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`,
    refresh: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path><path d="M16 16h5v5"></path></svg>`,
    withdraw: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>`,
    home: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
    wallet: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5"></path><path d="M16 12h5"></path></svg>`,
    markets: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>`,
    profile: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
    x: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
    bell: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>`,
    plus: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
    search: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
    copy: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,
    qrcode: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
    trash: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
    check: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
    alert: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
    arrowUp: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>`,
    arrowDown: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>`,
};

// --- State ---
let state = {
    isLoggedIn: false,
    username: 'project_manager',
    password: 'San2008@',
    activeTab: 'home',
    modals: {
        withdraw: false,
        send: false,
        receive: false,
        alerts: false,
        deposit: false
    },
    notification: null,
    searchQuery: '',
    btcAmount: '',
    usdAmount: '',
    withdrawAmount: '',
    withdrawKey: '',
    sendAddress: '',
    sendAmount: '',
    sendKey: '',
    alertPrice: '',
    alertAsset: 'bitcoin',
    alertCondition: 'above',
    alerts: JSON.parse(localStorage.getItem('zimap_alerts') || '[]')
};

// --- Helper Functions ---
function setState(newState) {
    state = { ...state, ...newState };
    render();
}

function notify(message, type = 'success') {
    setState({ notification: { message, type } });
    setTimeout(() => {
        if (state.notification && state.notification.message === message) {
            setState({ notification: null });
        }
    }, 6000);
}

// --- Event Handlers ---
function handleLogin(e) {
    e.preventDefault();
    const user = document.getElementById('login-user').value;
    const pass = document.getElementById('login-pass').value;
    if (user === 'project_manager' && pass === 'San2008@') {
        setState({ isLoggedIn: true, username: user });
    } else {
        alert('Invalid credentials');
    }
}

function handleSignOut() {
    setState({ isLoggedIn: false, activeTab: 'home' });
}

function handleTabChange(tab) {
    setState({ activeTab: tab });
}

function toggleModal(modal, value) {
    const modals = { ...state.modals, [modal]: value };
    setState({ modals });
}

function handleWithdraw() {
    if (!state.withdrawAmount || !state.withdrawKey) {
        notify('Please fill all fields', 'alert');
        return;
    }
    if (state.withdrawKey !== TRADE_KEY) {
        notify('Invalid Key. Contact developer for purchase trade key through the link: https://t.me/Investmentsft', 'alert');
        return;
    }
    notify(`Successfully withdrawn $${state.withdrawAmount}`, 'success');
    setState({ withdrawAmount: '', withdrawKey: '' });
    toggleModal('withdraw', false);
}

function handleSend() {
    if (!state.sendAddress || !state.sendAmount || !state.sendKey) {
        notify('Please fill all fields', 'alert');
        return;
    }
    if (state.sendKey !== TRADE_KEY) {
        notify('Invalid Key. Contact developer for purchase trade key through the link: https://t.me/Investmentsft', 'alert');
        return;
    }
    notify(`Sent $${state.sendAmount} USD to ${state.sendAddress.substring(0, 8)}...`, 'success');
    setState({ sendAddress: '', sendAmount: '', sendKey: '' });
    toggleModal('send', false);
}

function handleDeposit() {
    if (!state.btcAmount) return;
    notify(`Successfully swapped ${state.btcAmount} BTC for $${state.usdAmount}`, 'success');
    setState({ btcAmount: '', usdAmount: '' });
    toggleModal('deposit', false);
}

function handleAddAlert() {
    if (!state.alertPrice) return;
    const newAlert = {
        id: Math.random().toString(36).substr(2, 9),
        assetId: state.alertAsset,
        targetPrice: parseFloat(state.alertPrice),
        condition: state.alertCondition,
        active: true
    };
    const newAlerts = [...state.alerts, newAlert];
    localStorage.setItem('zimap_alerts', JSON.stringify(newAlerts));
    setState({ alerts: newAlerts, alertPrice: '' });
    notify('Price alert set successfully', 'success');
}

function removeAlert(id) {
    const newAlerts = state.alerts.filter(a => a.id !== id);
    localStorage.setItem('zimap_alerts', JSON.stringify(newAlerts));
    setState({ alerts: newAlerts });
}

// --- Rendering Logic ---
function render() {
    const app = document.getElementById('app');
    if (!state.isLoggedIn) {
        app.innerHTML = renderLogin();
    } else {
        app.innerHTML = renderApp();
    }
    attachEventListeners();
}

function renderLogin() {
    return `
        <div class="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
            <div class="absolute top-[-10%] left-[-10%] w-64 h-64 bg-[#e8c94a]/10 rounded-full blur-3xl"></div>
            <div class="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-[#1a1a2e]/5 rounded-full blur-3xl"></div>
            
            <div class="z-10 w-full max-w-sm">
                <div class="text-center mb-10">
                    <h1 class="text-5xl font-bold tracking-tighter text-[#1a1a2e]">
                        Zim<span class="text-[#e8c94a]">ap</span>
                    </h1>
                    <p class="text-[#9ca3af] mt-2 font-medium">Your crypto portfolio, simplified</p>
                </div>

                <div class="bg-white p-8 rounded-[28px] shadow-xl shadow-black/5 border border-white fade-in">
                    <form id="login-form" class="space-y-6">
                        <div>
                            <label class="block text-xs font-bold uppercase tracking-wider text-[#9ca3af] mb-2 ml-1">Username</label>
                            <input type="text" id="login-user" value="${state.username}" class="w-full px-5 py-4 bg-[#f8f8f4] border-2 border-transparent focus:border-[#e8c94a] rounded-2xl outline-none transition-all duration-300 font-medium">
                        </div>
                        <div>
                            <label class="block text-xs font-bold uppercase tracking-wider text-[#9ca3af] mb-2 ml-1">Password</label>
                            <input type="password" id="login-pass" value="${state.password}" class="w-full px-5 py-4 bg-[#f8f8f4] border-2 border-transparent focus:border-[#e8c94a] rounded-2xl outline-none transition-all duration-300 font-medium">
                        </div>
                        <button type="submit" class="w-full py-4 bg-[#1a1a2e] text-white rounded-2xl font-bold text-lg shadow-lg shadow-[#1a1a2e]/20 active:scale-[0.98] transition-all">
                            Sign In
                        </button>
                    </form>
                </div>
                <p class="text-center mt-8 text-xs font-bold tracking-widest text-[#9ca3af] uppercase">UI Prototype — Not a Financial Service</p>
            </div>
        </div>
    `;
}

function renderApp() {
    return `
        <div class="min-h-screen flex flex-col max-w-md mx-auto bg-[#f0f0e8] relative">
            <main class="flex-1 p-6 overflow-y-auto no-scrollbar pb-24">
                <div class="fade-in">
                    ${renderActiveTab()}
                </div>
            </main>

            <!-- Bottom Navigation -->
            <nav class="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-xl border-t border-black/5 px-8 py-4 flex justify-between items-center z-40">
                ${['home', 'wallet', 'markets', 'profile'].map(tab => `
                    <button onclick="handleTabChange('${tab}')" class="flex flex-col items-center gap-1 transition-all ${state.activeTab === tab ? 'text-[#1a1a2e]' : 'text-gray-300'}">
                        ${ICONS[tab]}
                        <span class="text-[10px] font-bold uppercase tracking-widest">${tab}</span>
                        ${state.activeTab === tab ? '<div class="w-1 h-1 bg-[#e8c94a] rounded-full mt-0.5"></div>' : ''}
                    </button>
                `).join('')}
            </nav>

            ${renderNotification()}
            ${renderModals()}
        </div>
    `;
}

function renderActiveTab() {
    switch(state.activeTab) {
        case 'home': return renderHome();
        case 'wallet': return renderWallet();
        case 'markets': return renderMarkets();
        case 'profile': return renderProfile();
        default: return renderHome();
    }
}

function renderHome() {
    return `
        <div class="space-y-8">
            <section class="relative bg-[#1a1a2e] rounded-[32px] p-8 text-white overflow-hidden shadow-2xl shadow-[#1a1a2e]/30">
                <div class="absolute top-[-20%] right-[-10%] w-48 h-48 bg-white/5 rounded-full"></div>
                <div class="absolute bottom-[-10%] left-[-5%] w-32 h-32 bg-[#e8c94a]/10 rounded-full"></div>
                <div class="flex justify-between items-start mb-8">
                    <div>
                        <p class="text-gray-400 text-sm font-medium">Good morning,</p>
                        <h2 class="text-xl font-bold">${state.username}</h2>
                    </div>
                    <div class="w-12 h-12 bg-gradient-to-br from-[#e8c94a] to-[#d4b832] rounded-full flex items-center justify-center font-bold text-[#1a1a2e] shadow-lg shadow-[#e8c94a]/20">
                        ${state.username.charAt(0).toUpperCase()}
                    </div>
                </div>
                <div class="mb-8">
                    <p class="text-gray-400 text-sm font-medium mb-1">Total Portfolio Value</p>
                    <div class="flex items-end gap-3">
                        <h1 class="text-4xl font-bold">$5,000.00</h1>
                        <div class="bg-green-500/20 text-green-400 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 mb-1.5">
                            ${ICONS.arrowUp} +$0.00
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-3">
                    <div class="bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                        <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Invested</p>
                        <p class="text-sm font-bold">$4,720</p>
                    </div>
                    <div class="bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                        <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Returns</p>
                        <p class="text-sm font-bold text-[#e8c94a]">+$280</p>
                    </div>
                    <div class="bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                        <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">ROI</p>
                        <p class="text-sm font-bold">5.93%</p>
                    </div>
                </div>
            </section>

            <section>
                <div class="flex justify-between items-center mb-4 px-2">
                    <h3 class="font-bold text-lg">Quick Actions</h3>
                    <button class="text-[#e8c94a] text-sm font-bold">View All</button>
                </div>
                <div class="grid grid-cols-4 gap-y-6">
                    ${[
                        { id: 'send', icon: ICONS.send, label: 'Send' },
                        { id: 'receive', icon: ICONS.download, label: 'Receive' },
                        { id: 'deposit', icon: ICONS.plus, label: 'Deposit' },
                        { id: 'withdraw', icon: ICONS.withdraw, label: 'Withdraw' },
                        { id: 'markets', icon: ICONS.markets, label: 'Markets' },
                        { id: 'alerts', icon: ICONS.bell, label: 'Alerts' },
                        { id: 'earn', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`, label: 'Earn' },
                        { id: 'more', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`, label: 'More' },
                    ].map(action => `
                        <div class="flex flex-col items-center gap-2">
                            <button onclick="handleQuickAction('${action.id}')" class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm active:scale-90 transition-all text-[#1a1a2e] hover:bg-[#e8c94a]/10">
                                ${action.icon}
                            </button>
                            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">${action.label}</span>
                        </div>
                    `).join('')}
                </div>
            </section>

            <section>
                <h3 class="font-bold text-lg mb-4 px-2">USD Assets</h3>
                <div class="space-y-3">
                    ${USD_ASSETS.map(asset => `
                        <div class="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-black/5 active:scale-[0.98] transition-all">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-full flex items-center justify-center font-bold ${asset.color}">${asset.ticker.charAt(0)}</div>
                                <div>
                                    <p class="font-bold text-[#1a1a2e]">${asset.name}</p>
                                    <p class="text-xs text-gray-400 font-bold">${asset.ticker}</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <p class="font-bold">$${asset.price.toFixed(2)}</p>
                                <p class="text-xs font-bold ${asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'}">
                                    ${asset.change24h >= 0 ? '+' : ''}${asset.change24h}%
                                </p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
        </div>
    `;
}

function renderWallet() {
    return `
        <div class="space-y-6">
            <h2 class="text-2xl font-bold px-2">My Wallet</h2>
            <div class="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-[32px] p-8 text-white shadow-xl">
                <p class="text-gray-400 text-sm font-medium mb-1">Available Balance</p>
                <h1 class="text-4xl font-bold mb-8">$12,450.80</h1>
                <div class="flex gap-4">
                    <button onclick="toggleModal('receive', true)" class="flex-1 py-4 bg-white/10 backdrop-blur-md rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all">
                        ${ICONS.download} Receive
                    </button>
                    <button onclick="toggleModal('send', true)" class="flex-1 py-4 bg-[#e8c94a] text-[#1a1a2e] rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-[#e8c94a]/20">
                        ${ICONS.send} Send
                    </button>
                </div>
            </div>
            <div class="space-y-4">
                <h3 class="font-bold text-lg px-2">Recent Transactions</h3>
                ${[
                    { type: 'Received', amount: '+$1,200.00', date: 'Oct 24, 2023', icon: ICONS.download, color: 'text-green-500 bg-green-50' },
                    { type: 'Sent', amount: '-$450.00', date: 'Oct 22, 2023', icon: ICONS.send, color: 'text-red-500 bg-red-50' },
                    { type: 'Withdrawn', amount: '-$2,000.00', date: 'Oct 20, 2023', icon: ICONS.withdraw, color: 'text-blue-500 bg-blue-50' },
                ].map(tx => `
                    <div class="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-black/5">
                        <div class="flex items-center gap-4">
                            <div class="w-10 h-10 rounded-xl flex items-center justify-center ${tx.color}">${tx.icon}</div>
                            <div>
                                <p class="font-bold text-[#1a1a2e]">${tx.type}</p>
                                <p class="text-xs text-gray-400 font-bold">${tx.date}</p>
                            </div>
                        </div>
                        <p class="font-bold ${tx.amount.startsWith('+') ? 'text-green-500' : 'text-red-500'}">${tx.amount}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderMarkets() {
    const filtered = TRENDING_ASSETS.filter(a => 
        a.name.toLowerCase().includes(state.searchQuery.toLowerCase()) || 
        a.ticker.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
    return `
        <div class="space-y-6">
            <h2 class="text-2xl font-bold px-2">Markets</h2>
            <div class="relative px-2">
                <div class="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">${ICONS.search}</div>
                <input type="text" id="market-search" value="${state.searchQuery}" placeholder="Search assets..." class="w-full pl-12 pr-4 py-4 bg-white rounded-2xl font-bold outline-none border border-black/5 shadow-sm">
            </div>
            <div class="space-y-3">
                ${filtered.map(asset => `
                    <div class="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-black/5">
                        <div class="flex items-center gap-4 flex-1">
                            <div class="w-12 h-12 rounded-full flex items-center justify-center font-bold ${asset.color}">${asset.ticker.charAt(0)}</div>
                            <div>
                                <p class="font-bold text-[#1a1a2e]">${asset.name}</p>
                                <p class="text-xs text-gray-400 font-bold">${asset.ticker}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-bold">$${asset.price.toLocaleString()}</p>
                            <p class="text-xs font-bold ${asset.change24h > 0 ? 'text-green-500' : 'text-red-500'}">${asset.change24h > 0 ? '+' : ''}${asset.change24h}%</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderProfile() {
    return `
        <div class="space-y-8">
            <div class="text-center pt-4">
                <div class="relative inline-block">
                    <div class="w-24 h-24 bg-gradient-to-br from-[#e8c94a] to-[#d4b832] rounded-full flex items-center justify-center text-4xl font-bold text-[#1a1a2e] shadow-xl mx-auto mb-4">
                        ${state.username.charAt(0).toUpperCase()}
                    </div>
                    <div class="absolute bottom-4 right-0 w-6 h-6 bg-green-500 border-4 border-[#f0f0e8] rounded-full"></div>
                </div>
                <h2 class="text-2xl font-bold">${state.username}</h2>
                <p class="text-gray-400 font-medium">Verified Account</p>
            </div>
            <div class="space-y-4">
                ${[
                    { label: 'Email', value: 'director@zimap.io' },
                    { label: 'Phone', value: '+1 (555) 000-1234' },
                    { label: 'Country', value: 'United States' },
                    { label: 'Currency', value: 'USD ($)' },
                ].map(item => `
                    <div class="bg-white p-5 rounded-2xl flex items-center justify-between shadow-sm border border-black/5">
                        <span class="text-gray-400 font-bold text-sm uppercase tracking-wider">${item.label}</span>
                        <span class="font-bold text-[#1a1a2e]">${item.value}</span>
                    </div>
                `).join('')}
            </div>
            <button onclick="handleSignOut()" class="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-bold active:scale-95 transition-all">Sign Out</button>
        </div>
    `;
}

function renderNotification() {
    if (!state.notification) return '';
    const { message, type } = state.notification;
    
    // Helper to render message with links
    const renderMessage = (text) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer" class="underline decoration-2 underline-offset-2 hover:opacity-80 transition-opacity break-all">${url}</a>`);
    };

    return `
        <div class="fixed top-0 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm p-4 rounded-2xl shadow-2xl flex items-center gap-3 fade-in ${type === 'success' ? 'bg-green-500 text-white' : 'bg-[#e8c94a] text-[#1a1a2e]'}">
            <div class="flex-shrink-0">${type === 'success' ? ICONS.check : ICONS.alert}</div>
            <p class="font-bold flex-1 text-sm leading-tight">${renderMessage(message)}</p>
            <button onclick="setState({notification: null})" class="flex-shrink-0">${ICONS.x}</button>
        </div>
    `;
}

function renderModals() {
    let html = '';
    if (state.modals.withdraw) html += renderWithdrawModal();
    if (state.modals.send) html += renderSendModal();
    if (state.modals.receive) html += renderReceiveModal();
    if (state.modals.alerts) html += renderAlertsModal();
    if (state.modals.deposit) html += renderDepositModal();
    return html;
}

function renderWithdrawModal() {
    return `
        <div class="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onclick="toggleModal('withdraw', false)"></div>
        <div class="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] p-8 z-50 shadow-2xl max-w-md mx-auto slide-up">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">Withdraw Funds</h2>
                <button onclick="toggleModal('withdraw', false)" class="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">${ICONS.x}</button>
            </div>
            <div class="space-y-6">
                <div>
                    <label class="block text-sm font-bold text-gray-400 mb-2">Amount (USD)</label>
                    <div class="relative">
                        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">$</span>
                        <input type="number" id="withdraw-amount" value="${state.withdrawAmount}" placeholder="0.00" class="w-full pl-10 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-[#e8c94a] rounded-2xl outline-none text-2xl font-bold transition-all">
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-400 mb-2">Trade Key / Access Key</label>
                    <input type="password" id="withdraw-key" value="${state.withdrawKey}" placeholder="Enter access key" class="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-[#e8c94a] rounded-2xl outline-none font-bold transition-all">
                    <p class="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-wider">Permanent developer trade key required</p>
                </div>
                <div class="flex gap-4">
                    <button onclick="toggleModal('withdraw', false)" class="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold active:scale-95 transition-all">Cancel</button>
                    <button onclick="handleWithdraw()" class="flex-1 py-4 bg-[#1a1a2e] text-white rounded-2xl font-bold active:scale-95 transition-all shadow-lg shadow-[#1a1a2e]/20">Confirm</button>
                </div>
            </div>
        </div>
    `;
}

function renderSendModal() {
    return `
        <div class="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onclick="toggleModal('send', false)"></div>
        <div class="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] p-8 z-50 shadow-2xl max-w-md mx-auto slide-up">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">Send USD</h2>
                <button onclick="toggleModal('send', false)" class="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">${ICONS.x}</button>
            </div>
            <div class="space-y-6">
                <div class="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
                    <span class="text-sm font-bold text-gray-400 uppercase">Currency</span>
                    <span class="font-bold text-[#1a1a2e]">United States Dollar (USD)</span>
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-400 mb-2">Recipient Address / ID</label>
                    <input type="text" id="send-address" value="${state.sendAddress}" placeholder="Enter recipient wallet or ID" class="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-[#e8c94a]">
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-400 mb-2">Amount (USD)</label>
                    <div class="relative">
                        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">$</span>
                        <input type="number" id="send-amount" value="${state.sendAmount}" placeholder="0.00" class="w-full pl-10 pr-4 py-4 bg-gray-50 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-[#e8c94a]">
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-400 mb-2">Trade Key / Access Key</label>
                    <input type="password" id="send-key" value="${state.sendKey}" placeholder="Enter access key" class="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-[#e8c94a] rounded-2xl outline-none font-bold transition-all">
                    <p class="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-wider">Permanent developer trade key required</p>
                </div>
                <button onclick="handleSend()" class="w-full py-4 bg-[#1a1a2e] text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-all">Send Funds</button>
            </div>
        </div>
    `;
}

function renderReceiveModal() {
    const address = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh';
    return `
        <div class="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onclick="toggleModal('receive', false)"></div>
        <div class="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] p-8 z-50 shadow-2xl max-w-md mx-auto slide-up">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">Receive USD</h2>
                <button onclick="toggleModal('receive', false)" class="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">${ICONS.x}</button>
            </div>
            <div class="space-y-8 flex flex-col items-center">
                <div class="w-full bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
                    <span class="text-sm font-bold text-gray-400 uppercase">Currency</span>
                    <span class="font-bold text-[#1a1a2e]">USD (Digital)</span>
                </div>
                <div class="p-6 bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-200">${ICONS.qrcode.replace('width="24" height="24"', 'width="192" height="192"')}</div>
                <div class="w-full">
                    <label class="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest text-center">Your USD Deposit Address</label>
                    <div class="flex items-center gap-2 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <p class="text-xs font-bold text-[#1a1a2e] flex-1 break-all">${address}</p>
                        <button onclick="copyToClipboard('${address}')" class="p-2 bg-white rounded-xl shadow-sm active:scale-90 transition-all text-[#e8c94a]">${ICONS.copy}</button>
                    </div>
                </div>
                <p class="text-xs text-center text-gray-400 font-medium">Only send USD-pegged assets (USDT/USDC) to this address. Sending other assets may result in permanent loss.</p>
            </div>
        </div>
    `;
}

function renderAlertsModal() {
    return `
        <div class="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onclick="toggleModal('alerts', false)"></div>
        <div class="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] p-8 z-50 shadow-2xl max-w-md mx-auto max-h-[80vh] overflow-y-auto no-scrollbar slide-up">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">Price Alerts</h2>
                <button onclick="toggleModal('alerts', false)" class="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">${ICONS.x}</button>
            </div>
            <div class="space-y-6 mb-8 bg-gray-50 p-6 rounded-[28px]">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold text-gray-400 mb-2 uppercase">Asset</label>
                        <select id="alert-asset" class="w-full p-3 bg-white rounded-xl font-bold outline-none border border-gray-100">
                            ${TRENDING_ASSETS.map(a => `<option value="${a.id}" ${state.alertAsset === a.id ? 'selected' : ''}>${a.name}</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-400 mb-2 uppercase">Condition</label>
                        <select id="alert-condition" class="w-full p-3 bg-white rounded-xl font-bold outline-none border border-gray-100">
                            <option value="above" ${state.alertCondition === 'above' ? 'selected' : ''}>Goes Above</option>
                            <option value="below" ${state.alertCondition === 'below' ? 'selected' : ''}>Goes Below</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-400 mb-2 uppercase">Target Price (USD)</label>
                    <input type="number" id="alert-price" value="${state.alertPrice}" placeholder="0.00" class="w-full p-3 bg-white rounded-xl font-bold outline-none border border-gray-100">
                </div>
                <button onclick="handleAddAlert()" class="w-full py-4 bg-[#e8c94a] text-[#1a1a2e] rounded-2xl font-bold flex items-center justify-center gap-2">
                    ${ICONS.plus} Set Alert
                </button>
            </div>
            <div class="space-y-3">
                <h3 class="font-bold text-sm text-gray-400 uppercase tracking-widest px-2">Active Alerts</h3>
                ${state.alerts.length === 0 ? `<p class="text-center py-8 text-gray-400 font-medium">No active alerts</p>` : state.alerts.map(alert => {
                    const asset = TRENDING_ASSETS.find(a => a.id === alert.assetId);
                    return `
                        <div class="bg-white p-4 rounded-2xl flex items-center justify-between border border-gray-100 shadow-sm">
                            <div>
                                <p class="font-bold text-[#1a1a2e]">${asset ? asset.name : 'Unknown'} ${alert.condition === 'above' ? '▲' : '▼'}</p>
                                <p class="text-xs text-gray-400 font-bold">$${alert.targetPrice.toLocaleString()}</p>
                            </div>
                            <button onclick="removeAlert('${alert.id}')" class="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all">${ICONS.trash}</button>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

function renderDepositModal() {
    const btcPrice = 64230.12;
    return `
        <div class="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onclick="toggleModal('deposit', false)"></div>
        <div class="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] p-8 z-50 shadow-2xl max-w-md mx-auto slide-up">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">Deposit / Convert</h2>
                <button onclick="toggleModal('deposit', false)" class="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">${ICONS.x}</button>
            </div>
            <div class="space-y-6">
                <div class="bg-gray-50 p-6 rounded-[28px] border border-gray-100">
                    <div class="flex justify-between mb-2">
                        <span class="text-xs font-bold text-gray-400 uppercase">From (Crypto)</span>
                        <span class="text-xs font-bold text-gray-400 uppercase">Balance: 0.08 BTC</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">B</div>
                        <input type="number" id="deposit-btc" value="${state.btcAmount}" placeholder="0.00" class="flex-1 bg-transparent text-2xl font-bold outline-none">
                        <span class="font-bold text-gray-400">BTC</span>
                    </div>
                </div>
                <div class="flex justify-center -my-4 relative z-10">
                    <div class="bg-white p-2 rounded-full shadow-md border border-gray-100 text-[#e8c94a]">${ICONS.arrowDown}</div>
                </div>
                <div class="bg-gray-50 p-6 rounded-[28px] border border-gray-100">
                    <div class="flex justify-between mb-2">
                        <span class="text-xs font-bold text-gray-400 uppercase">To (USD Balance)</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">$</div>
                        <input type="number" id="deposit-usd" value="${state.usdAmount}" placeholder="0.00" class="flex-1 bg-transparent text-2xl font-bold outline-none">
                        <span class="font-bold text-gray-400">USD</span>
                    </div>
                </div>
                <div class="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div class="flex justify-between text-xs font-bold">
                        <span class="text-gray-400">Exchange Rate</span>
                        <span class="text-[#1a1a2e]">1 BTC = $${btcPrice.toLocaleString()}</span>
                    </div>
                </div>
                <button onclick="handleDeposit()" class="w-full py-4 bg-[#1a1a2e] text-white rounded-2xl font-bold shadow-lg shadow-[#1a1a2e]/20 active:scale-95 transition-all">Deposit Now</button>
            </div>
        </div>
    `;
}

// --- Event Listener Attachment ---
function attachEventListeners() {
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);

    // Search input
    const searchInput = document.getElementById('market-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value;
            render();
            // Refocus search input after render
            document.getElementById('market-search').focus();
        });
    }

    // Deposit inputs
    const btcInput = document.getElementById('deposit-btc');
    const usdInput = document.getElementById('deposit-usd');
    if (btcInput) {
        btcInput.addEventListener('input', (e) => {
            const val = e.target.value;
            state.btcAmount = val;
            state.usdAmount = val ? (parseFloat(val) * 64230.12).toFixed(2) : '';
            render();
            document.getElementById('deposit-btc').focus();
        });
    }
    if (usdInput) {
        usdInput.addEventListener('input', (e) => {
            const val = e.target.value;
            state.usdAmount = val;
            state.btcAmount = val ? (parseFloat(val) / 64230.12).toFixed(8) : '';
            render();
            document.getElementById('deposit-usd').focus();
        });
    }

    // Modal inputs
    const withdrawAmount = document.getElementById('withdraw-amount');
    if (withdrawAmount) withdrawAmount.addEventListener('input', (e) => state.withdrawAmount = e.target.value);
    const withdrawKey = document.getElementById('withdraw-key');
    if (withdrawKey) withdrawKey.addEventListener('input', (e) => state.withdrawKey = e.target.value);

    const sendAddress = document.getElementById('send-address');
    if (sendAddress) sendAddress.addEventListener('input', (e) => state.sendAddress = e.target.value);
    const sendAmount = document.getElementById('send-amount');
    if (sendAmount) sendAmount.addEventListener('input', (e) => state.sendAmount = e.target.value);
    const sendKey = document.getElementById('send-key');
    if (sendKey) sendKey.addEventListener('input', (e) => state.sendKey = e.target.value);

    const alertAsset = document.getElementById('alert-asset');
    if (alertAsset) alertAsset.addEventListener('change', (e) => state.alertAsset = e.target.value);
    const alertCondition = document.getElementById('alert-condition');
    if (alertCondition) alertCondition.addEventListener('change', (e) => state.alertCondition = e.target.value);
    const alertPrice = document.getElementById('alert-price');
    if (alertPrice) alertPrice.addEventListener('input', (e) => state.alertPrice = e.target.value);
}

// --- Global Handlers ---
window.handleTabChange = handleTabChange;
window.handleQuickAction = (id) => {
    if (id === 'send') toggleModal('send', true);
    else if (id === 'receive') toggleModal('receive', true);
    else if (id === 'deposit') toggleModal('deposit', true);
    else if (id === 'withdraw') toggleModal('withdraw', true);
    else if (id === 'markets') handleTabChange('markets');
    else if (id === 'alerts') toggleModal('alerts', true);
    else notify('Feature coming soon', 'alert');
};
window.toggleModal = toggleModal;
window.handleWithdraw = handleWithdraw;
window.handleSend = handleSend;
window.handleDeposit = handleDeposit;
window.handleAddAlert = handleAddAlert;
window.removeAlert = removeAlert;
window.handleSignOut = handleSignOut;
window.copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    notify('Copied to clipboard', 'success');
};

// --- Initialization ---
// Simulated Price Alert Checker
setInterval(() => {
    if (!state.isLoggedIn) return;
    state.alerts.forEach(alert => {
        if (!alert.active) return;
        const asset = TRENDING_ASSETS.find(a => a.id === alert.assetId);
        if (!asset) return;
        const triggered = alert.condition === 'above' ? asset.price >= alert.targetPrice : asset.price <= alert.targetPrice;
        if (triggered) {
            notify(`ALERT: ${asset.name} is now ${alert.condition} $${alert.targetPrice}`, 'alert');
            alert.active = false;
            localStorage.setItem('zimap_alerts', JSON.stringify(state.alerts));
            render();
        }
    });
}, 10000);

render();
