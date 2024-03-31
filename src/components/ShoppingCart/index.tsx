import { FC } from "react";
import { useCart } from "../../hooks/UseCart.tsx";
import { Offcanvas, Stack } from "react-bootstrap";

import CartItem from "../CartItem";

type ShoppingCartProps = {
  isOpen: boolean;
};

const ShoppingCart: FC<ShoppingCartProps> = ({ isOpen }) => {
  const { closeCart, cartItems } = useCart();
  return (
    <Offcanvas onHide={closeCart} show={isOpen} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
