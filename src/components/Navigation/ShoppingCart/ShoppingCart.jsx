import React, { useState, useContext } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ShoppingCartContainer } from "../../../Styles/Navigation/ShoppingCart/ShoppingCart.styled";
import { useTheme } from "styled-components";
import GlobalContext from "../../../Context/globalContext";
import CartItem from "./CartItem";
import { CartContext } from "../../../Context/CartContextProvider";

import CartHeader from "./CartHeader";

export default function ShoppingCart() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const cartContext = useContext(CartContext);
  console.log("Shopping Cart Items: ", cartContext.items);

  const theme = useTheme();
  return (
    <ShoppingCartContainer colorCultured={theme.colors.colorCultured}>
      <button type="button" className="shoppingCartButton" onClick={handleShow}>
        <ShoppingCartIcon />
        <span>{cartContext.items.length}</span>
      </button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        name="end"
        style={{ backgroundColor: "#fafafa", marginTop: " 63px" }}
      >
        <Offcanvas.Header
          closeButton
          style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
        >
          <Offcanvas.Title
            style={{
              color: "#587B7F",
              fontWeight: "bold",
            }}
          >
            {/* CART */}
            <ShoppingCartIcon fontSize="large" />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div style={{ height: "400px", overflowY: "overlay" }}>
            {cartContext.items.map((product) => {
              return (
                <CartItem
                  key={product.firebaseProductId}
                  firebaseProductId={product.firebaseProductId}
                  src={product.image}
                  title={product.name}
                  price={product.price}
                  quantity={product.quantity}
                  handleClose={handleClose}
                />
              );
            })}
          </div>
          {cartContext.items.length > 0 ? (
            <CartHeader handleClose={handleClose} />
          ) : (
            ""
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </ShoppingCartContainer>
  );
}
