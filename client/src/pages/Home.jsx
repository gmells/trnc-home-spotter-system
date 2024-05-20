import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import PropertyCard from "../components/PropertyCard";

export default function Home() {
  const [offerProperties, setOfferProperties] = useState([]);
  const [saleProperties, setSaleProperties] = useState([]);
  const [rentProperties, setRentProperties] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerProperties);

  useEffect(() => {
    const fetchOfferProperties = async () => {
      try {
        const res = await fetch("/api/property/get?offer=true&limit=4");
        const data = await res.json();
        setOfferProperties(data);
        fetchRentProperties();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentProperties = async () => {
      try {
        const res = await fetch("/api/property/get?type=rent&limit=4");
        const data = await res.json();
        setRentProperties(data);
        fetchSaleProperties();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleProperties = async () => {
      try {
        const res = await fetch("/api/property/get?type=sale&limit=4");
        const data = await res.json();
        setSaleProperties(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferProperties();
  }, []);
  return (
    <div>
      <div className="h-[50px]"></div>
      <div className="mt-7 text-white">
        <div>
          <div className="flex flex-col sm:flex-row justify-evenly">
            {/* top view */}
            <div className="mt-20 w-full p-5 ml-5">
              <div className="text-slate-300 flex flex-col">
                <div className="text-3xl font-semibold">
                  Discover your Dream
                </div>
                <div className="text-3xl font-semibold">
                  Property with the{" "}
                  <span className="text-slate-500">TRNCHomeSpotter</span>
                </div>
              </div>

              <div className="text-slate-300 mt-5 text-sm mr-8">
                Your journey to find he next property begins here. Explore our
                listings to find the property that matches your taste.
              </div>

              <div className="mt-10 flex gap-3">
                <Link to={"/about"}>
                  <button className="bg-slate-800 rounded-lg p-3 hover:opacity-85 text-sm">
                    {" "}
                    About us{" "}
                  </button>
                </Link>

                <Link to={"/search"}>
                  <button className="bg-blue-700 rounded-lg p-3 hover:opacity-85 text-sm">
                    Browse Properties
                  </button>
                </Link>
              </div>

              <div className="mt-10 flex flex-row gap-5">
                <button className="bg-custom-color p-3 rounded-lg">
                  <div className="text-left text-bold text-2xl">200+</div>
                  <div className="text-xs text-slate-300">Happy Customers</div>
                </button>
                <button className="bg-custom-color p-3 rounded-lg">
                  <div className="text-left text-bold text-2xl">10k+</div>
                  <div className="text-xs text-slate-300">
                    Properties for Clients
                  </div>
                </button>
                <button className="bg-custom-color p-3 rounded-lg">
                  <div className="text-left text-bold text-2xl">4yr+</div>
                  <div className="text-xs text-slate-300">
                    Years of Experience
                  </div>
                </button>
              </div>
            </div>

            <div className="sm:w-full md:w-1/2">
              <Swiper navigation>
                {offerProperties &&
                  offerProperties.length > 0 &&
                  offerProperties.map((property) => (
                    <SwiperSlide>
                      <div
                        style={{
                          background: `url(${property.imageUrls[0]}) center no-repeat`,
                          backgroundSize: "cover",
                        }}
                        className="h-[500px]"
                        key={property._id}
                      ></div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>

          <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
            {offerProperties && offerProperties.length > 0 && (
              <div className=" mt-5">
                <div className="my-5">
                  <h2 className="font-semibold text-3xl text-custom-color">
                    Most Recent Offers
                  </h2>
                  <Link
                    className="text-blue-700 text-sm hover:underline"
                    to={"/search?offer=true"}
                  >
                    Show more Offers
                  </Link>
                </div>
                <div className="flex flex-wrap gap-8">
                  {offerProperties.map((property) => (
                    <PropertyCard property={property} key={property._id} />
                  ))}
                </div>
              </div>
            )}

            {rentProperties && rentProperties.length > 0 && (
              <div className=" mt-5">
                <div className="my-5">
                  <h2 className="font-semibold text-3xl text-custom-color">
                    Most Recent Properties for rent
                  </h2>
                  <Link
                    className="text-blue-700 text-sm hover:underline"
                    to={"/search?type=rent"}
                  >
                    Show more Properties for rent
                  </Link>
                </div>
                <div className="flex flex-wrap gap-8">
                  {rentProperties.map((property) => (
                    <PropertyCard property={property} key={property._id} />
                  ))}
                </div>
              </div>
            )}
            {saleProperties && saleProperties.length > 0 && (
              <div className=" mt-5">
                <div className="my-5">
                  <h2 className="font-semibold text-3xl text-custom-color">
                    Most Recent Properties for sale
                  </h2>
                  <Link
                    className="text-blue-700 text-sm hover:underline"
                    to={"/search?type=sale"}
                  >
                    Show more Properties for sale
                  </Link>
                </div>
                <div className="flex flex-wrap gap-8">
                  {saleProperties.map((property) => (
                    <PropertyCard property={property} key={property._id} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
