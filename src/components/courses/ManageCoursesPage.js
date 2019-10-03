import React, {useState, useEffect} from "react"
import {connect} from "react-redux"
import {loadCoursesAction, saveCoursesAction} from "../../ac/coursesActions"
import {loadAuthorsAction} from "../../ac/authorsActions"
import CourseForm from "./CourseForm"
import {newCourse} from "../../../tools/mockData"
import Spinner from "../common/Spinner"
import {toast} from "react-toastify"

export const ManageCoursesPage = ({
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

  const handleChange = (e) => {
    const {name, value} = e.target
    setCourse(prev => ({
      ...prev,
      [name]: name === "authorId" ? parseInt(value) : value,
    }))
    setErrors(prev => ({
      ...prev,
      [name]: "",
    }))
  }

  const formIsValid = () => {
    const errors = {}
    if (!course.title) errors.title = "Title cannot be blank"
    if (!course.authorId) errors.authorId = "authorId cannot be blank"
    if (parseInt(course.authorId) === -1) errors.authorId = "Choose author"
    if (!course.category) errors.category = "Category cannot be blank"
    setErrors({...errors, onSave: "Errors!!!"})
    toast.error("Error!!!", {autoClose: false})
    return Object.keys(errors).length === 0
  }

  const onSave = (e) => {
    e.preventDefault()
    if (!formIsValid()) {
      return
    }
    setSaving(true)
    saveCoursesAction(course)
      .then(() => {
        toast.success("Course saved successfully")
        history.push("/courses")
      })
      .catch(err => {
        setErrors({onSave: "Error !!!"})
        setSaving(false)
      })
  }

  return (<ManageCoursesPageJsx
          onSave={onSave}
          onChange={handleChange}
          course={course}
          authors={authors}
          errors={errors}
          saving={saving}
          cLength={course.length}
          aLength={authors.length}
        />)
}

const ManageCoursesPageJsx = ({
                             onSave,
                             handleChange,
                             errors,
                             saving,
                             courses,
                             authors,
                             cLength,
                             aLength,
                           }) => (
    <div className="container mt-5">
      <h1>Manage Course Page</h1>
      {cLength === 0 || aLength === 0 ? (
          <Spinner />
      ) : (
          <CourseForm
              onSave={onSave}
              onChange={handleChange}
              course={courses}
              authors={authors}
              errors={errors}
              saving={saving}
          />
      )}
    </div>
);

const mapStateToProps = (state, ownProps) => {
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
};

export default connect(
  mapStateToProps,
  {loadCoursesAction, loadAuthorsAction, saveCoursesAction},
)(ManageCoursesPage)
