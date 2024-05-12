import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const imgRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [fileRate, setFileRate] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateValid, setUpdateValid] = useState(false);
  const [viewPropertiesError, setViewPropertiesError] = useState(false);
  const [userProperties, setUserProperties] = useState([]);

  // Firebase storage
  //       allow read;
  //       allow write: if
  //       request.resource.size < 2 * 1024 * 1024 &&
  //       rEquest.resource.contentType.matches("images/.*")

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileRate(Math.round(progress));
      },

      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateValid(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }

      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  };

  const handleViewProperties = async () => {
    try {
      setViewPropertiesError(false);
      const res = await fetch(`api/user/properties/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setViewPropertiesError(true);
        return;
      }
      setUserProperties(data);
    } catch (error) {
      setViewPropertiesError(true);
    }
  };

  const handleListingDelete = async (propertyId) => {
    try {
      const res = await fetch(`api/property/delete/${propertyId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserProperties((prev) =>
        prev.filter((property) => property._id !== propertyId)
      );
    } catch (error) {}
  };

  return (
    <div className="text-black p-3 max-w-lg mx-auto t">
      <h1 className="text-3xl text-center font-semibold my-6">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={imgRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => {
            imgRef.current.click();
          }}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="text-white rounded-full cursor-pointer object-cover h-24 w-24 self-center mt-2"
        />
        <p className="text:sm self-center">
          {fileUploadError ? (
            <span className="text-red-600">
              Image Upload Error: file must not exceed 2mb
            </span>
          ) : fileRate > 0 && fileRate < 100 ? (
            <span className="text-slate-500">{`Uploading at ${fileRate}%`}</span>
          ) : fileRate === 100 ? (
            <span className="text-green-600">Image Upload Successful</span>
          ) : (
            " "
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          id="username"
          className="bg-slate-200 border p-3 rounded-lg"
          onClick={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          defaultValue={currentUser.username}
          id="email"
          className="bg-slate-200 border p-3 rounded-lg"
          onClick={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="bg-slate-200 border p-3 rounded-lg"
          onClick={handleChange}
        />
        <button className="text-white bg-slate-800 p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-70">
          {loading ? "loading..." : "update"}
        </button>
        <Link
          className="text-white text-center bg-purple-600 p-3 rounded-lg uppercase hover:opacity-85"
          to={"/create-property"}
        >
          add Property
        </Link>
      </form>
      <div className="flex mt-5 justify-between text-[18px]">
        <span
          onClick={handleDeleteUser}
          className="hover:opacity-90 text-red-600 cursor-pointer"
        >
          Delete Account
        </span>
        <span
          onClick={handleSignOut}
          className="hover:opacity-90 text-red-600 cursor-pointer"
        >
          Sign Out
        </span>
      </div>
      <p className="text-red-700 mt-4">{error ? error : ""}</p>

      <p className="text-green-700 mt-4">
        {updateValid ? "User has been updated successfully" : ""}
      </p>
      <button
        onClick={handleViewProperties}
        className="text-purple-700 uppercase w-full hover:opacity-80"
      >
        View Properties
      </button>
      <p className="text-red-700 mt-5">
        {viewPropertiesError ? "Error viewing properties" : ""}
      </p>

      {userProperties && userProperties.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center my-7 text-white text-2xl ">
            {" "}
            View Property Listings
          </h1>
          {userProperties.map((property) => (
            <div
              key={property._id}
              className="border p-3 rounded-lg flex items-center justify-between gap-4"
            >
              <Link to={`property/${property / property._id}`}>
                <img
                  className="w-16 h-16 object-contain"
                  src={property.imageUrls[0]}
                  alt="property cover"
                />
              </Link>
              <Link
                to={`property/${property / property._id}`}
                className="text-slate-600 font-semibold flex-1 hover:underline truncate"
              >
                <p>{property.name}</p>
              </Link>

              <div className="flex flex-col item-center">
                <button
                  onClick={() => handleListingDelete(property._id)}
                  className="text-red-700 hover:opacity-70"
                >
                  Delete
                </button>
                <Link to={`/update-property/${property._id}`}>
                  <button className="text-green-700 hover:opacity-70">
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
