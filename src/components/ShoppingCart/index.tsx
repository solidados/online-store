import { FC } from "react";
import { useCart } from "../../hooks/useCart.tsx";
import { Offcanvas, Stack } from "react-bootstrap";

import CartItem from "../CartItem";
import { formatCurrency } from "../../utilities/formatCurrency.ts";

import storeItems from "../../data/books.json";

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
          <div className="ms-auto fw-bold fs-5">
            Total:{" "}
            {formatCurrency(
              cartItems.reduce((total: number, cartItem) => {
                const item = storeItems.find(
                  (item): boolean => item.id === cartItem.id,
                );
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0),
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
