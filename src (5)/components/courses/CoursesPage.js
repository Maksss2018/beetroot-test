import React, {useState, useEffect, useMemo} from "react"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import {loadCoursesAction} from "../../ac/coursesActions"
import {loadAuthorsAction} from "../../ac/authorsActions"
import CoursesList from "./CoursesList"

const CoursesPage = ({
  courses,
  authors,
  loadAuthorsAction,
  loadCoursesAction,
}) => {
  const [redirect, setRedirect] = useState(false)

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

  const memoCourses = useMemo(() => {
    return courses.map(course => ({
      ...course,
      authorName: authors.find(a => a.id === course.authorId).name,
    }))
  }, [courses, authors])

  return (
    <div className="container mt-5">
      {redirect && <Redirect to="/course" />}
      <h1>Courses Page</h1>
      <button
        onClick={() => setRedirect(true)}
        className="btn btn-primary mb-5"
      >
        Create course
      </button>

      <CoursesList courses={memoCourses} />
    </div>
  )
}

function mapStateToProps(state) {
  const {courses, authors} = state
  return {
    courses: authors.length === 0 ? [] : courses,
    authors,
  }
}

export default connect(
  mapStateToProps,
  {loadCoursesAction, loadAuthorsAction},
)(CoursesPage)
