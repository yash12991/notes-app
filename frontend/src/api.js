import axios from "axios";
const API_URL = "http://localhost:5000/api/notes/";
const API_URL = "https://notes-app-syxd.onrender.com";
// const API_URL = "https://notes-app-jorq.onrender.com";


export const getNotes= async()=>{
const response = await axios.get(API_URL);
return response.data;

};


export const getNote =async(id)=>{
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}

export const createNote = async (note)=>{
  const response = await axios.post(API_URL,note);
  return response.data;
};

export const updateNote = async(id,note)=>{
  const response = await axios.put(`${API_URL}/${id}`,note);
  return response.data;
};

export const deleteNote = async (id) => {
  try {
    await axios.delete(`${API_URL}${id}`);
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};
export const saveNote = async (id, note) => {
  try {
    const response = await fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    return response.json();
  } catch (error) {
    console.error("Error saving note:", error);
  }
};
