import React, {useState, useEffect} from "react"
import {connect} from "react-redux"
import {loadCoursesAction, saveCoursesAction} from "../../ac/coursesActions"
import {loadAuthorsAction} from "../../ac/authorsActions"
import CourseForm from "./CourseForm"
import {newCourse} from "../../../tools/mockData"

/*
* TODO: bubbling for  onChange  function
* */

const ManageCoursesPage = ({
                             courses,
                             authors,
                             loadAuthorsAction,
                             loadCoursesAction,
                             saveCoursesAction,
                             history,
                             ...props
                           }) => {
  const [course, setCourse] = useState({...props.course});
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({})

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

  function  handleChange(e) {
    const {name, value} = e.target
    const isValid = formIsValid( name, value );
    setCourse(prev => ({
      ...prev,
      [name]: name === "authorId" ? parseInt(value) : value,
    }));

    setErrors({...errors,[name]:isValid});
  }

  function onSave(e) {
    e.preventDefault()
    let flag = Object.keys(errors)
      .filter(item => errors[item].flag!==false)
      .length === 0;
    if(flag){
      setSaving(flag)
      saveCoursesAction(course).then(() => {
        history.push("/courses")
      })
    }
  }

  function formIsValid (name,value) {
    const length = value.length;
    let flag,msg,reg;
    switch (name) {
      case "title":
        reg = /<\s*a[^>]*>(.*?)<\s*\/\s*a>/g.test(value);
        flag = length === 0 || /<\s*a[^>]*>(.*?)<\s*\/\s*a>/g.test(value);
        msg = length === 0? `field is empty ` :
          reg?` you are using tag < a > `
            :` everything is correct `;
        break;
      case "authorId":
        flag = Number(value )=== -1  ;
        msg = flag ? ` select someone `
          :` everything is correct `;
        break;
      case  "category":
        flag = length === 0 || length > 9 ||  length <= 6// || value.match(//g)!==null;
        msg = length === 0? `field is empty ` :
          length > 9 ?` try  to use  less  symbols `:
            length <= 6?`dont use less then 4 symbols `
              :` length is correct `;

        if(length !== 0){
          reg = ["design","front-end","back-end"].reduce( ( acc, next ) => value.toLowerCase().includes(next)?null:acc
            ,true);
          msg = reg?`${msg} ${flag?",":"but"} this category list is only for design, front-end, back-end `
            :msg+" and the theme is also correct";
        }
        break;
      default:  flag = false;
    }
    return {flag,msg}
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
