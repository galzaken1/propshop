import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'


const HomeScreen = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('http://localhost:5001/api/products');
            setProducts(data);
        }
        fetchProducts();
    }, [])
    const handleClick = async () => {
        const fetchItem = await axios.get('http://localhost:5001/api/products/' + 1);
        console.log(fetchItem)
    }
    return (
        <>
            <h1>Lastest Products</h1>
            <Row>
                {products.map((product) =>
                (
                    < Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                        <Product product={product} />
                    </Col>
                )
                )}
            </Row >
            <button onClick={handleClick}>Click</button>
        </>
    )
}

export default HomeScreen