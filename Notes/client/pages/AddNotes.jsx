import { useState } from "react";
import { toast } from "react-hot-toast";

const AddNotes = ({ onAdded }) => {
  const [form, setForm] = useState({ title: "", content: "" });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // image is default on backend, so we only send title & content
      const res = await api.post(ENDPOINTS.CREATE_NOTE, {
        title: form.title,
        content: form.content,
      });
      toast.success("Note created");
      setForm({ title: "", content: "" });
      onAdded?.(res.data);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create note");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{display:"grid", gap:10}}>
      <input
        name="title"
        placeholder="Note title"
        value={form.title}
        onChange={onChange}
        required
      />
      <textarea
        name="content"
        placeholder="Write your content..."
        value={form.content}
        onChange={onChange}
        rows={4}
        required
      />
      <button disabled={submitting} type="submit" style={{padding:"10px 12px", borderRadius:8}}>
        {submitting ? "Saving..." : "Add Note"}
      </button>
    </form>
  );
};

export default AddNotes;