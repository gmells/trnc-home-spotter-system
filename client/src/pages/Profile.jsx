import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const imgRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [fileRate, setFileRate] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setformData] = useState({});
  console.log(formData);
  console.log(fileRate);
  console.log(fileUploadError);
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
          setformData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  return (
    <div className="text-white p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-6">Profile</h1>
      <form className="flex flex-col gap-5">
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
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full cursor-pointer object-cover h-24 w-24 self-center mt-2"
        />
        <p className="text:sm self-center">
          {fileUploadError ? (
            <span className="text-red-600">Image Upload Error</span>
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
          id="username"
          className="bg-slate-200 border p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="bg-slate-200 border p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="password"
          id="password"
          className="bg-slate-200 border p-3 rounded-lg"
        />
        <button className="bg-slate-800 p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-70">
          update
        </button>
      </form>
      <div className="flex mt-5 justify-between text-[18px]">
        <span className="hover:opacity-90 text-red-600 cursor-pointer">
          Delete Account
        </span>
        <span className="hover:opacity-90 text-red-600 cursor-pointer">
          Sign Out
        </span>
      </div>
    </div>
  );
}
