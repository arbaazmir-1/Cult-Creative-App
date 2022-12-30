import "../src/scss/App.scss";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import JobCard from "./components/JobCard";
import JobDes from "./components/JobDes";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { listJobs, listMoreJobs } from "./actions/jobActions";
import { Button } from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  //using redux to get the state of the jobList
  const jobList = useSelector((state) => state.jobList);
  //destructuring the state
  const { loading, error, jobs, loadingMore } = jobList;
  //initializing the dispatch
  const dispatch = useDispatch();

  //function to fetch the first batch of jobs
  function fetchFirstBatch() {
    dispatch(listJobs());
  }
  //fetching the first batch of jobs on page load
  useEffect(() => {
    fetchFirstBatch();
  }, []);
  //function to load more jobs
  const loadMore = () => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const lastJob = jobs[jobs.length - 1];
      dispatch(listMoreJobs(lastJob));
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <SearchBar />

        <div className="jobScreenCont">
          <div className="jobList">
            {/*
            checking if the loading state is true, if it is then show the loading spinner
            if the loading state is false and the jobs array is not empty then show the jobs
            if the loading state is false and the jobs array is empty then show the no jobs found message
            if there is an error then show the error message
            */}
            {loading ? (
              <div className="noJobs">
                <i className="fa fa-spinner fa-spin"></i>
                <h1>Loading...</h1>
              </div>
            ) : jobs && jobs.length !== 0 ? (
              <>
                {jobs.map((item) => {
                  return <JobCard key={item.id} data={item} />;
                })}

                {jobs && jobs.length !== 0 && jobs[0].type !== "filter" && (
                  <Button
                    className="loadMore"
                    onClick={loadMore}
                    disabled={loadingMore}
                  >
                    {loadingMore ? (
                      <i className="fa fa-spinner fa-spin"></i>
                    ) : (
                      <>Load More</>
                    )}
                  </Button>
                )}
              </>
            ) : (
              <div className="noJobs">
                <h1>No Jobs Found</h1>
              </div>
            )}
            {error && error !== "No more jobs" && (
              <div className="noJobs">
                <h1>{error}</h1>
              </div>
            )}
            <ToastContainer />
          </div>
          <div className="jobDesContApp">
            <JobDes />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
