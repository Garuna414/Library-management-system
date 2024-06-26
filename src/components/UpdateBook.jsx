import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/updateBook.css";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateBook() {
  const [booksById, setBooksById] = useState({
    Name: "",
    Author: "",
    Pages: "",
    Rating: "",
    Genres: [],
    Status: "",
    Holder: "",
  });
  const [bookId, setBookId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    pages: "",
    rating: "",
    genres: "",
    status: "",
    holder: "",
  });

  const checkFields = () => {
    if (!formData.title) {
      formData.title = booksById.Name;
    }
    if (!formData.author) {
      formData.author = booksById.Author;
    }
    if (!formData.pages) {
      formData.pages = booksById.Pages;
    }
    if (!formData.rating) {
      formData.rating = booksById.Rating;
    }
    if (!formData.genres) {
      formData.genres = booksById.Genres.join(",");
    }
    if (!formData.status) {
      formData.status = booksById.Status;
    }
    if (!formData.holder) {
      formData.holder = booksById.Holder;
    }
    console.log(formData);
    return 1;
  };

  const checkId = () => {
    if (!bookId) {
      alert("Please enter book ID");
      return 0;
    } else {
      console.log(typeof formData.rating);
      return 1;
    }
  };

  const handleSubmitById = (e) => {
    e.preventDefault();
    console.log("ID entered:", bookId);
    if (checkId()) {
      console.log("Form data:", formData);
      axios
        .get(`http://localhost:5000/find/${bookId}`)
        .then((res) => {
          if (res.data._id) {
            console.log("Result", res);
            setBooksById({
              ...booksById,
              Name: res.data.Name,
              Author: res.data.Author,
              Pages: res.data.Pages,
              Rating: res.data.Rating,
              Genres: res.data.Genres,
              Status: res.data.Status,
              Holder: res.data.Holder,
            });
          } else {
            failureNotify();
          }
        })
        .catch((err) => {
          failureNotify();
          console.log(err);
        });
    } else {
      failureNotify();
      console.log("Form data:", formData);
    }
  };

  const handleUpdateFormChange = (e) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "pages" || name === "rating" ? parseInt(value) : value;
    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  const handleUpdateFormSubmit = (e) => {
    e.preventDefault();
    if (checkFields()) {
      axios
        .put(`http://localhost:5000/update/${bookId}`, formData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }) //Without the headers field, the form doesnt work.
        .then((res) => {
          setFormData({
            title: "",
            author: "",
            pages: "",
            rating: "",
            genres: "",
            Status: "",
            Holder: "",
          });
          notify();
        })
        .catch((err) => {
          failureNotify();
          console.log(err);
        });
    } else {
      failureNotify();
    }
  };

  const notify = () =>
    toast.success("Book updated successfully.", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  const failureNotify = () =>
    toast.error("Cannot find book.", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  return (
    <div className="updateBookMainContainer">
      <div className="updateBookTopContainer">
        <div className="updateBookLeftContainer">
          <h1>Find book by ID</h1>
          <br />
          <form onSubmit={handleSubmitById}>
            <div className="dropdown">
              <div className="idSearchParamBox">
                <p className="idSearchParam">Book ID</p>
              </div>
              <input
                type="text"
                name="title"
                className="formInput"
                id="searchData"
                value={bookId}
                onChange={(e) => {
                  setBookId(e.target.value);
                }}
              />
            </div>
            <br />
            <input type="submit" className="submitBtn" value="Find Book" />
          </form>
        </div>
        <div className="updateBookRightContainer">
          <div className="bookContainerById">
            <p className="bookByIdInfo">Name: {booksById.Name}</p>
            <p className="bookByIdInfo">Author: {booksById.Author}</p>
            <p className="bookByIdInfo">Pages: {booksById.Pages}</p>
            <p className="bookByIdInfo">Rating: {booksById.Rating}</p>
            <p className="bookByIdInfo">
              Genres: {booksById.Genres && booksById.Genres.join(", ")}
            </p>
            <p className="bookByIdInfo">Status: {booksById.Status}</p>
            <p className="bookByIdInfo">Holder: {booksById.Holder}</p>
          </div>
        </div>
      </div>
      <br />
      <br />
      <h1>Update book details</h1>
      <div className="updateBookBottomContainer">
        <form onSubmit={handleUpdateFormSubmit} className="updateForm">
          <div className="formField">
            <label id="title" className="labelText">
              Title of book
            </label>
            <input
              type="text"
              name="title"
              className="updateBookFormInput"
              id="title"
              value={formData.title}
              onChange={handleUpdateFormChange}
            />
          </div>
          <br />
          <div className="formField">
            <label id="author" className="labelText">
              Author of book
            </label>
            <input
              type="text"
              name="author"
              className="updateBookFormInput"
              id="author"
              value={formData.author}
              onChange={handleUpdateFormChange}
            />
          </div>
          <br />
          <div className="formField">
            <label id="pages" className="labelText">
              Number of pages
            </label>
            <input
              type="number"
              name="pages"
              className="updateBookFormInput"
              id="pages"
              value={formData.pages}
              onChange={handleUpdateFormChange}
            />
          </div>
          <br />
          <div className="formField">
            <label id="rating" className="labelText">
              Rating
            </label>
            <input
              type="number"
              name="rating"
              className="updateBookFormInput"
              id="rating"
              value={formData.rating}
              onChange={handleUpdateFormChange}
            />
          </div>
          <br />
          <div className="formField">
            <label id="genre" className="labelText">
              Comma separated genres
            </label>
            <input
              type="text"
              name="genres"
              className="updateBookFormInput"
              id="genres"
              value={formData.genres}
              onChange={handleUpdateFormChange}
            />
          </div>
          <br />
          <input type="submit" className="submitBtn" value="Update Book" />
        </form>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}

export default UpdateBook;
