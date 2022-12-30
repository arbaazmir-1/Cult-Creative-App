import React from "react";
import "../scss/searchbar.scss";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listJobsFilters } from "../actions/jobActions";
import { toast } from "react-toastify";

const SearchBar = () => {
  // setting up the state
  let [salary, setSalary] = useState("");
  let [location, setLocation] = useState("");
  let [employmentType, setEmploymentType] = useState("");
  //intializing the dispatch
  const dispatch = useDispatch();
  // getting the state from the store
  const jobList = useSelector((state) => state.jobList);
  // destructuring the state
  const { loading } = jobList;

  //submit handler that will dispatch the action for the filter
  const submitHandler = (e) => {
    e.preventDefault();
    // checking if the fields are empty
    if (salary === "" || location === "" || employmentType === "") {
      toast.error("Please fill in all fields");
    } else if (
      salary === "null" ||
      location === "null" ||
      employmentType === "null"
    ) {
      toast.error("Please fill in all fields");
    } else {
      // dispatching the action
      dispatch(listJobsFilters(location, employmentType, salary));
    }
  };

  return (
    <>
      <div className="containerSearchBar">
        <div className="searchBar">
          <input
            type="number"
            name="salary"
            placeholder="Minimum Salary"
            value={salary}
            onChange={(e) => {
              setSalary(e.target.value);
            }}
          />

          <select
            className="select"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          >
            <option value="null">Select One</option>
            <option value="San Francisco, CA">San Francisco, CA</option>
            <option value="Chicago, IL">Chicago, IL</option>
            <option value="Dallas, TX">Dallas, TX</option>
            <option value="Seattle, WA">Seattle, WA</option>
          </select>
          <select
            className="select"
            value={employmentType}
            onChange={(e) => {
              setEmploymentType(e.target.value);
            }}
          >
            <option value="null">Select One</option>
            <option value="Full-time">Full Time</option>
            <option value="Part-time">Part Time</option>
            <option value="Contract">Contract</option>
          </select>

          <button onClick={submitHandler} disabled={loading}>
            {loading ? (
              <i className="fa fa-spinner fa-spin"></i>
            ) : (
              <>
                <i className="fa fa-search"></i>
                <span>Search</span>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
