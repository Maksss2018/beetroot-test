import C from "../constants"
import * as courseApi from "../api/courseApi"

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

export const createSuccessCourse = course => ({
  type: C.CREATE_COURSE_SUCCESS,
  payload: course,
})

export const updateSuccessCourse = course => ({
  type: C.UPDATE_COURSE_SUCCESS,
  payload: course,
})

export const deleteCourse = id => dispatch =>{
  return courseApi
    .deleteCourse(id).then(() => {
      dispatch({
        type: C.DELETE_COURSE_SUCCESS,
        payload: {id}
      })
    }).catch(err => {
      throw err
    })

}

export const saveCoursesAction = course => dispatch => {
  return courseApi
    .saveCourse(course)
    .then(savedCourse => {
      course.id
        ? dispatch(updateSuccessCourse(savedCourse))
        : dispatch(createSuccessCourse(savedCourse))
    })
    .catch(err => {
      throw err
    })
}
