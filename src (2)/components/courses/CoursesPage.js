import React, {useState} from "react"
import {connect} from "react-redux"
import {createCourseAction} from "../../ac/coursesActions"

const initForm = {
  title: "",
}

const CoursesPage = ({courses, createCourseAction}) => {
  const [form, setForm] = useState(initForm)

  const handleChange = e => {
    const {name, value} = e.target
    setForm(prev => ({...prev, [name]: value}))
  }

  const handleSubmit = e => {
    e.preventDefault()
    createCourseAction(form)
    setForm(initForm)
  }

  return (
    <div className="container mt-5">
      <h1>Courses Page</h1>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                value={form.title}
                onChange={handleChange}
                name="title"
                id="title"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary">Add Course</button>
            </div>
          </div>
        </div>
      </form>

      {courses.map(course => (
        <p key={course._id}>{course.title}</p>
      ))}
    </div>
  )
}

function mapStateToProps(state) {
  const {courses} = state
  return {
    courses,
  }
}

export default connect(
  mapStateToProps,
  {createCourseAction},
)(CoursesPage)
