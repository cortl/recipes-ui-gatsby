exports.createPages = async function ({actions, graphql}) {
	const {data} = await graphql(`
		{
			allLibJson {
				nodes {
					instructions
					ingredients {
						category
						items
					}
					time {
						label
						units
					}
					servings
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

	const recipes = data.allLibJson.nodes
		.filter(node => Boolean(node.slug))
		.filter(node => node.ingredients.length);

	recipes.forEach(node => {
		actions.createPage({
			path: `recipes/${node.slug}`,
			component: require.resolve(`./src/templates/recipe.js`),
			context: {...node},
		});
	});
};
