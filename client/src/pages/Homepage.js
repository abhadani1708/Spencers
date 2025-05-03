import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import axios from 'axios';
import { Col, Row, Card } from 'antd';
import Item from '../components/Item';
import '../resources/items.css';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion'; // animation

function Homepage() {
  const [itemsData, setItemsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Fruits');
  const dispatch = useDispatch();

  const categories = [
    {
      name: 'Fruits',
      imageURL: 'https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-3foodgroups_fruits_detailfeature.jpg?sfvrsn=64942d53_4',
    },
    {
      name: 'Vegetables',
      imageURL: 'https://cdn.britannica.com/17/196817-050-6A15DAC3/vegetables.jpg',
    },
    {
      name: 'Meat',
      imageURL: 'https://images.ctfassets.net/3s5io6mnxfqz/5GlOYuzg0nApcehTPlbJMy/140abddf0f3f93fa16568f4d035cd5e6/AdobeStock_175165460.jpeg',
    },
    {
      name: 'Dairy',
      imageURL: 'https://www.shutterstock.com/image-photo/new-delhi-india-may-2022-600nw-2163953449.jpg',
    },
    {
      name: 'Gadgets',
      imageURL: 'https://media.istockphoto.com/id/1328836875/vector/realistic-electronic-devices-and-gadgets-in-isometry-vector-isometric-illustration-of.jpg?s=612x612&w=0&k=20&c=4iwItEQ1P3lhjl350QXRl5IrgC8ufDImaoc-7_H5vVA=',
    },
    {
      name: 'Snacks',
      imageURL: 'https://m.media-amazon.com/images/I/81ZX-dvnU1L.jpg',
    },
    {
      name: 'Drinks',
      imageURL: 'https://5.imimg.com/data5/TO/XJ/QN/ANDROID-80650971/product-jpeg-500x500.jpg',
    },
    {
      name: 'Health & Wellness',
      imageURL: 'https://ik.imagekit.io/wlfr/wellness/images/category/l1/sexual-wellness/Hero-0.png/tr:w-3840,c-at_max,cm-pad_resize,f-auto,q-70',
    }
  ];

  const getAllItems = () => {
    dispatch({ type: 'showLoading' });
    axios.get('/api/items/get-all-items')
      .then((response) => {
        dispatch({ type: 'hideLoading' });
        setItemsData(response.data);
      }).catch((error) => {
        dispatch({ type: 'hideLoading' });
        console.log(error);
      });
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <DefaultLayout>
      <div className="homepage-header">
        <h2 className="section-title">Choose a Category</h2>
        <div className="d-flex categories flex-wrap justify-content-center">
          {categories.map((category) => {
            return (
              <motion.div
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedCategory(category.name)}
                className={`category-card ${selectedCategory === category.name ? 'selected-category' : ''}`}
              >
                <img src={category.imageURL} height='70' alt={category.name} width='100' />
                <h5>{category.name}</h5>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="items-section">
        <h3 className="section-title">{selectedCategory} Items</h3>
        <Row gutter={[20, 20]}>
          {itemsData.filter((i) => i.category === selectedCategory).map((item) => {
            return (
              <Col xs={24} sm={12} md={8} lg={6}>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Card hoverable>
                    <Item item={item} />
                  </Card>
                </motion.div>
              </Col>
            );
          })}
        </Row>
      </div>
    </DefaultLayout>
  );
}

export default Homepage;
