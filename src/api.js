import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL; // This should point to your correct Cloudinary API URL


export const API = axios.create({
  baseURL: API_URL,
  responseType: "json",
});

export const apiRequest = async ({ url, token, data, method }) => {
  try {
    const result = await API(url, {
      method: method || "GET",
      data: data,
      headers: {
        "content-type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return result.data;
  } catch (error) {
    console.error("API Error:", error);
    // Handle and return detailed error information
    if (error.response) {
      return {
        status: "failed",
        message: error.response.data.message || "An error occurred",
        statusCode: error.response.status,
      };
    } else {
      return { status: "failed", message: error.message };
    }
  }
};

export const handleFileUpload = async (uploadFile) => {
  const formData = new FormData();
  formData.append("file", uploadFile); // The file to upload
  formData.append("upload_preset", "jobfinder"); // Your unsigned upload preset

  try {
    console.log("Uploading to Cloudinary...");
    const response = await axios.post(CLOUDINARY_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Specify that you're sending form data
      },
    });
    console.log("Upload successful:", response.data);
    return response.data.secure_url; // Returns the URL of the uploaded image
  } catch (error) {
    console.error(
      "Error uploading to Cloudinary:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Image upload failed");
  }
};




export const updateURL = ({
  pageNum,
  query,
  cmpLoc,
  sort,
  navigate,
  location,
  jobType,
  exp,
}) => {
  const params = new URLSearchParams();

  if (pageNum && pageNum > 1) {
    params.set("page", pageNum);
  }
  if (query) {
    params.set("search", query);
  }
  if (cmpLoc) {
    params.set("location", cmpLoc);
  }
  if (sort) {
    params.set("sort", sort);
  }
  if (jobType) {
    params.set("jobType", jobType);
  }
  if (exp) {
    params.set("exp", exp);
  }

  const newURL = `${location.pathname}?${params.toString()}`;
  navigate(newURL, { replace: true });
  return newURL;
};
