import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async thunks for products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ category, sort, page } = {}) => {
    // API call will be implemented here
    const response = await fetch(`/api/products?category=${category || ''}&sort=${sort || ''}&page=${page || 1}`)
    const data = await response.json()
    return data
  }
)

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id) => {
    const response = await fetch(`/api/products/${id}`)
    const data = await response.json()
    return data
  }
)

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData) => {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })
    const data = await response.json()
    return data
  }
)

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }) => {
    const response = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })
    const data = await response.json()
    return data
  }
)

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id) => {
    await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    })
    return id
  }
)

const initialState = {
  items: [],
  selectedProduct: null,
  isLoading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
  filters: {
    category: '',
    sort: '',
    search: '',
  },
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products cases
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload.products
        state.totalPages = action.payload.totalPages
        state.currentPage = action.payload.currentPage
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      // Fetch single product cases
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false
        state.selectedProduct = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      // Create product cases
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      // Update product cases
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
        if (state.selectedProduct?.id === action.payload.id) {
          state.selectedProduct = action.payload
        }
      })
      // Delete product cases
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload)
        if (state.selectedProduct?.id === action.payload) {
          state.selectedProduct = null
        }
      })
  },
})

export const { setFilters, clearFilters, clearSelectedProduct } = productSlice.actions
export default productSlice.reducer 