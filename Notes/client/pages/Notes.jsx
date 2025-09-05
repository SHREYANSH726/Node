import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import API from "../data/api";
import NoteCard from "../src/components/NoteCard";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const { data } = await API.get("/");
      setNotes(data);
    } catch (err) {
      console.error("Error fetching notes:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        All Notes
      </Typography>
      {notes.length > 0 ? (
        notes.map((note) => (
          <NoteCard key={note._id} note={note} fetchNotes={fetchNotes} />
        ))
      ) : (
        <p>No notes available</p>
      )}
    </Container>
  );
};

export default Notes;
