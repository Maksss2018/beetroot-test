import C from "../constants"
import {generate as id} from "shortid"

export default function(state = [], action) {
  const {type, payload} = action
  switch (type) {
    case C.LOAD_COURSES_SUCCESS:
      return payload
    case C.CREATE_COURSE:
      return [...state, {...payload, id: id()}]
    default:
      return state
  }
}
