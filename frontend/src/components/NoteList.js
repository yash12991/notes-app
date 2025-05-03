import React, { useEffect, useState } from "react";
import { getNotes, deleteNote } from "../api";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Sun, Moon, PlusCircle, Edit3 } from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getNotes().then(setNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      await deleteNote(id);
      setNotes(notes.filter((note) => note._id !== id));
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setNotes((notes) => {
        const oldIndex = notes.findIndex((note) => note._id === active.id);
        const newIndex = notes.findIndex((note) => note._id === over.id);
        return arrayMove(notes, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className={`min-h-screen p-6 ${darkMode ? "bg-zinc-900 text-white" : "bg-gray-100 text-black"}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold">My Notes</h1>
          <div className="flex gap-4">
            <input 
              type="text" 
              placeholder="Search notes..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 rounded-md border border-gray-400 dark:border-gray-600 bg-transparent focus:outline-none"
            />
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button onClick={() => navigate("/new")} className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700">
              <PlusCircle size={24} />
            </button>
          </div>
        </div>
        
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={notes.map((note) => note._id)} strategy={verticalListSortingStrategy}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {notes.length > 0 ? (
                notes
                  .filter((note) => note.title.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((note) => (
                    <div key={note._id} className="relative p-5 bg-white dark:bg-gray-800 shadow-lg rounded-lg hover:scale-105 transition transform hover:shadow-2xl">
                      <div onClick={() => navigate(`/note/${note._id}`)} className="cursor-pointer">
                        <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400">{note.title}</h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                                              {note.content.split(" ").slice(0, 20).join(" ")}...
                        </p>
                      </div>
                      <div className="absolute top-2 right-2 flex gap-2">
                        <button onClick={() => navigate(`/edit/${note._id}`)} className="text-yellow-500 hover:text-yellow-700">
                          <Edit3 size={20} />
                        </button>
                        <button onClick={() => handleDelete(note._id)} className="text-red-500 hover:text-red-700">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-gray-500 text-center">No notes found. Add one!</p>
              )}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default NotesList;
