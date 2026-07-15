import React, { useState } from "react";

function App() {
  // 1. Coffee Shop Menu Data
  const coffeeMenu = [
    { id: 1, name: "Ice Caramel Latte", price: 4500, img: "☕", desc: "Rich espresso with sweet caramel and cold milk." },
    { id: 2, name: "Premium Espresso", price: 3500, img: "☕", desc: "Bold, intense, and full-bodied single origin shot." },
    { id: 3, name: "Matcha Cream Frappe", price: 5000, img: "🍵", desc: "Japanese green tea blended with ice and whipped cream." },
    { id: 4, name: "Butter Croissant", price: 3000, img: "🥐", desc: "Flaky, buttery French pastry baked fresh daily." },
  ];

  // 2. Shopping Cart State
  const [cart, setCart] = useState([]);

  // 3. Add Item to Cart Function
  const addToCart = (item) => {
    const exist = cart.find((x) => x.id === item.id);
    if (exist) {
      setCart(cart.map((x) => x.id === item.id ? { ...exist, qty: exist.qty + 1 } : x));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  // 4. Remove Item from Cart Function
  const removeFromCart = (item) => {
    const exist = cart.find((x) => x.id === item.id);
    if (exist.qty === 1) {
      setCart(cart.filter((x) => x.id !== item.id));
    } else {
      setCart(cart.map((x) => x.id === item.id ? { ...exist, qty: exist.qty - 1 } : x));
    }
  };

  // 5. Calculate Total Price
  const totalPrice = cart.reduce((a, c) => a + c.price * c.qty, 0);

  return (
    <div className="min-h-screen bg-stone-100 text-stone-800 font-sans pb-12">
      
      {/* Navbar Section */}
      <nav className="bg-stone-900 text-amber-100 p-5 shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-widest uppercase">☕ THE BREW BAR</h1>
          <div className="bg-amber-500 text-stone-950 font-bold px-4 py-2 rounded-full text-sm">
            🛒 Cart: {cart.reduce((a, c) => a + c.qty, 0)} items
          </div>
        </div>
      </nav>

      {/* Hero Banner Section */}
      <header className="bg-stone-950 text-white py-16 px-6 text-center border-b-4 border-amber-500 mb-12">
        <h2 className="text-4xl sm:text-5xl font-black text-amber-100 mb-4">Freshly Brewed Excellence</h2>
        <p className="text-stone-400 text-lg max-w-xl mx-auto">Order your favorite specialty coffee online and enjoy the premium taste.</p>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Coffee Menu Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {coffeeMenu.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-3xl shadow-sm border border-stone-200 flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="text-4xl mb-3 bg-amber-100 w-14 h-14 flex items-center justify-center rounded-2xl">{item.img}</div>
                <h3 className="text-lg font-bold text-stone-900">{item.name}</h3>
                <p className="text-stone-500 text-xs mt-1 leading-relaxed">{item.desc}</p>
              </div>
              <div className="flex justify-between items-center mt-5 pt-3 border-t border-stone-100">
                <span className="text-base font-black text-amber-600">{item.price.toLocaleString()} MMK</span>
                <button 
                  onClick={() => addToCart(item)}
                  className="bg-stone-900 hover:bg-amber-600 hover:text-stone-950 text-white text-xs font-bold py-2 px-4 rounded-xl transition cursor-pointer"
                >
                  + Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Live Checkout Receipt Cart */}
        <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 h-fit">
          <h3 className="text-xl font-black text-stone-900 mb-4 pb-2 border-b border-stone-200">🛒 Your Cart</h3>
          
          {cart.length === 0 ? (
            <p className="text-stone-400 text-sm py-4 text-center">Your shopping cart is currently empty.</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="max-w-[150px]">
                    <p className="font-bold text-stone-900">{item.name}</p>
                    <p className="text-xs text-stone-500">{(item.price * item.qty).toLocaleString()} MMK</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => removeFromCart(item)} className="bg-stone-200 hover:bg-stone-300 px-2 py-0.5 rounded text-xs font-bold">-</button>
                    <span className="font-bold">{item.qty}</span>
                    <button onClick={() => addToCart(item)} className="bg-stone-200 hover:bg-stone-300 px-2 py-0.5 rounded text-xs font-bold">+</button>
                  </div>
                </div>
              ))}
              
              <div className="pt-4 border-t-2 border-dashed border-stone-200 mt-4 flex justify-between items-center font-black text-lg text-stone-900">
                <span>Total Amount:</span>
                <span className="text-amber-600">{totalPrice.toLocaleString()} MMK</span>
              </div>

              <button 
                onClick={() => alert(`Thank you for your order! Your total is ${totalPrice.toLocaleString()} MMK.`)}
                className="w-full bg-amber-500 hover:bg-amber-600 text-stone-950 font-black py-3 rounded-xl mt-4 shadow transition text-center cursor-pointer"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}

export default App;
