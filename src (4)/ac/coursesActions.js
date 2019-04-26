import C from "../constants"
import * as courseApi from "../api/courseApi"

export const createCourseAction = course => ({
  type: C.CREATE_COURSE,
  payload: course,
})

export const loadCoursesAction = () => {
  return function(dispatch) {
    return courseApi
      .getCourses()
      .then(courses => {
        dispatch({
          type: C.LOAD_COURSES_SUCCESS,
          payload: courses,
        })
      })
      .catch(err => {
        throw err
      })
  }
}
