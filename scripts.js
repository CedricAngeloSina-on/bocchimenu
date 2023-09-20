var foodData = [
	{
		name: "Bocchi",
		"food-images": ["assets/images/bocchi1.jpg", "assets/images/bocchi2.jpg"],
		"food-title": "Bocchi's Omurice Set",
		"food-desc":
			"Bocchi's entrée includes an omelet rice dish covered with a special pink sauce. The pink sauce is actually a white sauce mixed with ketchup and pink coloring. Meanwhile, her drink is a chocolate strawberry drink.",
		price: 1000,
	},
	{
		name: "Nijika",
		"food-images": ["assets/images/nijika1.jpg", "assets/images/nijika2.jpg"],
		"food-title": "Nijika's Dessert Set",
		"food-desc":
			"Nijika's dessert dish contains an almond opera cake with red bean monaka, accompanied with yuzu sorbet topped off with whipped cream, orange sauce, orange slices, mint, and mango chunks. Her character-inspired drink is a glass of Kirin Straight Tea mixed with syrup and orange juice.",
		price: 2000,
	},
	{
		name: "Ryou",
		"food-images": ["assets/images/ryou1.jpg", "assets/images/ryou2.jpg"],
		"food-title": "Ryou's Chicken Curry",
		"food-desc":
			"Ryou's dish consists of an entrée of chicken red curry, erved with white rice, lettuce, mini tomatoes, paprika powder, and parsley, with an onion-based dressing. Visitors will be able to purchase a yogurt yakult drink, topped off with blue curacao syrup.",
		price: 3000,
	},
	{
		name: "Kita",
		"food-images": ["assets/images/kita1.jpg", "assets/images/kita2.jpg"],
		"food-title": "Kita-chan's Pancakes",
		"food-desc":
			"Kita's dish features strawberry pancakes, drizzled in strawberry sauce and topped off with mixed berries, whipped cream, and mint. Her drink is a glass of soda water, mixed with blue curacao and strawberry syrup.",
		price: 4000,
	},
	{
		name: "Latte",
		"food-images": ["assets/images/latte.jpg"],
		"food-title": "It's Just a Latte",
		"food-desc": "",
		price: 750,
	},
	{
		name: "Juice",
		"food-images": ["assets/images/juice.jpg"],
		"food-title": "It's Just Juice",
		"food-desc": "",
		price: 4000,
	},
];

function appendFoodItems() {
	var foodContainer = document.querySelector(".food-container");

	foodData.forEach(function (foodItem) {
		// add lower case classname for styles
		var className = foodItem.name.toLowerCase().replace(/\s+/g, "-");

		// loop through all of foodData jsonand generating an independent card
		var foodItemHtml = `
            <div class="food ${className} hidden">
                <h1 class="name">${foodItem.name}</h1>
                <div class="food-images">
                    ${foodItem["food-images"]
											.map(
												(imageSrc) =>
													`<img src="${imageSrc}" alt="${foodItem.name}">`
											)
											.join("")}
                </div>
                <div class="description">
                    <div class="title-and-desc">
                        <p class="food-title">${foodItem["food-title"]}</p>
                        <p class="food-desc">${foodItem["food-desc"]}</p>
                    </div>
                    <div class="price-and-button">
                        <div><span class="currency">¥</span><span class="price">${
													foodItem.price
												}</span></div>
                        <button onclick="openPopup(this)">PLACE ORDER</button>
                    </div>
                </div>
            </div>
        `;

		foodContainer.innerHTML += foodItemHtml;
	});
}

//run to write in html
appendFoodItems();

document.getElementById("order-count").addEventListener("input", updateTotal);

function openPopup(button) {
	//reset inputs
	let orderCountInput = document.getElementById("order-count");
	orderCountInput.value = "";

	//overwrite
	const foodItem = button.closest(".food");
	const foodTitleElement = foodItem.querySelector(".food-title");
	const foodTitle = foodTitleElement ? foodTitleElement.textContent.trim() : "";

	const priceElement = foodItem.querySelector(".price");
	let price = priceElement ? parseInt(priceElement.textContent.trim()) : 0;

	document.getElementById("food-name").textContent = foodTitle;
	document.getElementById("order-price").textContent = price;
	document.getElementById("popup").style.display = "flex";
}

function closePopup() {
	document.getElementById("popup").style.display = "none";
}

function updateTotal() {
	let orderCountInput = document.getElementById("order-count");
	let orderPrice = parseInt(document.getElementById("order-price").textContent);
	let totalElement = document.querySelector(".total");

	let quantity = parseFloat(orderCountInput.value) || 0;
	let total = orderPrice * quantity;

	totalElement.textContent = total.toFixed(2);
}

function submitOrder() {
	let orderCountInput = document.getElementById("order-count");

	if (
		orderCountInput.value.trim() === "" ||
		parseFloat(orderCountInput.value) <= 0
	) {
		alert("Please enter a valid order quantity.");
		return;
	}

	var totalValue = parseFloat(document.querySelector(".total").textContent);

	closePopup();
	alert("Order submitted! Total: ¥" + totalValue.toFixed(2));
}

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		// console.log("intersecting");
		if (entry.isIntersecting) {
			entry.target.classList.add("show");
		}
	});
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));
