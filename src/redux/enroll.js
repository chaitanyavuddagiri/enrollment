import { createSlice } from '@reduxjs/toolkit'

const initialState= {
  enrollments: [],
}
export const enrollSlice = createSlice({
  name: 'enrollment',
  initialState, 
  reducers: {
    addStudent: (state, action) => {      
      return {...state, enrollments: [...state.enrollments, action.payload]}
    },
    removeStudent: (state, action) => {
      console.log(action.payload)
      return {...state, enrollments: [...state.enrollments.filter((s) => s.id !== action.payload)]}
    },
  },
})

export const { addStudent, removeStudent } = enrollSlice.actions

export default enrollSlice.reducer
