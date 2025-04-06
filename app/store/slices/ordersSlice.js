import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [
    {
      id: 1,
      customerName: 'John Doe',
      customerId: 1,
      products: [
        { id: 1, quantity: 2, price: 24.99 }
      ],
      total: 49.98,
      status: 'Processing',
      date: '2024-03-15T10:00:00Z',
      shippingAddress: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'ST',
        zip: '12345'
      },
      paymentMethod: 'Credit Card'
    }
  ],
  status: 'idle',
  error: null
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.items.push({
        ...action.payload,
        id: state.items.length + 1,
        date: new Date().toISOString(),
        status: 'Processing'
      })
    },
    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload
      const order = state.items.find(item => item.id === id)
      if (order) {
        order.status = status
      }
    },
    deleteOrder: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    updateShippingAddress: (state, action) => {
      const { id, address } = action.payload
      const order = state.items.find(item => item.id === id)
      if (order) {
        order.shippingAddress = address
      }
    }
  }
})

export const {
  addOrder,
  updateOrderStatus,
  deleteOrder,
  updateShippingAddress
} = ordersSlice.actions

export default ordersSlice.reducer 