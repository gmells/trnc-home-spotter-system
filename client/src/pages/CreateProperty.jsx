import React from "react";

export default function CreateProperty() {
  return (
    <main className="text-white max-w-4xl p-3 mx-auto">
      <h1 className="my-7 font-semibold text-3xl text-center ">
        Add a Property
      </h1>
      <form className="flex flex-col sm:flex-row ">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeHolder="Name"
            id="name"
            className="p-3 rounded-lg border text-black"
            maxLength="64"
            minLength="8"
            required
          />
          <input
            type="text"
            placeHolder="Address"
            id="address"
            className="p-3 rounded-lg border text-black"
            required
          />
          <textarea
            type="text"
            placeHolder="Description"
            id="description"
            className="p-3 rounded-lg border text-black"
            required
          />

          <div className="flex gap-4 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking slot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5 " />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                className="p-3 rounded-lg border border-gray-300 text-black"
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="p-3 rounded-lg border border-gray-300 text-black"
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
              />
              <p>Bathrooms</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="p-3 rounded-lg border border-gray-300 text-black"
                type="number"
                id="standardPrice"
                min="1"
                max="10"
                required
              />
              <div className="flex flex-col items-center ">
                <p>Standard price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="p-3 rounded-lg border border-gray-300 text-black"
                type="number"
                id="discountPrice"
                min="1"
                max="10"
                required
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
