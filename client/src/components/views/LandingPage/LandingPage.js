import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Icon, Button, Col, Card, Row } from "antd";
import ImageSlider from "../../utils/imageSlider";
import "./LandingPageCss.css";
const { Meta } = Card;
const Loader = () => <div>Loading...</div>;
function LandingPage() {
  const [productsData, setProductsData] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit] = useState(8);
  const [PostSize, setPostSize] = useState(0);
  const [Load, setLoad] = useState(false);
  const getProducts = query => {
    setLoad(true);
    Axios.post("/api/products/getProducts", query).then(res => {
      if (res.data.success) {
        setProductsData([...productsData, ...res.data.productData]);
        setPostSize(res.data.postSize);
        setLoad(false);
      } else {
        alert("failed to get the products");
        setLoad(false);
      }
    });
  };
  useEffect(() => {
    const query = {
      skip: Skip,
      limit: Limit
    };
    getProducts(query);
  }, []);
  const renderCards = productsData.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card hoverable={true} cover={<ImageSlider images={product.images} />}>
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  const loadMoreCards = () => {
    let range = Skip + Limit;
    const query = {
      skip: range,
      limit: Limit
    };
    getProducts(query);
    setSkip(range);
  };
  return (
    <>
      {Load ? (
        <div style={{ width: "75%", margin: "3rem auto" }}>
          <div style={{ textAlign: "center" }}>
            <h2>
              Travel around the world
              <Icon type="rocket" />>
            </h2>
          </div>
          <div class="loader">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
        </div>
      ) : (
        <div style={{ width: "75%", margin: "3rem auto" }}>
          <div style={{ textAlign: "center" }}>
            <h2>
              Travel around the world
              <Icon type="rocket" />>
            </h2>
          </div>
          {productsData.length === 0 ? (
            <div
              style={{
                display: "flex",
                height: "300px",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              No posts yet...
            </div>
          ) : (
            <div>
              <Row gutter={[16, 16]}>{renderCards}</Row>
            </div>
          )}
          <br />
          <br />
          {PostSize >= Limit && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button onClick={loadMoreCards}>Load More</Button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default LandingPage;
