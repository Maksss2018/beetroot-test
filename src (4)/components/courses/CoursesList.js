import React, {memo} from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"

const CoursesList = ({courses}) => {
  console.log("render")

  return (
    <table className="table">
      <thead>
        <tr>
          <th />
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {courses.map((course, index) => (
          <tr key={course.id}>
            <td>{index + 1}</td>
            <td>
              <Link to={`/course/${course.slug}`}>{course.title}</Link>
            </td>
            <td>{course.authorName}</td>
            <td>{course.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

CoursesList.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default memo(CoursesList)
