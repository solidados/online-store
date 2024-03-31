import storeItems from "../../data/books.json";
import { Col, Row } from "react-bootstrap";
import StoreItem from "../../components/StoreItem";

const Store = () => {
  return (
    <>
      <h1>Store</h1>
      <div className="w-100 d-flex justify-content-center flex-wrap">
        <Row className="g-4 w-75" lg={3} md={2} xs={1}>
          {storeItems.map((item) => (
            <Col key={item.id}>
              <StoreItem {...item} />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default Store;
