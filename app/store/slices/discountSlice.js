import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async thunks for discounts and coupons
export const fetchDiscounts = createAsyncThunk(
  'discounts/fetchDiscounts',
  async ({ page } = {}) => {
    const response = await fetch(`/api/discounts?page=${page || 1}`)
    const data = await response.json()
    return data
  }
)

export const createDiscount = createAsyncThunk(
  'discounts/createDiscount',
  async (discountData) => {
    const response = await fetch('/api/discounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(discountData),
    })
    const data = await response.json()
    return data
  }
)

export const updateDiscount = createAsyncThunk(
  'discounts/updateDiscount',
  async ({ discountId, discountData }) => {
    const response = await fetch(`/api/discounts/${discountId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(discountData),
    })
    const data = await response.json()
    return data
  }
)

export const deleteDiscount = createAsyncThunk(
  'discounts/deleteDiscount',
  async (discountId) => {
    await fetch(`/api/discounts/${discountId}`, {
      method: 'DELETE',
    })
    return discountId
  }
)

export const validateCoupon = createAsyncThunk(
  'discounts/validateCoupon',
  async (couponCode) => {
    const response = await fetch(`/api/discounts/validate/${couponCode}`)
    const data = await response.json()
    return data
  }
)

const initialState = {
  items: [],
  selectedDiscount: null,
  isLoading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
  activeCoupon: null,
  filters: {
    status: 'active',
    type: '',
  },
}

const discountSlice = createSlice({
  name: 'discounts',
  initialState,
  reducers: {
    setDiscountFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearDiscountFilters: (state) => {
      state.filters = initialState.filters
    },
    clearSelectedDiscount: (state) => {
      state.selectedDiscount = null
    },
    clearActiveCoupon: (state) => {
      state.activeCoupon = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch discounts cases
      .addCase(fetchDiscounts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchDiscounts.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload.discounts
        state.totalPages = action.payload.totalPages
        state.currentPage = action.payload.currentPage
      })
      .addCase(fetchDiscounts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      // Create discount cases
      .addCase(createDiscount.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
      })
      // Update discount cases
      .addCase(updateDiscount.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      // Delete discount cases
      .addCase(deleteDiscount.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload)
      })
      // Validate coupon cases
      .addCase(validateCoupon.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(validateCoupon.fulfilled, (state, action) => {
        state.isLoading = false
        state.activeCoupon = action.payload
      })
      .addCase(validateCoupon.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
        state.activeCoupon = null
      })
  },
})

export const {
  setDiscountFilters,
  clearDiscountFilters,
  clearSelectedDiscount,
  clearActiveCoupon,
} = discountSlice.actions
export default discountSlice.reducer 