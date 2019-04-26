import React,{useState} from "react"
import {connect} from "react-redux"
import {deleteCourse} from "../../ac/coursesActions"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"


const CoursesListItem =({
                           index,
                           title,
                           authorName,
                           category,
                           to,
                           itemID,
                           deleteCourse
                         }) => {
  const handleDelete = (e) => {
   e.preventDefault();
   deleteCourse(itemID);
 };
  return (
    <tr >
      <td>{index + 1}</td>
      <td>
        <Link to={to}>{title}</Link>
      </td>
      <td>{authorName}</td>
      <td>{category}</td>
      <td
        className={`m-1 btn btn-danger btn-small`}
        onClick={handleDelete}>x</td>
    </tr>
  )
}


CoursesListItem.propTypes = {
  index:PropTypes.number.isRequired,
  title:PropTypes.string.isRequired,
  authorName:PropTypes.string.isRequired,
  category:PropTypes.string.isRequired,
  to:PropTypes.string.isRequired,
  itemID:PropTypes.number.isRequired,
  deleteCourse :PropTypes.func.isRequired
}

export default connect(false,{deleteCourse})(CoursesListItem)