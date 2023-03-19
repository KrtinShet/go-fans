import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { AddAPhoto } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { useCreateFeedMutation } from "./../../store/api/feedsApiSlice";

function CreateFeedPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [createFeed] = useCreateFeedMutation();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    await createFeed(formData);

    // Reset the form
    setTitle("");
    setDescription("");
    setImage(null);
    navigate("/dashboard/myposts");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 3,
      }}
    >
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Create a New Feed
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <TextField
          fullWidth
          required
          label="Title"
          variant="outlined"
          margin="normal"
          value={title}
          onChange={handleTitleChange}
        />
        <TextField
          fullWidth
          required
          label="Description"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={handleDescriptionChange}
        />
        <Box display="flex" alignItems="center">
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="icon-button-file"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="icon-button-file">
            <Button
              sx={{
                mt: 2,
                mr: 2,
                mb: 2,
              }}
              variant="contained"
              component="span"
              startIcon={<AddAPhoto />}
            >
              Add Image
            </Button>
          </label>
          {image && (
            <Typography variant="body1" component="p">
              {image.name}
            </Typography>
          )}
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </form>
    </Container>
  );
}

export default CreateFeedPage;
