// The selector for the search field
const inputSearch = document.getElementById("search_field");

// The template inserted with innerHTML
const getHTMLForProductDIV = (product) => {
	return `<div class="card">
                <img class="size" src=${product.image}>
				<h2>${product.title}</h2>
				<p>${product.description}</p>
                <h2>Price</h2>
				<p class="price">${product.price}</p>
                <h2>Category</h2>
				<p class="category">${product.category}</p>
			</div>
            `;
};

// The function we use o insert elements from the API
const createListOfProducts = (products, location) => {
	const list = document.querySelector(location);
	// There is only one locaiton, wich is ".container_products". I inteded the project to be longer and inset stuff in multiple places, but it is what it is.
	let listOfProductsHTML = "";
	products.forEach((product) => {
		let productLi = getHTMLForProductDIV(product);
		listOfProductsHTML = listOfProductsHTML + productLi;
	});
	list.innerHTML = listOfProductsHTML;
};

// Getting ellements from the API and calling the above function
fetch("https://fakestoreapi.com/products", { method: "GET" })
	.then((res) => res.json())
	.then((products) => {
		createListOfProducts(products, ".container_products");
	});

// The search function that also pulls data from API
const search = () => {
	fetch("https://fakestoreapi.com/products", { method: "GET" })
		.then((res) => res.json())
		.then((products) => {
			if (products.length > 0) {
				const inputValue = document.getElementById("search_field").value;
				const filteredProduct = products.filter((product) => {
					const textProduct = product.title.toLowerCase();
					const textInput = inputValue.toLowerCase();
					return textProduct.includes(textInput);
				});
				createListOfProducts(filteredProduct, ".container_products");
			}
		});
};

// The event we use to call the search function
inputSearch.addEventListener("keydown", () => {
	search();
});
