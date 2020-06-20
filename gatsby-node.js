exports.createPages = async function ({actions, graphql}) {
  const {data} = await graphql(`
		{
			allRecipesJson {
				nodes {
					instructions
					ingredients {
						category
						items
					}
					slug
					notes
					title
					source
					rating
					createdDate
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
			context: { ...node },
		});
	});
};
