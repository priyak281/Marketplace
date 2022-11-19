import React from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import { excerpt } from "../utility";
import { useState } from "react";

const BlogSection = ({ blogs, user, handleDelete }) => {
  const userId = user?.uid;
  const [serachTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <form className="form-inline">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={handleChange}
        />
      </form>
      <div className="blog-heading text-start py-2 mb-4 mx-auto">
        <h1 className="" style={{ fontWeight: "bold", color: "#45418d" }}>
          Artists
        </h1>
      </div>
      {blogs
        ?.filter((item) => {
          if (serachTerm == "") {
            return item;
          } else if (
            item.author.toLowerCase().includes(serachTerm.toLowerCase())
          ) {
            return item;
          }
        })
        .map((item) => (
          <div className="row pb-4" key={item.id}>
            <div className="col-md-5">
              <div className="hover-blogs-img">
                <div className="blogs-img">
                  <img src={item.imgUrl} alt={item.title} />
                  <div></div>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="text-start">
                <h6 className="category catg-color">{item.category}</h6>
                <span className="title py-2">{item.title}</span>
                <span className="meta-info">
                  <p className="author">{item.author}</p> -&nbsp;
                  {item.timestamp.toDate().toDateString()}
                </span>
              </div>
              <div className="short-description text-start" style={{}}>
                {excerpt(item.description, 120)}
              </div>
              <Link to={`/detail/${item.id}`}>
                <button className="btn btn-read">Read More</button>
              </Link>
              {userId && item.userId === userId && (
                <div style={{ float: "right" }}>
                  <FontAwesome
                    name="trash"
                    style={{ margin: "15px", cursor: "pointer" }}
                    size="2x"
                    onClick={() => handleDelete(item.id)}
                  />
                  <Link to={`/update/${item.id}`}>
                    <FontAwesome
                      name="edit"
                      style={{ cursor: "pointer" }}
                      size="2x"
                    />
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default BlogSection;
