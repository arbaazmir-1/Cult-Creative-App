import {
  JOB_DETAILS_REQUEST,
  JOB_DETAILS_SUCCESS,
  JOB_DETAILS_FAIL,
  JOB_LIST_REQUEST,
  JOB_LIST_SUCCESS,
  JOB_LIST_FAIL,
  JOB_LIST_LOAD_MORE_REQUEST,
  JOB_LIST_LOAD_MORE_SUCCESS,
  JOB_LIST_LOAD_MORE_FAIL,
} from "../constants/jobConstants";

export const jobListReducer = (state = { jobs: [] }, action) => {
  switch (action.type) {
    case JOB_LIST_REQUEST:
      return { loading: true, jobs: [] };
    case JOB_LIST_SUCCESS:
      return { loading: false, jobs: action.payload };
    case JOB_LIST_FAIL:
      return { loading: false, error: action.payload };
    case JOB_LIST_LOAD_MORE_REQUEST:
      return { ...state, loadingMore: true };
    case JOB_LIST_LOAD_MORE_SUCCESS:
      return {
        ...state,
        loadingMore: false,
        jobs: [...state.jobs, ...action.payload],
      };
    case JOB_LIST_LOAD_MORE_FAIL:
      return { ...state, loadingMore: false, error: action.payload };

    default:
      return state;
  }
};

export const jobDetailsReducer = (state = { job: {} }, action) => {
  switch (action.type) {
    case JOB_DETAILS_REQUEST:
      return { loadingDetails: true, ...state };
    case JOB_DETAILS_SUCCESS:
      return { loadingDetails: false, job: action.payload };
    case JOB_DETAILS_FAIL:
      return { loadingDetails: false, error: action.payload };
    default:
      return state;
  }
};
