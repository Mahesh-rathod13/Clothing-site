import { hookstate, useHookstate } from "@hookstate/core"

// Get stored values from localStorage
const getStoredItem = (key, defaultValue, parser) => {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) return defaultValue;
    try {
        return parser(storedValue);
    } catch (e) {
        console.error(`Error parsing ${key} from localStorage:`, e);
        return defaultValue;
    }
};

// Initialize state with values from localStorage
const ProductCartState = hookstate({
    cartItems: getStoredItem("cartItems", [], JSON.parse),
    totalPrice: getStoredItem("totalPrice", 50, parseFloat),
    totalCount: getStoredItem("totalCount", 0, parseInt),
    totalDiscount: getStoredItem("totalDiscount", 0, parseFloat),
});

export const useProductCartState = () => {
    const state = useHookstate(ProductCartState);

    // Save state to localStorage
    const persistState = () => {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems.value));
        localStorage.setItem("totalPrice", String(state.totalPrice.value));
        localStorage.setItem("totalCount", String(state.totalCount.value));
        localStorage.setItem("totalDiscount", String(state.totalDiscount.value));
    };

    // Calculate and update totals based on cart items
    const updateTotals = () => {
        // Using .value instead of .get() for proper nested state handling
        const cartItems = state.cartItems.value;

        // Calculate total count and price
        const totalCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
        const totalPrice = cartItems.reduce((total, item) =>
            total + ((item.price || 0) * (item.quantity || 0)), 0);

        // Update state using proper nested state paths
        state.totalCount.set(totalCount);
        state.totalPrice.set(totalPrice);

        // Persist changes to localStorage
        persistState();
    };

    return {
        getState: ()=> state.get(),

        addToCart: (item) => {
            const currentCartItems = state.cartItems.value;
            const existingItemIndex = currentCartItems.findIndex(
                (cartItem) => cartItem.id === item.id
            );

            if (existingItemIndex > -1) {
                // Efficiently update only the quantity of the existing item
                state.cartItems[existingItemIndex].merge({
                    quantity: currentCartItems[existingItemIndex].quantity + item.quantity
                });
            } else {
                // Efficiently append new item
                state.cartItems[state.cartItems.length].set(item);
            }

            updateTotals();
        },

        removeFromCart: (itemId) => {
            state.cartItems.set(
                p=> p.filter(item => item.id !== itemId)    
            );

            updateTotals();
        },

        updateItemQuantity: (itemId, newQuantity) => {
            console.log(itemId, newQuantity)
            const itemIndex = state.get().cartItems.findIndex(item => item.id === itemId);

            if (itemIndex === -1) return; // Item not found

            if (newQuantity <= 0) {
                // Remove item if quantity is zero or negative
                const updatedCartItems = state.get().cartItems.filter(item => item.id !== itemId);
                // state.cartItems.set(updatedCartItems);
                console.log(updatedCartItems)
            } else {
                // Update quantity using proper nested state access
                state.cartItems[itemIndex].merge({ quantity: newQuantity });
            }

            updateTotals();
        },

        clearCart: () => {
            // Set empty values
            state.cartItems.set([]);
            state.totalPrice.set(0);
            state.totalCount.set(0);
            state.totalDiscount.set(0);

            // Clear localStorage
            localStorage.removeItem("cartItems");
            localStorage.removeItem("totalPrice");
            localStorage.removeItem("totalCount");
            localStorage.removeItem("totalDiscount");
        },

        setTotalDiscount: (discount) => {
            state.totalDiscount.set(discount);
            localStorage.setItem("totalDiscount", String(discount));
        },

        // Getters using .value for proper access
        getCartItems: () => state.cartItems.value,
        getTotalPrice: () => state.totalPrice.value,
        getTotalCount: () => state.totalCount.value,
        getTotalDiscount: () => state.totalDiscount.value,

        getCartItemCount: () => {
            return state.cartItems.value.reduce((total, item) => total + (item.quantity || 0), 0);
        },

        getCartItemQuantity: (itemId) => {
            const item = state.cartItems.value.find(item => item.id === itemId);
            return item ? item.quantity : 0;
        },

        getCartItemPrice: (itemId) => {
            const item = state.cartItems.value.find(item => item.id === itemId);
            return item ? item.price : 0;
        },

        getFinalPrice: () => {
            return Math.max(0, state.totalPrice.value - state.totalDiscount.value);
        },
    };
};