import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Icon, Button, Col, Card, Row } from "antd";
import ImageSlider from "../../utils/imageSlider";
import "./LandingPageCss.css";
import LandingPageShimmer from "../../shimmers/landingPageShimmer";
import CheckBox from "./Sections/checkbox";
import RadioBox from "./Sections/RadioBox";
import {continentList, price} from './Sections/Datas'

const { Meta } = Card;
function LandingPage() {
  const [productsData, setProductsData] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit] = useState(8);
  const [PostSize, setPostSize] = useState(0);
  const [Load, setLoad] = useState(false);
  const [Filters, setfilters] = useState({
    continent: [],
    price: []
  });
  const getProducts = query => {
    setLoad(true);
    Axios.post("/api/products/getProducts", query).then(res => {
      if (res.data.success) {
        if (query.loadMore) {
          setProductsData([...productsData, ...res.data.productData]);
        } else {
          setProductsData(res.data.productData);
          setfilters(res.data.checkedContinents);
        }
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
      limit: Limit,
      loadMore: true
    };
    getProducts(query);
    setSkip(range);
  };
  const showFilteredResults = filters => {
    const query = {
      skip: 0,
      limit: Limit,
      filters: filters
    };
    getProducts(query);
    setSkip(0);
  };
  const handlePrice = (value) => {
    const data = price;
    let array = [];
    
  }
  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };
    newFilters[category] = filters;
    if (category === "price") {
      let priceValues = handlePrice(filters);
    }
    showFilteredResults(newFilters);
    setfilters(newFilters);
  };
  return (
    <>
      {Load ? (
        <div style={{ width: "75%", margin: "3rem auto" }}>
          <div style={{ textAlign: "center" }}>
            <h2>
              Travel around the world
              <Icon type="rocket" />
            </h2>
          </div>
          <LandingPageShimmer cardsLen={8} filtersLen={2} />
        </div>
      ) : (
        <div style={{ width: "75%", margin: "3rem auto" }}>
          <div style={{ textAlign: "center" }}>
            <h2>
              Travel around the world
              <Icon type="rocket" />
            </h2>
          </div>
          <Row gutter={[16, 16]}>
            <Col lg={12} xs={24}>
              <CheckBox
                handleFilters={filters => handleFilters(filters, "continent")}
                filterProps={Filters}
                list={continentList}
              />
            </Col>
            <Col lg={12} xs={24}>
              <RadioBox
                handleFilters={filters =>
                  handleFilters(filters, "price")
                }
                filterProps={Filters}
                list={price}
              />
            </Col>
          </Row>

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
