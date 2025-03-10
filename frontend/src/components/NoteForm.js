import React, { useState, useEffect } from "react";
import { createNote, updateNote, getNote } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NoteForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [isPinned, setIsPinned] = useState(false);
  const [theme, setTheme] = useState("light");
  const [wordCount, setWordCount] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getNote(id).then((note) => {
        setTitle(note.title);
        setContent(note.content);
        setTags(note.tags || []);
        setIsPinned(note.isPinned || false);
      });
    }
  }, [id]);

  useEffect(() => {
    setWordCount(content.replace(/<[^>]*>/g, "").split(" ").filter(Boolean).length);
    localStorage.setItem("draftContent", content);
  }, [content]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const noteData = { title, content, tags, isPinned };
    if (id) {
      await updateNote(id, noteData);
    } else {
      await createNote(noteData);
    }
    navigate("/");
  };

  return (
    <div className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100"} min-h-screen flex items-center justify-center`}>
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">
          {id ? "Edit Note" : "Create Note"}
        </h2>
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="mb-4 px-4 py-2 bg-gray-700 text-white rounded-lg">
          Toggle {theme === "light" ? "Dark" : "Light"} Mode
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <ReactQuill
            value={content}
            onChange={setContent}
            className="bg-white p-2 rounded-lg"
          />
          <div className="text-sm text-gray-500">Word Count: {wordCount}</div>
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags.join(", ")}
            onChange={(e) => setTags(e.target.value.split(",").map(tag => tag.trim()))}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isPinned}
              onChange={() => setIsPinned(!isPinned)}
              className="h-5 w-5"
            />
            <label>Pin this note</label>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:scale-105 transition transform"
          >
            {id ? "Update Note" : "Save Note"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
