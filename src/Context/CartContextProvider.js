import React, { useReducer } from "react";

export const CartContext = React.createContext({
  items: [],
  totalPrice: 0,
});

const defaultCartState = {
  items: [],
  totalPrice: 0,
};

const cartReducer = (state, action) => {
  // console.log("Inside cartReducer");
  if (action.type === "ADD") {
    // console.log("Inside dispatch action of type ADD");
    let updatedTotalPrice;
    let existingItemIndex;
    let updatedItems;
    let existingItem;

    // Precondition: Item must have already been added to the cart
    // User can add an item
    if (action.option && action.option === "ONE") {
      updatedTotalPrice = state.totalPrice + action.item.price;

      existingItemIndex = state.items.findIndex((item) => {
        return item.firebaseProductId === action.item.firebaseProductId;
      });

      existingItem = state.items[existingItemIndex];

      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }
    // User adds an item to the cart
    else {
      // Calculate the new cart price
      updatedTotalPrice =
        state.totalPrice + action.item.price * action.item.quantity;

      // Find the index of the item
      existingItemIndex = state.items.findIndex((item) => {
        return item.firebaseProductId === action.item.firebaseProductId;
      });

      // Will return falsy value if item doesn't exist
      existingItem = state.items[existingItemIndex];

      // If the item exists
      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + action.item.quantity,
        };
        // Copy the previous items array
        updatedItems = [...state.items];
        // Replace the item with the updated item
        updatedItems[existingItemIndex] = updatedItem;
      }
      // Else the item doesn't exist so we want to add the item
      else {
        // Simply add the item onto the array since it hasn't been added yet
        updatedItems = [...state.items, action.item];
      }
    }

    return {
      items: updatedItems,
      totalPrice: updatedTotalPrice,
    };
  }

  if (action.type === "REMOVE") {
    const existingItemIndex = state.items.findIndex((item) => {
      return item.firebaseProductId === action.firebaseProductId;
    });

    let updatedItems;
    const existingItem = state.items[existingItemIndex];
    // const updatedTotalPrice = state.totalPrice - existingItem.price;
    let updatedTotalPrice;

    // Case 1: Completely remove that item, no matter how many is in the quantity field
    if (action.option && action.option === "COMPLETE_REMOVE") {
      // console.log("Inside complete remove");
      updatedTotalPrice =
        state.totalPrice - existingItem.price * existingItem.quantity;
      updatedItems = state.items.filter((item) => {
        return item.firebaseProductId !== action.firebaseProductId;
      });
    } else {
      // REMOVING ONLY ONE ITEM
      updatedTotalPrice = state.totalPrice - existingItem.price;
      // Case 2: The existing item only has an quantity of 1
      if (existingItem.quantity === 1) {
        // Return a new items array without the item
        updatedItems = state.items.filter((item) => {
          return item.firebaseProductId !== action.firebaseProductId;
        });
      }
      // Case 3: There are multiple instances of the same item already in cart
      else {
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...existingItem,
          // Simply subtract one since we are only removing one item
          quantity: existingItem.quantity - 1,
        };
      }
    }

    return {
      items: updatedItems,
      totalPrice: updatedTotalPrice,
    };
  }

  if (action.type === "CLEAR") {
    return defaultCartState;
  }

  return new Error("Something went wrong");
};

export const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item, option) => {
    // console.log("Inside cart context producer addItemToCartHandler");
    dispatchCartAction({ type: "ADD", item: item, option: option });
  };

  const removeItemFromCartHandler = (firebaseProductId, option) => {
    dispatchCartAction({
      type: "REMOVE",
      firebaseProductId: firebaseProductId,
      option: option,
    });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContextValue = {
    items: cartState.items,
    totalPrice: cartState.totalPrice,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {props.children}
    </CartContext.Provider>
  );
};
