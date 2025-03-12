import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PlusCircle, Trash2 } from "lucide-react";

const FieldEditor = ({ fields, onSave }) => {
  const [editingFields, setEditingFields] = useState(fields || []);
  const [nextId, setNextId] = useState(() => {
    const maxId = Math.max(...fields.map((f) => parseInt(f.id, 10) || 0), 0);
    return maxId + 1;
  });

  useEffect(() => {
    setEditingFields(fields || []);
  }, [fields]);

  const addField = () => {
    setEditingFields([
      ...editingFields,
      {
        id: nextId.toString(),
        label: "",
        type: "text",
        placeholder: "Enter your answer",
        required: true,
        options: [],
        maxRating: 5,
        ratingValue: 0,
      },
    ]);
    setNextId((prevId) => prevId + 1);
  };

  const deleteField = (id) => {
    setEditingFields(editingFields.filter((field) => field.id !== id));
  };

  const updateField = (id, key, value) => {
    setEditingFields(
      editingFields.map((field) =>
        field.id === id ? { ...field, [key]: value } : field
      )
    );
  };

  const handleSave = () => {
    onSave(editingFields);
    toast.success("Changes saved successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="max-w-4xl bg-bulb-lightBlue dark:bg-bulb-blue mx-auto p-6 shadow-lg rounded-lg text-[var(--text)] border border-[var(--border)]">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">Edit Fields</h2>

      <div className="space-y-6">
        {editingFields.map((field, index) => (
          <div
            key={field.id}
            className="border p-4 rounded-lg shadow-md bg-[var(--background)] text-[var(--text)] border-[var(--border)]"
          >
            <div className="w-full">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold">{index + 1}. </span>
                <input
                  type="text"
                  value={field.label}
                  onChange={(e) =>
                    updateField(field.id, "label", e.target.value)
                  }
                  placeholder="Enter your text"
                  className="border focus:outline-none focus:ring-[var(--accent)] rounded-lg p-2 w-full bg-[var(--background)] text-[var(--text)] border-gray-300"
                />
              </div>

              <select
                value={field.type}
                onChange={(e) => updateField(field.id, "type", e.target.value)}
                className="border focus:ring-[var(--accent)] rounded-lg p-2 w-full bg-[var(--background)] text-[var(--text)] border-gray-300"
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="email">Email</option>
                <option value="radio">Radio</option>
                <option value="checkbox">Checkbox</option>
                <option value="rating">Rating</option>
                <option value="dropdown">Select</option>
                <option value="textarea">Textarea</option>
              </select>

              {["text", "email", "number"].includes(field.type) && (
                <input
                  type={field.type === "email" ? "email" : field.type}
                  value={field.placeholder}
                  onChange={(e) =>
                    updateField(field.id, "placeholder", e.target.value)
                  }
                  placeholder="Enter your answer"
                  className="border focus:outline-none focus:ring-[var(--accent)] rounded-lg p-2 w-full mt-2 bg-[var(--background)] text-[var(--text)] border-gray-300"
                />
              )}

              {field.type === "textarea" && (
                <textarea
                  value={field.placeholder}
                  onChange={(e) =>
                    updateField(field.id, "placeholder", e.target.value)
                  }
                  placeholder="Enter your message"
                  className="border focus:outline-none focus:ring-[var(--accent)] rounded-lg p-2 w-full mt-2 bg-[var(--background)] text-[var(--text)] border-gray-300"
                />
              )}

              {(field.type === "radio" ||
                field.type === "checkbox" ||
                field.type === "dropdown") && (
                <textarea
                  value={field.options?.join(",") || ""}
                  onChange={(e) =>
                    updateField(field.id, "options", e.target.value.split(","))
                  }
                  rows={2}
                  placeholder="Enter options separated by commas"
                  className="border focus:outline-none focus:ring-[var(--accent)] rounded-lg p-2 w-full mt-2 resize-none overflow-hidden bg-[var(--background)] text-[var(--text)] border-gray-300"
                />
              )}

              <div className="flex justify-end md:justify-end mt-2">
                <button
                  onClick={() => deleteField(field.id)}
                  className="text-red-500 px-4 transition w-full md:w-auto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between gap-6 mt-6 dark:text-bulb-white">
        <button
          onClick={addField}
          className="flex items-center justify-center gap-2 bg-bulb-blue dark:bg-bulb-yellow text-white px-4 py-2 rounded-[8px] shadow-md transition w-full md:w-auto"
        >
          <PlusCircle className="w-5 h-5" />
          Add
        </button>
        <button
          onClick={handleSave}
          className="bg-bulb-yellow dark:bg-bulb-success text-white px-4 py-2 rounded-[8px] shadow-md transition w-full md:w-auto"
        >
          Update
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default FieldEditor;

// GOOD ONE

// import React, { useState } from "react";
// import "../Styles/FieldEditor.css";

// const FieldEditor = ({ fields, onSave }) => {
//   const [editingFields, setEditingFields] = useState(fields || []);
//   const [nextId, setNextId] = useState(fields.length + 1 || 1);

//   const addField = () => {
//     setEditingFields([
//       ...editingFields,
//       {
//         id: nextId.toString(),
//         label: "",
//         type: "text",
//         placeholder: "",
//         required: true,
//         options: [],
//         maxRating: 5,
//         ratingValue: 0,
//       },
//     ]);
//     setNextId((prevId) => prevId + 1);
//   };

//   const deleteField = (id) => {
//     setEditingFields(editingFields.filter((field) => field.id !== id));
//   };

//   const updateField = (id, key, value) => {
//     setEditingFields(
//       editingFields.map((field) =>
//         field.id === id ? { ...field, [key]: value } : field
//       )
//     );
//   };

//   const handleSave = () => {
//     onSave(editingFields);
//   };

//   return (
//     <div className="space-y-4">
//       {editingFields.map((field, index) => (
//         <div key={field.id} className="border p-4 rounded">
//           {/* Field Number & Label */}
//           <div className="flex items-center justify-between mb-2">
//             <span className="font-bold text-gray-700">{index + 1}. </span>
//             <input
//               type="text"
//               value={field.label}
//               onChange={(e) => updateField(field.id, "label", e.target.value)}
//               placeholder="Enter your text"
//               className="border p-2 rounded w-full mb-2"
//             />
//           </div>

//           {/* Field Type Selection */}
//           <select
//             value={field.type}
//             onChange={(e) => updateField(field.id, "type", e.target.value)}
//             className="border p-2 rounded w-full mb-2"
//           >
//             <option value="text">Text</option>
//             <option value="radio">Radio</option>
//             <option value="checkbox">Checkbox</option>
//             <option value="rating">Rating</option>
//             <option value="dropdown">Select</option>
//             <option value="textarea">Textarea</option>
//           </select>

//           {/* Placeholder Input (for text & textarea) */}
//           {(field.type === "text" || field.type === "textarea") && (
//             <input
//               type="text"
//               value={field.placeholder}
//               onChange={(e) =>
//                 updateField(field.id, "placeholder", e.target.value)
//               }
//               placeholder="Enter your answer"
//               className="border p-2 rounded w-full mb-2"
//             />
//           )}

//           {/* Textarea Field */}
//           {field.type === "textarea" && (
//             <textarea
//               value={field.placeholder}
//               onChange={(e) =>
//                 updateField(field.id, "placeholder", e.target.value)
//               }
//               placeholder="Enter your message"
//               className="border p-2 rounded w-full mb-2"
//             />
//           )}

//           {/* Radio, Checkbox & Dropdown Options */}
//           {(field.type === "radio" ||
//             field.type === "checkbox" ||
//             field.type === "dropdown") && (
//             <textarea
//               value={field.options?.join(",")}
//               onChange={(e) =>
//                 updateField(field.id, "options", e.target.value.split(","))
//               }
//               rows={2}
//               style={{ resize: "none", overflow: "hidden" }}
//               onInput={(e) => {
//                 e.target.style.height = "auto";
//                 e.target.style.height = e.target.scrollHeight + "px";
//               }}
//               placeholder="Enter options separated by commas"
//               className="form-textarea border p-2 rounded w-full"
//             />
//           )}

//           {/* Delete Field Button */}
//           <button
//             onClick={() => deleteField(field.id)}
//             className="delete-button"
//           >
//             Delete Field
//           </button>
//         </div>
//       ))}

//       {/* Add Field & Save Changes Buttons */}
//       <button onClick={addField} className="add-button">
//         Add Field
//       </button>
//       <button onClick={handleSave} className="save-button">
//         Save Changes
//       </button>
//     </div>
//   );
// };

// export default FieldEditor;

// NOT BAD EITHER. THIS STILL WORKS
// import React, { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";

// const FieldEditor = ({ fields, onSave }) => {
//   const [editingFields, setEditingFields] = useState(fields || []);
//   const [nextId, setNextId] = useState(() => {
//     const maxId = Math.max(...fields.map((f) => parseInt(f.id, 10) || 0), 0);
//     return maxId + 1;
//   });

//   const addField = () => {
//     setEditingFields([
//       ...editingFields,
//       {
//         id: nextId.toString(),
//         label: "",
//         type: "text",
//         placeholder: "",
//         required: true,
//         options: [],
//         maxRating: 5,
//         ratingValue: 0,
//       },
//     ]);
//     setNextId((prevId) => prevId + 1);
//   };

//   // const deleteField = (id) => {
//   //   setEditingFields(editingFields.filter((field) => field.id !== id));
//   // };

//   const deleteField = (id) => {
//     setEditingFields(editingFields.filter((field) => field.id !== id));
//   };

//   const updateField = (id, key, value) => {
//     setEditingFields(
//       editingFields.map((field) =>
//         field.id === id ? { ...field, [key]: value } : field
//       )
//     );
//   };

//   // const handleSave = () => {
//   //   onSave(editingFields);
//   // };

//   const handleSave = () => {
//     onSave(editingFields);
//     toast.success("Changes saved successfully!", {
//       position: "top-center",
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });
//   };

//   return (
//     <div className="space-y-4">
//       {editingFields.map((field, index) => (
//         <div key={field.id} className="border p-4 rounded">
//           <div className="flex items-center justify-between mb-2">
//             <span className="font-bold text-gray-700">{index + 1}. </span>
//             <input
//               type="text"
//               value={field.label}
//               onChange={(e) => updateField(field.id, "label", e.target.value)}
//               placeholder="Enter your text"
//               className="border p-2 rounded w-full mb-2"
//             />
//           </div>

//           <select
//             value={field.type}
//             onChange={(e) => updateField(field.id, "type", e.target.value)}
//             className="border p-2 rounded w-full mb-2"
//           >
//             <option value="text">Text</option>
//             <option value="radio">Radio</option>
//             <option value="checkbox">Checkbox</option>
//             <option value="rating">Rating</option>
//             <option value="dropdown">Select</option>
//             <option value="textarea">Textarea</option>
//           </select>

//           {(field.type === "text" || field.type === "textarea") && (
//             <input
//               type="text"
//               value={field.placeholder}
//               onChange={(e) =>
//                 updateField(field.id, "placeholder", e.target.value)
//               }
//               placeholder="Enter your answer"
//               className="border p-2 rounded w-full mb-2"
//             />
//           )}

//           {field.type === "textarea" && (
//             <textarea
//               value={field.placeholder}
//               onChange={(e) =>
//                 updateField(field.id, "placeholder", e.target.value)
//               }
//               placeholder="Enter your message"
//               className="border p-2 rounded w-full mb-2"
//             />
//           )}

//           {(field.type === "radio" ||
//             field.type === "checkbox" ||
//             field.type === "dropdown") && (
//             <textarea
//               value={field.options?.join(",") || ""}
//               onChange={(e) =>
//                 updateField(field.id, "options", e.target.value.split(","))
//               }
//               rows={2}
//               style={{ resize: "none", overflow: "hidden" }}
//               onInput={(e) => {
//                 e.target.style.height = "auto";
//                 e.target.style.height = e.target.scrollHeight + "px";
//               }}
//               placeholder="Enter options separated by commas"
//               className="form-textarea border p-2 rounded w-full"
//             />
//           )}

//           <button
//             onClick={() => deleteField(field.id)}
//             className="delete-button"
//           >
//             Delete Field
//           </button>
//         </div>
//       ))}

//       <button onClick={addField} className="add-button">
//         Add Field
//       </button>
//       <button onClick={handleSave} className="save-button">
//         Save Changes
//       </button>
//       <ToastContainer />
//     </div>
//   );
// };

// export default FieldEditor;
