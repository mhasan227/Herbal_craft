import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  shippingCost: 5.99,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload
      const existingItem = state.items.find(item => item.id === newItem.id)
      
      if (existingItem) {
        existingItem.quantity += newItem.quantity || 1
      } else {
        state.items.push({
          ...newItem,
          quantity: newItem.quantity || 1
        })
      }
      
      // Recalculate totals
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0)
      state.totalAmount = state.items.reduce((total, item) => {
        const price = item.price * (100 - item.discount) / 100
        return total + (price * item.quantity)
      }, 0)
    },
    
    removeFromCart: (state, action) => {
      const id = action.payload
      state.items = state.items.filter(item => item.id !== id)
      
      // Recalculate totals
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0)
      state.totalAmount = state.items.reduce((total, item) => {
        const price = item.price * (100 - item.discount) / 100
        return total + (price * item.quantity)
      }, 0)
    },
    
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find(item => item.id === id)
      
      if (item) {
        item.quantity = Math.max(1, quantity) // Ensure quantity is at least 1
      }
      
      // Recalculate totals
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0)
      state.totalAmount = state.items.reduce((total, item) => {
        const price = item.price * (100 - item.discount) / 100
        return total + (price * item.quantity)
      }, 0)
    },
    
    clearCart: (state) => {
      state.items = []
      state.totalQuantity = 0
      state.totalAmount = 0
    },
    
    applyCoupon: (state, action) => {
      const discount = action.payload
      state.totalAmount = state.totalAmount * (100 - discount) / 100
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, applyCoupon } = cartSlice.actions
export default cartSlice.reducer 