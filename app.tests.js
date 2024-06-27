// Example Jest test file: tests/search.test.js

const { searchRecipes } = require('./app.js');

test('searchRecipes function should filter recipes correctly', () => {
    const recipes = [
        { title: 'Pasta', ingredients: ['pasta', 'tomato sauce'] },
        { title: 'Salad', ingredients: ['lettuce', 'tomato', 'cucumber'] }
    ];

    const filteredRecipes = searchRecipes(recipes, 'pasta');

    expect(filteredRecipes).toHaveLength(1);
    expect(filteredRecipes[0].title).toEqual('Pasta');
});
