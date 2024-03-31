import { FC } from "react";
import { useCart } from "../../hooks/useCart.tsx";
import storeItems from "../../data/books.json";
import { Button, Stack } from "react-bootstrap";
import { formatCurrency } from "../../utilities/formatCurrency.ts";

interface CartItemProps {
  id: string;
  quantity: number;
}

const CartItem: FC<CartItemProps> = ({ id, quantity }) => {
  const { removeItemFromCart } = useCart();
  const item = storeItems.find((item) => item.id === id);
  if (item == null) return null;

  return (
    <Stack className="d-flex align-items-center" direction="horizontal" gap={2}>
      <img
        src={item.image}
        style={{ width: "125px", height: "75px", objectFit: "scale-down" }}
        alt={item.name}
      />
      <div className="me-auto">
        <div>
          <span
            style={{
              fontSize: "0.8rem",
              fontWeight: "300",
              marginRight: "5px",
            }}
          >
            {item.name}
          </span>
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: "0.65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: "0.75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
      <Button
        onClick={() => removeItemFromCart(item.id)}
        variant="outline-danger"
        size="sm"
      >
        &times;
      </Button>
    </Stack>
  );
};

export default CartItem;
