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
	setTimeout(function () {
		alert("Order submitted! Total: ¥" + totalValue.toFixed(2));
	}, 100);
}

var foodData = [
	{
		name: "Bocchi",
		"food-images": "assets/images/bocchi1.jpg",
		"food-title": "Bocchi Omurice Set",
		"food-desc":
			"Bocchi's entrée includes an omelet rice dish covered with a special pink sauce. The pink sauce is actually a white sauce mixed with ketchup and pink coloring. Meanwhile, her drink is a chocolate strawberry drink.",
		price: 1000,
	},
	{
		name: "Nijika",
		"food-images": ["assets/images/bocchi1.jpg", "assets/images/bocchi2.jpg"],
		"food-title": "Bocchi Omurice Set",
		"food-desc":
			"Bocchi's entrée includes an omelet rice dish covered with a special pink sauce. The pink sauce is actually a white sauce mixed with ketchup and pink coloring. Meanwhile, her drink is a chocolate strawberry drink.",
		price: 2000,
	},
	// Add more food items as needed
];

// Function to update the content of each food item based on JSON data
function updateFoodItems() {
	var foodContainer = document.getElementsByClassName("food-container");

	foodData.forEach(function (foodItem, index) {
		var foodElement = foodContainer.children[index];

		// Update the content of the food item
		foodElement.querySelector(".name").textContent = foodItem.name;
		// Update images (if there are multiple images)
		if (Array.isArray(foodItem["food-images"])) {
			var imageElements = foodElement.querySelectorAll(".food-images img");
			foodItem["food-images"].forEach(function (imageSrc, imgIndex) {
				imageElements[imgIndex].src = imageSrc;
			});
		} else {
			// Update the single image
			foodElement.querySelector(".food-images img").src =
				foodItem["food-images"];
		}
		foodElement.querySelector(".food-title").textContent =
			foodItem["food-title"];
		foodElement.querySelector(".food-desc").textContent = foodItem["food-desc"];
		foodElement.querySelector(".price").textContent = foodItem.price;
	});
}

updateFoodItems();
