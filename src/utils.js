import React from "react"
import Card from "./components/card"

export const search = (recipes, keyword) =>
    recipes
        .map(recipe => ({ ...recipe, searchable: recipe.title.toUpperCase().split(" ") }))
        .filter(recipe => recipe.searchable.includes(keyword.toUpperCase()))
        .map((recipe, i) => (
            <Card key={`${i}${recipe.title}`}
                title={recipe.title}
                link={`/recipes/${recipe.slug}`}>
                <span>{`${recipe.rating}/10`}</span>
            </Card>)
        );
