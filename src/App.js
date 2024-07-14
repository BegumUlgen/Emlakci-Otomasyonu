import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Form, Input, Button, Divider, Typography, message } from "antd";
import {
  GoogleOutlined,
  FacebookFilled,
  TwitterOutlined,
} from "@ant-design/icons";
import "./App.css";
import Home from "./pages/Home";
import { useState } from "react";
import AboutUs from "./pages/AboutUs";
import AddProperty from "./pages/AddProperty";
import Contact from "./pages/Contact";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from ".";

// Ornek Baslangic Datasi
/*
const propertyList = [
  {
      title: "Istanbul Besiktas 1+0 Daire Satilik",
      price: 3850000,
      type: 'For Sale',
      houseType: "Apartment",
      city: "Istanbul",
      district: "Beşiktaş",
      rooms: 1,
      livingRooms: 0,
      squareMeter: 45,
      image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
      title: "Istanbul Kadikoy 3+1 Daire Satilik",
      price: 2630000,
      type: 'For Sale',
      houseType: "Apartment",
      city: "Istanbul",
      district: "Kadikoy",
      rooms: 3,
      livingRooms: 1,
      squareMeter: 125,
      image: "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
      title: "Istanbul Sariyer 5+2 Villa Satilik",
      price: 12900000,
      type: 'For Sale',
      houseType: "House",
      city: "Istanbul",
      district: "Sariyer",
      rooms: 5,
      livingRooms: 2,
      squareMeter: 345,
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
      title: "Izmir Bornova 1+1 Daire Kiralik",
      price: 18000,
      type: 'Rental',
      houseType: "Apartment",
      city: "Izmir",
      district: "Bornova",
      rooms: 1,
      livingRooms: 1,
      squareMeter: 57,
      image: "https://images.pexels.com/photos/129494/pexels-photo-129494.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
      title: "Izmir Buca 2+1 Daire Kiralik",
      price: 25000,
      type: 'Rental',
      houseType: "Apartment",
      city: "Izmir",
      district: "Buca",
      rooms: 2,
      livingRooms: 1,
      squareMeter: 95,
      image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
      title: "Ankara Cankaya 1+0 Daire Kiralik",
      price: 9000,
      type: 'Rental',
      houseType: "Apartment",
      city: "Ankara",
      district: "Cankaya",
      rooms: 1,
      livingRooms: 0,
      squareMeter: 42,
      image: "https://images.pexels.com/photos/950745/pexels-photo-950745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
      title: "Ankara Sincan 2+1 Daire Kiralik",
      price: 8000,
      type: 'Rental',
      houseType: "Apartment",
      city: "Ankara",
      district: "Sincan",
      rooms: 2,
      livingRooms: 1,
      squareMeter: 92,
      image: "https://images.pexels.com/photos/144632/pexels-photo-144632.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
]
  */

const Login = ({ isLoggedin, setIsLoggedin }) => {
  const navigate = useNavigate();
  const login = (values) => {
    const { myEmail, mypassword, myname } = values;
    if (
      myEmail === "begum0110@hotmail.com" &&
      mypassword === "1234" &&
      myname === "begüm"
    ) {
      
      // Tekrardan kullanıcı doğru bilgilerle giriş yapmak zorunda
      
      setIsLoggedin(true);

      message.success("Login Successful!");
      navigate("/home");
    } else {
      message.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="appBg">
      <Form className="loginForm" onFinish={login}>
        <Typography.Title>Welcome Back!</Typography.Title>
        <Form.Item
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter a valid email",
            },
          ]}
          label="Email"
          name="myEmail"
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please enter your password" }]}
          label="Password"
          name="mypassword"
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please enter your name" }]}
          label="Name"
          name="myname"
        >
          <Input placeholder="Enter your name" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Login
        </Button>
        <Divider style={{ borderColor: "black" }}>or Login with</Divider>
        <div className="socialLogin">
          <GoogleOutlined
            className="socialIcon"
            onClick={login}
            style={{ color: "red" }}
          />
          <FacebookFilled
            className="socialIcon"
            onClick={login}
            style={{ color: "blue" }}
          />
          <TwitterOutlined
            className="socialIcon"
            onClick={login}
            style={{ color: "cyan" }}
          />
        </div>
      </Form>
    </div>
  );
};

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    async function getProperties() {
      // Emlaklari tek eklemek icin bos bir array olusturduk
      let tempProperties = [];
      // Firebase veritabani uzerindeki veritabaninin ismi properties-list
      // Bu sorgu ile properties-list veritabani uzerindeki tum verileri cekiyoruz
      const querySnapshot = await getDocs(collection(db, "properties-list"));
      querySnapshot.forEach((doc) => {
        
        // Veritabanindaki tum emlak verileri konsola yazdirilir
        console.log(doc.id, " => ", doc.data());
        // Bu veriler app boyunca kullandigimiz emlak listesine eklenir
        tempProperties.push(doc.data());
      });
      // API'den gelen verileri local state'e atar
      setProperties(tempProperties);
    }
    getProperties();
  }, []);

  // Bu fonksiyon ile yeni emlaklar ekleniyor
  const addProperty = async (newProperty) => {
    // Local Properties listesine yeni emlak eklenir
    setProperties([...properties, newProperty]);
    // Firebase veritabanina yeni emlak eklenir
    
    const docRef = await addDoc(collection(db, "properties-list"), newProperty);
    console.log("Document written with ID: ", docRef.id);
  };

  const handleLogin = (loginStatus) => {
    setIsLoggedin(loginStatus);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Login isLoggedin={isLoggedin} setIsLoggedin={handleLogin} />
          }
        />
        {
          
          isLoggedin && (
            <Route
              path="/home"
              element={
                <Home setIsLoggedin={handleLogin} propertyList={properties} />
              }
            />
          )
        }
        {isLoggedin && (
          <Route
            path="/about-us"
            element={<AboutUs setIsLoggedin={handleLogin} />}
          />
        )}
        {isLoggedin && (
          <Route
            path="/add-property"
            element={
              <AddProperty
                setIsLoggedin={handleLogin}
                propertyList={properties}
                addProperty={addProperty}
              />
            }
          />
        )}
        {isLoggedin && (
          <Route
            path="/contact"
            element={<Contact setIsLoggedin={handleLogin} />}
          />
        )}
        <Route
          path="*"
          element={
            <Login isLoggedin={isLoggedin} setIsLoggedin={handleLogin} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
