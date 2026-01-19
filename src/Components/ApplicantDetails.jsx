import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../api/axios";

const ApplicantDetails = () => {
  const navigate = useNavigate();
  const { jobKey, applicantId } = useParams();
  const { jobPosted } = useSelector((state) => state.employer);

  const [job, setJob] = useState(null);
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hydrate = (jobData) => {
      const foundApplicant = jobData.applicants?.find(
        (a) => a.authId?._id === applicantId,
      );
      setJob(jobData);
      setApplicant(foundApplicant || null);
      setLoading(false);
    };

    const reduxJob = jobPosted.find((j) => j.jobKey === jobKey);
    if (reduxJob) {
      hydrate(reduxJob);
      return;
    }

    api
      .get(`/job/${jobKey}`)
      .then((res) => hydrate(res.data))
      .catch(() => setLoading(false));
  }, [jobKey, applicantId, jobPosted]);

  if (loading) {
    return (
      <>
        <Navbar />
        <p className="p-6">Loading applicant details…</p>
      </>
    );
  }

  if (!job || !applicant) {
    return (
      <>
        <Navbar />
        <p className="p-6">Applicant not found</p>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-6 text-start">
        {/* Top bar */}
        <div className="border-b border-gray-300 pb-4 flex items-center gap-4">
          <i
            className="bi bi-arrow-left text-2xl cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-2xl font-bold">Applicant Details</h1>
        </div>

        {/* Header */}
        <div
          className="flex flex-col md:flex-row justify-between items-start py-5 border-b bg-gray-50 border border-gray-200 rounded-lg p-4 my-3
"
        >
          <div>
            <h2 className="text-2xl font-bold capitalize">
              {applicant.userName}
            </h2>
            <div className="text-sm text-gray-600 my-3">
              <a href={`mailto:${applicant.authId?.email}`}>
                {applicant.authId?.email}
              </a>{" "}
              • <a href={`tel:${applicant.phone}`}>{applicant.phone}</a>
            </div>
          </div>

          {applicant.resumeUrl && (
            <a
              href={applicant.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm flex items-center gap-2"
            >
              <i className="bi bi-file-earmark-text" />
              View Resume
            </a>
          )}
        </div>

        {/* Skills */}
        <div
          className="py-5 border-b bg-gray-50 border border-gray-200 rounded-lg p-4
"
        >
          <p className="font-semibold flex items-center gap-2 mb-3">
            <i className="bi bi-gear-wide-connected" />
            Skills
          </p>

          {applicant.skills?.length ? (
            <div className="flex flex-wrap gap-2">
              {applicant.skills.map((skill) => (
                <span
                  key={skill._id}
                  className="text-sm px-3 py-1 bg-gray-100 rounded-full capitalize"
                >
                  {skill.name}
                  {skill.experience && ` • ${skill.experience}`}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No skills provided</p>
          )}
        </div>

        {/* Job Preferences */}
        <div
          className="py-5 border-b bg-gray-50 border border-gray-200 rounded-lg p-4 my-3
"
        >
          <p className="font-semibold flex items-center gap-2 mb-3">
            <i className="bi bi-sliders" />
            Job Preferences
          </p>

          {applicant.jobPreferences?.length ? (
            <div className="space-y-4">
              {applicant.jobPreferences.map((pref) => (
                <div key={pref._id} className="rounded-lg p-4 text-sm">
                  {/* Job Title */}
                  <div className="mb-2">
                    <span className="font-medium">Role:</span>{" "}
                    {pref.jobTitle?.join(", ")}
                  </div>

                  {/* Location */}
                  <div className="mb-2">
                    <span className="font-medium">Preferred Location:</span>{" "}
                    {pref.preferredLocation?.join(", ")}
                  </div>

                  {/* Job Type */}
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="font-medium mr-1">Job Type:</span>
                    {pref.jobType.map((type) => (
                      <span
                        key={type}
                        className="px-2 py-0.5 bg-white border rounded-full capitalize"
                      >
                        {type}
                      </span>
                    ))}
                  </div>

                  {/* Availability */}
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="font-medium mr-1">Availability:</span>
                    {pref.workAvailability.map((day) => (
                      <span
                        key={day}
                        className="px-2 py-0.5 bg-white border rounded-full capitalize"
                      >
                        {day}
                      </span>
                    ))}
                  </div>

                  {/* Shift */}
                  <div className="mb-2">
                    <span className="font-medium">Shift:</span>{" "}
                    {pref.shiftPreference.join(", ")}
                  </div>

                  {/* Salary & Mode */}
                  <div className="flex flex-wrap gap-4 mt-3 text-gray-700">
                    <span>
                      <i className="bi bi-currency-rupee" />{" "}
                      {pref.expectedSalary}
                    </span>
                    <span>
                      <i className="bi bi-house-door" /> {pref.remote}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              No job preferences specified
            </p>
          )}
        </div>

        {/* Experience */}
        <div className="py-5 border-b bg-gray-50 border border-gray-200 rounded-lg p-4 my-3">
          <p className="font-semibold flex items-center gap-2 mb-3">
            <i className="bi bi-briefcase" />
            Experience
          </p>

          {applicant.experience?.length ? (
            <div className="space-y-3 ps-3">
              {applicant.experience.map((exp) => (
                <div key={exp._id} className="text-sm">
                  <p className="font-medium">
                    {exp.title} @ {exp.company}
                  </p>
                  <p className="text-gray-500">
                    {new Date(exp.startDate).getFullYear()} –{" "}
                    {new Date(exp.endDate).getFullYear()}
                  </p>
                  <p className="text-gray-600">{exp.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No experience provided</p>
          )}
        </div>

        {/* Education */}
        <div className="py-5 border-b bg-gray-50 border border-gray-200 rounded-lg p-4 my-3">
          <p className="font-semibold flex items-center gap-2 mb-3">
            <i className="bi bi-mortarboard" />
            Education
          </p>

          {applicant.education?.length ? (
            <div className="flex flex-wrap gap-2 ps-3">
              {applicant.education.map((edu) => (
                <span
                  key={edu._id}
                  className="text-sm px-3 py-1 bg-gray-100 rounded-full capitalize"
                >
                  {edu.degree.toUpperCase()} • {edu.course.toUpperCase()}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No education details</p>
          )}
        </div>

        {/* Certifications */}
        <div className="py-5 border-b bg-gray-50 border border-gray-200 rounded-lg p-4 my-3">
          <p className="font-semibold flex items-center gap-2 mb-3">
            <i className="bi bi-award" />
            Certifications
          </p>

          {applicant.certifications?.length ? (
            <div className="flex flex-wrap gap-2 ps-3">
              {applicant.certifications.map((cert) => (
                <span
                  key={cert._id}
                  className="text-sm px-3 py-1 bg-gray-100 rounded-full capitalize"
                >
                  {cert.name}
                  {cert.expireYear && ` • ${cert.expireYear}`}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No certifications</p>
          )}
        </div>

        {/* Languages */}
        <div className="py-5 border-b bg-gray-50 border border-gray-200 rounded-lg p-4 my-3">
          <p className="font-semibold flex items-center gap-2 mb-3">
            <i className="bi bi-translate" />
            Languages
          </p>

          {applicant.languages?.length ? (
            <div className="flex flex-wrap gap-2 ps-3">
              {applicant.languages.map((lang) => (
                <span
                  key={lang._id}
                  className="text-sm px-3 py-1 bg-gray-100 rounded-full capitalize"
                >
                  {lang.name} • {lang.proficiency}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No languages specified</p>
          )}
        </div>

        {/* Location */}
        <div className="py-5 border-b bg-gray-50 border border-gray-200 rounded-lg p-4 my-3 ">
          <p className="font-semibold flex items-center gap-2 mb-2">
            <i className="bi bi-geo-alt" />
            Location
          </p>

          <div className="px-4">
            <p className="text-sm text-gray-600">
              {applicant.location?.street}, {applicant.location?.area}
            </p>
            <p className="text-sm text-gray-600">
              {applicant.location?.cityState}
            </p>
            <p className="text-sm text-gray-600">
              {applicant.location?.country} – {applicant.location?.pincode}
            </p>
          </div>

          {applicant.location?.relocation && (
            <p className="text-sm text-green-600 mt-1 px-4">
              Willing to relocate
            </p>
          )}
        </div>

        {/* Applied Job */}
        <div className="py-5 bg-gray-50 border border-gray-200 rounded-lg p-4 my-3">
          <p className="font-semibold flex items-center gap-2 mb-2">
            <i className="bi bi-briefcase" />
            Applied Job
          </p>

          <div className="ps-4">
            <p className="font-medium">{job.title.charAt(0).toUpperCase() + job.title.slice(1)}</p>
            <p className="text-sm text-gray-600">{job.location}</p>

            <div className="flex flex-wrap gap-2 mt-2">
              {job.type.map((t) => (
                <span
                  key={t}
                  className="text-sm py-1 bg-gray-100 rounded-full capitalize"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicantDetails;
