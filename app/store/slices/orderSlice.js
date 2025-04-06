import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async thunks for orders
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData) => {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
    const data = await response.json()
    return data
  }
)

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async ({ page, limit, status } = {}) => {
    const response = await fetch(
      `/api/orders?page=${page || 1}&limit=${limit || 10}&status=${status || ''}`
    )
    const data = await response.json()
    return data
  }
)

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (id) => {
    const response = await fetch(`/api/orders/${id}`)
    const data = await response.json()
    return data
  }
)

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ id, status }) => {
    const response = await fetch(`/api/orders/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    })
    const data = await response.json()
    return data
  }
)

const initialState = {
  orders: [],
  selectedOrder: null,
  isLoading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
  filters: {
    status: '',
    dateRange: null,
  },
}

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrderFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearOrderFilters: (state) => {
      state.filters = initialState.filters
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Create order cases
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.orders.unshift(action.payload)
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      // Fetch orders cases
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.orders = action.payload.orders
        state.totalPages = action.payload.totalPages
        state.currentPage = action.payload.currentPage
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      // Fetch single order cases
      .addCase(fetchOrderById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.isLoading = false
        state.selectedOrder = action.payload
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      // Update order status cases
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(order => order.id === action.payload.id)
        if (index !== -1) {
          state.orders[index] = action.payload
        }
        if (state.selectedOrder?.id === action.payload.id) {
          state.selectedOrder = action.payload
        }
      })
  },
})

export const { setOrderFilters, clearOrderFilters, clearSelectedOrder } = orderSlice.actions
export default orderSlice.reducer 