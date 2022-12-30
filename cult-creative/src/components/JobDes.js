import React from "react";
import "../scss/jobDes.scss";
import { Button, Skeleton } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const JobDes = () => {
  //get the job details from redux store
  const jobDetails = useSelector((state) => state.jobDetails);
  //destructure the job details
  const { loadingDetails, error, job } = jobDetails;
  //destructure the job object
  let {
    responsibilities,
    companyOverview,
    title,
    companyName,
    role,
    experience,
    location,
    salary,
    employmentType,
    workingHours,

    perks,
  } = job;

  return (
    <>
      {loadingDetails && (
        <div className="noInfo">
          <Skeleton />
        </div>
      )}
      {error && (
        <div className="noInfo">
          <h2>{error}</h2>
        </div>
      )}

      {JSON.stringify(job) !== "{}" ? (
        <div className="descMainCont">
          <div className="title">
            <div className="titleText">
              <h1>{title}</h1>
              <h5>{companyName}</h5>
            </div>

            <div className="bottomTitle">
              <p></p>
              <p>Location: {location}</p>
              <Button colorScheme="orange">Apply</Button>
            </div>
          </div>

          <div className="desc">
            <div className="employmentType des">
              <h3>Employment Type</h3>
              <p>{employmentType}</p>
            </div>
            <div className="salary des">
              <h3>Salary</h3>
              <p>{salary}</p>
            </div>
            <div className="experience des">
              <h3>Experience</h3>
              <p>{experience}</p>
            </div>
            <div className="workingDays des">
              <h3>Working Days</h3>
              <p>{workingHours}</p>
            </div>
          </div>

          <div className="descParas">
            <div className="rolePara para">
              <h3>Role</h3>
              <p>{role}</p>
            </div>
            <div className="responsibilitiesPara para">
              <h3>Responsibilities</h3>
              <p>
                {responsibilities &&
                  responsibilities.map((responsibility, index) => {
                    return <li key={index}>{responsibility}</li>;
                  })}
              </p>
            </div>
            <div className="perksPara para">
              <h3>Perks</h3>

              <ol>
                {perks &&
                  perks.map((perk, index) => {
                    return <li key={index}>{perk}</li>;
                  })}
              </ol>
            </div>
            <div className="companyOverView para">
              <h3>Company Overview</h3>
              <p>{companyOverview}</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="noInfo">
            <h2>Click "View Details" to See Details</h2>
          </div>
        </>
      )}
    </>
  );
};

export default JobDes;
