import React from 'react'
// import '../styles/Recipe.css';

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '4d3ee4a8bbd450583932d553443686b8',
// 		'X-RapidAPI-Host': 'api.edamam.com'
// 	}
// };
//var needs to split input on space and reconcat with %20 where spaces were
var userInput = "banana"

fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=Ben%20and%20Jerry's%20Phish%20Food&app_id=f8d2a9ae&app_key=4d3ee4a8bbd450583932d553443686b8`)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

function Recipe() {
    return (
        <div>
            <h1>Cooking Inspiration</h1>
            <input 
                
                className="form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                // value={} 
                // onChange={e => (e.target.value)} 
                placeholder="Ingredient" />
        </div>
    )
}

export default Recipe;