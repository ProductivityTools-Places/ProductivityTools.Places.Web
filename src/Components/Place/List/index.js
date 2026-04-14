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
    
    const availablePlaces = selectedCity ? placeList.filter(place => place.City === selectedCity) : placeList;
    const placeNames = [...new Set(availablePlaces.map(place => place.Name).filter(Boolean))].sort();
    
    const filteredPlaceList = placeList.filter(place => {
        const matchesCity = selectedCity ? place.City === selectedCity : true;
        const matchesName = selectedPlaceName ? place.Name === selectedPlaceName : true;
        return matchesCity && matchesName;
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
            <br></br>
            <Grid placeList={filteredPlaceList} grouping={grouping}></Grid>
        </div>
    )

}

export default PlaceList


