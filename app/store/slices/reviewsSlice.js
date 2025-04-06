import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [
    {
      id: 1,
      productId: 1,
      userId: 1,
      userName: 'John Doe',
      rating: 4,
      comment: 'Great product! Very fresh and aromatic.',
      date: '2024-03-14T15:30:00Z',
      helpful: 5,
      images: []
    },
    {
      id: 2,
      productId: 1,
      userId: 2,
      userName: 'Jane Smith',
      rating: 5,
      comment: 'Best green tea I have ever tried.',
      date: '2024-03-13T10:15:00Z',
      helpful: 3,
      images: []
    }
  ],
  status: 'idle',
  error: null
}

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview: (state, action) => {
      state.items.push({
        ...action.payload,
        id: state.items.length + 1,
        date: new Date().toISOString(),
        helpful: 0
      })
    },
    updateReview: (state, action) => {
      const { id, ...updates } = action.payload
      const review = state.items.find(item => item.id === id)
      if (review) {
        Object.assign(review, updates)
      }
    },
    deleteReview: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    markHelpful: (state, action) => {
      const review = state.items.find(item => item.id === action.payload)
      if (review) {
        review.helpful += 1
      }
    },
    addImages: (state, action) => {
      const { id, images } = action.payload
      const review = state.items.find(item => item.id === id)
      if (review) {
        review.images = [...review.images, ...images]
      }
    }
  }
})

export const {
  addReview,
  updateReview,
  deleteReview,
  markHelpful,
  addImages
} = reviewsSlice.actions

export default reviewsSlice.reducer 