const courses = [
  {
    _id: 1,
    title: "Front end",
    slug: "front-end",
    authorId: 1,
    category: "frontend",
  },
  {
    _id: 2,
    title: "JavaScript Advanced React",
    slug: "javascript-advanced",
    authorId: 1,
    category: "frontend",
  },
  {
    _id: 3,
    title: "Backend PHP",
    slug: "backend-php",
    authorId: 2,
    category: "backend",
  },
  {
    _id: 4,
    title: "Python",
    slug: "python-course",
    authorId: 2,
    category: "backend",
  },
  {
    _id: 5,
    title: "Web Design",
    slug: "web-design",
    authorId: 3,
    category: "design",
  },
  {
    _id: 6,
    title: "Databases",
    slug: "databases",
    authorId: 2,
    category: "backend",
  },
  {
    _id: 7,
    title: "Clean Code",
    slug: "clean-code-humans",
    authorId: 2,
    category: "backend",
  },
  {
    _id: 8,
    title: "HTML 5",
    slug: "html-5",
    authorId: 1,
    category: "frontend",
  },
  {
    _id: 9,
    title: "Framework Laravel",
    slug: "framework-laravel",
    authorId: 2,
    category: "backend",
  },
  {
    _id: 10,
    title: "Framework Symphony",
    slug: "framework-symphony",
    authorId: 2,
    category: "backend",
  },
]

const authors = [
  {_id: 1, name: "Scott Alen"},
  {_id: 2, name: "Robert Williams"},
  {_id: 3, name: "Adam Clark"},
]

const newCourse = {
  _id: null,
  title: "",
  authorId: null,
  category: "",
}

module.exports = {
  newCourse,
  courses,
  authors,
}
