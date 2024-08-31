
import './App.css';
import React, { useState } from 'react';


function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [empid, setEmpid] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [isHighlight, setIsHighlight] = useState(false);

  // form validation
  const validate = () => {
    const validationErrors = [];
    if (!name.trim()) {
      validationErrors.push('Name is required');
    } else if (/\d/.test(name)) {
      validationErrors.push('Name should not include numbers');
    }
    if (!empid.trim()) {
      validationErrors.push('Employee ID is required');
    } else if (!/^\d+$/.test(empid)) {
      validationErrors.push('Employee ID must be a number');
    }
    return validationErrors;
  };

  // onclick add or update button
  const handleAddOrUpdate = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (validationErrors.length > 0) {
      alert(validationErrors.join('\n'));
      return;
    }

    const newEmployee = { name, empid };

    if (editIndex !== null) {
      const updatedEmployees = employees.slice();
      updatedEmployees[editIndex] = newEmployee;
      setEmployees(updatedEmployees);
      setEditIndex(null);
    } else {
      setEmployees([...employees, newEmployee]);
    }

    setName('');
    setEmpid('');
  };

  // onclick edit button
  const handleEdit = (index) => {
    setEditIndex(index);
    setName(employees[index].name);
    setEmpid(employees[index].empid);
    setIsHighlight(true);
    setTimeout(() => {
      setIsHighlight(false);
    }, 2000);
  };

  // onclick delete button
  const handleDelete = (index) => {
    const updatedEmployees = employees.filter((_, i) => i !== index);
    setEmployees(updatedEmployees);
  };

  return (
    <div className='container py-3'>
      <h1 className='heading mb-4'>Employee Management</h1>
      {/* Employee form*/}
      <form className='empform'>
        <div className='row align-items-center justify-content-center'>
          <div className='col-12 col-md-5 mb-2'>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={isHighlight ? 'highlight' : ''} 
            />
          </div>
          <div className='col-12 col-md-5 mb-2'>
            <input
              type="text"
              placeholder="Emp ID"
              value={empid}
              onChange={(e) => setEmpid(e.target.value)}
              className={isHighlight ? 'highlight' : ''}
            />
          </div>
          <div className='col-12 col-md-1 mb-2'>
            <button className="updatebtn" onClick={handleAddOrUpdate}>
              {editIndex !== null ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      </form>
      {/* Employee table*/}
      <div className='table-responsive'>
        <table border="1" className="table mt-4">
          <thead>
            <tr className="table-primary">
              <th>Emp ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.empid}</td>
                <td>{employee.name}</td>
                <td>
                  <button className="editbtn" onClick={() => handleEdit(index)}>Edit</button>
                  <button className="deletebtn" onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;