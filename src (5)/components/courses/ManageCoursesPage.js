import React, {useState, useEffect} from "react"
import {connect} from "react-redux"
import {loadCoursesAction, saveCoursesAction} from "../../ac/coursesActions"
import {loadAuthorsAction} from "../../ac/authorsActions"
import CourseForm from "./CourseForm"
import {newCourse} from "../../../tools/mockData"

const ManageCoursesPage = ({
  courses,
  authors,
  loadAuthorsAction,
  loadCoursesAction,
  saveCoursesAction,
  history,
  ...props
}) => {
  const [course, setCourse] = useState({...props.course})
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (courses.length === 0) {
      loadCoursesAction().catch(err => {
        alert(err)
      })
    } else {
      setCourse({...props.course})
    }

    if (authors.length === 0) {
      loadAuthorsAction().catch(err => {
        alert(err)
      })
    }
  }, [props.course])

  function handleChange(e) {
    const {name, value} = e.target
    setCourse(prev => ({
      ...prev,
      [name]: name === "authorId" ? parseInt(value) : value,
    }))
  }

  function onSave(e) {
    e.preventDefault()
    setSaving(true)
    saveCoursesAction(course).then(() => {
      history.push("/courses")
    })
  }

  return (
    <div className="container mt-5">
      <h1>Manage Course Page</h1>
      <CourseForm
        onSave={onSave}
        onChange={handleChange}
        course={course}
        authors={authors}
        errors={errors}
        saving={saving}
      />
    </div>
  )
}

function mapStateToProps(state, ownProps) {
  const {courses, authors} = state
  const slug = ownProps.match.params.slug

  const course =
    slug && courses.length > 0
      ? courses.find(c => c.slug === slug) || null
      : newCourse

  return {
    courses,
    authors,
    course,
  }
}

export default connect(
  mapStateToProps,
  {loadCoursesAction, loadAuthorsAction, saveCoursesAction},
)(ManageCoursesPage)
