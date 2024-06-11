import React from 'react';
import "../edit-model/editModel.css";

const EditModel = ({ data, setData, onSave, onCancel }) => {
  const nameValue = data ? data.name : "";
  const ageValue = data ? data.age : "";

  const handleInputChange = e => {
    const { value } = e.target;
    setData(prev => ({ ...prev, name: value }));
    setData(prev => ({ ...prev, age: value }));
  };

  return (
    <>
      <div onClick={() => onCancel()} className="edit__overlay"></div>
      <form className="edit__wrapper">
        <h2>Update user</h2>
        <input value={nameValue || ''} onChange={handleInputChange} type="text" />
        <input value={ageValue || ''} onChange={handleInputChange} type="number" />
        <button className='buttons' onClick={() => onSave(data)}>Save</button>
        <button className='buttons' type='button' onClick={() => onCancel()}>Cancel</button>
      </form>
    </>
  );
};

export default EditModel;