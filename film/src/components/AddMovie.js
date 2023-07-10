import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddFilm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const saveFilm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    try {
      await axios.post("http://localhost:3000/films", formData, {
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
    <div>
      <div className="add-movie AddMovie vh-100" id="addfilm">
        <h3>Tambahkan Film Baru</h3>
        <Form onSubmit={saveFilm}>
          <Form.Group controlId="title">
            <Form.Label>Judul</Form.Label>
            <Form.Control type="text" placeholder="Masukkan judul film" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Deskripsi</Form.Label>
            <Form.Control as="textarea" placeholder="Masukkan deskripsi film" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </Form.Group>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <div className="custom-file">
              <input type="file" className="custom-file-input" id="image" onChange={loadImage} />
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
          <Button variant="primary" type="submit">
            Tambahkan
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddFilm;
