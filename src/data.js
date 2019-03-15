import { generate as id } from "shortid";

const  defaultState = [
  { value: "Pants", id: id(), packed: false },
  { value: "Jacket", id: id(), packed: false },
  { value: "iPhone Charger", id: id(), packed: false },
  { value: "MacBook", id: id(), packed: false },
  { value: "Sleeping Pills", id: id(), packed: true },
  { value: "Underwear", id: id(), packed: false },
  { value: "Hat", id: id(), packed: false },
  { value: "T-Shirts", id: id(), packed: false },
  { value: "Belt", id: id(), packed: false },
  { value: "Passport", id: id(), packed: true },
  { value: "Sandwich", id: id(), packed: true }
];

export default  defaultState ;