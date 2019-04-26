import React, {useState, useEffect} from "react"
import {connect} from "react-redux"
import {loadCoursesAction} from "../../ac/coursesActions"
import {loadAuthorsAction} from "../../ac/authorsActions"
import CourseForm from "./CourseForm"
import {newCourse} from "../../../tools/mockData"

const ManageCoursesPage = ({
  courses,
  authors,
  loadAuthorsAction,
  loadCoursesAction,
  ...props
}) => {
  const [course, setCourse] = useState({...props.newCourse})
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (courses.length === 0) {
      loadCoursesAction().catch(err => {
        alert(err)
      })
    }
    if (authors.length === 0) {
      loadAuthorsAction().catch(err => {
        alert(err)
      })
    }
  }, [])

  return (
    <div className="container mt-5">
      <h1>Manage Course Page</h1>
      <CourseForm course={newCourse} authors={authors} errors={errors} />
    </div>
  )
}

function mapStateToProps(state) {
  const {courses, authors} = state
  return {
    courses,
    authors,
    newCourse,
  }
}

export default connect(
  mapStateToProps,
  {loadCoursesAction, loadAuthorsAction},
)(ManageCoursesPage)
