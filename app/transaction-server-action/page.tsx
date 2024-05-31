"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UserAuth } from "../context/AuthContext";
import { redirect, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PaymentForm } from "./components/PaymentForm";
import { Content } from "../context/links";
import paymentAni from "./components/paymentAni.json";
import Lottie from "lottie-react";
import Link from "next/link";

export default function Page() {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);

  const [activeStep, setActiveStep] = useState(0);
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isLastStep, setIsLastStep] = useState(false);
  const [buttonText, setButtonText] = useState("Prev"); // Initial button text

  const router = useRouter()


  useEffect(() => {
    setIsFirstStep(activeStep === 0);
    if (activeStep == 0) {
      setButtonText("Cancle");
    } else {
      setButtonText("prev");
    }

    setIsLastStep(activeStep === steps.length - 1);

  }, [activeStep]);

  const steps = [0, 1, 2, 3];

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
    if (activeStep == 0) {
      setShowStepper(false); // Hide the stepper
    }
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };

    checkAuthentication();
    console.log(user);
    if (!user) {
      setLoading(false);
      redirect("/"); // Redirect if user is not authenticated
    }
  }, [user]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const [showStepper, setShowStepper] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [prevSelectedProject, setPrevSelectedProject] = useState(null);
  const [Packvalue, SetPackValue] = useState(null);
  const [PackCost, SetPackCost] = useState(null);

  const handleProjectClick = (project) => {
    setPrevSelectedProject(selectedProject);
    setSelectedProject(project);
    setShowStepper(true);
  };

  const [selectedMethod, setSelectedMethod] = useState("paypal");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardholderName :"",
    expiryDate: "",
    cvv: "",
  });

  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your payment processing logic here
    console.log("Payment Method:", selectedMethod);
    console.log("Card Details:", cardDetails);
    handleNext();
  };

  const SetSelectedValue = (a, b) => {
    SetPackValue(a);
    SetPackCost(b);
    handleNext();
  };

  const CanclePayment = () => {
    SetPackValue(null);
    SetPackCost(null);
    setActiveStep(0);
  };

  const RedirectToMain= ()=>{
    console.log("Back To Menu");
    redirect("/");
  }


  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <div className="flex-1 relative">
        <Image
          src="/rabbit_nobg.png"
          alt="Rabbit Image"
          layout="fill"
          objectFit="cover"
        />

        <div className="absolute inset-0 h-full w-full bg-gray-900/60 flex justify-center items-center">
          <div className="grid pt-16 ">
            <div className="container relative place-items-center text-center ">
              <div className="flex justify-center items-center  p-8 z-0 rounded-xl bg-white">
                <div className="w-auto">
                  <div className=" mx-32">
                    {" "}
                    {/* Fixed max width */}
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Montery Gold Coin</h1>
                    <div className="relative flex items-center justify-between w-full">
                      <div className="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-gray-300"></div>
                      <motion.div
                        className="absolute left-0 top-2/4 h-0.5 bg-gray-900 transition-all duration-500"
                        style={{
                          width: `${(activeStep / (steps.length - 1)) * 100}%`,
                        }}
                      ></motion.div>
                      {steps.map((step, index) => (
                        <div
                          key={index}
                          className={`relative z-10 grid w-8 h-8 font-bold text-white transition-all duration-300 rounded-full place-items-center ${activeStep >= index ? "bg-gray-900" : "bg-gray-300"
                            }`}
                          onClick={() => setActiveStep(index)}
                        >
                          {index + 1}
                        </div>
                      ))}
                    </div>
                    <motion.div
                      className="mt-12 w-full" // Set width to full
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      key={activeStep}
                    >
                      { }
                      {activeStep === 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="flex flex-wrap justify-center items-center gap-12 mt-8"
                        >
                          {Content.projects.map((project, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.5 }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.96 }}
                              className="relative overflow-hidden cursor-pointer m-2 rounded-xl"
                              style={{
                                flexBasis: "200px",
                                flexGrow: 1,
                                minWidth: "200px",
                                maxWidth: "calc(33.333% - 16px)",
                              }}
                              onClick={() =>
                                SetSelectedValue(
                                  project.value,
                                  project.packcost
                                )
                              }
                            >
                              <div
                                className="flex bg-neutral-1 bg-cover bg-center"
                                style={{
                                  height: "200px",
                                  backgroundImage: `url(/rabbit_nobg.png)`,
                                }}
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-white/40 backdrop-blur-sm p-2 text-center rounded-t-lg">
                                {project.title}
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}

                      {activeStep === 1 && (
                        <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-lg bg-white">
                          <h2 className="text-2xl font-bold mb-4 text-center">
                            Choose Payment Method
                          </h2>
                          <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                              <label className="block mb-2 font-bold">
                                Payment Method
                              </label>
                              <select
                                value={selectedMethod}
                                onChange={handleMethodChange}
                                className="w-full p-2 border rounded"
                              >
                                <option value="creditCard">Credit Card</option>
                                <option value="paypal">PayPal</option>
                                <option value="bankTransfer">
                                  Bank Transfer
                                </option>
                              </select>
                            </div>

                            {selectedMethod === "creditCard" && (
                              <div className="flex flex-wrap -mx-2">
                                <div className="w-full sm:w-1/2 px-2 mb-4">
                                  <label className="block mb-2 font-bold">
                                    Card Number
                                  </label>
                                  <input
                                    type="text"
                                    name="cardNumber"
                                    value={cardDetails.cardNumber}
                                    onChange={handleCardDetailsChange}
                                    className="w-full p-2 border rounded"
                                    placeholder="1234 5678 9012 3456"
                                    required
                                  />
                                </div>
                                <div className="w-full sm:w-1/2 px-2 mb-4">
                                  <label className="block mb-2 font-bold">
                                    Expiry Date
                                  </label>
                                  <input
                                    type="text"
                                    name="expiryDate"
                                    value={cardDetails.expiryDate}
                                    onChange={handleCardDetailsChange}
                                    className="w-full p-2 border rounded"
                                    placeholder="MM/YY"
                                    required
                                  />
                                </div>
                                <div className="w-full sm:w-1/2 px-2 mb-4">
                                  <label className="block mb-2 font-bold">
                                    CVV
                                  </label>
                                  <input
                                    type="text"
                                    name="cvv"
                                    value={cardDetails.cvv}
                                    onChange={handleCardDetailsChange}
                                    className="w-full p-2 border rounded"
                                    placeholder="123"
                                    required
                                  />
                                </div>
                                <div className="w-full sm:w-1/2 px-2 mb-4">
                                  <label className="block mb-2 font-bold">
                                    Cardholder Name
                                  </label>
                                  <input
                                    type="text"
                                    name="cardholderName"
                                    value={cardDetails.cardholderName}
                                    onChange={handleCardDetailsChange}
                                    className="w-full p-2 border rounded"
                                    placeholder="John Doe"
                                    required
                                  />
                                </div>
                              </div>
                            )}

                            {selectedMethod === "paypal" && (
                              <div className="mb-4">
                                <p>
                                  You'll be redirected to PayPal to complete
                                  your purchase.
                                </p>
                              </div>
                            )}

                            {selectedMethod === "bankTransfer" && (
                              <div className="mb-4">
                                <p>
                                  Please transfer the amount to the following
                                  bank account:
                                </p>
                                <p>Account Number: 123456789</p>
                                <p>Bank: XYZ Bank</p>
                                <p>IBAN: XYZ123456789</p>
                              </div>
                            )}

                            <button
                              type="submit"
                              className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded"
                            >
                              Submit
                            </button>
                          </form>
                        </div>
                      )}
                      {activeStep === 2 && (
                        <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-lg bg-gradient-to-r 0">
                          <h2 className="text-3xl font-bold mb-4 text-center text-black-800">
                            Confirm Payment
                          </h2>
                          <div className="mb-4 p-4 bg-white rounded-lg shadow-inner">
                            <p className="text-lg">
                              <span className="font-semibold text-green-500">
                                Payment Method:
                              </span>{" "}
                              <span className="text-blue-900">
                                {selectedMethod}
                              </span>
                            </p>
                            <p className="text-lg mt-2">
                              <span className="font-semibold text-green-500	">
                                Amount To Get:
                              </span>{" "}
                              <span className="text-blue-900">
                                {Packvalue} Monterya Coin
                              </span>
                            </p>
                            <p className="text-lg mt-2">
                              <span className="font-semibold text-green-500">
                                Amount To Pay:
                              </span>{" "}
                              <span className="text-blue-900">
                                {PackCost} Baht
                              </span>
                            </p>
                          </div>
                          <button
                            className="mt-6 w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-300"
                            onClick={handleNext}
                          >
                            Confirm and Pay
                          </button>
                          <button
                            className="mt-6 w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors duration-300"
                            onClick={CanclePayment}
                          >
                            Cancle
                          </button>
                        </div>
                      )}

                      {activeStep === 3 && (

                        <div className="max-w-lg mx-auto">
                          <h2 className="text-3xl font-bold mb-4 text-center text-black-800">
                            Payment Complete!
                          </h2>
                          <div className="container pt-0 flex flex-col items-center"> {/* Changed container to flex and added items-center */}
                            <div className="w-48 h-48 flex justify-center items-center"> {/* Added flex and justify-center to center the View */}
                            <Lottie animationData={paymentAni} loop={false} />;                            </div>
                            <p>
                              Monterya Coin Receive: <span className="font-bold text-green-500">{Packvalue}</span>
                            </p>
                            <p>ReferenceID: 123456789</p>
                                <button className="mt-6 w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-300"
                                onClick={() => router.push('/')}
                                >
                                  Back
                                </button>
                          </div>
                        </div>


                      )}
                    </motion.div>
                    {/* <div className="flex justify-between mt-16">
                      <button
                        id="prevButton" // Add a unique id
                        className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        onClick={handlePrev}
                        //disabled={isFirstStep}
                      >
                        {buttonText}
                      </button>
                      <button
                        className="select-none rounded-lg bg-black py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        onClick={handleNext}
                        disabled={isLastStep}
                      >
                        Next
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
