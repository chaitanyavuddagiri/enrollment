import './App.css'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { addStudent, removeStudent } from './redux/enroll'
import ReactPaginate from 'react-paginate'

function App() {
  const { enrollments } = useSelector((state) => state.enrollment)
  const dispatch = useDispatch()

  const [pageNumber, setPageNumber] = useState(0)

  const [name, setName] = useState('')
  const [eClass, setEclass] = useState('')
  const [courseOpted, setCourseOpted] = useState('')

  const [searchCourse, setSearchCourse] = useState('')

  const [recordsPerPage, setRecordsPerPage] = useState(2)

  const pagesVisited = pageNumber * recordsPerPage
  const pageCount = Math.ceil(enrollments.length / recordsPerPage)

  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  const enrollStudent = (event) => {
    event.preventDefault()
    if (name === '' || eClass === '' || courseOpted === '') return
    const student = {
      id: uuid(),
      name: name,
      class: eClass,
      course: courseOpted,
    }

    // console.log(student)

    dispatch(addStudent(student))
    setName('')
    setEclass('')
    setCourseOpted('')
  }

  const displayReords = enrollments
    .filter((val) => {
      return searchCourse === ''
        ? val
        : val.course.toLowerCase().includes(searchCourse.toLowerCase()) && val
    })
    .slice(pagesVisited, pagesVisited + recordsPerPage)
    .map((e) => {
      return (
        <tr key={e.id}>
          <td>{e.name}</td>
          <td>{e.class}</td>
          <td>{e.course}</td>
          <td>
            <button type="button" onClick={() => dispatch(removeStudent(e.id))}>
              Remove
            </button>
          </td>
        </tr>
      )
    })

  return (
    <>
      <form onSubmit={enrollStudent}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="student name"
        />
        <input
          type="text"
          value={eClass}
          onChange={(e) => setEclass(e.target.value)}
          placeholder="Class"
        />
        <input
          type="text"
          value={courseOpted}
          onChange={(e) => setCourseOpted(e.target.value)}
          placeholder="course"
        />
        <input type="submit" value="Enroll" />
      </form>

      {enrollments && enrollments.length > 0 ? (
        <div>
          <input
            type="text"
            value={searchCourse}
            onChange={(event) => setSearchCourse(event.target.value)}
            placeholder="Search course..."
          />
          <span>Records per page:</span>{' '}
          <button onClick={() => setRecordsPerPage(5)}>5</button>&nbsp;
          <button onClick={() => setRecordsPerPage(10)}>10</button>&nbsp;
          <button onClick={() => setRecordsPerPage(15)}>15</button>
          <br />
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Class</th>
                <th>Course</th>
                <th>Action</th>
              </tr>
            </thead>
            {displayReords}
          </table>
        </div>
      ) : (
        <p>No studends enrolled</p>
      )}
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={'paginationBttns'}
        previousLinkClassName={'previousBttn'}
        nextLinkClassName={'nextBttn'}
        disabledClassName={'paginationDisabled'}
        activeClassName={'paginationActive'}
      />
    </>
  )
}

export default App
