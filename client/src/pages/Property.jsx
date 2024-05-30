import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import axios from "axios";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "../components/Contact";
import Comments from "../components/Comments";

export default function Property() {
  const navigate = useNavigate();

  SwiperCore.use([Navigation]);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [comment, setComment] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const params = useParams();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/property/get/${params.propertyId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setProperty(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchProperty();
  }, [params.propertyId]);

  const fetchComments = () => {
    setComment(true);
  };
  const startChat = async () => {
    try {
      const response = await axios.post("/api/chat/start", {
        propertyId: params.propertyId,
        userId: property.userRef,
        currentUserId: currentUser._id,
      });
      console.log(params.propertyId);
      console.log(property.userRef);
      console.log(currentUser._id);
      navigate(`/viewchat/${response.data._id}`);
    } catch (error) {
      console.error("Error starting chat:", error);
    }
  };

  return (
    <main className="text-white">
      <div className="h-[80px]"></div>
      {loading && <p className="text-center text-2xl my-7">loading...</p>}

      {error && (
        <p className="text-center text-2xl my-7">Oops, something went wrong!</p>
      )}

      {property && !loading && !error && (
        <div>
          <Swiper navigation>
            {property.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-800 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto my-7 p-3 gap-6">
            <p className="font-semibold text-2xl">
              {property.name} - ${" "}
              {property.offer
                ? property.discountedPrice.toLocaleString("en-US")
                : property.standardPrice.toLocaleString("en-US")}
              {property.type === "rent" && " / month"}
            </p>
            <p className="flex mt-5 gap-2 text-slate-400 my-2 items-center ">
              <FaMapMarkerAlt className="text-green-700" />
              {property.address}
            </p>
            <div className="flex gap-4">
              <p className="max-w-[200px] text-white rounded-md bg-red-900 text-center w-full p-2">
                {property.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {property.offer && (
                <p className="max-w-[200px] text-white rounded-md bg-green-900 text-center w-full p-2">
                  $
                  {(
                    +property.standardPrice - +property.discountedPrice
                  ).toLocaleString("en-US")}{" "}
                  discount
                </p>
              )}
            </div>
            <p className="text-slate-300">
              <span className="font-semibold text-white">Description: </span>
              {property.description}
            </p>
            <ul className="flex gap-10 sm:gap-6 text-slate-400 font-semibold flex-wrap">
              <li className=" flex-col ">
                {" "}
                <FaBed className="text-lg text-slate-500" />
                {property.bedrooms > 1
                  ? `${property.bedrooms} beds`
                  : `${property.bedrooms} bed`}
              </li>

              <li className=" flex-col ">
                {" "}
                <FaBath className="text-lg text-slate-500" />
                {property.bathrooms > 1
                  ? `${property.bathrooms} bathrooms`
                  : `${property.bathrooms} bathrooms`}
              </li>
              <li className=" flex-col ">
                {" "}
                <FaParking className="text-lg text-slate-500" />
                {property.parking ? "Parking Spot" : "No Parking"}
              </li>
              <li className=" flex-col ">
                {" "}
                <FaChair className="text-lg text-slate-500" />
                {property.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {currentUser &&
              property.userRef !== currentUser._id &&
              !contact && (
                <button
                  onClick={() => setContact(true)}
                  className="bg-yellow-900 uppercase rounded-lg p-3 hover:opacity-80"
                >
                  Contact Landlord
                </button>
              )}
            {contact && <Contact property={property} />}

            {currentUser && !comment && (
              <button
                onClick={fetchComments}
                className="bg-blue-800 uppercase rounded-lg p-3 hover:opacity-80"
              >
                View Comments
              </button>
            )}
            <button onClick={() => startChat()}>Start Chat</button>
            {comment && (
              <Comments
                propertyId={property._id}
                currentUserId={currentUser._id}
                name={currentUser.username}
                avatar={currentUser.avatar}
              />
            )}
          </div>
        </div>
      )}
    </main>
  );
}
