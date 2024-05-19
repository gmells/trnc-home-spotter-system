import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function PropertyCard({ property }) {
  return (
    <div className="text-white w-full bg-custom-color shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg sm:w-[350px]">
      <Link to={`/property/${property._id}`}>
        <img
          src={property.imageUrls[0]}
          alt="property cover"
          className="hover:scale-105 h-[350px] sm:h-[250px] w-full object-cover transition-transform transform duration-300"
        />

        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="font-semibold text-lg text-white truncate">
            {property.name}
          </p>
          <div className="flex gap-1 items-center">
            <MdLocationOn className="h-4 w-4 text-purple-500" />
            <p className="text-sm text-gray-200 truncate w-full">
              {property.address}
            </p>
          </div>
          <p className="text-slate-300 line-clamp-2 text-sm">
            {property.description}
          </p>
          <p className="font-semibold text-slate-300 mt-2">
            $
            {property.offer
              ? property.discountedPrice.toLocaleString("en-US")
              : property.standardPrice.toLocaleString("en-US")}
            {property.type === "rent" && " / month"}
          </p>
          <div className="flex gap-4">
            <div className="font-bold text-xs text-slate-300">
              {property.bedrooms > 1
                ? `${property.bedrooms} beds`
                : `${property.bedrooms} bed`}
            </div>
            <div className="font-bold text-xs text-slate-300">
              {property.bathrooms > 1
                ? `${property.bathrooms} bathrooms`
                : `${property.bathrooms} bathroom`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
