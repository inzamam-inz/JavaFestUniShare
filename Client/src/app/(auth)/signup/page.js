"use client";

import ImageUpload from "@/components/GlobalComponents/ImageUpload/ImageUpload";
import { CogIcon, HomeIcon, UserIcon } from "@heroicons/react/24/outline";
import { Button, Step, Stepper } from "@material-tailwind/react";
import { createTheme } from "@mui/material/styles";
import GoogleMapReact from "google-map-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const defaultTheme = createTheme();

export default function SignUp() {
  const univserities = [
    "University of Toronto",
    "University of Waterloo",
    "University of Ottawa",
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [idCardImage, setIdCardImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [userLocation, setUserLocation] = useState({
    lat: 23.777176,
    lng: 90.399452,
  });
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    university: "",
    password: "",
    confirmPassword: "",
    address: "",
    phoneNumber: "",
    idCardImage: null,
    profileImage: null,
    otp: "",
    role: "USER",
  });
  const handleNext = () => {
    if (activeStep === 0) {
      // if required fields not filled, return
      if (
        !formData.fullName ||
        !formData.email ||
        !formData.university ||
        !formData.password ||
        !formData.address ||
        !formData.phoneNumber
      ) {
        toast.error("Please fill all required fields");
        return;
      }
      // if password and confirm password do not match, return
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      setActiveStep(1);
    }
    if (activeStep === 1) {
      // if required fields not filled, return
      if (!idCardImage || !profileImage) {
        toast.error("Please upload all required images");
        return;
      }

      setActiveStep(2);
    }
  };

  const setLocation = (position) => {
    const { latitude, longitude } = position.coords;
    setUserLocation({ lat: latitude, lng: longitude });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // Function to handle ID card image upload
  const handleIdCardUpload = (file) => {
    setIdCardImage(file);
  };

  // Function to handle profile image upload
  const handleProfileUpload = (file) => {
    setProfileImage(file);
  };

  useEffect(() => {
    // Get the user's location when the component mounts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      });
    }
  }, []);

  return (
    <div className="bg-gray-100">
      <section class=" p-9">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          {/* create a card with two inputs in two columns, uplaod image , upload id card */}
          <div class="w-full px-9 py-6 mx-auto bg-white rounded-lg border shadow-lg border-gray-400  lg:w-1/2">
            <Link
              href="/dashboard/storefront/home"
              class="flex justify-center items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-black"
            >
              <img
                class="w-8 h-8 mr-2"
                src="https://res.cloudinary.com/unishare/image/upload/v1694949615/Logo/Unishare_Logo.png"
                alt="logo"
              />
              UniShare
            </Link>
            <h2 class=" text-2xl  text-center text-gray-800">Sign Up</h2>
            <div className="w-full py-4 px-8 my-4">
              <Stepper
                className=" bg-orange-100 rounded-xl"
                activeStep={activeStep}
                isFirstStep={(value) => setIsFirstStep(value)}
              >
                <Step>
                  <HomeIcon className="p-2" />
                </Step>
                <Step>
                  <UserIcon className="p-2" />
                </Step>
                <Step>
                  <CogIcon className="p-2" />
                </Step>
              </Stepper>
            </div>
            <form class="mt-6" action="#" method="POST" onSubmit={handleSubmit}>
              {activeStep === 0 && (
                <div>
                  <div class="flex flex-wrap mb-6 -mx-3">
                    <div class="w-full px-3 mb-6  md:mb-0">
                      <label
                        class="block mb-2 text-xs font-semibold tracking-wide text-gray-700 uppercase dark:text-black"
                        for="grid-first-name"
                      >
                        Full Name*
                      </label>
                      <input
                        class="block w-full px-4 py-3 mb-3 text-gray-700 bg-white border border-gray-300 rounded-lg  focus:border-purple-400 dark:focus:border-purple-400 focus:outline-none focus:ring"
                        id="grid-first-name"
                        type="text"
                        placeholder="John Doe"
                        required
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div class="flex flex-wrap mb-6 -mx-3">
                    <div class="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                      <label
                        class="block mb-2 text-xs font-semibold tracking-wide text-gray-700 uppercase dark:text-black"
                        for="grid-first-name"
                      >
                        Email Address*
                      </label>
                      <input
                        class="block w-full px-4 py-3 mb-3 text-gray-700 bg-white border border-gray-300 rounded-lg  focus:border-purple-400 dark:focus:border-purple-400 focus:outline-none focus:ring"
                        id="grid-first-name"
                        type="text"
                        required
                        placeholder="abc@gmail.com"
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                    <div class="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                      <label
                        class="block mb-2 text-xs font-semibold tracking-wide text-gray-700 uppercase dark:text-black"
                        for="grid-last-name"
                      >
                        University*
                      </label>
                      <select
                        class="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg  focus:border-purple-400 dark:focus:border-purple-400 focus:outline-none focus:ring"
                        id="grid-last-name"
                        type="text"
                        required
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            university: e.target.value,
                          })
                        }
                      >
                        {univserities.map((university) => (
                          <option value={university}>{university}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div class="flex flex-wrap mb-6 -mx-3">
                    <div class="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                      <label
                        class="block mb-2 text-xs font-semibold tracking-wide text-gray-700 uppercase dark:text-black"
                        for="grid-first-name"
                      >
                        Password*
                      </label>
                      <input
                        class="block w-full px-4 py-3 mb-3 text-gray-700 bg-white border border-gray-300 rounded-lg  focus:border-purple-400 dark:focus:border-purple-400 focus:outline-none focus:ring"
                        id="grid-first-name"
                        type="password"
                        placeholder="********"
                        required
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                    </div>
                    <div class="w-full px-3 md:w-1/2">
                      <label
                        class="block mb-2 text-xs font-semibold tracking-wide text-gray-700 uppercase dark:text-black"
                        for="grid-last-name"
                      >
                        Confirm Password*
                      </label>
                      <input
                        class="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg  focus:border-purple-400 dark:focus:border-purple-400 focus:outline-none focus:ring"
                        id="grid-last-name"
                        type="password"
                        placeholder="********"
                        required
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  {/* address one line and phone */}
                  <div class="flex flex-wrap mb-6 -mx-3">
                    <div class="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                      <label
                        class="block mb-2 text-xs font-semibold tracking-wide text-gray-700 uppercase dark:text-black"
                        for="grid-first-name"
                      >
                        Address*
                      </label>
                      <input
                        class="block w-full px-4 py-3 mb-3 text-gray-700 bg-white border border-gray-300 rounded-lg  focus:border-purple-400 dark:focus:border-purple-400 focus:outline-none focus:ring"
                        id="grid-first-name"
                        type="text"
                        placeholder="123 Street Name"
                        required
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            address: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div class="w-full px-3 md:w-1/2">
                      <label
                        class="block mb-2 text-xs font-semibold tracking-wide text-gray-700 uppercase dark:text-black"
                        for="grid-last-name"
                      >
                        Phone Number*
                      </label>
                      <input
                        class="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg  focus:border-purple-400 dark:focus:border-purple-400 focus:outline-none focus:ring"
                        id="grid-last-name"
                        type="text"
                        placeholder="123-456-7890"
                        required
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phoneNumber: e.target.value,
                          })
                        }
                      />
                    </div>
                    {/* location */}
                    <div class="w-full px-3 h-60	">
                      <label
                        class="block mb-2 text-xs font-semibold tracking-wide text-gray-700 uppercase dark:text-black"
                        for="grid-last-name"
                      >
                        Location
                      </label>
                      <GoogleMapReact
                        bootstrapURLKeys={{
                          key: process.env.GOOGLE_MAPS_API_KEY,
                          // Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual API key
                        }}
                        defaultCenter={{
                          lat: 0,
                          lng: 0,
                        }}
                        defaultZoom={12}
                        center={userLocation} // Center the map on the user's location
                        className="h-screen	"
                      ></GoogleMapReact>
                    </div>
                  </div>
                </div>
              )}
              {activeStep === 1 && (
                <div>
                  <div class="flex flex-wrap mb-6 -mx-3">
                    <div class="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                      <label
                        class="block mb-2 text-xs font-semibold tracking-wide text-gray-700 uppercase dark:text-black"
                        for="grid-first-name"
                      >
                        ID Card
                      </label>
                      <ImageUpload
                        label="ID Card"
                        onImageChange={handleIdCardUpload}
                        currentImage={idCardImage}
                      />
                    </div>
                    <div class="w-full px-3 md:w-1/2">
                      <label
                        class="block mb-2 text-xs font-semibold tracking-wide text-gray-700 uppercase dark:text-black"
                        for="grid-last-name"
                      >
                        Profile Picture
                      </label>
                      <ImageUpload
                        label="Profile Picture"
                        onImageChange={handleProfileUpload}
                        currentImage={profileImage}
                      />
                    </div>
                  </div>
                </div>
              )}
              {/* verfiy email address */}
              {activeStep === 2 && (
                <div>
                  <div class="flex flex-wrap mb-6 -mx-3">
                    <div class="w-full px-3 mb-6 md:mb-0">
                      <p class="block mb-2 text-xs font-semibold tracking-wide text-gray-700 uppercase dark:text-black text-center">
                        Please verify your email address
                      </p>
                      <p class="block mb-2 text-md font-bold tracking-wide text-gray-700 uppercase dark:text-black text-center">
                        An OTP has been sent to your email address
                      </p>
                      {/* Enter OTP and verify*/}
                      <div class="flex flex-wrap mt-6 -mx-3">
                        <div class="w-full px-3 mb-6 md:w-2/3 md:mb-0">
                          <input
                            class="block w-full px-4 py-3 mb-3 text-gray-700 bg-white border border-gray-300 rounded-lg  focus:border-purple-400 dark:focus:border-purple-400 focus:outline-none focus:ring"
                            id="grid-first-name"
                            type="text"
                            placeholder="Enter OTP here"
                          />
                        </div>
                        <div class="w-full px-3 mb-6 md:w-1/3 md:mb-0">
                          <button class="block w-full px-4 py-3 mb-3 text-gray-700 bg-white border border-gray-600 rounded-lg hover:bg-slate-800 hover:text-white focus:outline-none focus:ring">
                            Verify
                          </button>
                        </div>
                      </div>
                      {/* Did not get OTP? CLick here to resend, center one liner */}
                      <div class="flex flex-wrap mt-6 -mx-3">
                        <div class="w-full px-3 mb-6 md:mb-0">
                          <p class="block mb-2 text-xs font-semibold tracking-wide text-gray-700 uppercase dark:text-black text-center">
                            Did not get OTP?
                            <a href="#" class="text-blue-600  px-2">
                              Click here to resend
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
            <div className="mt-16 flex justify-center">
              {/* <Button onClick={handlePrev} disabled={isFirstStep}>
                Prev
              </Button> */}
              {activeStep === 2 ? (
                <Button onClick={handleNext}>Submit</Button>
              ) : (
                <Button onClick={handleNext}>Next</Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
