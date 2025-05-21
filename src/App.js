import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file

// --- AuthPage Components ---
const LoginForm = ({ onLoginSuccess, onShowSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'user' && password === 'pass') {
      onLoginSuccess();
    } else {
      setMessage('Login failed. Please check your username and password.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to BagHaven</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">Username:</label>
          <input
            type="text"
            id="username"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password:</label>
          <input
            type="password"
            id="password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {message && <p className="text-red-500 text-center text-sm">{message}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md font-bold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
        >
          Login
        </button>
        <p className="text-center text-gray-600 text-sm mt-4">
          Don't have an account? <a href="#" onClick={onShowSignup} className="text-blue-600 hover:underline font-medium">Sign up</a>
        </p>
      </form>
    </div>
  );
};

const SignupForm = ({ onShowLogin }) => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    // Simulate successful signup
    setMessage(`Account created for ${newUsername}. You can now log in.`);
    setNewUsername('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => {
      onShowLogin();
      setMessage('');
    }, 1500); // Redirect to login after a short delay
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up for BagHaven</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="new-username" className="block text-gray-700 text-sm font-semibold mb-2">Username:</label>
          <input
            type="text"
            id="new-username"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="new-password" className="block text-gray-700 text-sm font-semibold mb-2">Password:</label>
          <input
            type="password"
            id="new-password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirm-password" className="block text-gray-700 text-sm font-semibold mb-2">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {message && <p className="text-green-600 text-center text-sm">{message}</p>}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-md font-bold text-lg hover:bg-green-700 transition-colors duration-200 shadow-md"
        >
          Sign Up
        </button>
        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account? <a href="#" onClick={onShowLogin} className="text-blue-600 hover:underline font-medium">Login</a>
        </p>
      </form>
    </div>
  );
};

const AuthPage = ({ onLoginSuccess }) => {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {showSignup ? (
        <SignupForm onShowLogin={() => setShowSignup(false)} />
      ) : (
        <LoginForm onLoginSuccess={onLoginSuccess} onShowSignup={() => setShowSignup(true)} />
      )}
    </div>
  );
};

// --- Main App Components ---

const Header = ({ onNavigate }) => {
  return (
    <header className="bg-white text-gray-800 p-4 flex flex-col sm:flex-row justify-between items-center shadow-md rounded-b-lg w-full fixed top-0 z-10">
      <div className="text-2xl font-extrabold text-blue-600 mb-4 sm:mb-0">BagHaven</div>
      <nav className="mb-4 sm:mb-0">
        <ul className="flex flex-col sm:flex-row list-none p-0 m-0 gap-4 sm:gap-6">
          <li><a href="#" className="text-gray-600 no-underline hover:text-blue-500 transition-colors duration-200 font-medium" data-nav-target="home" onClick={onNavigate}>Home</a></li>
          <li><a href="#" className="text-gray-600 no-underline hover:text-blue-500 transition-colors duration-200 font-medium" data-nav-target="shop" onClick={onNavigate}>Shop</a></li>
          <li><a href="#" className="text-gray-600 no-underline hover:text-blue-500 transition-colors duration-200 font-medium" data-nav-target="about-us" onClick={onNavigate}>About Us</a></li>
          <li><a href="#" className="text-gray-600 no-underline hover:text-blue-500 transition-colors duration-200 font-medium" data-nav-target="collection" onClick={onNavigate}>Collection</a></li>
        </ul>
      </nav>
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <div className="flex w-full sm:w-auto">
          <input type="text" placeholder="Search..." className="p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full" />
          <button type="submit" className="px-4 py-2 bg-gray-200 border border-gray-300 rounded-r-md cursor-pointer hover:bg-gray-300 transition-colors duration-200">Search</button>
        </div>
        <a href="#" className="text-2xl no-underline text-gray-700 hover:text-blue-500 transition-colors duration-200">🛒</a>
      </div>
    </header>
  );
};

const Sidebar = ({ activeContent, onNavigate }) => {
  const sidebarItems = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'shop', icon: 'storefront', label: 'Shop' },
    { id: 'admin', icon: 'admin_panel_settings', label: 'Admin' },
    { id: 'logout', icon: 'logout', label: 'Logout' },
  ];

  return (
    <aside className="fixed top-16 left-0 h-full w-64 p-5 border-r border-gray-200 bg-gray-50 flex flex-col items-start rounded-r-lg z-20">
      <div className="flex items-center justify-start mb-8 w-full">
        <img src="images/BagHavenlogo.jpg" alt="BagHaven Logo" className="h-10 mr-3 rounded-full" />
        <h2 className="text-xl font-bold text-gray-800">Bag<span className="text-red-500">Haven</span></h2>
      </div>
      <nav className="w-full flex flex-col justify-start gap-1">
        {sidebarItems.map(item => (
          <a
            key={item.id}
            href="#"
            className={`flex items-center text-gray-600 py-3 px-4 no-underline rounded-md transition-all duration-200 w-full ${activeContent === item.id ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:bg-gray-100 hover:text-blue-600'}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="material-symbols-outlined text-2xl mr-3">{item.icon}</span>
            <h3 className="text-base font-medium">{item.label}</h3>
          </a>
        ))}
      </nav>
    </aside>
  );
};

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center border border-gray-200 transition-transform duration-200 hover:scale-[1.02]">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
      <p className="text-xl font-bold text-blue-600 mb-4">${product.price.toFixed(2)}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

const HomeSection = () => {
  const featuredBags = [
    'images/placeholder1.jpg',
    'images/placeholder2.jpg',
    'images/placeholder3.jpg',
    'images/placeholder4.jpg',
    'images/placeholder5.jpg',
  ];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome to BagHaven!</h1>
      <p className="text-lg text-gray-600 mb-6">Explore our latest collection of stylish bags.</p>

      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Featured Bags</h2>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {featuredBags.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Featured Bag ${index + 1}`}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 h-auto rounded-lg shadow-md object-cover aspect-square"
          />
        ))}
      </div>
    </div>
  );
};

const ShopSection = ({ updateCart }) => {
  const products = [
    { id: 1, name: 'Elegant laptop Bag', price: 59.99, image: 'images/placeholder1.jpg' },
    { id: 2, name: 'Classic Leather bag', price: 89.50, image: 'images/placeholder2.jpg' },
    { id: 3, name: 'Stylish backpack', price: 34.00, image: 'images/placeholder3.jpg' },
    { id: 4, name: 'Travel Duffle Bag', price: 75.00, image: 'images/placeholder4.jpg' },
    { id: 5, name: 'Compact Sling Bag', price: 25.99, image: 'images/placeholder5.jpg' },
  ];

  const handleAddToCart = (product) => {
    updateCart(product);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Our Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
      {/* The checkout info and button are now in MainContent */}
    </div>
  );
};

const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Product Data:', { productName, productPrice, productImage });
    alert(`Product "${productName}" added successfully! (This is a simulation)`);
    setProductName('');
    setProductPrice('');
    setProductImage('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="product-name" className="block text-gray-700 text-sm font-bold mb-2">Product Name:</label>
          <input
            type="text"
            id="product-name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="product-price" className="block text-gray-700 text-sm font-bold mb-2">Price:</label>
          <input
            type="number"
            id="product-price"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="product-image" className="block text-gray-700 text-sm font-bold mb-2">Image URL:</label>
          <input
            type="text"
            id="product-image"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter image URL"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

const ProductListTable = () => {
  // In a real app, this data would come from a state management solution or API
  const products = [
    { id: '001', name: 'Elegant laptop Bag', price: 59.99 },
    { id: '002', name: 'Classic Leather ba', price: 89.50 },
    { id: '003', name: 'Stylish bagpack', price: 34.00 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Product List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left text-gray-600 bg-gray-50">ID</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 bg-gray-50">Name</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 bg-gray-50">Price</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 bg-gray-50">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td className="py-2 px-4 border-b text-gray-800">{product.id}</td>
                <td className="py-2 px-4 border-b text-gray-800">{product.name}</td>
                <td className="py-2 px-4 border-b text-gray-800">${product.price.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-blue-500 hover:text-blue-700 mr-2 px-3 py-1 rounded-md text-sm bg-blue-100 hover:bg-blue-200 transition-colors">Edit</button>
                  <button className="text-red-500 hover:text-red-700 px-3 py-1 rounded-md text-sm bg-red-100 hover:bg-red-200 transition-colors">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const DashboardOverview = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Dashboard Overview</h2>
      <p className="text-gray-600 mb-4">Quick summary of sales, orders, and inventory.</p>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li><strong className="font-semibold">Total Sales:</strong> $15,000</li>
        <li><strong className="font-semibold">Orders Today:</strong> 15</li>
        <li><strong className="font-semibold">Items in Stock:</strong> 250</li>
      </ul>
    </div>
  );
};

const AnalyticsContent = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Sales Analytics</h2>
      <p className="text-gray-600 mb-4">Detailed insights into product performance and customer behavior.</p>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li><strong className="font-semibold">Top Selling Product:</strong> Elegant Tote Bag</li>
        <li><strong className="font-semibold">Customer Demographics:</strong> 60% Female, 40% Male</li>
        <li><strong className="font-semibold">Traffic Sources:</strong> 70% Organic, 30% Social Media</li>
      </ul>
    </div>
  );
};

const AdminSection = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AddProductForm />
        <ProductListTable />
        <DashboardOverview />
        <AnalyticsContent />
      </div>
    </div>
  );
};

const AboutUsSection = () => {
  return (
    <div className="about-us-content p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">About Us</h1>
      <p className="text-lg text-gray-600 mb-4">Welcome to BagHaven, your online destination for stylish and high-quality bags!</p>
      <p className="text-lg text-gray-600 mb-4">This website is a project created by a dedicated team of IT students from Pateros Technological College.</p>
      <p className="text-lg text-gray-600 mb-4">Our goal is to showcase and sell a curated collection of fashionable bags, catering to various needs and styles.</p>
      <p className="text-lg text-gray-600 mb-4">This platform is built using modern web technologies including React-app for the frontend, Node.js for the backend, and MySQL for the database. We utilized VSCode as our primary development environment.</p>
      <p className="text-lg text-gray-600 mb-4">We are passionate about both technology and fashion, and this project is a testament to our skills and creativity. We hope you enjoy browsing our selection and find the perfect bag!</p>
      <p className="text-lg text-gray-600">Thank you for visiting BagHaven!</p>
    </div>
  );
};

const CollectionSection = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Our Collection</h1>
      <p className="text-lg text-gray-600">Browse through our extensive collection of bags.</p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Placeholder for collection items */}
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <img src="https://placehold.co/300x200/e0e0e0/000000?text=Bag+Type+A" alt="Bag Type A" className="w-full h-40 object-cover rounded-md mb-4" />
          <h3 className="text-lg font-semibold text-gray-800">Everyday Carry</h3>
          <p className="text-gray-600 text-sm">Versatile bags for daily use.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <img src="https://placehold.co/300x200/d0d0d0/000000?text=Bag+Type+B" alt="Bag Type B" className="w-full h-40 object-cover rounded-md mb-4" />
          <h3 className="text-lg font-semibold text-gray-800">Travel Essentials</h3>
          <p className="text-gray-600 text-sm">Durable and spacious bags for your journeys.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <img src="https://placehold.co/300x200/c0c0c0/000000?text=Bag+Type+C" alt="Bag Type C" className="w-full h-40 object-cover rounded-md mb-4" />
          <h3 className="text-lg font-semibold text-gray-800">Fashion Statements</h3>
          <p className="text-gray-600 text-sm">Trendy bags to complete your look.</p>
        </div>
      </div>
    </div>
  );
};

const LogoutSection = ({ onLogout }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Logout</h1>
        <p className="text-lg text-gray-600 mb-8">Are you sure you want to log out?</p>
        <button
          onClick={onLogout}
          className="bg-red-600 text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-red-700 transition-colors duration-200 shadow-md"
        >
          Confirm Logout
        </button>
      </div>
    </div>
  );
};

const Receipt = ({ cartItems, onClose }) => {
  let total = 0;
  cartItems.forEach(item => (total += item.price));

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-30">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Receipt</h2>
        {cartItems.length > 0 ? (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-700">{item.name}</span>
                <span className="font-semibold text-gray-800">${item.price.toFixed(2)}</span>
              </li>
            ))}
            <li className="flex justify-between py-2 font-bold text-lg text-gray-800">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </li>
          </ul>
        ) : (
          <p className="text-gray-600">Your cart is empty.</p>
        )}
        <button onClick={onClose} className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200">Close</button>
      </div>
    </div>
  );
};

const MainContent = ({ activeContent, onLogout, cartItems, updateCart }) => {
  const [showReceipt, setShowReceipt] = useState(false);

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      setShowReceipt(true);
    } else {
      alert('Your cart is empty. Please add items to checkout.');
    }
  };

  const closeReceipt = () => {
    setShowReceipt(false);
  };

  let total = 0;
  cartItems.forEach(item => (total += item.price));

  return (
    <div className="flex-grow p-4 ml-64 relative"> {/* Added relative for Receipt positioning */}
      {(() => {
        switch (activeContent) {
          case 'home':
            return <HomeSection />;
          case 'shop':
            return <ShopSection updateCart={updateCart} />;
          case 'admin':
            return <AdminSection />;
          case 'about-us':
            return <AboutUsSection />;
          case 'collection':
            return <CollectionSection />;
          case 'logout':
            return <LogoutSection onLogout={onLogout} />;
          default:
            return (
              <div className="p-4 text-center">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">Page Not Found</h1>
                <p className="text-lg text-gray-600">The content you are looking for does not exist.</p>
              </div>
            );
        }
      })()}
      {activeContent === 'shop' && (
        <div className="bg-gray-100 p-4 rounded-lg text-right shadow-inner border border-gray-200 mt-4">
          <p className="text-lg font-semibold text-gray-700 mb-2">Total: ${total.toFixed(2)}</p>
          <button
            onClick={handleCheckout}
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-200 text-lg shadow-md"
          >
            Proceed to Checkout
          </button>
        </div>
      )}

      {showReceipt && <Receipt cartItems={cartItems} onClose={closeReceipt} />}
    </div>
  );
};

const HomePage = ({ onLogout, updateCart, cartItems }) => {
  const [activeContent, setActiveContent] = useState('home');

  const handleSidebarNavigate = (contentId) => {
    setActiveContent(contentId);
  };

  // Handle header navigation link clicks
  const handleHeaderNavigate = (e) => {
    e.preventDefault();
    const target = e.target.getAttribute('data-nav-target');
    if (target) {
      setActiveContent(target);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header onNavigate={handleHeaderNavigate} />
      <div className="flex flex-grow max-w-7xl w-full mx-auto mt-16 rounded-lg shadow-xl">
        <Sidebar activeContent={activeContent} onNavigate={handleSidebarNavigate} />
        <MainContent
          activeContent={activeContent}
          onLogout={onLogout}
          cartItems={cartItems}
          updateCart={updateCart}
        />
      </div>
    </div>
  );
};

// --- Main App Component ---
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCartItems([]); // Clear cart on logout
  };

  const updateCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  // Ensure Material Symbols Outlined font is loaded
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Add Tailwind CSS CDN
    const tailwindScript = document.createElement('script');
    tailwindScript.src = 'https://cdn.tailwindcss.com';
    document.head.appendChild(tailwindScript);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(tailwindScript);
    };
  }, []);

  return (
    <div className="font-sans antialiased text-gray-900 min-h-screen flex flex-col">
      {isLoggedIn ? (
        <HomePage onLogout={handleLogout} updateCart={updateCart} cartItems={cartItems} />
      ) : (
        <AuthPage onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default App;