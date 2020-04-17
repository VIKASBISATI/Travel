import React, { useState, useEffect } from 'react'
import Axios from "axios";
import {Icon, Button, Col, Card} from 'antd';
import ImageSlider from '../../utils/imageSlider';
const {Meta} = Card;
function LandingPage() {
    const [productsData, setProductsData] = useState([])
    useEffect(() => {
        Axios.get("/api/products/getProducts").then((res)=>{
            if(res.data.success){
                setProductsData(res.data.productData);
            }else{
                alert("failed to get the products");
            }
        })
    }, [])
    const renderCards =  productsData.map((product, index)=>{
            return(
            <Col lg={6} md={8} xs={24} key={index}>
                <Card
                hoverable={true}
                cover={<ImageSlider images={product.images} />}
                >
                    <Meta
                    title={product.title}
                    description={`$${product.price}`}
                    />
                </Card>
            </Col>
            )
        })

    const loadMoreCards =() => {

    }
    return (
        <div style={{width:"75%", margin:"3rem auto", height:"100%"}}>
            <div style={{textAlign:"center"}}>
                <h2>Trave around the world<Icon type="rocket" />></h2>
            </div>
            {productsData.length === 0 ?
                <div style={{display:"flex", height:"300px", alignItems:"center", justifyContent:"center"}}>
                    No posts yet...
                </div>
                :
                <div style={{display:"flex",justifyContent:"center"}}>
                    {renderCards}
                </div>
            }
            <Button onClick={loadMoreCards}>Load More</Button>
        </div>
    )
}

export default LandingPage;
