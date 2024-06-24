import { useEffect, useState } from 'react';

import styled from "styled-components";

import './App.css';
import SerachResult from './components/SearchResult/SerachResult';

export const BASE_URL = "http://localhost:9000";

function App() {
  const [data,setdata] = useState(null);
  const [loading,setloading] = useState(false);
  const [error,seterror] = useState(null);
  const [filteredData,setFilteredData] = useState(null);
  const [selectbtn,setselectbtn] = useState("all");



    
      
useEffect(()=>{
  const fetchFoodData = async () =>{
    setloading(true);

    try{
    const response = await fetch(BASE_URL);
 const json = await response.json();
 setdata(json);
 setFilteredData(json);
 setloading(false);
    }catch (error){
      seterror("unable to fetch data");
    }

};
fetchFoodData();
}, []);

const filterfood = (type) =>{
 if(type === "all"){
  setFilteredData(data);
  setselectbtn("all");
  return;
  
 }
 const filter = data?.filter((food) => food.type.toLowerCase().includes(type.toLowerCase()));
    setFilteredData(filter);
    setselectbtn(type);
};
  

  if(error){
    return <div>{error}</div>
  }
  if(loading){
    return <div>Loading.....</div>
  }
  const searchfood = (e) =>{
    const searchedvalue = e.target.value;

    if(searchedvalue === ""){
      setFilteredData(null);
    }
    const filter = data?.filter((food) => food.name.toLowerCase().includes(searchedvalue.toLowerCase()));
    setFilteredData(filter);
    setFilteredData(filter);
  setselectbtn(type);
  }
  const selectedbtn = [
    {
      "name" : "All",
      "type" : "all",
    },
    {
      "name" : "Breakfast",
      "type" : "breakfast",
    },
    {
      "name" : "Lunch",
      "type" : "lunch",
    },
    {
      "name" : "Dinner",
      "type" : "dinner",
    }
  ]
  

  return (
    
      
     <>
      <Container>
        <TopContainer>

        <div className="logo">
        <img src="/741.png" alt="logo" />
        </div>
        <div className="search">
          <input type="text" onChange={searchfood} placeholder='Search Food..'/>
        </div>
        </TopContainer>
        <FilterContainer>
        {
          selectedbtn.map((value) =>(<Button isSelected={selectbtn === value.type} key={value.name} onClick={()=> filterfood(value.type)}>{value.name}</Button>) )
        }
        

        
        </FilterContainer>
  
  
        </Container>
        <SerachResult data={filteredData}/>
      
     </>
    
  )
}

export default App;

export const Container = styled.div`
max-width: 1200px;
margin: 0 auto;


 

`;
const TopContainer = styled.div`
.logo img{
  height: 100px;
 }
 min-height: 140px;
 display: flex;
 justify-content: space-between;
 padding: 16px;
 align-items: center;

 .search input{
  background-color: transparent;
  border: 1px solid red;
  color: white;
  border-radius: 5px;
  height: 40px;
  font-size: 16px;
  padding:0 10px;
 }

 @media (0< width < 600px) {
  flex-direction: column;
  height: 170px;
  
 }

`;

const FilterContainer = styled.section`
display: flex;
justify-content: center;
gap: 12px;
padding-bottom: 20px;

`;
export const Button = styled.button`
color: white;
background-color: ${({isSelected})=> (isSelected ? "#0d9418" :  "#9c2222" )};
border-radius: 5px;
padding: 6px 12px;
border: none;
cursor: pointer;
      &:hover{
        background-color: #940d0d;
      }

`;

