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
    console.log("DDDDDDDDDDDDDDDDD");
    console.log(ctx?.data?.user);
    console.log(ctx?.data);

  
    const groupByYear=()=>
    {
       
    }

    return (
        <div>
            <button onClick={logoutClick}>Log out</button>
            <span>Token expired :{ctx.data?.tokenExpired ? "yes" : "no"} </span>
            <span>user:{ctx.data?.user?.email}</span>

            <h1>Place List</h1><Link to='New'>New</Link>
            <br></br>
            <span>Group by: year, area</span>
            <button onClick={()=>setGrouping('default')}>No grouping</button>
            <button onClick={()=> setGrouping('groupByYear')} >Group by year</button>
            <button onClick={()=> setGrouping('groupByYear2')} >Group by year3</button>
            <br></br>
            <Grid placeList={placeList} grouping={grouping}></Grid>
        </div>
    )

}

export default PlaceList


