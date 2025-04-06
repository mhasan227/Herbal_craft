import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async thunks for reviews
export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async ({ productId, page, filters } = {}) => {
    const response = await fetch(`/api/reviews?productId=${productId || ''}&page=${page || 1}`)
    const data = await response.json()
    return data
  }
)

export const createReview = createAsyncThunk(
  'reviews/createReview',
  async (reviewData) => {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    })
    const data = await response.json()
    return data
  }
)

export const updateReview = createAsyncThunk(
  'reviews/updateReview',
  async ({ reviewId, reviewData }) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    })
    const data = await response.json()
    return data
  }
)

export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async (reviewId) => {
    await fetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE',
    })
    return reviewId
  }
)

const initialState = {
  items: [],
  selectedReview: null,
  isLoading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
  filters: {
    rating: '',
    sortBy: 'newest',
  },
}

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setReviewFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearReviewFilters: (state) => {
      state.filters = initialState.filters
    },
    clearSelectedReview: (state) => {
      state.selectedReview = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch reviews cases
      .addCase(fetchReviews.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload.reviews
        state.totalPages = action.payload.totalPages
        state.currentPage = action.payload.currentPage
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      // Create review cases
      .addCase(createReview.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
      })
      // Update review cases
      .addCase(updateReview.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      // Delete review cases
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload)
      })
  },
})

export const { setReviewFilters, clearReviewFilters, clearSelectedReview } = reviewSlice.actions
export default reviewSlice.reducer 