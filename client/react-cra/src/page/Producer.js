import React from "react";
import { useForm } from "react-hook-form";
import { Route, useNavigate } from "react-router-dom";
import { InspectionService } from "../services/inspection.service";

export const Producer = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    InspectionService.createInspection(data)
      .then((inspection) => {
        navigate(
          `/consumer?inspectionId=${inspection.inspectionId}&productId=${inspection.productId}`
        );
      })
      .catch((err) => {
        console.error("ERRRO!", err);
      });
  };

  return (
    <div className="m-5 flex-col flex items-center justify-center">
      <p className="text-3xl my-8 font-bold">MyInsurtech | Producer Portal</p>
      <div className="flex mt-5 flex-col">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                First Name
              </label>
              <input
                {...register("consumer.firstName")}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                required
                placeholder="Jane"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Last Name
              </label>
              <input
                required
                {...register("consumer.lastName")}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Doe"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Identification
              </label>
              <input
                {...register("consumer.identification")}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="3344512"
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="myinsurtech@gmail.com"
                {...register("consumer.email")}
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Marca
              </label>
              <input
                {...register("vehicle.make")}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="JEEP"
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Modelo
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="RENEGADE"
                {...register("vehicle.model")}
                required
              />
            </div>

            <div className="w-full px-3 my-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Patente
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="AS2356"
                {...register("vehicle.plate")}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-white hover:bg-gray-100 w-full text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Create Inspection
          </button>
        </form>
      </div>
    </div>
  );
};
