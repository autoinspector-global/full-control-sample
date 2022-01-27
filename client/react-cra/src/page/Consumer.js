import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { InspectionService } from "../services/inspection.service";

export const Consumer = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const inspectionId = query.get("inspectionId");
  const productId = query.get("productId");

  const [start, setStart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [files, setFiles] = useState([]);

  const onUpload = async () => {
    setIsLoading(true);

    const imagesUploadedStatus = await Promise.all(
      files.map(async (file) => {
        try {
          await InspectionService.uploadImage(productId, file);
          return true;
        } catch (err) {
          console.error(err);
          return false;
        }
      })
    );

    console.log("uploaded status!", imagesUploadedStatus);
    setIsLoading(false);
  };

  const StartInspection = (
    <div className="flex items-center justify-center flex-col">
      <p className="text-2xl my-5">Inspeccion #{inspectionId}</p>
      <button
        onClick={() => setStart(true)}
        type="submit"
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Start Inspection
      </button>
    </div>
  );

  const UploadPhotos = (
    <div className="">
      <div className="flex justify-center">
        <div className="mb-3 w-96">
          <h1 className="text-3xl text-center my-10 font-semibold">
            Vehicle Inspection
          </h1>
          <label
            for="formFile"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Front Photo
          </label>
          <input
            onChange={(e) => setFiles((prev) => prev.concat(e.target.files[0]))}
            className="form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="file"
            id="formFile"
          />

          <label
            for="formFile"
            className="form-label inline-block mb-2 text-gray-700 mt-5"
          >
            Back Photo
          </label>
          <input
            onChange={(e) => setFiles((prev) => prev.concat(e.target.files[0]))}
            className="form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="file"
            id="formFile"
          />
        </div>
      </div>
      <div className="flex flex-col mt-10 space-y-5">
        <button
          onClick={onUpload}
          type="submit"
          className="bg-blue-500 text-white w-full hover:bg-gray-100 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Upload
        </button>
        <button
          type="submit"
          className="bg-white w-full  hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Finish
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      {!start ? StartInspection : UploadPhotos}
    </div>
  );
};
