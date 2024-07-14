import React, { useState } from "react";
import {
  InputNumber,
  Select,
  Form,
  Input,
  Button,
  Layout,
  message,
} from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import Sidebar from "../components/Sidebar";
import CustomHeader from "../components/Header";
import "./AddProperty.css";

const { Sider, Header, Content } = Layout;

const AddProperty = ({ setIsLoggedin, addProperty }) => {
  const [collapsed, setCollapsed] = useState(false);
  const handleSubmit = (values) => {
    addProperty(values);
    message.success("Property added succsessfully!");
  };
  return (
    <Layout>
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="sider"
      >
        {/* selectedTab parametresi ile hangi sayfanın seçildiğini belirtiyoruz sideBar componenti de o sayfayı otomatik seçili gösteriyor*/}
        <Sidebar setIsLoggedin={setIsLoggedin} selectedTab="4" />
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuUnfoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="trigger-btn"
        />
      </Sider>
      <Layout>
        <Header className="header">
          <CustomHeader />
        </Header>
        <Content className="content">
          <Form
            onFinish={handleSubmit}
            style={{ margin: "20px", padding: "20px" }}
          >
            {/* Select kutusu For Sale veya Rental secimi yapilir */}
            <Form.Item
              initialValue={"For Sale"}
              rules={[
                {
                  required: true,
                  type: "Type",
                  message: "Please select a Type",
                },
              ]}
              label="Type"
              name="type"
            >
              <Select
                name="type"
                options={[
                  { value: "For Sale", label: "For Sale" },
                  { value: "Rental", label: "Rental" },
                ]}
              />
            </Form.Item>
            <Form.Item
              initialValue={"Apartment"}
              rules={[
                {
                  required: true,
                  type: "Type",
                  message: "Please select a House Type",
                },
              ]}
              label="House Type"
              name="houseType"
            >
              <Select
                name="type"
                options={[
                  { value: "Apartment", label: "Apartment" },
                  { value: "House", label: "House" },
                ]}
              />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Please enter a title" }]}
              label="Title"
              name="title"
            >
              <Input className="form-input" placeholder="Title" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Please enter a price" }]}
              label="Price"
              name="price"
            >
              <InputNumber
                className="form-input"
                placeholder="Price"
                step={100000}
              />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Please enter a city" }]}
              label="City"
              name="city"
            >
              <Input className="form-input" placeholder="City" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Please enter a district" }]}
              label="District"
              name="district"
            >
              <Input className="form-input" placeholder="District" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Please enter rooms" }]}
              label="Rooms"
              name="rooms"
            >
              <InputNumber className="form-input" placeholder="Rooms" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Please enter living rooms" }]}
              label="Living Rooms"
              name="livingRooms"
            >
              <InputNumber className="form-input" placeholder="Living Rooms" />
            </Form.Item>
            <Form.Item
              rules={[
                { required: true, message: "Please enter square meters" },
              ]}
              label="Square Meter"
              name="squareMeter"
            >
              <InputNumber
                className="form-input"
                placeholder="Square Meter"
                step={10}
              />
            </Form.Item>
            <Form.Item
              initialValue={
                "https://images.pexels.com/photos/1436190/pexels-photo-1436190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
              rules={[
                { required: true, message: "Please enter an image link" },
              ]}
              label="Image"
              name="image"
            >
              <Input className="form-input" placeholder="Image Link" />
            </Form.Item>

            <Button type="primary" htmlType="submit" block>
              Add Property
            </Button>
          </Form>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AddProperty;
