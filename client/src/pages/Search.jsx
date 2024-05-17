import React from "react";

export default function Search() {
  return (
    <div className="text-white">
      <div className="h-[85px]"></div>
      <div className="flex flex-col md:flex-row">
        <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen border-slate-500">
          <form className="flex flex-col gap-7">
            <div className="flex gap-3 items-center">
              <label className="whitespace-nowrap">Search Term:</label>
              <input
                type="text"
                id="searchTerm"
                placeholder="Search..."
                className="border rounded-lg p-3 w-full text-black"
              />
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <label>Type:</label>
              <div className="flex gap-3">
                <input type="checkbox" id="all" className="w-5" />
                <span>Rent & Sale</span>
              </div>
            </div>
          </form>
        </div>
        <div className="">
          <h1> Property results:</h1>
        </div>
      </div>
    </div>
  );
}
