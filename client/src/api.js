import axios from "axios"

export default {
    films: {
        getFilm: (_id) => axios.get(`/api/films/${_id}`).then(res => res),
        fetchAll: () => axios.get("/api/films").then(res => res.data.films),
        create: film => axios.post("/api/films", {film}).then(res => res.data.film),
        update: film =>
            axios.put(`/api/films/${film._id}`, {film}).then(res => res.data.film),
        delete: ({_id}) => axios.delete(`/api/films/${_id}`)
    },
}
