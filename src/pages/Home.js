import React, { useState } from 'react';
import { Space, InputNumber, Select, Form, Input, Button, Layout, Modal, List, message } from 'antd';
import { MenuUnfoldOutlined } from "@ant-design/icons";
import Sidebar from '../components/Sidebar';
import CustomHeader from '../components/Header';
import "./Home.css";

const { Sider, Header, Content } = Layout;

const Home = ({setIsLoggedin, propertyList}) => {
    const [collapsed, setCollapsed] = useState(false);
    {/* Modal componentinin acilip kapanmasini kontrol eden state*/} 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredProperties, setFilteredProperties] = useState(propertyList);

    const showModal = () => {
        setIsModalOpen(true);
      };
      const handleOk = (values) => {
        const filtered = propertyList.filter(property => {
            return (
                property.type === values.type &&
                property.price >= values.minPrice &&
                property.price <= values.maxPrice &&
                (!values.city || property.city.toLowerCase().includes(values.city.toLowerCase())) &&
                (!values.district || property.district.toLowerCase().includes(values.district.toLowerCase())) &&
                (!values.houseType || property.houseType.toLowerCase().includes(values.houseType.toLowerCase())) &&
                (!values.rooms || property.rooms === values.rooms) &&
                (!values.livingRooms || property.livingRooms === values.livingRooms) &&
                (!values.minSquareMeter || property.squareMeter >= values.minSquareMeter)
            );
        });
        setFilteredProperties(filtered);
        setIsModalOpen(false);
    };
      const handleCancel = () => {
        setIsModalOpen(false);
      };

      const emailList = () => {
        console.log(filteredProperties);
        message.success('Email list sent successfully!');
      }

    return (
        <Layout>
            {/* Modal componenti Find Properties Butonu Tiklandiginda Ortaya Cikar */}
            <Modal title="Find Properties" open={isModalOpen} footer={null} onCancel={handleCancel}>
                {/* Find Properties butonu tiklandiginda cikan arama formu */}
                <Form onFinish={handleOk} style={{margin: "20px", padding: "20px"}}>
                    {/* Select kutusu For Sale veya Rental secimi yapilir */}
                    <Form.Item 
                    initialValue={'For Sale'}
                    rules={[{ required: true, type: "Type", message: "Please select a Type" }]}
                    label="Type" name="type">
                        <Select
                            name='type'
                            options={[
                                { value: 'For Sale', label: 'For Sale' },
                                { value: 'Rental', label: 'Rental' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item 
                    rules={[{ required: true, message: 'Please enter a minimum price' }]}
                    label="Minimum Price" name='minPrice'>
                    <InputNumber className='form-input' placeholder="Minimum Price" step={100000}/>
                    </Form.Item>
                    <Form.Item 
                    rules={[{ required: true, message: 'Please enter a maximum price' }]}
                    label="Maximum Price" name='maxPrice'>
                    <InputNumber className='form-input' placeholder="Maximum Price" step={100000}/>
                    </Form.Item>
                    <Form.Item 
                    label="City" name='city'>
                    <Input className='form-input' placeholder="City" />
                    </Form.Item>
                    <Form.Item 
                    label="District" name='district'>
                    <Input className='form-input' placeholder="District" />
                    </Form.Item>
                    <Form.Item 
                        initialValue={'Apartment'}
                        rules={[{ required: true, type: "Type", message: "Please select a House Type" }]}
                        label="House Type" name="houseType">
                            <Select
                                name='type'
                                options={[
                                    { value: 'Apartment', label: 'Apartment' },
                                    { value: 'House', label: 'House' },
                                ]}
                            />
                    </Form.Item>
                    <Form.Item 
                    label="Rooms" name='rooms'>
                    <InputNumber className='form-input' placeholder="Rooms"/>
                    </Form.Item>
                    <Form.Item 
                    label="Living Rooms" name='livingRooms'>
                    <InputNumber className='form-input' placeholder="Living Rooms"/>
                    </Form.Item>
                    <Form.Item 
                    label="Minimum Square Meter" name='minSquareMeter'>
                    <InputNumber className='form-input' placeholder="Square Meter" step={10}/>
                    </Form.Item>
                    
                    <Button type="primary" htmlType="submit" block>
                        Find
                    </Button>
                </Form>
            </Modal>
            {/* Sidebar burada*/}
            <Sider theme="light" trigger={null} collapsible collapsed={collapsed} className='sider'>
                <Sidebar setIsLoggedin={setIsLoggedin} selectedTab="1"/>
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
                    <h1 style={{ textAlign: "center" }}>All Properties</h1>
                    <div style={{justifyContent:"space-evenly", display: "flex"}}>
                        {/* Find Properties modalini acan buton burada*/}
                        <Button style={{ marginBottom: 16, width: 200, height: 40 }} type="primary" onClick={showModal}>
                            Find Properties
                        </Button>
                        {/* Email list butonu burada*/}
                        <Button style={{ marginBottom: 16, width: 200, height: 40, backgroundColor:"green" }} type="primary" onClick={emailList}>
                            Email List
                        </Button>
                    </div>
                    
                <List
                    itemLayout="vertical"
                    dataSource={filteredProperties}
                    renderItem={(item) => (
                    <List.Item
                        extra={<img
                            width={380}
                            height={240}
                            alt="logo"
                            src={item.image}
                            style={{ margin: 20 }}
                        />}
                    >
                        <List.Item.Meta
                        title={item.title}
                        description={item.city + "/" + item.district + " " + item.houseType + " " + item.rooms + "+" + item.livingRooms} 
                        />
                        <ul className='home-ul'>
                            <li className='home-li'><strong>Type:</strong> {item.type}</li>
                            <li className='home-li'><strong>City:</strong> {item.city}</li>
                            <li className='home-li'><strong>District:</strong> {item.district}</li>
                            <li className='home-li'><strong>House Type:</strong> {item.houseType}</li>
                            <li className='home-li'><strong>Rooms:</strong> {item.rooms}</li>
                            <li className='home-li'><strong>Living Rooms:</strong> {item.livingRooms}</li>
                            <li className='home-li'><strong>m^2:</strong> {item.squareMeter}</li>
                            <li className='home-li'><strong>Price:</strong> {item.price}</li>
                        </ul>
                        
                    </List.Item>
                    )}
                />
                </Content>
            </Layout>
        </Layout>
    );
};

export default Home;
