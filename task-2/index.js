let isLoading = false;
let allProducts = [];
let currentPage = 1;
let productsPerPage = 5;

const loader = document.getElementById("loader");
const productList = document.getElementById("Projects");
const paginationContainer = document.getElementById("pagination-container");
const pageSizeContainer = document.getElementById("page-size-container");
const searchForm = document.querySelector("#search-form");
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");
const search = urlParams.get("search");

document.addEventListener("DOMContentLoaded", () => {
  if (category) {
    renderProductsByPage(1, category);
  } else if (search) {
    performSearch(search);
  } else {
    renderProductsByPage(1);
  }
  renderCategories();
  checkUserAndRedirect();
});

const checkUserAndRedirect = () => {
  const userData = JSON.parse(localStorage.getItem("user"));

  if (!userData || Object.keys(userData).length === 0) {
    window.location.href = "index.html";
  }
};

const renderProducts = () => {
  productList.innerHTML = "";
  let filteredData = allProducts;
  if (category) {
    filteredData = allProducts.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
  }
  const user = JSON.parse(localStorage.getItem("user"));
  const isAgeValid = user.age >= 30;
  filteredData.forEach((product) => {
    const listItem = document.createElement("div");
    listItem.id = `product-${product.id}`;
    listItem.className =
      "w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl";
    listItem.dataset.productId = product.id;
    listItem.innerHTML = `
    <div>
      <img
        src="${product.thumbnail}"
        alt="Product"
        class="h-80 w-72 object-cover rounded-t-xl"
      />
      <div class="px-4 py-3 bg-gray-800 w-72">
        <span class="text-white mr-3 uppercase text-xs"> ${product.brand}</span>
        <p class="text-lg font-bold text-white truncate block capitalize">
          ${product.title}
        </p>
        <div class="flex items-center">
          <p class="text-lg font-semibold text-white cursor-auto my-3">
            $ ${product.price}
          </p>
          <del>
            <p class="text-sm text-gray-600 cursor-auto ml-2">$199</p>
          </del>
          <div class="ml-auto flex gap-2">
          <span class="cursor-pointer hover:opacity-50 z-50" onclick="openProductModal(${
            product.id
          })">
          <svg fill="white" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 width="20px" height="20px" viewBox="0 0 442.04 442.04"
	 xml:space="preserve">
<g>
	<g>
		<path d="M221.02,341.304c-49.708,0-103.206-19.44-154.71-56.22C27.808,257.59,4.044,230.351,3.051,229.203
			c-4.068-4.697-4.068-11.669,0-16.367c0.993-1.146,24.756-28.387,63.259-55.881c51.505-36.777,105.003-56.219,154.71-56.219
			c49.708,0,103.207,19.441,154.71,56.219c38.502,27.494,62.266,54.734,63.259,55.881c4.068,4.697,4.068,11.669,0,16.367
			c-0.993,1.146-24.756,28.387-63.259,55.881C324.227,321.863,270.729,341.304,221.02,341.304z M29.638,221.021
			c9.61,9.799,27.747,27.03,51.694,44.071c32.83,23.361,83.714,51.212,139.688,51.212s106.859-27.851,139.688-51.212
			c23.944-17.038,42.082-34.271,51.694-44.071c-9.609-9.799-27.747-27.03-51.694-44.071
			c-32.829-23.362-83.714-51.212-139.688-51.212s-106.858,27.85-139.688,51.212C57.388,193.988,39.25,211.219,29.638,221.021z"/>
	</g>
	<g>
		<path d="M221.02,298.521c-42.734,0-77.5-34.767-77.5-77.5c0-42.733,34.766-77.5,77.5-77.5c18.794,0,36.924,6.814,51.048,19.188
			c5.193,4.549,5.715,12.446,1.166,17.639c-4.549,5.193-12.447,5.714-17.639,1.166c-9.564-8.379-21.844-12.993-34.576-12.993
			c-28.949,0-52.5,23.552-52.5,52.5s23.551,52.5,52.5,52.5c28.95,0,52.5-23.552,52.5-52.5c0-6.903,5.597-12.5,12.5-12.5
			s12.5,5.597,12.5,12.5C298.521,263.754,263.754,298.521,221.02,298.521z"/>
	</g>
	<g>
		<path d="M221.02,246.021c-13.785,0-25-11.215-25-25s11.215-25,25-25c13.786,0,25,11.215,25,25S234.806,246.021,221.02,246.021z"/>
	</g>
</g>
</svg>
</span>
${
  isAgeValid
    ? `
          <span class="cursor-pointer hover:opacity-50 z-50" onclick="openEditProductModal(${product.id})">
          <svg xmlns="http://www.w3.org/2000/s
          vg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
          <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(8.53333,8.53333)"><path d="M22.82813,3c-0.51175,0 -1.02356,0.19544 -1.41406,0.58594l-2.41406,2.41406l5,5l2.41406,-2.41406c0.781,-0.781 0.781,-2.04713 0,-2.82812l-2.17187,-2.17187c-0.3905,-0.3905 -0.90231,-0.58594 -1.41406,-0.58594zM17,8l-11.74023,11.74023c0,0 0.91777,-0.08223 1.25977,0.25977c0.342,0.342 0.06047,2.58 0.48047,3c0.42,0.42 2.64389,0.12436 2.96289,0.44336c0.319,0.319 0.29688,1.29688 0.29688,1.29688l11.74023,-11.74023zM4,23l-0.94336,2.67188c-0.03709,0.10544 -0.05623,0.21635 -0.05664,0.32813c0,0.55228 0.44772,1 1,1c0.11177,-0.00041 0.22268,-0.01956 0.32813,-0.05664c0.00326,-0.00128 0.00652,-0.00259 0.00977,-0.00391l0.02539,-0.00781c0.00196,-0.0013 0.00391,-0.0026 0.00586,-0.00391l2.63086,-0.92773l-1.5,-1.5z"></path></g></g>
          </svg>
          </span>
            <span class="cursor-pointer hover:opacity-50" onclick="deleteProduct(${product.id})">
              <svg xmlns="http://www.w3.org/2000/svg" fill="white" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                <path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"></path>
              </svg>
            </span>
            `
    : ""
}
          </div>
        </div>
      </div>
    </div>
    `;
    productList.appendChild(listItem);
  });
};

const deleteProduct = (productId) => {
  fetch(`https://dummyjson.com/products/${productId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      removeProductFromUI(productId);
    })
    .catch((error) => {
      console.error("Error deleting product:", error);
    });
};

const removeProductFromUI = (productId) => {
  const productElement = document.getElementById(`product-${productId}`);
  if (productElement) {
    productElement.remove();
  }
};

const renderProductsByPage = (page, selectedCategory = null) => {
  isLoading = true;
  loader.style.display = "block";
  let apiUrl = null;
  if (category) {
    apiUrl = `https://dummyjson.com/products/category/${category}?limit=${productsPerPage}&skip=${
      (page - 1) * productsPerPage
    }`;
  } else {
    apiUrl = `https://dummyjson.com/products?limit=${productsPerPage}&skip=${
      (page - 1) * productsPerPage
    }`;
  }

  if (selectedCategory) {
    apiUrl += `&category=${selectedCategory}`;
  }

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      allProducts = data.products;
      currentPage = page;
      renderProducts();
      renderPagination(data.total);
      renderPageSizeOptions();
      isLoading = false;
      loader.style.display = "none";
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      isLoading = false;
      loader.style.display = "none";
    });
};

const renderPagination = (totalProducts) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  paginationContainer.innerHTML = "";

  const paginationDiv = document.createElement("div");
  paginationDiv.className = "flex flex-wrap justify-center items-center";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.innerText = i;
    button.className =
      "px-3 py-1 m-1 border rounded-full hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-300 bg-gray-200";
    button.addEventListener("click", () => renderProductsByPage(i, category));
    paginationDiv.appendChild(button);
  }

  paginationContainer.appendChild(paginationDiv);
};
const renderPageSizeOptions = () => {
  const sizes = [5, 10, 20];
  pageSizeContainer.innerHTML = "Show: ";

  sizes.forEach((size) => {
    const button = document.createElement("button");
    button.innerText = size;
    button.className =
      "px-3 py-1 mx-1 border rounded-full hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-300";
    button.addEventListener("click", () => changeProductsPerPage(size));
    pageSizeContainer.appendChild(button);
  });
};

const changeProductsPerPage = (value) => {
  productsPerPage = value;
  currentPage = 1;
  renderProductsByPage(1, category);
};

const performSearch = (searchTerm) => {
  fetch(
    `https://dummyjson.com/products/search?q=${encodeURIComponent(searchTerm)}`
  )
    .then((response) => response.json())
    .then((data) => {
      allProducts = data.products;
      currentPage = 1;
      renderProducts();
      renderPagination(data.totalProducts);
      renderPageSizeOptions();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchInput = document.querySelector("#default-search");
  const searchTerm = searchInput.value.trim();

  let newUrl = window.location.origin + window.location.pathname;

  if (category) {
    newUrl += `?category=${category}`;
  }

  if (searchTerm) {
    newUrl += `?search=${encodeURIComponent(searchTerm)}`;
  }

  window.location.href = newUrl;
});

const renderCategories = () => {
  fetch("https://dummyjson.com/products")
    .then((response) => response.json())
    .then((data) => {
      let categories = data.products.map((item) => item.category);
      categories = [...new Set(categories)];
      renderCategoryOptions(categories);
    })
    .catch((error) => {
      console.error("Error fetching brands:", error);
    });
};

let isDropdownVisible = false;

const renderCategoryOptions = (categories) => {
  const categoryMenu = document.getElementById("category-filter");
  categoryMenu.innerHTML = "";

  const showAllItem = document.createElement("li");
  showAllItem.className = "cursor-pointer";
  showAllItem.innerHTML += `<li class="flex items-center">  
    <div
      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100 capitalize cursor-pointer"
      onclick="showAllProducts()"
    >
      Show all
    </div>
  </li>`;
  showAllItem.addEventListener("click", () => {
    window.location.href = "/task-2/products.html";
    hideDropdown();
  });
  categoryMenu.appendChild(showAllItem);

  categories.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.className = "cursor-pointer";
    listItem.innerHTML += `<li class="flex items-center">  
    <div
      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100 capitalize cursor-pointer"
      data-category="${item}"
      onclick="filterByCategory(this)"
    >
      ${item.split("-").join(" and ")}
    </div>
  </li>`;
    listItem.addEventListener("click", (event) => {
      const selectedCategory = encodeURIComponent(item);
      window.location.href = `?category=${selectedCategory}`;

      hideDropdown();
    });
    categoryMenu.appendChild(listItem);
  });
};

const showAllProducts = () => {
  window.location.href = "/";
};

const hideDropdown = () => {
  isDropdownVisible = false;
  const dropdown = document.getElementById("dropdown");
  dropdown.classList.add("hidden");
};

const showDropdown = () => {
  isDropdownVisible = true;
  const dropdown = document.getElementById("dropdown");
  dropdown.classList.remove("hidden");
};

document.addEventListener("click", (event) => {
  const dropdownButton = document.getElementById("dropdownDefault");

  if (event.target === dropdownButton) {
    event.stopPropagation();
    toggleDropdown();
    return;
  }

  if (isDropdownVisible && !dropdownButton.contains(event.target)) {
    hideDropdown();
  }
});

const toggleDropdown = () => {
  if (isDropdownVisible) {
    hideDropdown();
  } else {
    showDropdown();
  }
};

const openProductModal = (productId) => {
  const product = allProducts.find((item) => item.id === productId);

  document.getElementById("modalProductImage").src = product.thumbnail;
  document.getElementById("modalProductBrand").textContent = product.brand;
  document.getElementById("modalProductTitle").textContent = product.title;
  document.getElementById(
    "modalProductPrice"
  ).textContent = `$ ${product.price}`;
  document.body.style.overflow = "hidden";
  document.getElementById("productModal").classList.remove("hidden");
};

const closeProductModal = () => {
  document.body.style.overflow = "auto";
  document.getElementById("productModal").classList.add("hidden");
};

const openEditProductModal = (product) => {
  const selectedProduct = allProducts.find((item) => item.id === product);
  if (selectedProduct) {
    document.getElementById("editProductName").value = selectedProduct.title;
    document
      .getElementById("editProductName")
      .setAttribute("data-id", selectedProduct.id);
    document.getElementById("editProductBrand").value = selectedProduct.brand;
    document.getElementById("editProductPrice").value = selectedProduct.price;

    document.getElementById("editProductModal").classList.remove("hidden");
  }
};

const closeEditProductModal = () => {
  document.getElementById("editProductModal").classList.add("hidden");
};

const updateProductInUI = (updatedProduct) => {
  const productElement = document.getElementById(
    `product-${updatedProduct.id}`
  );
  if (productElement) {
    productElement.querySelector("img").src = updatedProduct.thumbnail;
    productElement.querySelector(".text-white").textContent =
      updatedProduct.brand;
    productElement.querySelector(
      ".text-lg.font-bold.text-white.truncate"
    ).textContent = updatedProduct.title;
    productElement.querySelector(
      ".text-lg.font-semibold.text-white.cursor-auto.my-3"
    ).textContent = `$ ${updatedProduct.price}`;
  }
};

const updateProductOnUI = (productId, updatedProduct) => {
  updateProductInUI(updatedProduct);
  closeEditProductModal();
};

document.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;

  const productId = document
    .getElementById("editProductName")
    .getAttribute("data-id");
  const productName = form.querySelector("#editProductName").value;
  const productBrand = form.querySelector("#editProductBrand").value;
  const productPrice = form.querySelector("#editProductPrice").value;

  fetch(`https://dummyjson.com/products/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: productName,
      brand: productBrand,
      price: productPrice,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((updatedProduct) => {
      const index = allProducts.findIndex((item) => item.id === productId);
      if (index !== -1) {
        allProducts[index] = updatedProduct;
      }

      renderProducts();

      closeEditProductModal();
      updateProductOnUI(productId, updatedProduct);
    })
    .catch((error) => {
      console.error("Error updating product:", error);
    });
});

const findListItemForForm = (form) => {
  let currentElement = form;
  while (currentElement) {
    if (currentElement.classList.contains("w-72")) {
      return currentElement;
    }
    currentElement = currentElement.parentElement;
  }

  return null;
};
