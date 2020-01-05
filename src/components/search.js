import React from "react"
import { navigate } from "gatsby"
import ReactSearchBox from "react-search-box"

import "./search.css"

export default ({ data }) => (
    <div className='search'>
        <ReactSearchBox
            placeholder="Search for a recipe"
            data={data}
            onSelect={record => navigate(record.url)}
            fuseConfigs={{
                keys: ["rating", "title"]
            }}
        />
    </div>
)