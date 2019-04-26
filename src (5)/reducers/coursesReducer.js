import C from "../constants"

export default function(state = [], action) {
  const {type, payload} = action
  switch (type) {
    case C.LOAD_COURSES_SUCCESS:
      return payload
    case C.CREATE_COURSE_SUCCESS:
      return [...state, {...payload}]
    case C.UPDATE_COURSE_SUCCESS:
      return state.map(course => (course.id === payload.id ? payload : course))
    default:
      return state
  }
}
