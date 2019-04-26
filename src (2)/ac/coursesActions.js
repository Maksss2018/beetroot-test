import C from "../constants"

export const createCourseAction = course => ({
  type: C.CREATE_COURSE,
  payload: course,
})
