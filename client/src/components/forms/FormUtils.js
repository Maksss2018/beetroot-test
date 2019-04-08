const setValue = {
    text: v => v,
    textarea: v => v,
    email: v => v,
    password: v => v,
    number: v => Number(v),
    checkbox: v => v.checked,
}

const setFormObject = (fn, data) => ({target: {type, name, value}}) =>
    fn({
        ...data,
        [name]: setValue[type](value),
    })
export default setFormObject
