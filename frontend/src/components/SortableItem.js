import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

const SortableItem = ({ note, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: note._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg hover:shadow-xl transition-transform"
    >
      <Link to={`/note/${note._id}`} className="flex-1">
        <h2 className="text-xl font-bold text-blue-700">{note.title}</h2>
        <p className="text-gray-600">{note.content.substring(0, 100)}...</p>
      </Link>
      <button
        onClick={() => onDelete(note._id)}
        className="p-2 text-red-500 hover:text-red-700 transition"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default SortableItem;
