import React, { useEffect, useMemo, useState } from "react";
import {
  Search, ShoppingCart, User, Menu, X, Heart, Star, ChevronRight,
  ChevronLeft, ShieldCheck, Truck, RotateCcw, CreditCard, Package,
  MapPin, LockKeyhole, Eye, EyeOff, LogOut, Settings, LayoutDashboard,
  Plus, Minus, Trash2, CheckCircle2, Clock3, Box, UserCog, ArrowLeft,
  Sparkles, Tag, Phone, Mail, Home as HomeIcon
} from "lucide-react";

const IMG = {
  hero1:"https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1800&q=85",
  hero2:"https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=1800&q=85",
  hero3:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1800&q=85",
  hero4:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1800&q=85"
};

const productsSeed = [
  {id:"p1",name:"Premium Wireless Headphones",category:"Electronics",price:2499,oldPrice:3999,rating:4.7,stock:24,tag:"BEST SELLER",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",description:"Immersive wireless audio with deep bass, comfortable ear cushions and all-day battery life."},
  {id:"p2",name:"Smart Watch Pro",category:"Electronics",price:3299,oldPrice:5499,rating:4.6,stock:18,tag:"HOT DEAL",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",description:"Modern smart watch with activity tracking, notifications and a premium minimalist design."},
  {id:"p3",name:"Classic Running Shoes",category:"Fashion",price:1999,oldPrice:2999,rating:4.5,stock:31,tag:"SALE",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",description:"Lightweight everyday running shoes designed for comfort, grip and active lifestyles."},
  {id:"p4",name:"Minimal Leather Backpack",category:"Fashion",price:1599,oldPrice:2499,rating:4.4,stock:15,tag:"NEW",image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",description:"Clean, durable backpack with a laptop sleeve and practical compartments for daily travel."},
  {id:"p5",name:"Modern Sunglasses",category:"Accessories",price:899,oldPrice:1499,rating:4.3,stock:42,tag:"TRENDING",image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85",description:"Classic UV-protection sunglasses with a versatile frame that works for everyday outfits."},
  {id:"p6",name:"Smartphone 5G",category:"Electronics",price:18999,oldPrice:22999,rating:4.8,stock:12,tag:"TOP RATED",image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85",description:"Fast 5G smartphone with a vibrant display, capable camera system and smooth performance."},
  {id:"p7",name:"Mechanical Keyboard",category:"Electronics",price:2799,oldPrice:3999,rating:4.6,stock:20,tag:"GAMING",image:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=85",description:"Tactile mechanical keyboard with RGB lighting and a satisfying typing experience."},
  {id:"p8",name:"Cotton Casual Shirt",category:"Fashion",price:999,oldPrice:1599,rating:4.2,stock:36,tag:"NEW",image:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85",description:"Breathable cotton casual shirt with a modern cut, perfect for everyday wear."},
  {id:"p9",name:"Portable Bluetooth Speaker",category:"Electronics",price:1499,oldPrice:2299,rating:4.5,stock:27,tag:"DEAL",image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85",description:"Compact portable speaker with punchy sound, wireless connectivity and travel-friendly design."},
  {id:"p10",name:"Travel Watch",category:"Accessories",price:1199,oldPrice:1899,rating:4.1,stock:29,tag:"SALE",image:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85",description:"Elegant everyday watch with a timeless dial and comfortable strap."},
  {id:"p11",name:"Everyday Sneakers",category:"Fashion",price:1799,oldPrice:2699,rating:4.4,stock:25,tag:"POPULAR",image:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=85",description:"Comfort-first sneakers made for long walks, casual days and weekend adventures."},
  {id:"p12",name:"Desk Lamp",category:"Home",price:799,oldPrice:1199,rating:4.3,stock:44,tag:"VALUE",image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85",description:"Warm adjustable desk lamp for study, work and a clean modern workspace."}
];

const money = n => `₹${Number(n).toLocaleString("en-IN")}`;
const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

function App(){
  const [page,setPage] = useState(window.location.hash.replace("#","") || "home");
  const [products,setProducts] = useState(()=>read("se_products",productsSeed));
  const [cart,setCart] = useState(()=>read("se_cart",[]));
  const [user,setUser] = useState(()=>read("se_user",null));
  const [users,setUsers] = useState(()=>read("se_users",[
    {id:"u1",name:"Admin User",email:"admin@shopeasy.demo",password:"admin123",role:"admin"},
    {id:"u2",name:"Demo Customer",email:"demo@shopeasy.demo",password:"demo123",role:"user"}
  ]));
  const [orders,setOrders] = useState(()=>read("se_orders",[]));
  const [search,setSearch] = useState("");
  const [category,setCategory] = useState("All");
  const [selected,setSelected] = useState(null);
  const [notice,setNotice] = useState(null);

  useEffect(()=>write("se_products",products),[products]);
  useEffect(()=>write("se_cart",cart),[cart]);
  useEffect(()=>write("se_users",users),[users]);
  useEffect(()=>write("se_orders",orders),[orders]);
  useEffect(()=>{ const go=()=>setPage(window.location.hash.replace("#","")||"home"); window.addEventListener("hashchange",go); return()=>window.removeEventListener("hashchange",go)},[]);
  useEffect(()=>{ if(notice){const t=setTimeout(()=>setNotice(null),2600);return()=>clearTimeout(t)}},[notice]);

  const navigate = p => { window.location.hash=p; window.scrollTo({top:0,behavior:"smooth"}); };
  const categories=["All",...new Set(products.map(p=>p.category))];
  const filtered=useMemo(()=>products.filter(p=>(category==="All"||p.category===category)&&p.name.toLowerCase().includes(search.toLowerCase())),[products,category,search]);
  const cartCount=cart.reduce((s,i)=>s+i.qty,0);
  const subtotal=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const shipping=subtotal>=499||subtotal===0?0:49;
  const total=subtotal+shipping;

  const addToCart=(p,qty=1)=>{
    setCart(c=>{const found=c.find(i=>i.id===p.id);return found?c.map(i=>i.id===p.id?{...i,qty:Math.min(i.qty+qty,p.stock)}:i):[...c,{id:p.id,name:p.name,price:p.price,image:p.image,qty}]});
    setNotice(`${p.name} added to cart`);
  };
  const changeQty=(id,delta)=>{
    setCart(c=>c.map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+delta)}:i));
  };
  const removeCart=id=>setCart(c=>c.filter(i=>i.id!==id));

  const login=(email,password)=>{
    const found=users.find(u=>u.email.toLowerCase()===email.toLowerCase()&&u.password===password);
    if(!found) return {ok:false,msg:"Invalid email or password"};
    const safe={id:found.id,name:found.name,email:found.email,role:found.role};
    setUser(safe); write("se_user",safe); return {ok:true};
  };
  const register=(name,email,password)=>{
    if(users.some(u=>u.email.toLowerCase()===email.toLowerCase())) return {ok:false,msg:"Email already registered"};
    const u={id:"u"+Date.now(),name,email,password,role:"user"}; setUsers(x=>[...x,u]); const safe={...u}; delete safe.password; setUser(safe); write("se_user",safe); return {ok:true};
  };
  const logout=()=>{setUser(null);localStorage.removeItem("se_user");navigate("home");setNotice("Logged out successfully")};

  const placeOrder=address=>{
    if(!user){navigate("login");return}
    const order={id:"SE"+Date.now().toString().slice(-8),userId:user.id,items:cart,address,total,status:"Processing",createdAt:new Date().toLocaleString("en-IN"),payment:"Demo Razorpay"};
    setOrders(o=>[order,...o]);setCart([]);navigate("success?");window._lastOrder=order;setNotice("Demo payment successful");
  };

  const content=()=>{
    if(page==="home") return <Home products={products} navigate={navigate} addToCart={addToCart} setSelected={setSelected} setSearch={setSearch}/>;
    if(page==="products") return <ProductsPage products={filtered} categories={categories} category={category} setCategory={setCategory} search={search} setSearch={setSearch} addToCart={addToCart} setSelected={setSelected}/>;
    if(page==="cart") return <CartPage cart={cart} subtotal={subtotal} shipping={shipping} total={total} changeQty={changeQty} removeCart={removeCart} navigate={navigate}/>;
    if(page==="checkout") return <Checkout user={user} cart={cart} subtotal={subtotal} shipping={shipping} total={total} navigate={navigate} placeOrder={placeOrder}/>;
    if(page==="login") return <AuthPage mode="login" login={login} navigate={navigate}/>;
    if(page==="register") return <AuthPage mode="register" register={register} navigate={navigate}/>;
    if(page==="forgot") return <Forgot navigate={navigate}/>;
    if(page==="profile") return user?<Profile user={user} setUser={setUser} users={users} setUsers={setUsers} navigate={navigate}/>:<LoginRedirect navigate={navigate}/>;
    if(page==="orders") return user?<Orders orders={orders.filter(o=>o.userId===user.id)} navigate={navigate}/>:<LoginRedirect navigate={navigate}/>;
    if(page==="admin") return user?.role==="admin"?<Admin products={products} setProducts={setProducts} users={users} orders={orders} navigate={navigate}/>:<AccessDenied navigate={navigate}/>;
    if(page==="success?") return <Success navigate={navigate} order={window._lastOrder}/>;
    return <Home products={products} navigate={navigate} addToCart={addToCart} setSelected={setSelected}/>;
  };

  return <div className="app">
    <Header user={user} logout={logout} cartCount={cartCount} navigate={navigate} search={search} setSearch={setSearch}/>
    {notice&&<div className="toast"><CheckCircle2 size={18}/>{notice}</div>}
    {content()}
    {selected&&<ProductModal product={selected} close={()=>setSelected(null)} addToCart={addToCart}/>}
    <Footer navigate={navigate}/>
  </div>
}

function Header({user,logout,cartCount,navigate,search,setSearch}){
  return <header className="header">
    <div className="nav container">
      <button className="brand" onClick={()=>navigate("home")}><span className="brand-mark">S</span> ShopEasy</button>
      <nav className="nav-links"><button onClick={()=>navigate("home")}>Home</button><button onClick={()=>navigate("products")}>Products</button><button onClick={()=>navigate("orders")}>Track Orders</button>{user?.role==="admin"&&<button onClick={()=>navigate("admin")}>Admin</button>}</nav>
      <div className="nav-actions">
        <div className="search"><Search size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==="Enter"&&navigate("products")} placeholder="Search products..."/></div>
        {user?<button className="icon-btn" title="Profile" onClick={()=>navigate("profile")}><User size={20}/></button>:<button className="login-top" onClick={()=>navigate("login")}>Login</button>}
        <button className="icon-btn cart-btn" onClick={()=>navigate("cart")}><ShoppingCart size={21}/><b>{cartCount}</b></button>
      </div>
    </div>
  </header>
}

function Home({products,navigate,addToCart,setSelected}){
  const [slide,setSlide]=useState(0);
  const slides=[
    [IMG.hero1,"Mega Shopping Festival","Up to 60% OFF","Shop deals"],
    [IMG.hero2,"Everything You Need","Fresh products. Better prices.","Explore products"],
    [IMG.hero3,"Electronics Week","Smart gadgets at smart prices","Shop electronics"],
    [IMG.hero4,"Fashion Picks","Upgrade your everyday style","Discover fashion"]
  ];
  useEffect(()=>{const t=setInterval(()=>setSlide(s=>(s+1)%slides.length),4500);return()=>clearInterval(t)},[]);
  return <main>
    <section className="hero" style={{backgroundImage:`linear-gradient(90deg,rgba(8,15,30,.86),rgba(8,15,30,.18)),url(${slides[slide][0]})`}}>
      <div className="container hero-content"><span className="eyebrow"><Sparkles size={16}/> LIMITED TIME OFFER</span><h1>{slides[slide][1]}</h1><p>{slides[slide][2]}</p><button className="primary" onClick={()=>navigate("products")}>{slides[slide][3]} <ChevronRight size={18}/></button></div>
      <button className="slide prev" onClick={()=>setSlide((slide-1+slides.length)%slides.length)}><ChevronLeft/></button><button className="slide next" onClick={()=>setSlide((slide+1)%slides.length)}><ChevronRight/></button>
      <div className="dots">{slides.map((_,i)=><button className={i===slide?"active":""} key={i} onClick={()=>setSlide(i)}/>)}</div>
    </section>
    <section className="trust"><div><Truck/> <span><b>Fast Delivery</b><small>Across India</small></span></div><div><ShieldCheck/><span><b>Secure Shopping</b><small>Demo-safe checkout</small></span></div><div><RotateCcw/><span><b>Easy Returns</b><small>7-day return policy</small></span></div><div><CreditCard/><span><b>Flexible Payment</b><small>Razorpay-style demo</small></span></div></section>
    <section className="section container"><div className="section-head"><div><span className="eyebrow dark">SHOP BY CATEGORY</span><h2>Find what you need</h2></div><button className="link-btn" onClick={()=>navigate("products")}>View all <ChevronRight size={16}/></button></div><div className="category-grid">{["Electronics","Fashion","Accessories","Home"].map((c,i)=><button key={c} className="category-card" onClick={()=>{navigate("products");}}><img src={products.find(p=>p.category===c)?.image}/><div><h3>{c}</h3><span>Explore collection <ChevronRight size={15}/></span></div></button>)}</div></section>
    <section className="section container"><div className="section-head"><div><span className="eyebrow dark">CURATED FOR YOU</span><h2>Trending products</h2></div><button className="link-btn" onClick={()=>navigate("products")}>See all <ChevronRight size={16}/></button></div><div className="product-grid">{products.slice(0,8).map(p=><ProductCard key={p.id} product={p} addToCart={addToCart} setSelected={setSelected}/>)}</div></section>
    <section className="promo container"><div><span className="eyebrow">SHOP EASY</span><h2>Great products. Great prices.</h2><p>A polished e-commerce experience built for your project demonstration — authentication, cart, checkout, orders and admin controls included.</p><button className="primary light" onClick={()=>navigate("products")}>Start Shopping</button></div></section>
  </main>
}

function ProductsPage({products,categories,category,setCategory,search,setSearch,addToCart,setSelected}){
 return <main className="section container"><div className="page-title"><div><span className="eyebrow dark">COLLECTION</span><h1>All Products</h1><p>{products.length} products found</p></div><div className="product-search"><Search size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products"/></div></div><div className="chips">{categories.map(c=><button className={category===c?"chip active":"chip"} onClick={()=>setCategory(c)} key={c}>{c}</button>)}</div>{products.length?<div className="product-grid">{products.map(p=><ProductCard key={p.id} product={p} addToCart={addToCart} setSelected={setSelected}/>)}</div>:<div className="empty"><Package size={50}/><h2>No products found</h2><p>Try another search or category.</p></div>}</main>
}

function ProductCard({product,addToCart,setSelected}){
 return <article className="product-card"><div className="product-image" onClick={()=>setSelected(product)}><img src={product.image}/><span>{product.tag}</span><button className="heart" onClick={e=>e.stopPropagation()}><Heart size={18}/></button></div><div className="product-body"><small>{product.category}</small><h3 onClick={()=>setSelected(product)}>{product.name}</h3><div className="rating"><Star size={15} fill="currentColor"/> {product.rating}</div><div className="price-row"><b>{money(product.price)}</b><del>{money(product.oldPrice)}</del></div><button className="add-btn" onClick={()=>addToCart(product)}>Add to cart <ShoppingCart size={17}/></button></div></article>
}

function ProductModal({product,close,addToCart}){
 const [qty,setQty]=useState(1);
 return <div className="modal-backdrop" onClick={close}><div className="product-modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={close}><X/></button><img src={product.image}/><div className="modal-info"><span className="eyebrow dark">{product.category}</span><h2>{product.name}</h2><div className="rating"><Star size={16} fill="currentColor"/> {product.rating} · {product.stock} in stock</div><p>{product.description}</p><div className="modal-price">{money(product.price)} <del>{money(product.oldPrice)}</del></div><div className="qty"><button onClick={()=>setQty(Math.max(1,qty-1))}><Minus/></button><b>{qty}</b><button onClick={()=>setQty(Math.min(product.stock,qty+1))}><Plus/></button></div><button className="primary full" onClick={()=>{addToCart(product,qty);close()}}>Add {qty} to cart</button></div></div></div>
}

function CartPage({cart,subtotal,shipping,total,changeQty,removeCart,navigate}){
 if(!cart.length)return <main className="empty-page"><ShoppingCart size={62}/><h1>Your cart is empty</h1><p>Add products to get started.</p><button className="primary" onClick={()=>navigate("products")}>Browse Products</button></main>;
 return <main className="section container"><div className="page-title"><div><span className="eyebrow dark">YOUR BAG</span><h1>Shopping Cart</h1></div></div><div className="cart-layout"><div className="cart-list">{cart.map(i=><div className="cart-item" key={i.id}><img src={i.image}/><div className="cart-main"><small>Product</small><h3>{i.name}</h3><b>{money(i.price)}</b><div className="qty"><button onClick={()=>changeQty(i.id,-1)}><Minus/></button><b>{i.qty}</b><button onClick={()=>changeQty(i.id,1)}><Plus/></button></div></div><button className="delete" onClick={()=>removeCart(i.id)}><Trash2/></button></div>)}</div><Summary subtotal={subtotal} shipping={shipping} total={total} navigate={navigate}/></div></main>
}
function Summary({subtotal,shipping,total,navigate}){return <aside className="summary"><h2>Order Summary</h2><div><span>Subtotal</span><b>{money(subtotal)}</b></div><div><span>Shipping</span><b>{shipping?money(shipping):"FREE"}</b></div><hr/><div className="total"><span>Total</span><b>{money(total)}</b></div><button className="primary full" onClick={()=>navigate("checkout")}>Proceed to Checkout <ChevronRight size={18}/></button><small><LockKeyhole size={13}/> Demo checkout — no real money is charged.</small></aside>}

function Checkout({user,cart,subtotal,shipping,total,navigate,placeOrder}){
 const [form,setForm]=useState({name:user?.name||"",phone:"",address:"",city:"Hyderabad",state:"Telangana",pincode:"500001"});
 const [step,setStep]=useState(1);
 if(!user)return <LoginRedirect navigate={navigate}/>;
 return <main className="section container"><div className="checkout-steps"><span className={step>=1?"on":""}>1. Delivery</span><span className={step>=2?"on":""}>2. Review</span><span className={step>=3?"on":""}>3. Payment</span></div>{step===1?<div className="checkout-grid"><div className="form-card"><h2>Delivery Address</h2><div className="form-grid">{["name","phone","address","city","state","pincode"].map(k=><label key={k}>{k[0].toUpperCase()+k.slice(1)}<input required value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} placeholder={`Enter ${k}`}/></label>)}</div><button className="primary" onClick={()=>setStep(2)}>Continue to Review</button></div><Summary subtotal={subtotal} shipping={shipping} total={total} navigate={()=>{}}/></div>:step===2?<div className="checkout-grid"><div className="form-card"><h2>Review Order</h2><div className="review-address"><MapPin/> <span>{form.address}, {form.city}, {form.state} - {form.pincode}<br/>{form.phone}</span></div>{cart.map(i=><div className="review-line" key={i.id}><span>{i.name} × {i.qty}</span><b>{money(i.price*i.qty)}</b></div>)}<button className="primary" onClick={()=>setStep(3)}>Continue to Payment</button></div><Summary subtotal={subtotal} shipping={shipping} total={total} navigate={()=>{}}/></div>:<div className="payment-demo"><div className="payment-card"><div className="razor-logo">razorpay</div><h2>Secure Demo Payment</h2><p>This simulates a Razorpay checkout flow for your project presentation.</p><div className="fake-card"><CreditCard/><div><b>•••• •••• •••• 4242</b><small>Demo Visa Card</small></div></div><button className="primary full" onClick={()=>placeOrder(form)}>Pay {money(total)}</button><small><ShieldCheck size={14}/> Payment is simulated. No real transaction occurs.</small></div></div>}</main>
}

function AuthPage({mode,login,register,navigate}){
 const [name,setName]=useState(""),[email,setEmail]=useState(""),[password,setPassword]=useState(""),[show,setShow]=useState(false),[error,setError]=useState("");
 const submit=e=>{e.preventDefault();const r=mode==="login"?login(email,password):register(name,email,password);if(!r.ok)setError(r.msg);else navigate("home")};
 return <main className="auth-page"><div className="auth-card"><div className="auth-brand"><span className="brand-mark">S</span><h1>{mode==="login"?"Welcome back":"Create your account"}</h1><p>{mode==="login"?"Sign in to continue shopping.":"Join ShopEasy and start shopping."}</p></div><form onSubmit={submit}>{mode==="register"&&<label>Full name<input value={name} onChange={e=>setName(e.target.value)} required/></label>}<label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label><label>Password<div className="pass"><input type={show?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} required minLength="6"/><button type="button" onClick={()=>setShow(!show)}>{show?<EyeOff/>:<Eye/>}</button></div></label>{error&&<div className="error">{error}</div>}<button className="primary full">{mode==="login"?"Sign In":"Create Account"}</button></form>{mode==="login"&&<button className="text-btn" onClick={()=>navigate("forgot")}>Forgot password?</button>}<p className="switch">{mode==="login"?"Don't have an account?":"Already have an account?"} <button onClick={()=>navigate(mode==="login"?"register":"login")}>{mode==="login"?"Register":"Login"}</button></p><div className="demo-hint">{mode==="login"&&<>Demo admin: <b>admin@shopeasy.demo</b> / <b>admin123</b><br/>Demo user: <b>demo@shopeasy.demo</b> / <b>demo123</b></>}</div></div></main>
}
function Forgot({navigate}){const [email,setEmail]=useState(""),[sent,setSent]=useState(false);return <main className="auth-page"><div className="auth-card"><LockKeyhole size={38}/><h1>Reset your password</h1><p>Enter your email. In demo mode, we show the reset flow without sending a real email.</p>{sent?<div className="success-box"><CheckCircle2/> Reset link generated for {email}. <button onClick={()=>navigate("login")}>Return to login</button></div>:<form onSubmit={e=>{e.preventDefault();setSent(true)}}><label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label><button className="primary full">Generate Reset Link</button></form>}<button className="text-btn" onClick={()=>navigate("login")}>Back to login</button></div></main>}
function Profile({user,setUser,users,setUsers,navigate}){const [name,setName]=useState(user.name),[password,setPassword]=useState(""),[msg,setMsg]=useState("");return <main className="section container"><div className="profile-head"><div className="avatar">{user.name[0]}</div><div><span className="eyebrow dark">{user.role.toUpperCase()}</span><h1>{user.name}</h1><p>{user.email}</p></div></div><div className="profile-grid"><div className="form-card"><h2>Update Profile</h2><label>Name<input value={name} onChange={e=>setName(e.target.value)}/></label><button className="primary" onClick={()=>{const u={...user,name};setUser(u);setUsers(xs=>xs.map(x=>x.id===user.id?{...x,name}:x));write("se_user",u);setMsg("Profile updated")}}>Save Profile</button>{msg&&<div className="success-box">{msg}</div>}</div><div className="form-card"><h2>Update Password</h2><label>New password<input type="password" minLength="6" value={password} onChange={e=>setPassword(e.target.value)}/></label><button className="primary" onClick={()=>{if(password.length<6){setMsg("Password must be at least 6 characters");return}setUsers(xs=>xs.map(x=>x.id===user.id?{...x,password}:x));setPassword("");setMsg("Password updated successfully")}}>Update Password</button></div></div><button className="link-btn" onClick={()=>navigate("orders")}>View my orders <ChevronRight size={16}/></button></main>}
function Orders({orders,navigate}){return <main className="section container"><div className="page-title"><div><span className="eyebrow dark">ORDER HISTORY</span><h1>Track Your Orders</h1></div></div>{orders.length?<div className="orders">{orders.map(o=><div className="order-card" key={o.id}><div className="order-top"><div><b>Order #{o.id}</b><small>{o.createdAt}</small></div><span className="status"><Clock3 size={15}/> {o.status}</span></div><div className="order-products">{o.items.map(i=><div key={i.id}><img src={i.image}/><span>{i.name} × {i.qty}</span></div>)}</div><div className="order-bottom"><b>{money(o.total)}</b><span><MapPin size={15}/> {o.address.city}, {o.address.state}</span><span><CreditCard size={15}/> {o.payment}</span></div><div className="tracking"><span className="done"><CheckCircle2/> Ordered</span><span className="done"><CheckCircle2/> Packed</span><span className="current"><Truck/> Shipped</span><span><Box/> Delivered</span></div></div>)}</div>:<div className="empty"><Package size={50}/><h2>No orders yet</h2><button className="primary" onClick={()=>navigate("products")}>Shop now</button></div>}</main>}
function Admin({products,setProducts,users,orders,navigate}){const [tab,setTab]=useState("dashboard");const [form,setForm]=useState({name:"",price:"",category:"Electronics",image:"https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=900&q=85"});const revenue=orders.reduce((s,o)=>s+o.total,0);return <main className="section container"><div className="admin-head"><div><span className="eyebrow dark">CONTROL CENTER</span><h1>Admin Dashboard</h1></div><button className="link-btn" onClick={()=>navigate("products")}>View store</button></div><div className="admin-tabs">{["dashboard","products","users","orders"].map(t=><button className={tab===t?"active":""} onClick={()=>setTab(t)} key={t}>{t}</button>)}</div>{tab==="dashboard"&&<div className="stats"><Stat icon={<Package/>} label="Products" value={products.length}/><Stat icon={<UserCog/>} label="Users" value={users.length}/><Stat icon={<ShoppingCart/>} label="Orders" value={orders.length}/><Stat icon={<CreditCard/>} label="Revenue" value={money(revenue)}/></div>}{tab==="products"&&<div className="admin-panel"><div className="form-card"><h2>Add Product</h2><label>Name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>Price<input type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/></label><label>Category<select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}><option>Electronics</option><option>Fashion</option><option>Accessories</option><option>Home</option></select></label><button className="primary" onClick={()=>{if(!form.name||!form.price)return;setProducts(p=>[{...form,id:"p"+Date.now(),price:Number(form.price),oldPrice:Number(form.price)*1.25,rating:4.5,stock:20,tag:"NEW",description:"Demo product added from the admin dashboard."},...p]);setForm({...form,name:"",price:""})}}> <Plus/> Add Product</button></div><div className="admin-table">{products.map(p=><div className="table-row" key={p.id}><img src={p.image}/><span>{p.name}</span><b>{money(p.price)}</b><button className="delete" onClick={()=>setProducts(xs=>xs.filter(x=>x.id!==p.id))}><Trash2/></button></div>)}</div></div>}{tab==="users"&&<div className="admin-table">{users.map(u=><div className="table-row" key={u.id}><div className="avatar mini">{u.name[0]}</div><span>{u.name}<small>{u.email}</small></span><b>{u.role}</b></div>)}</div>}{tab==="orders"&&<div className="admin-table">{orders.length?orders.map(o=><div className="table-row" key={o.id}><span><b>#{o.id}</b><small>{o.createdAt}</small></span><b>{money(o.total)}</b><span className="status">{o.status}</span></div>):<div className="empty">No orders yet.</div>}</div>}</main>}
function Stat({icon,label,value}){return <div className="stat"><div>{icon}</div><small>{label}</small><strong>{value}</strong></div>}
function Success({navigate,order}){return <main className="success-page"><div className="success-icon"><CheckCircle2 size={58}/></div><span className="eyebrow dark">PAYMENT SUCCESSFUL</span><h1>Order confirmed!</h1><p>Your demo payment was processed successfully. No real money was charged.</p>{order&&<div className="success-order"><b>Order #{order.id}</b><span>{money(order.total)}</span></div>}<div><button className="primary" onClick={()=>navigate("orders")}>Track Order</button><button className="secondary" onClick={()=>navigate("products")}>Continue Shopping</button></div></main>}
function LoginRedirect({navigate}){useEffect(()=>navigate("login"),[]);return <main className="empty-page"><Loader/></main>}
function AccessDenied({navigate}){return <main className="empty-page"><ShieldCheck size={60}/><h1>Admin access required</h1><p>This demo uses role-based access control.</p><button className="primary" onClick={()=>navigate("home")}>Back to Store</button></main>}
function Loader(){return <div className="spinner"/>}
function Footer({navigate}){return <footer><div className="container footer-grid"><div><button className="brand footer-brand" onClick={()=>navigate("home")}><span className="brand-mark">S</span> ShopEasy</button><p>A modern e-commerce project demo with realistic user flows and role-based access.</p></div><div><h4>Shop</h4><button onClick={()=>navigate("products")}>All Products</button><button onClick={()=>navigate("cart")}>Cart</button><button onClick={()=>navigate("orders")}>Track Orders</button></div><div><h4>Account</h4><button onClick={()=>navigate("profile")}>Profile</button><button onClick={()=>navigate("login")}>Login</button><button onClick={()=>navigate("forgot")}>Reset Password</button></div><div><h4>Project</h4><p><Mail size={15}/> support@shopeasy.demo</p><p><Phone size={15}/> +91 90000 00000</p><p><ShieldCheck size={15}/> Demo mode enabled</p></div></div><div className="copyright">© 2026 ShopEasy. Built as a portfolio project demonstration.</div></footer>}

export default App;
