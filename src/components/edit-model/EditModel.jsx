import React from 'react';
import "../edit-model/editModel.css";

const EditModel = ({ data, setData, onSave, onCancel }) => {
  const nameValue = data ? data.name : "";
  const ageValue = data ? data.age : "";

  const handleNameChange = e => {
  const { value } = e.target;
  setData(prev => ({ ...prev, name: value }));
};

const handleAgeChange = e => {
  const { value } = e.target;
  setData(prev => ({ ...prev, age: value }));
};


  return (
    <>
      <div onClick={() => onCancel()} className="edit__overlay"></div>
      <form className="edit__wrapper">
        <h2>Update user</h2>
        <input value={nameValue || ''} onChange={handleNameChange} type="text" />
        <input value={ageValue || ''} onChange={handleAgeChange} type="number" />
        <button className='buttons' onClick={() => onSave(data)}>Save</button>
        <button className='buttons' type='button' onClick={() => onCancel()}>Cancel</button>
      </form>
    </>
  );
};

export default EditModel;