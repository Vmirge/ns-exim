"use client";

import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Mail, Phone, MapPin, CheckCircle2, 
  ChevronLeft, Facebook, Instagram, MessageCircle, Search, 
  LayoutDashboard, Package, Settings, MessageSquare, LogOut, Eye, Plus, X
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  // --- CORE STATE ---
  const [view, setView] = useState('home'); // 'home', 'collections', 'admin', 'login'
  const [adminTab, setAdminTab] = useState('products');
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isEditing, setIsEditing] = useState<any>(null);

  // --- ADMIN & BUSINESS SETTINGS ---
  const [bizName, setBizName] = useState('NS INDIA EXIM SOLUTIONS');
  const [bizPhone, setBizPhone] = useState('+91 7710069065');
  const [loginForm, setLoginForm] = useState({ user: '', pass: '' });

  // --- DATA: PRODUCTS (Synced with your requested attributes) ---
  const [allProducts, setAllProducts] = useState([
    { 
      id: 1, title: "Men’s Premium T-Shirt", cat: "Men's Wear", img: "/men.JPEG",
      fabric: "100% Cotton", gsm: "180 GSM", fitType: "Regular Fit", neckStyle: "Round Neck",
      sleeveType: "Half Sleeve", pattern: "Plain", sizeRange: "S-XXL", colorOptions: "12 Colors",
      season: "Summer", quality: "Export Quality", customization: "Custom Logo", packaging: "Polybag",
      moq: "500 Pcs", origin: "Made in India"
    },
    { 
      id: 2, title: "Women’s Essential T-Shirt", cat: "Women's Wear", img: "/women.JPEG",
      fabric: "Cotton Lycra", gsm: "160 GSM", fitType: "Slim Fit", neckStyle: "V-Neck",
      sleeveType: "Short Sleeve", pattern: "Plain", sizeRange: "XS-XL", colorOptions: "Multiple",
      season: "Summer", quality: "Premium", customization: "Branding", packaging: "Export Grade",
      moq: "Bulk", origin: "India"
    },
    { 
      id: 3, title: "Eco-Friendly Kraft Bag", cat: "Paper Bags", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800",
      material: "Kraft Paper", paperGsm: "150 GSM", bagType: "Shopping", handleType: "Twisted",
      sizeRange: "Custom", printing: "Offset", colorOptions: "Brown/White", ecoFriendly: "100% Recyclable",
      usage: "Retail", moq: "Bulk", quality: "Heavy Duty"
    },
   { 
  id: 4, 
  title: "Junior Cotton Graphic T-Shirt", 
  cat: "Kids' Wear", 
  img: "/kids.JPEG", // Ensure this image is in your public folder
  price: "Enquire for Price",
  fabric: "100% Cotton / Cotton Blend",
  gsm: "160 / 180 GSM",
  fitType: "Regular Fit",
  neckStyle: "Round Neck",
  sleeveType: "Half Sleeve",
  pattern: "Printed / Graphic",
  sizeRange: "2Y, 4Y, 6Y, 8Y, 10Y, 12Y",
  colorOptions: "Multiple Vibrant Colors",
  season: "Summer / All Season",
  quality: "Export Quality Fabric",
  customization: "Custom Branding Available",
  packaging: "Export Standard Packing",
  moq: "Bulk Orders Accepted",
  origin: "India"
}
]);
  

  const filteredProducts = allProducts.filter(p => 
    (filter === 'All' || p.cat === filter) &&
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- HANDLERS ---
  const handleLogin = (e: any) => {
    e.preventDefault();
    if (loginForm.user === "ADMIN" && loginForm.pass === "ADMIN@123") {
      setView('admin');
    } else {
      alert("Invalid Credentials");
    }
  };

  const handleSaveProduct = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newProd = Object.fromEntries(formData.entries());
    if (isEditing.id) {
        setAllProducts(allProducts.map(p => p.id === isEditing.id ? { ...isEditing, ...newProd } : p));
    } else {
        setAllProducts([...allProducts, { ...newProd, id: Date.now() } as any]);
    }
    setIsEditing(null);
  };

  // --- UI: HEADER ---
  const Header = () => (
    <>
      <div className="bg-[#002366] text-[#D4AF37] text-[10px] py-3 px-12 flex items-center justify-between tracking-[0.3em] font-bold border-b border-[#D4AF37]/20 sticky top-0 z-[60]">
        <button onClick={() => setView('home')} className="hover:text-white transition-colors"><ChevronLeft size={18} /></button>
        <span className="flex-1 text-center uppercase">Global Merchant Exporters • Premium Quality Assured</span>
        <div className="w-[18px]"></div> 
      </div>
      <nav className="py-5 px-12 flex justify-between items-center bg-white sticky top-[41px] z-50 shadow-sm">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setView('home')}>
          <img src="/Logoo.JPEG" alt="Logo" className="h-14" />
          <div className="border-l border-gray-200 pl-4 text-left">
            <h1 className="text-xl font-serif font-bold text-[#002366] leading-none uppercase">NS India</h1>
            <p className="text-[9px] tracking-[0.2em] text-[#D4AF37] font-bold uppercase mt-1">Exim Solutions</p>
          </div>
        </div>
        <div className="hidden lg:flex gap-10 text-[11px] font-bold tracking-[0.2em] uppercase text-[#002366]">
          <button onClick={() => setView('home')} className="hover:text-[#D4AF37]">Home</button>
          <button onClick={() => setView('collections')} className="hover:text-[#D4AF37]">Collections</button>
          <button onClick={() => {setView('home'); setTimeout(() => document.getElementById('services')?.scrollIntoView({behavior:'smooth'}), 100)}} className="hover:text-[#D4AF37]">Services</button>
          <button onClick={() => {setView('home'); setTimeout(() => document.getElementById('about')?.scrollIntoView({behavior:'smooth'}), 100)}} className="hover:text-[#D4AF37]">About Us</button>
          <button onClick={() => {setView('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}), 100)}} className="hover:text-[#D4AF37]">Contact</button>
        </div>
        <button onClick={() => setView('collections')} className="bg-[#002366] text-white px-8 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-[#D4AF37] transition-all border border-[#002366]">Enquiry Now</button>
      </nav>
    </>
  );

  // --- ADMIN VIEW ---
// --- ADMIN VIEW (UPDATED FOR BETTER VISIBILITY) ---
// --- PREMIUM ADMIN VIEW ---
if (view === 'admin') {
  return (
    <div className="flex h-screen bg-[#F8F9FB] text-left font-sans text-slate-800">
      {/* Sidebar - Sleek & Dark */}
      <aside className="w-72 bg-[#00153D] text-white flex flex-col justify-between shadow-2xl">
        <div>
          <div className="p-10 text-center border-b border-white/5">
            <img src="/Logoo.JPEG" className="h-12 mx-auto mb-3 brightness-200" />
            <p className="text-[10px] tracking-[0.4em] text-[#D4AF37] font-medium uppercase opacity-80">Management Suite</p>
          </div>
          <nav className="p-6 space-y-2">
            {[
              { id: 'products', icon: <Package size={18}/>, label: 'Inventory' },
              { id: 'enquiry', icon: <MessageSquare size={18}/>, label: 'Enquiries' },
              { id: 'settings', icon: <Settings size={18}/>, label: 'Settings' }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setAdminTab(item.id)} 
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl text-sm font-medium transition-all duration-300 ${adminTab === item.id ? 'bg-[#D4AF37] text-[#00153D] shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-8 border-t border-white/5 space-y-4">
          <button onClick={() => setView('home')} className="w-full flex items-center gap-3 text-xs font-semibold text-slate-400 hover:text-[#D4AF37] transition-colors"><Eye size={16}/> VIEW STORE</button>
          <button onClick={() => setView('home')} className="w-full flex items-center gap-3 text-xs font-semibold text-red-400/80 hover:text-red-400 transition-colors"><LogOut size={16}/> LOGOUT</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-10 md:p-16">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-serif text-[#002366] mb-2">Workspace Control</h2>
            <p className="text-slate-400 text-sm">Manage your global garment exports and documentation.</p>
          </div>
          <button onClick={() => setIsEditing({})} className="bg-[#002366] text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl hover:shadow-[#002366]/20 hover:-translate-y-1 transition-all flex items-center gap-2">
            <Plus size={16}/> New Product
          </button>
        </header>
        
        {adminTab === 'products' && (
          <div className="bg-white rounded-[32px] shadow-sm border border-slate-200/60 overflow-hidden animate-in fade-in">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                  <th className="p-6 pl-10">Product Detail</th>
                  <th className="p-6">Category</th>
                  <th className="p-6 text-right pr-10">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {allProducts.map(p => (
                  <tr key={p.id} className="group hover:bg-slate-50/30 transition-colors">
                    <td className="p-6 pl-10 flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-100 shadow-sm"><img src={p.img} className="w-full h-full object-cover" /></div>
                      <span className="font-semibold text-slate-700">{p.title}</span>
                    </td>
                    <td className="p-6"><span className="text-[10px] bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">{p.cat}</span></td>
                    <td className="p-6 text-right pr-10"><button onClick={() => setIsEditing(p)} className="text-[#002366] hover:text-[#D4AF37] font-bold text-[10px] uppercase underline decoration-[#D4AF37]/30 underline-offset-4">Edit Entry</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* --- PREMIUM SETTINGS (Clean & Clear) --- */}
        {adminTab === 'settings' && (
          <div className="max-w-2xl bg-white p-12 rounded-[40px] shadow-sm border border-slate-200/60">
              <h3 className="text-xl font-serif text-[#002366] mb-10 border-b pb-6 uppercase tracking-widest">Business Configuration</h3>
              <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Company Trading Name</label>
                    <input value={bizName} onChange={(e) => setBizName(e.target.value)} className="w-full border-b-2 border-slate-100 p-4 outline-none focus:border-[#D4AF37] text-slate-700 font-medium transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Primary Contact Line</label>
                    <input value={bizPhone} onChange={(e) => setBizPhone(e.target.value)} className="w-full border-b-2 border-slate-100 p-4 outline-none focus:border-[#D4AF37] text-slate-700 font-medium transition-all" />
                  </div>
                  <button className="bg-[#002366] text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mt-6">Update Profile</button>
              </div>
          </div>
        )}
      </main>

      {/* --- ADD/EDIT MODAL (SOFT & ELEGANT) --- */}
      {isEditing && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-[200] p-6 animate-in fade-in">
              <form onSubmit={handleSaveProduct} className="bg-white w-full max-w-4xl p-12 rounded-[48px] shadow-2xl max-h-[90vh] overflow-y-auto border border-white/20">
                  <div className="flex justify-between items-center mb-10 border-b border-slate-50 pb-8">
                    <h2 className="text-2xl font-serif text-[#002366] uppercase tracking-tight">{isEditing.id ? 'Refine Product' : 'Catalog New Entry'}</h2>
                    <button type="button" onClick={() => setIsEditing(null)} className="text-slate-300 hover:text-slate-600 transition-colors"><X size={28} /></button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 text-left">
                      <div className="md:col-span-2">
                        <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Product Title</label>
                        <input name="title" defaultValue={isEditing.title} placeholder="e.g. Premium Cotton Jersey" className="w-full border-b-2 border-slate-100 py-4 outline-none focus:border-[#D4AF37] text-lg font-medium text-slate-800 transition-all placeholder:text-slate-200" required />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Export Category</label>
                        <select name="cat" defaultValue={isEditing.cat} className="w-full border-b-2 border-slate-100 py-4 outline-none focus:border-[#D4AF37] text-sm font-semibold text-slate-600 bg-transparent">
                            <option>Men's Wear</option><option>Women's Wear</option><option>Kids' Wear</option><option>Paper Bags</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Fabric & Composition</label>
                        <input name="fabric" defaultValue={isEditing.fabric} placeholder="100% Organic Cotton" className="w-full border-b-2 border-slate-100 py-4 outline-none focus:border-[#D4AF37] text-sm font-medium text-slate-700" />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Fabric Weight (GSM)</label>
                        <input name="gsm" defaultValue={isEditing.gsm} placeholder="180 GSM" className="w-full border-b-2 border-slate-100 py-4 outline-none focus:border-[#D4AF37] text-sm font-medium text-slate-700" />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Minimum Order Volume</label>
                        <input name="moq" defaultValue={isEditing.moq} placeholder="500 Units" className="w-full border-b-2 border-slate-100 py-4 outline-none focus:border-[#D4AF37] text-sm font-medium text-slate-700" />
                      </div>
                  </div>

                  <div className="mt-16 flex gap-4">
                      <button type="submit" className="flex-1 bg-[#002366] text-white py-5 rounded-full font-bold uppercase text-[10px] tracking-widest shadow-xl shadow-[#002366]/10 hover:-translate-y-1 transition-all">Save Specification</button>
                      <button type="button" onClick={() => setIsEditing(null)} className="flex-1 border-2 border-slate-100 text-slate-400 py-5 rounded-full font-bold uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all">Dismiss</button>
                  </div>
              </form>
          </div>
      )}
    </div>
  );
}

// --- LOGIN VIEW (BOLD & HIGH CONTRAST) ---
// --- PREMIUM LOGIN VIEW ---
if (view === 'login') {
  return (
      <div className="h-screen flex items-center justify-center bg-[#F8F9FB]">
          <div className="bg-white p-12 md:p-20 rounded-[64px] shadow-2xl w-full max-w-lg text-center mx-6 border border-slate-100 relative overflow-hidden">
              {/* Decorative background element */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl" />
              
              <img src="/Logoo.JPEG" className="h-16 mx-auto mb-10 relative z-10" />
              <h2 className="text-3xl font-serif text-[#002366] mb-12 uppercase tracking-tight relative z-10">Login Page</h2>
              
              <form onSubmit={handleLogin} className="space-y-8 relative z-10">
                <div className="text-left space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Username</label>
                    <input 
                      onChange={e => setLoginForm({...loginForm, user: e.target.value})} 
                      className="w-full border-b-2 border-slate-100 p-4 outline-none focus:border-[#D4AF37] text-slate-800 font-semibold transition-all bg-transparent" 
                      required 
                    />
                </div>
                <div className="text-left space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                    <input 
                      type="password" 
                      onChange={e => setLoginForm({...loginForm, pass: e.target.value})} 
                      className="w-full border-b-2 border-slate-100 p-4 outline-none focus:border-[#D4AF37] text-slate-800 font-semibold transition-all bg-transparent" 
                      required 
                    />
                </div>

                <button type="submit" className="w-full mt-12 bg-[#002366] text-white py-5 rounded-full font-bold text-[10px] tracking-[0.4em] uppercase shadow-2xl hover:bg-[#D4AF37] transition-all duration-500">
                  LOGIN
                </button>
              </form>
              
              <button type="button" onClick={() => setView('home')} className="mt-10 text-[10px] font-bold text-slate-300 uppercase tracking-widest hover:text-[#002366] transition-colors">
                ← Exit to public catalogue
              </button>
          </div>
      </div>
  );
}
  // --- PUBLIC HOME VIEW ---
  return (
    <div className="min-h-screen bg-white text-[#00153D]">
      <Header />

      {view === 'home' && (
        <div className="animate-in fade-in duration-700">
          <section id="home" className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-black text-center">
            <img src="/background.JPEG" className="absolute inset-0 w-full h-full object-cover opacity-40 z-0" alt="Background" />
            <div className="absolute inset-0 bg-black/50 z-5" />
            <div className="relative z-10 text-white px-6">
              <h2 className="text-[#D4AF37] text-[11px] tracking-[0.6em] font-normal uppercase mb-8">Your Trusted Partner In The Exim World</h2>
              <h1 className="text-6xl md:text-7xl font-serif font-medium mb-12 leading-tight">Elevating Indian <br /> Garments Globally</h1>
              <div className="flex flex-col md:flex-row justify-center gap-6">
                <button onClick={() => setView('collections')} className="bg-[#D4AF37] text-[#002366] px-12 py-5 text-[11px] font-bold tracking-widest uppercase hover:bg-white transition-all">Show Collections</button>
                <button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})} className="border border-white px-12 py-5 text-[11px] font-bold tracking-widest uppercase hover:bg-white hover:text-[#002366] transition-all">Enquiry Now</button>
              </div>
            </div>
          </section>

          <section id="about" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-12">
              <div className="grid lg:grid-cols-2 gap-16 items-center mb-20 text-left">
                <div className="relative p-4 border border-[#D4AF37]/30 shadow-2xl">
                  <div className="overflow-hidden h-[500px]"><img src="/About.JPEG" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" /></div>
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#D4AF37]"></div>
                </div>
                <div className="space-y-8">
                  <h2 className="text-[#D4AF37] text-[11px] tracking-[0.5em] font-bold uppercase">Established Excellence</h2>
                  <h3 className="text-5xl font-serif text-[#002366] leading-tight">About NS India <br /> Exim Solutions</h3>
                  <p className="text-gray-600 leading-relaxed text-lg font-light">We are a Merchant Exporter of ready-made garments based in India, sourcing high-quality apparel for international markets. We ensure strict quality checks, competitive pricing, and timely shipment.</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-12 pt-16 border-t border-gray-100 text-left">
                <div className="bg-[#F9F9F9] p-10 border-l-4 border-[#002366]"><h4 className="font-serif text-[#002366] text-2xl mb-4 uppercase">Our Mission</h4><p className="text-sm text-gray-500 italic">"To manufacture and export premium quality ready-made garments that meet global standards, ensuring customer satisfaction."</p></div>
                <div className="bg-[#F9F9F9] p-10 border-l-4 border-[#D4AF37]"><h4 className="font-serif text-[#002366] text-2xl mb-4 uppercase">Our Vision</h4><p className="text-sm text-gray-500 italic">"Reliable sourcing, competitive pricing, strict quality control, and on-time export delivery to our partners."</p></div>
              </div>
            </div>
          </section>

          <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-12 text-center">
              <h2 className="text-[#D4AF37] text-[11px] tracking-[0.5em] font-bold uppercase mb-4">Categories</h2>
              <h3 className="text-4xl font-serif text-[#002366] mb-12 uppercase">Shop By Collection</h3>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { name: "Men's Wear", img: "/men.JPEG", items: "T-Shirts & Shirts" },
                  { name: "Women's Wear", img: "/women.JPEG", items: "Tops & Ethnic" },
                  { name: "Paper Bags", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800", items: "Eco-Friendly Packing" }
                ].map((item) => (
                  <div key={item.name} onClick={() => {setView('collections'); setFilter(item.name); window.scrollTo(0,0);}} className="group relative h-96 overflow-hidden cursor-pointer">
                    <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-[#002366]/60 flex flex-col justify-end p-8 text-left text-white"><h4 className="text-2xl font-serif mb-1">{item.name}</h4><p className="text-[10px] tracking-widest uppercase opacity-70">{item.items}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="services" className="py-24 px-12 bg-[#002366] text-white text-left">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
              <div><h3 className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-xs mb-4">Our Expertise</h3><h2 className="text-4xl font-serif mb-8 uppercase">Complete Export Solutions</h2>
                <div className="space-y-6">
                  {["Reliable garment sourcing", "Strict quality inspection", "Competitive pricing", "Export documentation", "Timely shipment"].map((s, i) => (
                    <div key={i} className="flex items-start gap-4"><CheckCircle2 className="text-[#D4AF37]" size={20} /><p className="text-gray-300 font-light">{s}</p></div>
                  ))}
                </div>
              </div>
              <div className="h-[500px] border-8 border-[#D4AF37]/20"><img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800" className="w-full h-full object-cover opacity-80" /></div>
            </div>
          </section>

          <section id="contact" className="py-24 px-12 text-left">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24">
              <div><h3 className="text-4xl font-serif text-[#002366] mb-6 uppercase">Get In Touch</h3><p className="text-gray-500 mb-12">Connect with our export specialists for reliable garment sourcing.</p>
                <div className="space-y-8">
                  <div className="flex gap-6 items-start"><MapPin className="text-[#D4AF37]" /><div><h5 className="font-bold text-[11px] uppercase text-gray-400 mb-1">Office</h5><p className="text-sm">Jnpt, Uran, Maharashtra, India</p></div></div>
                  <div className="flex gap-6 items-start"><Phone className="text-[#D4AF37]" /><div><h5 className="font-bold text-[11px] uppercase text-gray-400 mb-1">Phone</h5><p className="text-sm">{bizPhone}</p></div></div>
                  <div className="flex gap-6 items-start"><Mail className="text-[#D4AF37]" /><div><h5 className="font-bold text-[11px] uppercase text-gray-400 mb-1">Email</h5><p className="text-sm">info@nsindiaexim.com</p></div></div>
                </div>
              </div>
              <form className="bg-[#F7F3E9] p-12 border border-[#D4AF37]/20"><div className="grid grid-cols-2 gap-6 mb-6"><input placeholder="NAME" className="bg-transparent border-b border-gray-300 py-3 outline-none text-[10px]" /><input placeholder="EMAIL" className="bg-transparent border-b border-gray-300 py-3 outline-none text-[10px]" /></div>
                <textarea placeholder="REQUIREMENTS" rows={4} className="w-full bg-transparent border-b border-gray-300 py-3 outline-none text-[10px] mb-8"></textarea>
                <button className="w-full bg-[#002366] text-white py-4 font-bold text-[10px] uppercase">Submit Inquiry</button>
              </form>
            </div>
          </section>
        </div>
      )}

      {view === 'collections' && (
        <div className="animate-in slide-in-from-bottom-10 py-24 px-12 text-left">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16"><h2 className="text-[#D4AF37] text-[11px] tracking-[0.5em] font-bold uppercase mb-4">Catalogue</h2><h3 className="text-5xl font-serif text-[#002366]">Our Collections</h3></div>
            <div className="flex flex-col md:flex-row justify-between gap-8 mb-16 bg-[#F9F9F9] p-8 border border-gray-100">
              <div className="relative w-full md:w-96"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input placeholder="SEARCH..." className="w-full bg-white border border-gray-200 py-4 pl-12 text-[10px]" onChange={(e) => setSearchQuery(e.target.value)} /></div>
              <div className="flex flex-wrap gap-3">{['All', "Men's Wear", "Women's Wear", "Kids' Wear", "Paper Bags"].map((cat) => (
                <button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-3 text-[10px] font-bold border ${filter === cat ? 'bg-[#002366] text-white' : 'bg-white text-gray-400'}`}>{cat}</button>
              ))}</div>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              {filteredProducts.map((p) => (
                <div key={p.id} className="group border border-gray-100 p-4 hover:shadow-2xl transition-all cursor-pointer" onClick={() => setSelectedProduct(p)}>
                  <div className="h-96 overflow-hidden mb-6"><img src={p.img} className="w-full h-full object-cover transition-transform group-hover:scale-110" /></div>
                  <p className="text-[#D4AF37] text-[9px] font-bold uppercase mb-1">{p.cat}</p><h4 className="text-xl font-serif text-[#002366] mb-2">{p.title}</h4>
                  <button className="text-[10px] font-bold text-[#D4AF37] border-b border-[#D4AF37] pb-1 uppercase">View Specs</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl p-8 shadow-2xl relative text-left">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 text-gray-400 font-bold"><X size={24}/></button>
            <div className="grid md:grid-cols-2 gap-10">
              <img src={selectedProduct.img} className="w-full h-full object-cover rounded-lg" />
              <div>
                <h3 className="text-3xl font-serif text-[#002366] mb-2 uppercase">{selectedProduct.title}</h3>
                <div className="border border-gray-100 mt-6"><table className="w-full text-[12px]"><tbody className="divide-y divide-gray-100">
                    {[
                      { label: "Fabric/Material", value: selectedProduct.fabric || selectedProduct.material },
                      { label: "GSM", value: selectedProduct.gsm || selectedProduct.paperGsm },
                      { label: "Fit/Bag Type", value: selectedProduct.fitType || selectedProduct.bagType },
                      { label: "Size Range", value: selectedProduct.sizeRange },
                      { label: "MOQ", value: selectedProduct.moq },
                      { label: "Origin", value: selectedProduct.origin },
                    ].filter(r => r.value).map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}><td className="p-3 font-bold text-[#002366] uppercase text-[10px] w-1/3">{row.label}</td><td className="p-3 text-gray-600">{row.value}</td></tr>
                    ))}
                </tbody></table></div>
                <button onClick={() => {setSelectedProduct(null); setView('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView(), 150)}} className="w-full mt-6 bg-[#002366] text-white py-4 font-bold text-[10px] uppercase">Request Sample / Quote</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-[#002366] text-white pt-20 pb-10 px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 border-b border-white/10 pb-16 mb-10 text-left">
          <div className="md:col-span-2"><img src="/Logoo.JPEG" className="h-12 mb-6 brightness-200" /><p className="text-xs text-gray-400 uppercase tracking-tighter leading-relaxed">Merchant Exporter of premium garments from India to the global stage.</p></div>
          <div><h4 className="text-[11px] font-bold tracking-[0.2em] mb-6 uppercase text-[#D4AF37]">Quick Links</h4>
            <ul className="text-[11px] text-gray-400 space-y-4 uppercase">
              <li><button onClick={() => setView('home')}>Home</button></li>
              <li><button onClick={() => setView('collections')}>Collections</button></li>
              <li><button onClick={() => {setView('home'); setTimeout(() => document.getElementById('about')?.scrollIntoView(), 100)}}>About Us</button></li>
            </ul>
          </div>
          <div><h4 className="text-[11px] font-bold tracking-[0.2em] mb-6 uppercase text-[#D4AF37]">Legal</h4>
            <ul className="text-[11px] text-gray-400 space-y-4 uppercase">
              <li><button>Privacy Policy</button></li>
              <li><button onClick={() => setView('login')} className="text-[#D4AF37] font-bold">Admin Login</button></li>
            </ul>
          </div>
          <div><h4 className="text-[11px] font-bold tracking-[0.2em] mb-6 uppercase text-[#D4AF37]">Follow</h4><div className="flex gap-4"><Facebook size={18}/><Instagram size={18}/><MessageCircle size={18}/></div></div>
        </div>
        <div className="text-center text-[9px] text-gray-500 uppercase tracking-widest">© 2026 {bizName}. ALL RIGHTS RESERVED.</div>
      </footer>
    </div>
  );
}