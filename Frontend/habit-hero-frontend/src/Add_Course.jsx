import React,{useState} from "react";
import addCourseStyle from "./Add_Course.module.css";

const Add_Course = () => {
  const [input,setInput]=useState({
    coursename:'',
    topic:'',
    hour:''
  })


  const handleClick = (e) =>{
    setInput({
      ...input,[e.target.name]:e.target.value
    })
  }

  const handleSubmit = () =>{
    alert("Submited course : "+input.coursename + " " + input.topic + " " + input.hour)


    setInput({
    coursename:'',
    topic:'',
    hour:''
    })
  }


  return (
    <>
      {/* -------------------------------nav bar------------------------------- */}

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {/* <div className={addCourseStyle["navbar-background"]}> */}
        <a href="/" className={addCourseStyle["previous"]}>
          &laquo; Previous
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/">
                About <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Profile <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Contact<span className="sr-only">(current)</span>
              </a>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Courses
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/">
                  All Courses
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/">
                  Assigned Courses
                </a>
              </div>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
        {/* </div> */}
      </nav>

      {/* -------------------------------Body------------------------------- */}
      <body>
        <div className={addCourseStyle["wholediv"]}>
          <div className={addCourseStyle["elements"]}>
            <div className={addCourseStyle["add-course-div-long"]}>
              <div className={addCourseStyle["add-course-div-short"]}>
                <label className="add-course-label" />
                Add Course
              </div>
            </div>

            <div className={addCourseStyle["fields"]}>
              <div className={addCourseStyle["inside-fields"]}>
                <div className={addCourseStyle["i-l-cname"]}>
                  <div className={addCourseStyle["c-label"]}>
                    <label className="c-label" />
                    Course Name
                  </div>
                  <input type="text" 
                  name="coursename"
                  value={input.coursename}
                  onChange={handleClick}
                  className={addCourseStyle["c-input"]} />
                </div>

                <div className={addCourseStyle["i-l-topic"]}>
                  <div className={addCourseStyle["t-label"]}>
                    <label />
                    Topic
                  </div>
                  <input type="text" 
                  name="topic"
                  value={input.topic}
                  onChange={handleClick}
                  className={addCourseStyle["t-input"]} />
                </div>

                <div className={addCourseStyle["i-l-EstHr"]}>
                  <div className={addCourseStyle["e-label"]}>
                    <label />
                    Estimated Hours
                  </div>
                  <input type="text"
                  name="hour"
                  value={input.hour}
                  onChange={handleClick}
                  className={addCourseStyle["e-input"]} />
                </div>
              </div>
            </div>

            <div className={addCourseStyle["buttons"]}>
              <div className={addCourseStyle["btn"]}>
                <button 
                onClick={handleSubmit}
                className={addCourseStyle["the-button1"]}>
                  Add Course
                </button>
              </div>

           


            </div>

            <div className={addCourseStyle["btn"]}>
                <button 
                className={addCourseStyle["the-button2"]}>
                  View Course
                </button>
              </div>


          </div>
        </div>
      </body>
    </>
  );
};

export default Add_Course;
