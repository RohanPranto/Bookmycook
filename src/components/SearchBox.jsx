import React from 'react';

const SearchBox = () => {
  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="input-group" style={{width: '60%' }}>
        <select className="form-select" id="inputGroupSelect01">
          <option selected>Choose location...</option>
          <option value="1">Location 1</option>
          <option value="2">Location 2</option>
          <option value="3">Location 3</option>
        </select>
        <input type="text" className="form-control p-3" placeholder="Search for a cook..." />
        <button className="btn btn-danger text-light" type="button">Search</button>
      </div>
    </div>
  );
}

export default SearchBox;
