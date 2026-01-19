import { toast } from "react-toastify";
import api from "../api/axios";
import { setEmployerProfile } from "./employerSlice";

const setEmployerData =async (dispatch,employerData) => {

    const res = api.post("/employer",employerData)

     await toast.promise(res,{
        pending : "Saving Profile",
        success : {
            render({data}){
                dispatch(setEmployerProfile(data.data.employer))
                return "Profile Updated Successfully"
            },
        },
        error : {
            render({data}){
                return data.response?.data?.message || "Something went wrong"
            }
        }
    })
    
}

export const updateEmployerProfile = async (dispatch, payload) => {
  try {
    const request = api.patch("/employer/location", payload);

    await toast.promise(request, {
      pending: "Updating profile...",
      success: {
        render({ data }) {
          dispatch(setEmployerProfile(data.data.employer));
          return "Profile updated successfully";
        },
      },
      error: {
        render({ data }) {
          return (
            data?.response?.data?.message || "Failed to update profile"
          );
        },
      },
    });
  } catch (err) {
    toast.error("Unexpected error");
  }
}

export const updateEmployerHR = async (dispatch, payload) => {
  try {
    const request = api.patch("/employer/hr", payload);

    await toast.promise(request, {
      pending: "Updating HR Profile...",
      success: {
        render({ data }) {
          dispatch(setEmployerProfile(data.data.employer));
          return "Profile updated successfully";
        },
      },
      error: {
        render({ data }) {
          return (
            data?.response?.data?.message || "Failed to update profile"
          );
        },
      },
    });
  } catch (err) {
    toast.error("Unexpected error");
  }
}

export const updateCompanyDescription = async (dispatch, payload) => {
  try {
    const request = api.patch("/employer/description", payload);

    await toast.promise(request, {
      pending: "Updating Company Description...",
      success: {
        render({ data }) {
          dispatch(setEmployerProfile(data.data.employer));
          return "Profile updated successfully";
        },
      },
      error: {
        render({ data }) {
          return (
            data?.response?.data?.message || "Failed to update profile"
          );
        },
      },
    });
  } catch (err) {
    toast.error("Unexpected error");
  }
}

export default setEmployerData;