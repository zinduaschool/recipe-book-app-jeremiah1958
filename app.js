// app.js

// Mock data (5 recipes)
const recipes = [
    {
        id: 1,
        title: "Pasta Carbonara",
        image: "images/carbonara.jpeg",
        ingredients: ["Spaghetti", "Eggs", "Parmesan", "Bacon", "Garlic"],
        instructions: "Cook pasta. Fry bacon. Mix eggs and cheese. Combine all ingredients."
    },
    {
        id: 2,
        title: "Greek Salad",
        image: "images/greek salad.jpg",
        ingredients: ["Lettuce", "Tomato", "Cucumber", "Olives", "Feta Cheese"],
        instructions: "Chop vegetables. Mix together. Add olive oil and vinegar."
    },
    {
        id: 3,
        title: "Chicken Stir-Fry",
        image: "images/chicken stirfry.jfif",
        ingredients: ["Chicken Breast", "Bell Peppers", "Broccoli", "Soy Sauce", "Garlic"],
        instructions: "Cut chicken and vegetables. Stir-fry in a hot pan with soy sauce and garlic."
    },
    {
        id: 4,
        title: "Chocolate Cake",
        image: "images/chocolate cake.jfif",
        ingredients: ["Flour", "Sugar", "Cocoa Powder", "Butter", "Eggs", "Milk"],
        instructions: "Mix dry ingredients. Add wet ingredients. Bake in preheated oven."
    },
    {
        id: 5,
        title: "Caprese Salad",
        image: "images/caprese salad.jfif",
        ingredients: ["Tomatoes", "Fresh Mozzarella", "Basil", "Olive Oil", "Balsamic Vinegar"],
        instructions: "Slice tomatoes and mozzarella. Layer with basil leaves. Drizzle with olive oil and balsamic vinegar."
    }
];

// Function to display popular recipes on the home page
function displayPopularRecipes() {
    const popularRecipesContainer = document.getElementById("popularRecipes");
    if (popularRecipesContainer) {
        popularRecipesContainer.innerHTML = '';
        recipes.forEach(recipe => {
            const recipeCard = createRecipeCard(recipe);
            popularRecipesContainer.appendChild(recipeCard);
        });
    }
}

// Function to create a recipe card
function createRecipeCard(recipe) {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");
    recipeCard.innerHTML = `
        <img src="${recipe.image || 'images/no-image.png'}" alt="${recipe.title}">
        <h3>${recipe.title}</h3>
        <button onclick="viewRecipe(${recipe.id})">View Recipe</button>
    `;
    return recipeCard;
}

// Function to view recipe details
function viewRecipe(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (recipe) {
        localStorage.setItem('currentRecipe', JSON.stringify(recipe));
        window.location.href = 'recipe.html';
    }
}

// Function to display recipe details on Recipe Page
function displayRecipeDetails() {
    const recipe = JSON.parse(localStorage.getItem('currentRecipe'));
    if (recipe) {
        document.getElementById("recipeTitle").textContent = recipe.title;
        document.getElementById("recipeImage").src = recipe.image || 'images/no-image.png';
        document.getElementById("recipeIngredients").innerHTML = recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');
        document.getElementById("recipeInstructions").textContent = recipe.instructions;
    }
}

// Function to save recipe to localStorage
function saveRecipe() {
    const recipe = JSON.parse(localStorage.getItem('currentRecipe'));
    if (recipe) {
        const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
        if (savedRecipes.some(savedRecipe => savedRecipe.id === recipe.id)) {
            alert("Recipe is already saved!");
        } else {
            savedRecipes.push(recipe);
            localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
            alert("Recipe saved to your Personal Recipe Book!");
        }
    }
}

// Function to display saved recipes in Personal Recipe Book
function displaySavedRecipes() {
    const savedRecipesContainer = document.getElementById("savedRecipes");
    if (savedRecipesContainer) {
        savedRecipesContainer.innerHTML = '';
        const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
        savedRecipes.forEach(recipe => {
            const recipeCard = createRecipeCard(recipe);
            savedRecipesContainer.appendChild(recipeCard);
        });
        if (savedRecipes.length === 0) {
            savedRecipesContainer.innerHTML = '<p>No recipes saved yet.</p>';
        }
    }
}

// Function to search recipes
function searchRecipes() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe => recipe.title.toLowerCase().includes(searchInput));
    const popularRecipesContainer = document.getElementById("popularRecipes");
    if (popularRecipesContainer) {
        popularRecipesContainer.innerHTML = '';
        filteredRecipes.forEach(recipe => {
            const recipeCard = createRecipeCard(recipe);
            popularRecipesContainer.appendChild(recipeCard);
        });
    }
}

// Initialize application
window.onload = () => {
    displayPopularRecipes();
    displayRecipeDetails();
    displaySavedRecipes();
};
``
