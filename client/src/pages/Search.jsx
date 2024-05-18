import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState();
  const navigate = useNavigate();
  const [searchbarData, setSearchbarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "descending",
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTermFromUrl = searchParams.get("searchTerm");
    const typeFromUrl = searchParams.get("type");
    const parkingFromUrl = searchParams.get("parking");
    const furnishedFromUrl = searchParams.get("furnished");
    const offerFromUrl = searchParams.get("offer");
    const sortFromUrl = searchParams.get("sort");
    const orderFromUrl = searchParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSearchbarData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "descending",
      });
    }

    const fetchProperties = async () => {
      setLoading(true);
      const searchQuery = searchParams.toString();
      const res = await fetch(`api/property/get?${searchQuery}`);
      const data = await res.json();
      setProperties(data);
      setLoading(false);
    };

    fetchProperties();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "sale" ||
      e.target.id === "rent"
    ) {
      setSearchbarData({ ...searchbarData, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSearchbarData({ ...searchbarData, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSearchbarData({
        ...searchbarData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "descending";

      setSearchbarData({ ...searchbarData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    searchParams.set("searchTerm", searchbarData.searchTerm);
    searchParams.set("type", searchbarData.type);
    searchParams.set("parking", searchbarData.parking);
    searchParams.set("furnished", searchbarData.furnished);
    searchParams.set("offer", searchbarData.offer);
    searchParams.set("sort", searchbarData.sort);
    searchParams.set("order", searchbarData.order);
    const searchQuery = searchParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="text-white">
      <div className="h-[85px]"></div>
      <div className="flex flex-col md:flex-row">
        <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen border-slate-500">
          <form onSubmit={handleSubmit} className="flex flex-col gap-7">
            <div className="flex gap-3 items-center">
              <label className="font-semibold whitespace-nowrap">
                Search Term:
              </label>
              <input
                type="text"
                id="searchTerm"
                placeholder="Search..."
                className="border rounded-lg p-3 w-full text-black"
                value={searchbarData.searchTerm}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <label className="font-semibold">Type:</label>
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  id="all"
                  className="w-5 text-black"
                  checked={searchbarData.type === "all"}
                  onChange={handleChange}
                />
                <span>Rent & Sale</span>
              </div>
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5"
                  checked={searchbarData.type === "rent"}
                  onChange={handleChange}
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5"
                  checked={searchbarData.type === "sale"}
                  onChange={handleChange}
                />
                <span>Sale</span>
              </div>
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5"
                  checked={searchbarData.offer}
                  onChange={handleChange}
                />
                <span>Offer</span>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <label className="font-semibold">Facilities:</label>
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5"
                  checked={searchbarData.parking}
                  onChange={handleChange}
                />
                <span>Parking</span>
              </div>
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5"
                  checked={searchbarData.furnished}
                  onChange={handleChange}
                />
                <span>Furnished</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="font-semibold">Sort: </label>
              <select
                onChange={handleChange}
                defaultValue={"created_at_descending"}
                className="text-black rounded-lg p-3"
                id="sort_order"
              >
                <option value={"standardPrice_descending"}>
                  Price highest to lowest
                </option>
                <option value={"standardPrice_ascending"}>
                  Price lowest to highest
                </option>
                <option value={"createdAt_descending"}>Newest</option>
                <option value={"createdAt_ascending"}>Oldest</option>
              </select>
            </div>
            <button className="p-3 bg-blue-500 rounded-lg uppercase hover:opacity-90">
              Search
            </button>
          </form>
        </div>
        <div className="flex-1">
          <h1 className="text-blue-500 mt-3 p-3 font-semibold text-2xl">
            {" "}
            Property results:
          </h1>
          <div className="p-5 flex flex-wrap gap-4">
            {!loading && properties.length === 0 && (
              <p className="text-xl text-blue-300"> No property found!</p>
            )}

            {loading && (
              <p className="text-xl text-center w-full text-blue-300">
                Loading...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
