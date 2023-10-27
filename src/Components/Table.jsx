
import React, { useState } from "react";
import Pagination from "./Pagination";

function Table({ dummyData, setDummyData }) {
  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [editRow, setEditRow] = useState(null); // State to track the row being edited
  const [editedData, setEditedData] = useState({ email: "", name: "", role: "" });

  const totalDataCount = dummyData.length;
  const totalPages = Math.ceil(totalDataCount / itemsPerPage);

  const startIdx = (page - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;

  const handleMainCheckboxChange = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedItems(
        dummyData.slice(startIdx, endIdx).map((item) => item.email)
      );
    } else {
      setSelectedItems([]);
    }
  };

  const handleItemCheckboxChange = (email) => {
    const updatedSelectedItems = [...selectedItems];
    if (updatedSelectedItems.includes(email)) {
      updatedSelectedItems.splice(updatedSelectedItems.indexOf(email), 1);
    } else {
      updatedSelectedItems.push(email);
    }
    setSelectedItems(updatedSelectedItems);
  };

  const gotoFirstPage = () => {
    setPage(1);
  };

  const gotoLastPage = () => {
    setPage(totalPages);
  };

  const handleEditClick = (email) => {
    setEditRow(email);
    // Initialize the edited values with the current data
    const currentItem = dummyData.find((item) => item.email === email);
    setEditedData({
      email: currentItem.email,
      name: currentItem.name,
      role: currentItem.role,
    });
  };

  const handleSaveClick = (email) => {
    // Update the data with the edited values
    const updatedData = dummyData.map((item) => {
      if (item.email === email) {
        return {
          ...item,
          name: editedData.name,
          email: editedData.email,
          role: editedData.role,
        };
      }
      return item;
    });
    setEditRow(null); // Exit edit mode
    setDummyData(updatedData);
  };

  const handleCancelClick = () => {
    setEditRow(null); // Exit edit mode
  };

  const handleDeleteClick = () => {
    // Filter out the rows that are selected for deletion
    const updatedData = dummyData.filter(
      (item) => !selectedItems.includes(item.email)
    );
    setDummyData(updatedData);
    // Clear the selection after deletion
    setSelectedItems([]);
    setSelectAll(false)
  };

  return (
    <div className="mt-8">
      <table className="w-full">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                id="mainCheckbox"
                checked={selectAll}
                onChange={handleMainCheckboxChange}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.slice(startIdx, endIdx).map((item) => (
            <tr
              key={item.email}
              className="text-center text-lg border-b border-gray-300"
            >
              <td className="py-4">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.email)}
                  onChange={() => handleItemCheckboxChange(item.email)}
                />
              </td>
              <td>
                {editRow === item.email ? (
                  <input
                    className="border-2 border-gray-300 pl-2 rounded-md"
                    type="text"
                    value={editedData.name}
                    onChange={(e) =>
                      setEditedData({ ...editedData, name: e.target.value })
                    }
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>
                {editRow === item.email ? (
                  <input
                    className="border-2 border-gray-300 pl-2 rounded-md"
                    type="text"
                    value={editedData.email}
                    onChange={(e) =>
                      setEditedData({ ...editedData, email: e.target.value })
                    }
                  />
                ) : (
                  item.email
                )}
              </td>
              <td>
                {editRow === item.email ? (
                  <input
                    className="border-2 border-gray-300 pl-2 rounded-md"
                    type="text"
                    value={editedData.role}
                    onChange={(e) =>
                      setEditedData({ ...editedData, role: e.target.value })
                    }
                  />
                ) : (
                  item.role
                )}
              </td>
              <td>
                {editRow === item.email ? (
                  <button onClick={() => handleSaveClick(item.email)}>
                    <i className="fa-solid fa-floppy-disk" style={{ color: "#00ff33" }}></i>
                  </button>
                ) : (
                  <div>
                    <button onClick={() => handleEditClick(item.email)}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button className="ml-2" id={`deleteItem-${item.email}`} onClick={handleDeleteClick}>
                      <i className="fa-solid fa-trash" style={{ color: "#ff0000" }}></i>
                    </button>
                  </div>
                )}
                {editRow === item.email && (
                  <button className="ml-2" onClick={handleCancelClick}><i className="fa-solid fa-circle-xmark"></i></button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        gotoFirstPage={gotoFirstPage}
        gotoLastPage={gotoLastPage}
        deleteItem={handleDeleteClick}
      />
    </div>
  );
}

export default Table;
