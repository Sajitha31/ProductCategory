document.addEventListener('DOMContentLoaded', () => {
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the API response to see its structure
            const categories = data.categories;
            if (categories) {
                categories.forEach(category => {
                    const categoryContainer = document.getElementById(category.category_name.toLowerCase());
                    if (categoryContainer) {
                        category.category_products.forEach(product => {
                            const productCard = createProductCard(product);
                            categoryContainer.appendChild(productCard);
                        });
                    }
                });
            } else {
                console.error('No categories found in the API response');
            }
        })
        .catch(error => {
            console.error('Error fetching the product data:', error);
        });
});

function createProductCard(product) {
    const discount = ((product.compare_at_price - product.price) / product.compare_at_price * 100).toFixed(0);
    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        ${product.badge_text ? `<div class="badge">${product.badge_text}</div>`: ''}
        <ul><li class="title"><a href="${product.title}" class="link">${product.title}</a></li><li class="vendor">${product.vendor}</li></ul>
        <div class="details">
            <span class="price">Rs ${product.price}.00</span>
            <span class="compare-at-price">${product.compare_at_price}.00</span>
            <span class="discount">${discount}% Off</span>
            <button class="add-to-cart">Add to Cart</button>
        </div>
    `;

    return productCard;
}

function showCategory(category) {
    document.querySelectorAll('.product-container').forEach(container => {
        container.style.display = 'none';
    });
    document.getElementById(category).style.display = 'flex';

    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('special');
    });
    document.querySelector(`.tab-button[onclick="showCategory('${category}')"]`).classList.add('special');
}
