import React from 'react';
import { Menu } from 'antd';
import { IoHome } from "react-icons/io5";
import { HomeOutlined, PhoneOutlined, InfoCircleOutlined, LogoutOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';



const Sidebar = ({setIsLoggedin, selectedTab}) => {
  const navigate = useNavigate();

  // Burada onClick fonksiyonu ile menüdeki item'lardan hangi iteme tıklandığında ne yapılacagını belirliyoruz
  // e.key parametresi ile hangi sıradaki iteme tıklandığını görüyoruz 1,2,3 vs.
  const onClick = (e) => {
    // console.log('click ', e.key);
    let selectedItem = e.key
    if(selectedItem === "1"){
      // Home sayfasına gider
      navigate('/home')
    } else if(selectedItem === "2"){
      // About Us sayfasına gider
      navigate('/about-us')
    } else if(selectedItem === "3"){
      // Contact sayfasına gider
      navigate('/contact')
    } else if(selectedItem === "4"){
      // Add Property sayfasına gider
      navigate('/add-property')
    } else if(selectedItem === "5"){
      // Kullanici logged out olarak kaydedilir
      setIsLoggedin(false)
      // Login sayfasına navigate et
      navigate('/')
    }
  };

  return (
    <div>
      <div className='sidebar-header'>
        <IoHome className='home-icon' />
      </div>
      <Menu 
      onClick={onClick} // OnClick fonksiyonu Menu componentine ekleniyor
      mode='inline' 
      defaultSelectedKeys={[selectedTab]} 
      className='menu-bar'
       items ={[
        {
            key:"1",
        icon:<HomeOutlined/>,
        label:"Home",
        },
        {
       
        key:"2",
        icon:<InfoCircleOutlined/>,
        label:"About Us",

      },
      {
        key:"3",
        icon:<PhoneOutlined/>,
        label:"Contact",
      },
      {
        key:"4",
        icon:<PlusSquareOutlined/>,
        label:"Add Property",
      },
      {
        key:"5",
        icon:<LogoutOutlined/>,
        label:"Logout",
      },
      
      
      ]}>
        {/* Menü öğeleri buraya gelecek */}
      </Menu>
    </div>
  );
};

export default Sidebar;

