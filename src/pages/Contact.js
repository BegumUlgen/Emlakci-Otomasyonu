import React, { useState } from 'react';
import { Button, Layout } from 'antd';
import { MenuUnfoldOutlined } from "@ant-design/icons";
import Sidebar from '../components/Sidebar';
import CustomHeader from '../components/Header';
import "./Contact.css";

const { Sider, Header, Content } = Layout;

const Contact = ({setIsLoggedin}) => {
    const [collapsed, setCollapsed] = useState(false);
    
    return (
        <Layout>
            <Sider theme="light" trigger={null} collapsible collapsed={collapsed} className='sider'>
                {/* selectedTab parametresi ile hangi sayfanın seçildiğini belirtiyoruz sideBar componenti de o sayfayı otomatik seçili gösteriyor*/}
                <Sidebar setIsLoggedin={setIsLoggedin} selectedTab="3"/>
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
                <Content className='content'>
                    <h2 className='contact-h2'>Contact Information:</h2>
                    <ul className='contact-ul'>
                        <li className='contact-li'><strong>Email:</strong> begum0110@hotmail.com</li>
                        <li className='contact-li'><strong>Phone:</strong> 444 1 444</li>
                        <li className='contact-li'><strong>Address:</strong> Ankara/Turkey</li>
                    </ul>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Contact;
