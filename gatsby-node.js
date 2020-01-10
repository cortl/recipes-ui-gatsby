exports.createPages = async function ({actions, graphql}) {
  const {data} = await graphql(`
		{
			allRecipesJson {
				nodes {
					ingredients
					instructions
					image
					slug
					notes
					title
					source
					rating
				}
			}
		}
	`);

  const recipes = data.allRecipesJson.nodes
    .filter(node => Boolean(node.slug))
    .filter(node => node.ingredients.length);

  recipes.forEach(node => {
    actions.createPage({
      path: `recipes/${node.slug}`,
      component: require.resolve(`./src/templates/recipe.js`),
      context: {...node},
    });
  });

  ['Beef', 'Chicken', 'Turkey', 'Pork', 'Pasta'].map(category => {
    actions.createPage({
      path: category.toLowerCase(),
      component: require.resolve('./src/templates/category.js'),
      context: {search: category, recipes},
    });
  });
};
