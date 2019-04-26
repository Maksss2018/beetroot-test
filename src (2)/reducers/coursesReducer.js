import C from "../constants"
import {generate as id} from "shortid"

export default function(state = [], action) {
  const {type, payload} = action
  switch (type) {
    case C.CREATE_COURSE:
      return [...state, {...payload, _id: id()}]
    default:
      return state
  }
}
