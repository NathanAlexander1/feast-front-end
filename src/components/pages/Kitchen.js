import '../../styles/Kitchen.css';
import API from '../../utils/API'
import React, { useState, useEffect } from 'react'
import Storage from "./Storage"
import KitchenById from "./KitchenById";
import { useNavigate } from "react-router-dom";

function Kitchen(props) {
  const [kitchen, setKitchen] = useState([]);
  const [newKitchenLocation, setNewKitchenLocation] = useState("");
const navigate = useNavigate();

  // Not currently being used
  // const [storages, setStorages] = useState([])

  useEffect(() => {
    API.getKitchens(props.token, props.userId.id).then((data) => {
      // console.log(data)
      setKitchen(data);
    });
  }, [props.userId]);

  const kitchens = kitchen.map((k, i) => {
    const storages = k.Storages.map((s, i) => {
      return <div key={s.id}>{s.storageType}</div>;
    });
    //I think that this is where our storage reroute should be handled
    const handleRedirectClick = () => {
      console.log(`Go to ${k.User.name}'s kitchen # ${i + 1} with id ${k.id}`);

      //Api call to get kitchen by id
      API.getOneKitchen(props.token, k.id).then((data) => {
        console.log(data)
        navigate(`/kitchen/${data.id}`)
      });
    };

    const handleKitchenDelete = (e) => {
      e.preventDefault();
      console.log("test")
      
      //handle kitchen delete
      API.deleteKitchen(k.id, props.token).then((data)=>{
        console.log(data)
      })
    }


    return (
      <>
        {/* kitchen lists */}
        <div className="border" key={k.id}>
          <div key={"a" + k.id} className="text-xl text-bold">
            {k.User.name}'s Kitchen #{i + 1}
          </div>
          <div key={"b" + k.id}>
            This kitchen is found at zipcode: {k.zipCode}
          </div>
          <div key={"c" + k.id}>It belongs to {k.User.name}</div>
          <div key={"d" + k.id}>
            It has the following storage type: {storages}
          </div>
          <button key={"e" + k.id}
            className="inline-block m-3 px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out"
            type="button"
            onClick={handleRedirectClick}
          >
            Add Storage
          </button>
          <button key={"f" + k.id}
            className="inline-block m-3 px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out"
            type="button"
            onClick={handleKitchenDelete}
          >
            Delete Kitchen
          </button>
          {/* <Link to="/storage" element={<Storage />}onClick={handleRedirectClick}>Add Storage</Link> */}
          {/* <Router>
            <Routes>
            <Route path="/storage" element={<Storage/>}/>
            </Routes>
          </Router> */}
        </div>
      </>
    );
  });
  // console.log(kitchens)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log(kitchen[0])
    const newKitchen = {
      zipCode: newKitchenLocation,
      UserId: kitchen[0].UserId,
    };
    setNewKitchenLocation("");
    console.log(newKitchen);

    API.addToKitchen(newKitchen, props.token).then((data) => {
      API.getUser(props.userId.id).then((data) => {
        console.log(data);
        setKitchen(data.Kitchens);
      });
    });
    // .then((newKitchenData) => {
    //     console.log(props)
    //     API.getKitchens(props.userId.id).then(data => {
    //         console.log(data)
    // setKitchen(data.zipCode)
    // })
    // })
  };

  return (
    <div>
      
      {/* Add a kitchen */}
      <div className="flex">
        {/* <h1>{kitchen[0].zipCode}'s Kitchens</h1> */}
      <form onSubmit={handleFormSubmit}>
        <input
          name="zipCode"
          placeholder="Zipcode, please?"
          value={newKitchenLocation}
          onChange={(e) => setNewKitchenLocation(e.target.value)}
        />
        <br />
        <button className="inline-block m-3 px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out">
          Create Kitchen
        </button>
      </form>
      </div>
      {kitchens}
    </div>
  );
}

export default Kitchen;
