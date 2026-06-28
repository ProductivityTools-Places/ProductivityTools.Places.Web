import { useEffect, useState } from "react"
import service from '../../../services/api.js'
import { Link, useNavigate } from 'react-router-dom'
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { logout } from '../../../Session/firebase'
import { useAuth } from '../../../Session/AuthContext'
import GroupByYearView from "./groupByYearView.js"
import  Grid  from './grid.js'

const formatPrice = (priceVal) => {
    if (!priceVal) return '';
    const p = Number(priceVal);
    if (!isNaN(p)) {
        if (p <= 100) return "<100";
        if (p <= 200) return "100<price<200";
        if (p <= 300) return "200<price<300";
        return "300<price";
    }
    if (priceVal === '<50' || priceVal === '50<price<100' || priceVal === '<100') return "<100";
    if (priceVal === '100<price<150' || priceVal === '150<price<200' || priceVal === '100<price<200') return "100<price<200";
    if (priceVal === '200<price<250' || priceVal === '250<price<300' || priceVal === '200<price<300') return "200<price<300";
    if (priceVal === '300<price<350' || priceVal === '350<price<400' || priceVal === '400<price' || priceVal === '300<price') return "300<price";
    return priceVal;
};

function PlaceList() {

    const ctx = useAuth();
    let navigate = useNavigate();

    const [placeList, setPlaceList] = useState([]);
    const [grouping, setGrouping] = useState();
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedPlaceName, setSelectedPlaceName] = useState('');
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [selectedPrices, setSelectedPrices] = useState([]);

    const handleToggle = (value, selectedList, setSelectedList) => {
        if (selectedList.includes(value)) {
            setSelectedList(selectedList.filter(item => item !== value));
        } else {
            setSelectedList([...selectedList, value]);
        }
    };

    const handleClearFilters = () => {
        setSelectedCity('');
        setSelectedPlaceName('');
        setSelectedTypes([]);
        setSelectedRatings([]);
        setSelectedPrices([]);
    };

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
    const types = [...new Set(placeList.flatMap(place => place.Visits?.map(v => v.Type) || []).filter(Boolean))].sort();
    
    const filteredPlaceList = placeList.filter(place => {
        const matchesCity = selectedCity ? place.City === selectedCity : true;
        const matchesName = selectedPlaceName ? place.Name.toLowerCase().includes(selectedPlaceName.toLowerCase()) : true;
        const matchesType = selectedTypes.length === 0 ? true : (place.Visits?.some(visit => selectedTypes.includes(visit.Type)) ?? false);
        const matchesRating = selectedRatings.length === 0 ? true : (place.Visits?.some(visit => selectedRatings.includes(String(visit.Rating))) ?? false);
        const matchesPrice = selectedPrices.length === 0 ? true : (place.Visits?.some(visit => selectedPrices.includes(formatPrice(visit.Price))) ?? false);
        return matchesCity && matchesName && matchesType && matchesRating && matchesPrice;
    }).sort((a, b) => a.Name.localeCompare(b.Name));

    const hasActiveFilters = !!(selectedCity || selectedPlaceName || selectedTypes.length > 0 || selectedRatings.length > 0 || selectedPrices.length > 0);

  
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
            <Box sx={{ 
                backgroundColor: '#f8f9fa', 
                padding: '24px', 
                borderRadius: '16px', 
                marginBottom: '30px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                border: '1px solid #e9ecef',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1', minWidth: '200px' }}>
                        <label htmlFor="cityFilter" style={{ fontWeight: '600', color: '#495057', display: 'block', marginBottom: '8px' }}>Filter by City: </label>
                        <select id="cityFilter" value={selectedCity} onChange={(e) => { setSelectedCity(e.target.value); setSelectedPlaceName(''); }} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ced4da', fontSize: '14px' }}>
                            <option value="">All Cities</option>
                            {cities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                    <div style={{ flex: '1', minWidth: '200px' }}>
                        <label htmlFor="nameFilter" style={{ fontWeight: '600', color: '#495057', display: 'block', marginBottom: '8px' }}>Filter by Name: </label>
                        <input 
                            id="nameFilter" 
                            type="text" 
                            placeholder="Type to search names (e.g. sushi)..." 
                            value={selectedPlaceName} 
                            onChange={(e) => setSelectedPlaceName(e.target.value)} 
                            style={{ 
                                width: '100%', 
                                padding: '10px', 
                                borderRadius: '8px', 
                                border: '1px solid #ced4da', 
                                fontSize: '14px',
                                boxSizing: 'border-box'
                            }} 
                        />
                    </div>
                </Box>

                <Box sx={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                    <Box sx={{ flex: '0 0 auto', minWidth: '150px' }}>
                        <Typography variant="subtitle2" sx={{ marginBottom: '10px', fontWeight: 'bold', color: '#495057', fontSize: '14px' }}>
                            Filter by Type:
                        </Typography>
                        <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {['Company', 'Family'].map(type => {
                                const isSelected = selectedTypes.includes(type);
                                return (
                                    <Chip
                                        key={type}
                                        label={type}
                                        clickable
                                        color={isSelected ? "primary" : "default"}
                                        variant={isSelected ? "filled" : "outlined"}
                                        onClick={() => handleToggle(type, selectedTypes, setSelectedTypes)}
                                        sx={{ 
                                            fontWeight: isSelected ? '600' : 'normal',
                                            padding: '18px 8px',
                                            borderRadius: '10px',
                                            transition: 'all 0.2s ease',
                                            '&:hover': { transform: 'translateY(-1px)', boxShadow: '0 4px 8px rgba(0,0,0,0.08)' }
                                        }}
                                    />
                                );
                            })}
                        </Box>
                    </Box>

                    <Box sx={{ flex: '0 0 auto', minWidth: '220px' }}>
                        <Typography variant="subtitle2" sx={{ marginBottom: '10px', fontWeight: 'bold', color: '#495057', fontSize: '14px' }}>
                            Filter by Rating:
                        </Typography>
                        <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {[5, 4, 3, 2, 1].map(rating => {
                                const ratingStr = String(rating);
                                const isSelected = selectedRatings.includes(ratingStr);
                                return (
                                    <Chip
                                        key={rating}
                                        label={`${rating} ★`}
                                        clickable
                                        color={isSelected ? "warning" : "default"}
                                        variant={isSelected ? "filled" : "outlined"}
                                        onClick={() => handleToggle(ratingStr, selectedRatings, setSelectedRatings)}
                                        sx={{ 
                                            fontWeight: isSelected ? '600' : 'normal',
                                            padding: '18px 8px',
                                            borderRadius: '10px',
                                            transition: 'all 0.2s ease',
                                            '&:hover': { transform: 'translateY(-1px)', boxShadow: '0 4px 8px rgba(0,0,0,0.08)' }
                                        }}
                                    />
                                );
                            })}
                        </Box>
                    </Box>

                    <Box sx={{ flex: '1 1 300px' }}>
                        <Typography variant="subtitle2" sx={{ marginBottom: '10px', fontWeight: 'bold', color: '#495057', fontSize: '14px' }}>
                            Filter by Price:
                        </Typography>
                        <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {[
                                "<100", "100<price<200", "200<price<300", "300<price"
                            ].map(price => {
                                const isSelected = selectedPrices.includes(price);
                                return (
                                    <Chip
                                        key={price}
                                        label={price}
                                        clickable
                                        color={isSelected ? "success" : "default"}
                                        variant={isSelected ? "filled" : "outlined"}
                                        onClick={() => handleToggle(price, selectedPrices, setSelectedPrices)}
                                        sx={{ 
                                            fontWeight: isSelected ? '600' : 'normal',
                                            padding: '18px 8px',
                                            borderRadius: '10px',
                                            transition: 'all 0.2s ease',
                                            '&:hover': { transform: 'translateY(-1px)', boxShadow: '0 4px 8px rgba(0,0,0,0.08)' }
                                        }}
                                    />
                                );
                            })}
                        </Box>
                    </Box>
                </Box>
                {hasActiveFilters && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #e9ecef', pt: 2, mt: 1 }}>
                        <Button 
                            variant="outlined" 
                            onClick={handleClearFilters}
                            sx={{ 
                                borderRadius: '10px', 
                                textTransform: 'none', 
                                fontWeight: '600',
                                padding: '8px 20px',
                                transition: 'all 0.2s ease',
                                border: '1px solid #ffcdd2',
                                color: '#d32f2f',
                                backgroundColor: 'transparent',
                                '&:hover': {
                                    backgroundColor: '#ffebee',
                                    borderColor: '#d32f2f',
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 4px 12px rgba(211, 47, 47, 0.1)'
                                }
                            }}
                        >
                            Clear Filters
                        </Button>
                    </Box>
                )}
            </Box>
            <Grid placeList={filteredPlaceList} grouping={grouping}></Grid>
        </div>
    )

}

export default PlaceList


