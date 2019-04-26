import React, {memo} from "react"
import PropTypes from "prop-types"
import CoursesListItem from "./CoursesListItem"

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
        <CoursesListItem
          key={course.id}
          itemID={course.id}
          to={`/course/${course.slug}`}
          index={index}
          {...course}/>
      ))}
      </tbody>
    </table>
  )
}

CoursesList.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default memo(CoursesList)
