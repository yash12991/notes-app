import { Link } from "react-router-dom";
import { PlusCircle, NotebookPen } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 shadow-md">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold flex items-center">
          <NotebookPen className="w-6 h-6 mr-2" />
          NotesApp
        </Link>
        {/* <Link
          to="/new"
          className="bg-white text-blue-600 px-4 py-2 rounded-md flex items-center hover:bg-gray-200 transition"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Note
        </Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
