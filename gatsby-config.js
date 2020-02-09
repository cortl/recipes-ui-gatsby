module.exports = {
	siteMetadata: {
		title: `Recipe Book`,
		description: `Collection of recipes I've made over the years, ranked, notes, and sources (if still around)`,
		author: `@cortlan_b`,
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-sass`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/fetch/images`,
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Recipe Book`,
				short_name: `Recipes`,
				start_url: `/`,
				background_color: `#FF725C`,
				theme_color: `#FF725C`,
				display: `standalone`,
				icon: `src/images/chef.png`,
			},
		},
		`gatsby-plugin-offline`,
		`gatsby-transformer-json`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/fetch/recipes`,
			},
		},
	],
};
