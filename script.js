(function () {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" && document.body) {
        document.body.classList.add("dark-mode");
    }
})();

document.addEventListener("DOMContentLoaded", function () {

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }

    const themeToggle = document.getElementById("themeToggle");

    function updateIcon() {
        if (!themeToggle) return;
        const icon = themeToggle.querySelector("i");
        const isDark = document.body.classList.contains("dark-mode");
        icon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }

    updateIcon();

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
            localStorage.setItem(
                "theme",
                document.body.classList.contains("dark-mode") ? "dark" : "light"
            );
            updateIcon();
        });
    }

});

// ================= PRODUCTS =================

const products = [
    {
        id: 1,
        name: "Apple iPhone 14",
        vendor: "Apple Store",
        price: 999,
        image: "apple-iphone-15-pro-pakistan-priceoye-x8agp-500x500.webp",
        category: "Electronics"
    },

    {
        id: 2,
        name: "Nike Running Shoes",
        vendor: "Nike Official",
        price: 120,
        image: "nike.jpg",
        category: "Fashion"
    },

    {
        id: 3,
        name: "Fitness Dumbbells",
        vendor: "SportsPro",
        price: 75,
        image: "img.jpg",
        category: "Sports"
    },

    {
        id: 4,
        name: "Beauty Kit",
        vendor: "Beauty World",
        price: 60,
        image: "6.png",
        category: "Beauty"
    }
];


const vendors = {

    apple: {
        id: "apple",
        name: "Apple Store",
        rating: "4.9",
        productsCount: "150+",
        tagline: "Premium Electronics",
        description: "Apple Store is one of our trusted vendors providing premium electronics, accessories, and gadgets with fast delivery and excellent customer support.",
        products: [
            { id: 101, name: "iPhone 14", price: 999, image: "apple-iphone-15-pro-pakistan-priceoye-x8agp-500x500.webp" },
            { id: 102, name: "Apple Watch Series 9", price: 499, image: "images.jpg" },
            { id: 103, name: "AirPods Pro", price: 199, image: "Apple-Airpods-Pro-3.webp" },
            { id: 104, name: "MacBook Air", price: 1099, image: "mac.jpg" }
        ]
    },

    nike: {
        id: "nike",
        name: "Nike Official",
        rating: "4.8",
        productsCount: "120+",
        tagline: "Sports & Fashion",
        description: "Nike Official brings you premium sportswear, footwear and training gear designed for performance, comfort and everyday style.",
        products: [
            { id: 201, name: "Nike Running Shoes", price: 120, image: "nike.jpg" },
            { id: 202, name: "Nike Air Jordan Shoes", price: 150, image: "air.jpg" },
            { id: 203, name: "Nike Fitness Dumbbells", price: 75, image: "dumb.jpg" }
        ]
    },

    beauty: {
        id: "beauty",
        name: "Beauty World",
        rating: "4.7",
        productsCount: "200+",
        tagline: "Cosmetics & Skin Care",
        description: "Beauty World offers a wide range of cosmetics, skincare and personal care products from trusted beauty brands, picked for quality and everyday glow.",
        products: [
            { id: 301, name: "Beauty Kit", price: 60, image: "6.png" },
            { id: 302, name: "Personal Care Set", price: 45, image: "Importance_of_Personal_Care_Products_480x480.webp" },
            { id: 303, name: "Skincare Essentials", price: 55, image: "skin.jpg" }

        ]
    }

};

function goToVendor(vendorId) {
    localStorage.setItem("selectedVendor", vendorId);
    window.location.href = "vendor.html";
}

// ================= CART =================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(index) {

    const product = products[index];

    // If the item is already in the cart, increase its quantity
    // instead of adding a duplicate row.
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.qty = (existing.qty || 1) + 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    saveCart();

    alert(product.name + " added to Cart.");

}

// ================= WISHLIST =================

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function addWishlist(index) {

    const product = products[index];

    const alreadyExists = wishlist.some(item => item.id === product.id);

    if (alreadyExists) {
        alert(product.name + " is already in your Wishlist.");
        return;
    }

    wishlist.push(product);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    alert(product.name + " added to Wishlist.");

}

// ================= DETAILS =================

function viewDetails(index) {

    localStorage.setItem("selectedProduct", JSON.stringify(products[index]));

    window.location.href = "product-details.html";

}

// ================= SEARCH =================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        const cards = document.querySelectorAll(".product-card");

        cards.forEach(card => {

            const title = card.querySelector("h2").innerText.toLowerCase();

            if (title.includes(value))
                card.style.display = "block";
            else
                card.style.display = "none";

        });

    });

}

// ================= CONTACT FORM =================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        alert("Thank you! Your message has been sent. We'll get back to you soon.");

        contactForm.reset();

    });

}
