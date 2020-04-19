import React, { useEffect, useState } from "react";
import Axios from "axios";
import ProductImage from "./Sections/productImage";
import ProductInfo from "./Sections/productInfo";
import { Row, Col } from "antd";
import {addToCart} from "../../../_actions/user_actions";
import {useDispatch} from 'react-redux'
function DetailedProductPage(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.productId;
  const [Product, setProduct] = useState([]);
  console.log("productId", productId)
  useEffect(() => {
    Axios.get(`/api/products/products_by_id?id=${productId}&type=single`).then(
      res => {
        setProduct(res.data[0]);
      }
    );
  }, []);
  const addProductToCart = () => {
    dispatch(addToCart(productId))
  }
  return (
    <div className="postPage" style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{Product.title}</h1>
      </div>
      <br />
      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <ProductImage detail={Product} />
        </Col>
        <Col lg={12} xs={24}>
          <ProductInfo 
          detail={Product}
          addToCart={addProductToCart}
          />
        </Col>
      </Row>
    </div>
  );
}

export default DetailedProductPage;
