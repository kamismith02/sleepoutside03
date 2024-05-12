import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
    return `<li class="product-card">
          <a href="product_pages/index.html?product=${product.Id}">
          <img
                src="${product.Images.PrimaryMedium}"
                alt="Image of ${product.Name}"
            />
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.Name}</h2>
            <p class="product-card__price">$${product.FinalPrice}</p>
          </a>
        </li>`;
}

export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
        document.querySelector(".title").innerHTML = this.category;
    }

    renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

    // filterTents(list) {
    //    return list.slice(0, 4);
    // }

    //renderList(list) {
    //    renderListWithTemplate(productCardTemplate, this.listElement, list);
    // }
}

const sortSelect = document.getElementById('sort');
const productListElement = document.querySelector('.product-list');

// Function to render the product list
function renderProductList(productList) {
    productListElement.innerHTML = '';
    productList.forEach(product => {
        // Render each product item
        const productItem = document.createElement('li');
        productItem.textContent = `${product.name} - $${product.price}`;
        productListElement.appendChild(productItem);
    });
}

// Function to sort the product list
function sortProductList(sortBy) {
    if (sortBy === 'name') {
        // Sort by name
        productList.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'price') {
        // Sort by price
        productList.sort((a, b) => a.price - b.price);
    }
}

// Event listener for sorting
sortSelect.addEventListener('change', (event) => {
    const sortBy = event.target.value;
    sortProductList(sortBy);
    renderProductList(productList);
});

// Initial rendering
renderProductList(productList);