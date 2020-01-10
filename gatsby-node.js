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
  `)
  data.allRecipesJson.nodes
    .filter(node => Boolean(node.slug))
    .forEach(node => {
      actions.createPage({
        path: `recipes/${node.slug}`,
        component: require.resolve(`./src/templates/recipe.js`),
        context: {...node},
      })
    });
  ['Beef', 'Chicken', 'Turkey', 'Pork', 'Pasta'].map(category => {
    actions.createPage({
      path: category.toLowerCase(),
      component: require.resolve('./src/templates/category.js'),
      context: {search: category, recipes: data.allRecipesJson.nodes}
    })
  })
}
