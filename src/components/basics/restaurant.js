import React from 'react'
import Menu from './menuApi.js'
import "./style.css";
import MenuCard from './menuCard.js';
import Navbar from './Navbar.js';

const uniqueList = [
  ... new Set(
    Menu.map((curEle) => {
      return curEle.category;
    })
  ),
  "All",
];

const Restaurant = () => {
  const [menuData ,setMenuData] = React.useState(Menu);
  const [menuList ,setMenuList] = React.useState(uniqueList);

  const filterItem = (category) => {

    if ( category === "All"){
      setMenuData(Menu);
      return;
    }
    const updatedList = Menu.filter((curEle) => {
        return curEle.category === category;
  });

  setMenuData(updatedList);
};

  return (
    <>
      <Navbar filterItem ={ filterItem } menuList ={menuList} />
      <MenuCard menuData={ menuData }/>
    </>
  );
};
 

export default Restaurant;