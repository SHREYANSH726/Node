import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import API from "../../data/api";

const NoteCard = ({ note, fetchNotes }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: note.title, content: note.content });

  const handleDelete = async () => {
    try {
      await API.delete(`/${note._id}`);
      fetchNotes();
    } catch (err) {
      console.error("Error deleting note:", err.response?.data || err.message);
      alert("Failed to delete note");
    }
  };

  const handleEdit = async () => {
    try {
      await API.put(`/${note._id}`, form);
      setOpen(false);
      fetchNotes();
    } catch (err) {
      console.error("Error updating note:", err.response?.data || err.message);
      alert("Failed to update note");
    }
  };

  return (
    <>
      <Card sx={{ minWidth: 275, mb: 2 }}>
        <CardHeader title={note.title} subheader={new Date(note.createdAt).toLocaleString()} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {note.content}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => setOpen(true)}>
            Edit
          </Button>
          <Button size="small" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </CardActions>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Note</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Content"
            multiline
            rows={4}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleEdit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NoteCard;
