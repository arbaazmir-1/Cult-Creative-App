import React from "react";
import "../scss/jobCard.scss";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { listJobDetails } from "../actions/jobActions";

const JobCard = ({ data }) => {
  //setting the readMore state to false
  const [readMore, setReadMore] = useState(false);
  //initializing the dispatch
  const dispatch = useDispatch();
  //getting the props from the parent component
  let {
    responsibilities,
    title,
    companyName,
    postedDateTime,
    location,
    salary,
    employmentType,
    id,
  } = data;

  //convert the responsibilities array to string
  let paragraph = responsibilities.toString().replace(/,/g, " ");

  //convert second in postedDateTime  obeject to date format
  let date = new Date(postedDateTime.seconds * 1000);

  //format the date into social media format
  let dateinSocialMediaFormat = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  //how many days ago the job was posted
  let daysAgo = Math.floor(
    (new Date().getTime() - date.getTime()) / (1000 * 3600 * 24)
  );
  //shorten the paragraph to 100 characters
  let shortenedParagraph = paragraph.substring(0, 50);
  //dispatch the action to get the job details
  const fetchJobDetails = async () => {
    dispatch(listJobDetails(id));
  };

  return (
    <>
      <div className="card">
        <div className="topHeader">
          <h5>{companyName}</h5>
          <p>
            {dateinSocialMediaFormat} |<span> </span>
            {daysAgo === 0 ? "Today" : daysAgo + " days ago"}
          </p>
        </div>
        <h1>{title}</h1>
        <div className="jobDesc">
          <div className="salary desc">
            <i className="fa fa-suitcase"></i>
            <p>${salary}/per Year</p>
          </div>
          <div className="location desc">
            <i className="fa fa-map-marker"></i>
            <p>{location}</p>
          </div>
          <div className="type desc">
            <i className="fa fa-clock-o"></i>
            <p>{employmentType}</p>
          </div>
        </div>
        <p>
          {readMore ? paragraph : shortenedParagraph}
          {readMore ? (
            <span
              className="readMore"
              onClick={() => {
                setReadMore(false);
              }}
            >
              Show Less
            </span>
          ) : (
            <span
              className="readMore"
              onClick={() => {
                setReadMore(true);
              }}
            >
              Read More
            </span>
          )}
        </p>

        <Button onClick={fetchJobDetails}>View Details</Button>
      </div>
    </>
  );
};

export default JobCard;
