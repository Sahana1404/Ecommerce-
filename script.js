// --- Products Array ---
const products = [
  {id:1,name:"Smartphone",price:15000,category:"electronics",image:"images/smartphone.jpeg",discount:10,popularity:95},
  {id:2,name:"Laptop",price:55000,category:"electronics",image:"images/laptop.jpeg",popularity:90},
  {id:3,name:"Headphones",price:2500,category:"electronics",image:"images/headphone.jpg",discount:5,popularity:85},
  {id:4,name:"Smartwatch",price:8000,category:"electronics",image:"images/smartwatch.webp",popularity:80},
  {id:5,name:"Camera",price:30000,category:"electronics",image:"images/camera.jpg",discount:15,popularity:75},
  {id:6,name:"T-Shirt",price:600,category:"clothing",image:"images/T_shirt.jpeg",popularity:70},
  {id:7,name:"Jeans",price:1200,category:"clothing",image:"images/jeans.jpeg",discount:20,popularity:75},
  {id:8,name:"Jacket",price:2500,category:"clothing",image:"images/jacket.jpeg",popularity:80},
  {id:9,name:"Shoes",price:1800,category:"clothing",image:"images/shoes.jpg",discount:10,popularity:85},
  {id:10,name:"Cap",price:400,category:"clothing",image:"images/cap.avif",popularity:65},
  {id:11,name:"Mercent of Venice",price:500,category:"books",image:"images/book1.jpg",popularity:60},
  {id:12,name:"Siddartha",price:700,category:"books",image:"images/book2.jpeg",discount:5,popularity:55},
  {id:13,name:"Fearful",price:600,category:"books",image:"images/book3.jpeg",popularity:50},
  {id:14,name:"Sunrise",price:800,category:"books",image:"images/book4.jpeg",discount:10,popularity:65},
  {id:15,name:"Thank You for Leaving Me",price:900,category:"books",image:"images/book5.jpeg",popularity:70},
  {id:16,name:"Hands-On ML",price:1200,category:"machine-learning",image:"images/ml1.jpeg",popularity:80},
  {id:17,name:"Python ML",price:1500,category:"machine-learning",image:"images/python_LM.jpg",discount:10,popularity:75},
  {id:18,name:"Deep Learning with Python",price:1300,category:"machine-learning",image:"images/DL_with_py.jpeg",popularity:85},
  {id:19,name:"ML for Absolute Beginners",price:1600,category:"machine-learning",image:"images/ML_for_absolute.jpg",popularity:70},
  {id:20,name:"Intro to ML",price:1400,category:"machine-learning",image:"images/intro_to_ML.png",discount:5,popularity:90},
  {id:21,name:"AI: A Modern Approach",price:1500,category:"ai",image:"images/Artificial_Intelligence-_A_Modern_Approach.jpg",popularity:80},
  {id:22,name:"Deep Learning by Lan",price:1700,category:"ai",image:"images/DL_by_lan.jpeg",discount:15,popularity:85},
  {id:23,name:"AI Superpowers",price:1600,category:"ai",image:"images/AI_super_powers.jpg",popularity:75},
  {id:24,name:"Reinforcement Learning",price:1800,category:"ai",image:"images/Reinforement.jpeg",discount:10,popularity:70},
  {id:25,name:"Practical AI",price:2000,category:"ai",image:"images/practical_AI.jpeg",popularity:90},
  {id:26,name:"Toy Car",price:500,category:"toys",image:"images/toy1.jpeg",popularity:80},
  {id:27,name:"Doll",price:400,category:"toys",image:"images/toy2.jpeg",discount:10,popularity:70},
  {id:28,name:"Puzzle",price:350,category:"toys",image:"images/toy3.jpeg",popularity:60},
  {id:29,name:"Ball",price:250,category:"toys",image:"images/toy4.jpeg",popularity:75},
  {id:30,name:"Board Game",price:600,category:"toys",image:"images/toy5.jpeg",discount:5,popularity:65},
  {id:31,name:"Lamp",price:1200,category:"home",image:"images/lamp.jpg",popularity:65},
  {id:32,name:"Chair",price:2500,category:"home",image:"images/chair.webp",discount:10,popularity:70},
  {id:33,name:"Table",price:3000,category:"home",image:"images/table.webp",popularity:75},
  {id:34,name:"Curtains",price:1500,category:"home",image:"images/curtains.webp",discount:5,popularity:60},
  {id:35,name:"Cushion",price:800,category:"home",image:"images/cushions.jpeg",popularity:55}
];

// ----- Rest of JS logic -----
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const productGrid = document.getElementById("product-grid");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartPanel = document.getElementById("cart-panel");
const cartOverlay = document.getElementById("cart-overlay");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const minPriceInput = document.getElementById("min-price");
const maxPriceInput = document.getElementById("max-price");
const sortBySelect = document.getElementById("sort-by");

// ----- Render Products -----
function renderProducts(filtered = products){
  productGrid.innerHTML = "";
  const minPrice = parseFloat(minPriceInput.value) || 0;
  const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
  const filterCategory = categoryFilter.value;

  const finalProducts = filtered.filter(product=>{
    let categoryMatch = filterCategory==="all" || product.category===filterCategory;
    let priceMatch = product.price>=minPrice && product.price<=maxPrice;
    return categoryMatch && priceMatch;
  });

  finalProducts.forEach(product=>{
    const div = document.createElement("div");
    div.classList.add("product-card");
    div.innerHTML=`
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}">
        ${product.discount ? `<span class="discount-badge">${product.discount}% OFF</span>` : ""}
      </div>
      <h3>${product.name}</h3>
      <p>₹${product.price.toLocaleString()}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productGrid.appendChild(div);
  });
}
renderProducts();

// ----- Cart Functions -----
function updateCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
  const count = cart.reduce((sum,item)=>sum+(item.quantity||0),0);
  cartCount.textContent = count;
  cartCount.classList.add("cart-bounce");
  cartCount.addEventListener("animationend",()=>cartCount.classList.remove("cart-bounce"),{once:true});
}

function renderCart(){
  cartItems.innerHTML="";
  if(cart.length===0){ cartItems.innerHTML="<p>Your cart is empty.</p>"; cartTotal.textContent="0.00"; return;}
  
  const summaryDiv=document.createElement("div");
  summaryDiv.classList.add("cart-summary");
  const categoryCounts={};
  cart.forEach(item=>{ categoryCounts[item.category]=(categoryCounts[item.category]||0)+item.quantity; });
  let summaryHTML="<strong>Cart Summary:</strong><br>";
  for(const [cat,qty] of Object.entries(categoryCounts)){ summaryHTML+=`${cat.charAt(0).toUpperCase()+cat.slice(1)}: ${qty} item(s)<br>`;}
  summaryDiv.innerHTML=summaryHTML;
  cartItems.appendChild(summaryDiv);

  cart.forEach(item=>{
    const div=document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML=`
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <span class="cart-item-name">${item.name}</span>
      <div>
        <button onclick="changeQuantity(${item.id},-1)">-</button>
        <span> ${item.quantity} </span>
        <button onclick="changeQuantity(${item.id},1)">+</button>
      </div>
      <span>₹${(item.price*item.quantity).toLocaleString()}</span>
    `;
    cartItems.appendChild(div);
  });

  const total = cart.reduce((sum,item)=>sum+(item.price*item.quantity||0),0);
  cartTotal.textContent=(total*1.10).toLocaleString();
}

// ----- Add To Cart -----
function showToast(msg){ const t=document.getElementById("toast"); t.textContent=msg; t.classList.add("show"); setTimeout(()=>t.classList.remove("show"),2000);}
function addToCart(id){
  const product=products.find(p=>p.id===id);

  // Fly Image
  const productCard=document.querySelector(`.product-card button[onclick="addToCart(${id})"]`).parentElement;
  const img=productCard.querySelector("img");
  const flyImg=img.cloneNode(true);
  flyImg.classList.add("fly-image");
  const rect=img.getBoundingClientRect();
  flyImg.style.left=rect.left+"px"; flyImg.style.top=rect.top+"px";
  const cartIcon=document.querySelector(".cart"); const cartRect=cartIcon.getBoundingClientRect();
  flyImg.style.setProperty("--tx",(cartRect.left-rect.left)+"px");
  flyImg.style.setProperty("--ty",(cartRect.top-rect.top)+"px");
  document.body.appendChild(flyImg);
  flyImg.addEventListener("animationend",()=>flyImg.remove());

  // Add to Cart Logic
  const existing=cart.find(i=>i.id===id);
  if(existing){existing.quantity+=1;}else{cart.push({...product,quantity:1});}
  updateCart(); renderCart(); showToast(`${product.name} added to cart!`);
}

// ----- Quantity Controls -----
function changeQuantity(id,delta){
  const item=cart.find(i=>i.id===id); if(!item) return; item.quantity+=delta;
  if(item.quantity<=0){ cart=cart.filter(i=>i.id!==id); updateCart(); renderCart(); return; }
  updateCart(); renderCart();
}

// ----- Clear Cart -----
document.getElementById("clear-cart").addEventListener("click",()=>{
  if(cart.length===0) return;
  if(confirm("Remove all items from the cart?")){ cart=[]; updateCart(); renderCart(); }
});

// ----- Checkout -----
document.getElementById("checkout-cart").addEventListener("click",()=>{
  if(cart.length===0){ alert("Your cart is empty!"); return;}
  const total=cart.reduce((sum,item)=>sum+(item.price*item.quantity||0),0)*1.10;
  alert(`Thank you for your purchase! Total (incl. tax): ₹${total.toLocaleString()}`);
  cart=[]; updateCart(); renderCart(); cartPanel.classList.remove("open"); cartOverlay.classList.remove("active");
});

// ----- Cart Panel Toggle -----
document.getElementById("view-cart").addEventListener("click",()=>{ cartPanel.classList.add("open"); cartOverlay.classList.add("active"); });
document.getElementById("close-cart").addEventListener("click",()=>{ cartPanel.classList.remove("open"); cartOverlay.classList.remove("active"); });
cartOverlay.addEventListener("click",()=>{ cartPanel.classList.remove("open"); cartOverlay.classList.remove("active"); });

// ----- Search Filter -----
searchInput.addEventListener("input",()=>{
  const q=searchInput.value.toLowerCase();
  renderProducts(products.filter(p=>p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q)));
});

// ----- Apply Filters -----
document.getElementById("apply-filters").addEventListener("click",()=>{ renderProducts(); });

// ----- Sorting -----
sortBySelect.addEventListener("change",()=>{
  let sorted=[...products]; const val=sortBySelect.value;
  if(val==="price-asc"){ sorted.sort((a,b)=>a.price-b.price);}
  else if(val==="price-desc"){sorted.sort((a,b)=>b.price-a.price);}
  else if(val==="popularity"){ sorted.sort((a,b)=>b.popularity-a.popularity);}
  renderProducts(sorted);
});

// ===== Image Modal =====
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const closeModal = document.getElementById("close-modal");

productGrid.addEventListener("click",(e)=>{
  if(e.target.tagName==="IMG" && e.target.closest(".product-card")){
    modal.style.display="flex";
    modalImg.src = e.target.src;
  }
});
closeModal.onclick=()=>{ modal.style.display="none"; };
modal.onclick=(e)=>{ if(e.target===modal) modal.style.display="none"; };
