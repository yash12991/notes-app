import React, { useEffect, useState } from "react";
import { getNote, saveNote } from "../api";
import { useParams, Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NotePage = () => {
  const { id } = useParams();
  const [note, setNote] = useState({ title: "", content: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    getNote(id).then(setNote);
  }, [id]);

  const handleInputChange = (value) => {
    setNote({ ...note, content: value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = () => {
    saveNote(id, note);
    setIsEditing(false);
  };

  const printNote = () => {
    window.print();
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-3xl p-8 rounded-xl shadow-lg transition-all ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Header with Dark Mode Toggle */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">{note.title || "Untitled Note"}</h2>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded-full text-sm font-medium transition duration-300 bg-gray-600 text-white hover:bg-gray-700"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Editing Mode */}
        {isEditing ? (
          <ReactQuill
            value={note.content}
            onChange={handleInputChange}
            className={`mt-4 border rounded-lg ${
              darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
            }`}
          />
        ) : (
          /* Display content as plain text (without raw HTML tags) */
          <div
            className={`prose mt-4 p-4 rounded-lg ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
            }`}
            dangerouslySetInnerHTML={{ __html: note.content }}
          ></div>
        )}

        {/* Buttons */}
        <div className="mt-6 flex justify-between flex-wrap">
          <button
            onClick={toggleEdit}
            className={`px-5 py-2 font-medium rounded-lg transition duration-300 ${
              isEditing ? "bg-green-500 hover:bg-green-600" : "bg-yellow-500 hover:bg-yellow-600"
            } text-white`}
          >
            {isEditing ? "Save" : "Edit"}
          </button>

          <Link to="/">
            <button className="px-5 py-2 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition duration-300">
              Back
            </button>
          </Link>

          <button
            onClick={printNote}
            className="px-5 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Print
          </button>
        </div>
      </div>

      {/* Print-Specific Styles */}
      <style>
        {`
          @media print {
            body {
              background: white !important;
              color: black !important;
            }
            .no-print {
              display: none !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default NotePage;
