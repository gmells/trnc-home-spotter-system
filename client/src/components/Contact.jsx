import { useEffect, useState } from "react";

export default function Contact({ property }) {
  const [landlord, setLandlord] = useState(null);

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
        <div className="text-slate-300">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{property.name.toLowerCase()}</span>
            <span className="font-semibold">
              {landlord.email.toLowerCase()}
            </span>
          </p>
        </div>
      )}
    </>
  );
}
