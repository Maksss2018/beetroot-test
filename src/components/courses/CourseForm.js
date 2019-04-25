import React from "react"
import PropTypes from "prop-types"
import TextInput from "../common/TextInput"
import SelectInput from "../common/SelectInput"

const CourseForm = ({course, authors, onSave, onChange, saving, errors}) => {
  return (
    <form onSubmit={onSave} className="col-md-4">
      <h2>{course.id ? "Update" : "Create"} course</h2>
      {errors.onSave && (
        <div className="alert alert-danger">{errors.onSave}</div>
      )}
      <TextInput
        name="title"
        label="Title"
        onChange={onChange}
        value={course.title}
        error={errors.title}
      />

      <SelectInput
        name="authorId"
        label="Author"
        onChange={onChange}
        defaultOption="Choose author"
        value={course.authorId || ""}
        options={authors.map(a => ({
          value: a.id,
          text: a.name,
        }))}
        error={errors.authorId}
      />

      <TextInput
        name="category"
        label="Category"
        onChange={onChange}
        value={course.category}
        error={errors.category}
      />

      <button className="btn btn-primary btn-lg" disabled={saving}>
        {saving ? "Saving" : "Save"}
      </button>
    </form>
  )
}

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object,
}

export default CourseForm
