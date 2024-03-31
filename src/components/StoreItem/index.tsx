import { FC } from "react";
import { useCart } from "../../hooks/useCart.tsx";
import { Button, Card, CardSubtitle, CardTitle } from "react-bootstrap";
import { formatCurrency } from "../../utilities/formatCurrency.ts";

type StoreItemProps = {
  id: string;
  name: string;
  author: string;
  quantity: number;
  price: number;
  image: string;
};

const StoreItem: FC<StoreItemProps> = (props) => {
  const { id, name, author, price, image } = props;
  const {
    getItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItemFromCart,
  } = useCart();

  const quantity: number = getItemQuantity(id);

  return (
    <Card className="h-100 p-3">
      <Card.Img
        variant="top"
        src={image}
        style={{ height: "320px", objectFit: "scale-down" }}
        alt={name}
      />
      <Card.Body className="d-flex flex-column">
        <CardTitle className="d-flex justify-content-between align-items-baseline">
          <span className="fs-6">{name}</span>
          <span className="ms-2 fs-5 text-muted">{formatCurrency(price)}</span>
        </CardTitle>
        <CardSubtitle className="mb-2 text-muted fs-6">{author}</CardSubtitle>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseItemQuantity(id)}>
              + Add To Cart
            </Button>
          ) : (
            <div
              className="d-flex flex-column align-items-center"
              style={{ gap: "0.5rem" }}
            >
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ gap: "0.5rem" }}
              >
                <Button size="sm" onClick={() => decreaseItemQuantity(id)}>
                  -
                </Button>
                <div>
                  <span className="fs-4">{quantity} </span>in cart
                </div>
                <Button size="sm" onClick={() => increaseItemQuantity(id)}>
                  +
                </Button>
              </div>
              <Button
                className="w-100"
                variant="danger"
                size="sm"
                onClick={() => removeItemFromCart(id)}
              >
                Remove From Cart
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
