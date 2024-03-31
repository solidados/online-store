import { Context, createContext, FC, ReactNode, useState } from "react";

type CartProviderProps = {
  children: ReactNode;
};

type CartItemType = {
  id: string;
  quantity: number;
};

type CartContextType = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: string) => number;
  increaseItemQuantity: (id: string) => void;
  decreaseItemQuantity: (id: string) => void;
  removeItemFromCart: (id: string) => void;
  cartQuantity: number;
  cartItems: CartItemType[];
};

export const CartContext: Context<CartContextType> = createContext(
  {} as CartContextType,
);

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const cartQuantity: number = cartItems.reduce(
    (quantity: number, item: CartItemType) => quantity + item.quantity,
    0,
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const getItemQuantity = (id: string) => {
    return (
      cartItems.find((item: CartItemType): boolean => item.id === id)
        ?.quantity || 0
    );
  };

  const increaseItemQuantity = (id: string): void => {
    setCartItems((currItems: CartItemType[]) => {
      if (
        currItems.find((item: CartItemType): boolean => item.id === id) == null
      ) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item: CartItemType) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
    });
  };

  const decreaseItemQuantity = (id: string): void => {
    setCartItems((currItems: CartItemType[]) => {
      if (
        currItems.find((item: CartItemType): boolean => item.id === id)
          ?.quantity === 1
      ) {
        return currItems.filter(
          (item: CartItemType): boolean => item.id !== id,
        );
      } else {
        return currItems.map((item: CartItemType) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        );
      }
    });
  };

  const removeItemFromCart = (id: string): void => {
    setCartItems((currItems: CartItemType[]) =>
      currItems.filter((item: CartItemType): boolean => item.id !== id),
    );
  };

  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeItemFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
