import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditFilm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getFilmById();
  }, []);

  const getFilmById = async () => {
    const response = await axios.get(`http://localhost:3000/films/${id}`);
    setTitle(response.data.title);
    setDescription(response.data.description);
    setFile(response.data.image);
    setPreview(response.data.url);
  };

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const updateFilm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    try {
      await axios.patch(`http://localhost:3000/films/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="editLagi container vh-100">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={updateFilm}>
            <div className="form-group">
              <label htmlFor="filmTitle">Nama Film</label>
              <input type="text" className="form-control" id="filmTitle" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="film Title" style={{ background: "grey", color: "white" }} />
            </div>
            <div className="form-group">
              <label htmlFor="filmDescription">Deskripsi Film</label>
              <textarea className="form-control" id="filmDescription" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Film Description" style={{ background: "grey", color: "white" }} />
            </div>

            <div className="form-group">
              <label htmlFor="image">Image</label>
              <div className="custom-file">
                <input type="file" className="custom-file-input" id="image" onChange={loadImage} style={{ background: "grey", color: "white" }} />
                <label className="custom-file-label" htmlFor="image">
                  Choose a file...
                </label>
              </div>
            </div>

            {preview && (
              <div className="mb-3">
                <img src={preview} alt="Preview Image" className="img-thumbnail" style={{ width: "128px", height: "128px" }} />
              </div>
            )}

            <button type="submit" className="btn btn-success">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditFilm;
