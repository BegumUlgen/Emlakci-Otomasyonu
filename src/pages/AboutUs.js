import React, { useState } from 'react';
import { Button, Layout } from 'antd';
import { MenuUnfoldOutlined } from "@ant-design/icons";
import Sidebar from '../components/Sidebar';
import CustomHeader from '../components/Header';
import "./AboutUs.css";

const { Sider, Header, Content } = Layout;

const AboutUs = ({setIsLoggedin}) => {
    const [collapsed, setCollapsed] = useState(false);
    
    return (
        <Layout>
            <Sider theme="light" trigger={null} collapsible collapsed={collapsed} className='sider'>
                {/* selectedTab parametresi ile hangi sayfanın seçildiğini belirtiyoruz sideBar componenti de o sayfayı otomatik seçili gösteriyor*/}
                <Sidebar setIsLoggedin={setIsLoggedin} selectedTab="2"/>
                <Button
                    type='text'
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuUnfoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    className='trigger-btn'
                />
            </Sider>
            <Layout>
                <Header className='header'>
                    <CustomHeader />
                </Header>
                <Content className='about-content'>
                    <h1>About Us</h1>
                    <img src='https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' width={700}/>
                    <h2>Who we are</h2>
                    <p className='about-p'>Your trusted partner in real estate automation. Our innovative web application is designed to simplify and streamline the real estate process, making it easier than ever to find, manage, and close property deals. We are dedicated to providing top-notch solutions that meet the needs of both real estate professionals and property seekers.</p>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AboutUs;
