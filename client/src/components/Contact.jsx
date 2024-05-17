import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ property }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${property.userRef}`);
        const data = await res.json();
        console.log(data[0]);
        setLandlord(data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [property.userRef]);
  return (
    <>
      {landlord && (
        <div className="text-slate-300 flex flex-col gap-3">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{property.name.toLowerCase()}</span>
          </p>
          <textarea
            className="text-black w-full border p-3 rounded-lg"
            name="message"
            placeholder="Input message here"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${property.name}&body=${message}`}
            className="bg-green-700 text-white text-center p-3 uppercase hover:opacity-90 rounded-lg"
          >
            {" "}
            Send message
          </Link>
        </div>
      )}
    </>
  );
}
