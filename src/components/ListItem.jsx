import "../css/ListItem.css";

const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#000"
    aria-label="Edit item"
  >
    <path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z" />
  </svg>
);

const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#000"
    aria-label="Delete item"
  >
    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
  </svg>
);

const ListItem = ({
  editingItem,
  item,
  editText,
  setEditText,
  handleSaveEdit,
  handleEdit,
  handleDelete,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveEdit(item);
    } else if (e.key === "Escape") {
      setEditText(item);
      handleSaveEdit(item);
    }
  };
  return (
    <div className="list-item">
      <div className="movie-title">
        {editingItem === item ? (
          <input
            id="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={() => handleSaveEdit(item)}
            onKeyDown={handleKeyDown}
            autoFocus
            aria-label="Edit movie title"
          />
        ) : (
          <span className="title-text">{item}</span>
        )}
      </div>
      <div className="btns">
        <button
          onClick={() => handleEdit(item)}
          className="edit-btn"
          aria-label="Edit item"
          type="button"
        >
          <EditIcon />
        </button>
        <button
          onClick={() => handleDelete(item)}
          className="delete-btn"
          aria-label="Delete item"
          type="button"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default ListItem;
