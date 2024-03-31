import { useContext } from "react";
import { CartContext } from "../context/CartContext.tsx";

export const useCart = () => useContext(CartContext);
