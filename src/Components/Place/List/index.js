import { useEffect, useState } from "react"
import service from '../../../services/api.js'
import { Link, useNavigate } from 'react-router-dom'

import { logout } from '../../../Session/firebase'
import { useAuth } from '../../../Session/AuthContext'
import GroupByYearView from "./groupByYearView.js"
import  Grid  from './grid.js'

function PlaceList() {

    const ctx = useAuth();
    let navigate = useNavigate();

    const [placeList, setPlaceList] = useState([]);
    const [grouping, setGrouping] = useState();
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedPlaceName, setSelectedPlaceName] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedRating, setSelectedRating] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');

    useEffect(() => {
        const call = async () => {
            var data = await service.getPlaceList()
            console.log(data);
            setPlaceList(data);

        }
        console.log("List/ctx user");
        console.log(ctx.tokenExpired);


        call();
    }, [])

    const logoutClick = () => {
        console.log('logout')
        console.log(ctx);
        logout();
        navigate("/Login");
    }

    const handleMigrateImages = async () => {
        try {
            await service.migrateImages();
            alert('Migration invoked successfully');
        } catch (error) {
            console.error('Migration failed', error);
            alert('Migration failed');
        }
    }
    console.log(ctx?.data?.user);
    console.log(ctx?.data);

    const cities = [...new Set(placeList.map(place => place.City).filter(Boolean))].sort();
    const types = [...new Set(placeList.map(place => place.Type).filter(Boolean))].sort();
    
    const availablePlaces = selectedCity ? placeList.filter(place => place.City === selectedCity) : placeList;
    const placeNames = [...new Set(availablePlaces.map(place => place.Name).filter(Boolean))].sort();
    
    const filteredPlaceList = placeList.filter(place => {
        const matchesCity = selectedCity ? place.City === selectedCity : true;
        const matchesName = selectedPlaceName ? place.Name === selectedPlaceName : true;
        const matchesType = selectedType ? place.Type === selectedType : true;
        const matchesRating = selectedRating ? place.Rating == selectedRating : true;
        const matchesPrice = selectedPrice ? place.Price === selectedPrice : true;
        return matchesCity && matchesName && matchesType && matchesRating && matchesPrice;
    }).sort((a, b) => a.Name.localeCompare(b.Name));

  
    const groupByYear=()=>
    {
       
    }

    return (
        <div>XX
            <button onClick={logoutClick}>Log out</button>
            {/* <button onClick={handleMigrateImages}>Migrate Images</button> */}
            <span>Token expired :{ctx.data?.tokenExpired ? "yes" : "no"} </span>
            <span>user:{ctx.data?.user?.email}</span>

            <h1>Place List</h1><Link to='New'>New</Link>
            <br></br>
            <span>Group by: year, area</span>
            <button onClick={()=>setGrouping('default')}>No grouping</button>
            <button onClick={()=> setGrouping('groupByYear')} >Group by year</button>
            <button onClick={()=> setGrouping('groupByYear2')} >Group by year3</button>
            <br></br>
            <div>
                <label htmlFor="cityFilter">Filter by City: </label>
                <select id="cityFilter" value={selectedCity} onChange={(e) => { setSelectedCity(e.target.value); setSelectedPlaceName(''); }}>
                    <option value="">All Cities</option>
                    {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="nameFilter">Filter by Name: </label>
                <select id="nameFilter" value={selectedPlaceName} onChange={(e) => setSelectedPlaceName(e.target.value)}>
                    <option value="">All Places</option>
                    {placeNames.map(name => (
                        <option key={name} value={name}>{name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="typeFilter">Filter by Type: </label>
                <select id="typeFilter" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                    <option value="">All Types</option>
                    {types.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="ratingFilter">Filter by Rating: </label>
                <select id="ratingFilter" value={selectedRating} onChange={(e) => setSelectedRating(e.target.value)}>
                    <option value="">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                </select>
            </div>
            <div>
                <label htmlFor="priceFilter">Filter by Price: </label>
                <select id="priceFilter" value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}>
                    <option value="">All Prices</option>
                    <option value="<50">&lt;50</option>
                    <option value="50<price<100">50&lt;price&lt;100</option>
                    <option value="100<price<150">100&lt;price&lt;150</option>
                    <option value="150<price<200">150&lt;price&lt;200</option>
                    <option value="200<price<250">200&lt;price&lt;250</option>
                    <option value="250<price<300">250&lt;price&lt;300</option>
                    <option value="300<price<350">300&lt;price&lt;350</option>
                    <option value="350<price<400">350&lt;price&lt;400</option>
                    <option value="400<price">400&lt;price</option>
                </select>
            </div>
            <br></br>
            <Grid placeList={filteredPlaceList} grouping={grouping}></Grid>
        </div>
    )

}

export default PlaceList


