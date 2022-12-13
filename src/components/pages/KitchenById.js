import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import Storage from "./Storage";
import Datepicker from "react-tailwindcss-datepicker";
import recipeAPI from "./Recipe";

// console.log(window.location.href)

function KitchenById(props) {
  const [storages, setStorages] = useState([]);
  const [newStorageType, setNewStorageType] = useState("refrigerator");
  const [newRecipeSearch, setnewRecipeSearch] = useState("");
  const [recipeResults, setRecipeResults] = useState([]);
  const [newStorageEdit, setNewStorageEdit] = useState("");

  const currentURL = window.location.href;
  const kitchenId = currentURL.substring(currentURL.lastIndexOf("/") + 1);
  // console.log(kitchenId)

  useEffect(() => {
    API.getStoragesByKitchenId(props.token, kitchenId).then((data) => {
      // console.log(data);
      setStorages(data);
    });
  }, [kitchenId]);

  const handleAddStorageForm = (e) => {
    e.preventDefault();
    console.log(props);
    const newStorage = {
      storageType: newStorageType,
      KitchenId: kitchenId,
    };
    setNewStorageType("");
    console.log(newStorage);
    API.addToStorage(newStorage, props.token).then((data) => {
      API.getStoragesByKitchenId(props.token, kitchenId).then((data) => {
        // console.log(data);
        setStorages(data);
      });
      });
  };

  const recipeFormSubmit = (search) => {
    let edamameURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=20dc2327&app_key=9db171bf015112ec263145950b7c52cb`;
    // console.log("edamameURL", edamameURL);
    fetch(edamameURL)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setRecipeResults(response.hits);
      });
  };

  recipeFormSubmit(newRecipeSearch);

  // recipeAPI.recipes(newRecipeSearch).then((data)=>{
  //     console.log(data)
  // })

  // fetch(
  //   `https://api.edamam.com/api/recipes/v2?type=public&q=${newRecipeSearch}&app_id=f8d2a9ae&app_key=4d3ee4a8bbd450583932d553443686b8`
  // )
  //   .then((data) => data.json())
  //   .then((data) => console.log(data))
  //   // .catch((err) => console.error(err))
  //   .then((data) => {
  //     // console.log(data.count)
  //     console.log(data.count);
  //     setRecipeResults(data.hits);
  //   });

  return (
    <>
      <p>Welcome to your kitchen!</p>
      <div className="flex">
        <form onSubmit={handleAddStorageForm}>
          <select
            className="form-field"
            value={newStorageType}
            onChange={(e) => setNewStorageType(e.target.value)}
          >
            {/* refers to reasonForMessage */}
            <option value="">Select Storage</option>
            <option value="Refrigerator">Refrigerator</option>
            <option value="Freezer">Freezer</option>
            <option value="Pantry">Pantry</option>
            <option value="Outdoor Fridge">Outdoor Fridge</option>

            <option value="Walk In Freezer">Walk In Freezer</option>
            {/* <option value="other"><input>Other</input></option> */}
          </select>

          <br />
          <button className="inline-block m-3 px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out">
            Create Storage
          </button>
        </form>
        <div>
          <h1>Cooking Inspiration</h1>
          <form onSubmit={recipeFormSubmit}>
            <input
              className="form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              value={newRecipeSearch}
              onChange={(e) => setnewRecipeSearch(e.target.value)}
              placeholder="Ingredient"
            />
            <button className="inline-block m-3 px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out">
              Search recipes!
            </button>
          </form>
        </div>
        {recipeResults.map((r, i) => {
          return (
            <div className="border">
              <a
                className="hover:text-yellow-400  hover:tracking-wide"
                href={r.recipe.url}
                target="_blank"
                rel="noreferrer"
              >
                <img src={r.recipe.images.SMALL.url} alt="Recipe"></img>
              </a>
              <h1>{r.recipe.label}</h1>
              <hr />
              <p>
                {r.recipe.ingredientLines.map((ing, i) => {
                  return <p>{ing}</p>;
                })}
              </p>
              <hr />
              <a
                className="hover:text-yellow-400  hover:tracking-wide"
                href={r.recipe.url}
                target="_blank"
                rel="noreferrer"
              >
                Go to recipe!
              </a>
              <hr />
            </div>
          );
        })}
      </div>
      <div className="border">
        {storages.map((s, i) => {
          const handleStorageEdit = (e) => {
            e.preventDefault();
            const newStorage = {
              storageType: newStorageEdit,
              KitchenId: kitchenId,
            };
            setNewStorageEdit("");

            API.editStorage(newStorage, s.id, props.token).then((data)=>{
              API.getStoragesByKitchenId(props.token, kitchenId).then((data) => {
                setStorages(data);
              });
            })
            // .then((data) =>{API.getUser(props.userId.id).then((data))

            // })
          };
          const handleStorageDelete = (e) => {
            e.preventDefault();
            console.log("test");

            API.deleteStorage(s.id, props.token).then((data)=> {
              API.getStoragesByKitchenId(props.token, kitchenId).then((data) => {
                setStorages(data);
              });
            })
          };
          const products = s.Products.map((p, i) => {
            // console.log(p.name);

            return (
              <div key={i}>
                <h2>
                  {p.name}
                  Expires on: {p.expirationDate}
                </h2>
              </div>
            );
          });
          return (
            <>
              <div>
                <h1>{s.storageType}</h1>
                <h2>{products}</h2>
              </div>
              <div className="flex">
                <form className="" onSubmit={handleStorageEdit}>
                  <button
                    className="inline-block m-2 px-4 py-1.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out"
                    type="button"
                    onClick={handleStorageEdit}
                  >
                    Edit Storage
                  </button>
                  <select
                    className="form-field"
                    value={newStorageEdit}
                    onChange={(e) => setNewStorageEdit(e.target.value)}
                  >
                    {/* refers to reasonForMessage */}
                    <option value="">Select Storage</option>
                    <option value="Refrigerator">Refrigerator</option>
                    <option value="Freezer">Freezer</option>
                    <option value="Pantry">Pantry</option>
                    <option value="Outdoor Fridge">Outdoor Fridge</option>

                    <option value="Walk-In Freezer">Walk In Freezer</option>
                    {/* <option value="other"><input>Other</input></option> */}
                  </select>
                </form>
                <button
                  className="inline-block m-2 px-4 py-1.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out"
                  type="button"
                  onClick={handleStorageDelete}
                >
                  Delete Storage
                </button>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default KitchenById;
