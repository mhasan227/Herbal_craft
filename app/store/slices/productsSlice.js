import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [
    {
      id: 1,
      name: 'Organic Green Tea',
      description: 'Premium quality organic green tea leaves',
      price: 24.99,
      image: '/images/products/green-tea.jpg',
      category: 'Tea',
      stock: 100,
      discount: 0,
      rating: 4.5,
      reviews: [1, 2] // Reference to review IDs
    }
  ],
  status: 'idle',
  error: null
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.items.push({
        ...action.payload,
        id: state.items.length + 1,
        reviews: []
      })
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload
        }
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    updateStock: (state, action) => {
      const { id, quantity } = action.payload
      const product = state.items.find(item => item.id === id)
      if (product) {
        product.stock -= quantity
      }
    },
    addDiscount: (state, action) => {
      const { id, discount } = action.payload
      const product = state.items.find(item => item.id === id)
      if (product) {
        product.discount = discount
      }
    }
  }
})

export const {
  addProduct,
  updateProduct,
  deleteProduct,
  updateStock,
  addDiscount
} = productsSlice.actions

export default productsSlice.reducer 