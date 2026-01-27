import React, { useEffect, useState, useMemo } from "react";
import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJobs } from "../Slices/jobService";
import JobCard from "../Components/JobCard";

const AllJobs = () => {
  const dispatch = useDispatch();
  const { allJobs, loading, error } = useSelector((state) => state.job);

  const [keyword, setKeyword] = useState("");   // title OR skill
  const [location, setLocation] = useState(""); // location only

  useEffect(() => {
    if (allJobs.length === 0 && !loading) {
      fetchAllJobs(dispatch);
    }
  }, [dispatch, loading, allJobs.length]);

  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      const keywordLower = keyword.toLowerCase();
      const locationLower = location.toLowerCase();

      const keywordMatch =
        keyword.trim() === "" ||
        job.title?.toLowerCase().includes(keywordLower) ||
        job.skills?.some((skill) =>
          skill.toLowerCase().includes(keywordLower)
        );

      // location
      const locationMatch =
        location.trim() === "" ||
        job.location?.toLowerCase().includes(locationLower);

      return keywordMatch && locationMatch;
    });
  }, [allJobs, keyword, location]);

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Find Your Next Job</h1>

        {/* Search Inputs */}
        <div className="flex flex-col sm:flex-row md:mb-5 mb-3 gap-2">
          <input
            type="text"
            placeholder="Job title or skill (React, Backend, Designer)"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="border px-4 py-2 rounded w-full"
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border px-4 py-2 rounded w-full"
          />
        </div>

        {loading && <p>Loading jobs...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid gap-5 sm:grid-cols-2">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))
          ) : (
            !loading && <p>No jobs found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AllJobs;
