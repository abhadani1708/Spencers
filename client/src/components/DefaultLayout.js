import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  UserOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import '../resources/layout.css'
import {Link,useNavigate} from 'react-router-dom'
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const { Header, Sider, Content } = Layout;

const DefaultLayout = (props) => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const {cartItems ,loading} = useSelector(state =>state.rootReducer);
   
   
   useEffect(() => {
     localStorage.setItem('cartItems' , JSON.stringify(cartItems));
   }, [cartItems])   
   
  return (
    <Layout>
      {loading &&(
        <div className="spinner">
           <div 
           className="spinner-border"  
           role="status"
           >
         
          </div>
        </div>
      )}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h3>{collapsed ? 'MG' : 'Spencer\'s'}</h3>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
          items={[
            {
              key: '/home',
              icon: <HomeOutlined />,
              label:<Link to='/home'>Home</Link>,
            },
            {
              key: '/cart',
              icon: <ShoppingCartOutlined />,
              label:<Link to='/cart'>Cart</Link>,
            },
            {
              key: '/bills',
              icon: <CopyOutlined />,
              label: <Link to='/bills'>Bills</Link>,
            },
            {
              key: '/items',
              icon: <UnorderedListOutlined />,
              label: <Link to='/items'>Items</Link>,
            },
            {
              key: '/customers',
              icon: <UserOutlined />,
              label: <Link to='/customers'>Customers</Link>,
            },
            { 
              key: '/logout',
              icon: <LoginOutlined onClick={()=>{
                localStorage.removeItem('pos-user');
                navigate('/login')
              }}/>,
              label: 'Logout',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 10,
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <div className='cart-count d-flex align-items-center' onClick={()=>navigate('/cart')}>
          
               <b>
                  <p className='mt-3 mr-2'>
                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                  </p>
                </b>

              <ShoppingCartOutlined />
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{ 
            margin: '10px',
            padding: 24,
            minHeight:'80vh'
          }}
        >
           {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout 