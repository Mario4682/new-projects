// Scroll to products
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
  }
  
  // Add to cart functionality
  let cart = [];
  
  function addToCart(productName, price) {
    cart.push({ productName, price });
    alert(`${productName} has been added to your cart.`);
  }
  
  // Submit contact form
  document.getElementById('contact-form').addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thank you for reaching out. We will get back to you soon.');
  });
  