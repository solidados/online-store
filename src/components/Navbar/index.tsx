import { Button, Container, Nav, Navbar as NavBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useCart } from "../../hooks/UseCart.tsx";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const { openCart, cartQuantity } = useCart();

  return (
    <NavBs className="bg-white shadow-sm mb-3" sticky="top">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to="/store" as={NavLink}>
            Store
          </Nav.Link>
          <Nav.Link to="/about" as={NavLink}>
            About
          </Nav.Link>
        </Nav>
        {cartQuantity > 0 && (
          <Button
            onClick={openCart}
            className="d-flex justify-content-center align-items-center rounded-circle"
            style={{
              position: "relative",
              width: "2.4rem",
              height: "2.4rem",
            }}
            variant="outline-primary"
          >
            <FaShoppingCart className="position-absolute fs-4" />
            <div
              className="d-flex justify-content-center align-items-center rounded-circle bg-danger text-white"
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "30px",
                padding: "5px 8px",
                transform: "translate(75%, 25%)",
                fontSize: "0.9rem",
              }}
            >
              {cartQuantity}
            </div>
          </Button>
        )}
      </Container>
    </NavBs>
  );
};

export default Navbar;
