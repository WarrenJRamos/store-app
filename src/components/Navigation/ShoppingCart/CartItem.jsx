import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../Context/CartContextProvider";
import { CartItemContainer } from "../../../Styles/Navigation/ShoppingCart/CartItem.styled";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
// import DeleteIcon from '@mui/icons-material/Delete';
export default function CartItem(props) {
  const cartContext = useContext(CartContext);
  const navigate = useNavigate();

  const onItemClick = () => {
    navigate(`/items/${props.firebaseProductId}`);
    props.handleClose(false);
  };

  const onAddOneItem = () => {
    // console.log('Adding item with name:', props.title);
    cartContext.addItem(
      {
        firebaseProductId: props.firebaseProductId,
        name: props.title,
        price: props.price,
        image: props.image,
        quantity: props.quantity,
      },
      "ONE"
    );
  };

  const onRemoveOneItem = () => {
    cartContext.removeItem(props.firebaseProductId);
  };

  const onRemoveOneItemCompletely = () => {
    cartContext.removeItem(props.firebaseProductId, "COMPLETE_REMOVE");
  };

  return (
    <CartItemContainer className="cart-item">
      <button
        onClick={onRemoveOneItemCompletely}
        className="cart-item--remove-completely"
      >
        {/* <DeleteIcon /> */}
        <ClearIcon />
      </button>
      <button onClick={onItemClick} className="cart-item__image">
        <img src={props.src} alt="item" />
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "7px",
        }}
      >
        <span className="cart-item__title">
          {props.title}
          {/* <span className='amount'>({props.amount})</span> */}
        </span>

        <span className="cart-item__qty">QTY: {props.quantity}</span>
        <span className="cart-item__price">PRICE : ${props.price}</span>
        <div className="cart-item__actions">
          <button className="cart-item__actions--add" onClick={onAddOneItem}>
            <AddIcon />
          </button>
          <button
            className="cart-item__actions--remove"
            onClick={onRemoveOneItem}
          >
            <RemoveIcon />
          </button>
        </div>
      </div>
    </CartItemContainer>
  );
}
