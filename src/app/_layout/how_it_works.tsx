"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface Step {
  title: string;
  description: string;
}

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [highlightedStep, setHighlightedStep] = useState<number | null>(null);
  const stepsRef = useRef<HTMLLIElement[]>([]);

  const steps: Step[] = [
    {
      title: "Open the App",
      description: "Download and open the app to get started",
    },
    {
      title: "Explore the Map",
      description:
        "Browse through the interactive map to find nearby businesses, events, and hotspots.",
    },
    {
      title: "Discover New Places",
      description:
        "Check out detailed listings with reviews, photos, and ratings.",
    },
    {
      title: "Unlock Exclusive Offers",
      description:
        "Tap on your favorite spots to reveal special discounts and deals.",
    },
    {
      title: "Enjoy Your Experience",
      description:
        "Visit the places you love and enjoy the exclusive benefits.",
    },
  ];

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      let newHighlightedStep: number | null = null;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = stepsRef.current.indexOf(entry.target as HTMLLIElement);
          if (index !== -1) newHighlightedStep = index;
        }
      });

      if (newHighlightedStep !== null) {
        setActiveStep(newHighlightedStep);
        setHighlightedStep(newHighlightedStep);

        // Reset highlight after a delay to ensure visibility
        setTimeout(() => {
          if (highlightedStep === newHighlightedStep) {
            setHighlightedStep(null);
          }
        }, 1000); // Adjust delay as needed
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5, // Adjust threshold to control when elements are considered visible
      rootMargin: "0px 0px -50% 0px", // Adjust rootMargin to ensure elements are highlighted when approaching the viewport
    });

    stepsRef.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => {
      observer.disconnect();
    };
  }, [highlightedStep]);

  return (
    <div className="min-w-screen flex min-h-screen items-center justify-center rounded-[8rem] bg-black p-4">
      <div className="w-full max-w-6xl p-8 md:p-12 lg:p-16">
        <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
          How It Works
        </h1>
        <p className="mb-8 text-sm text-gray-400 md:text-base">
          A Quick Guide to Navigating Waynaa
        </p>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
          {/* Phone Image */}
          <div className="flex justify-center lg:w-1/2 lg:justify-start">
            <div className="relative">
              <div className="absolute h-[88vh] inset-0 rounded-[2.5rem] p-1 border-2 border-lime-400  w-[28rem]">
                <div className="h-[90vh] w-[28rem] flex flex-col justify-center items-center bg-gray-200 rounded-[2.5rem]">
                  <Image
                    src="/Howitworks/border.svg"
                    alt="Findo App Login Screen"
                    className="relative z-10 w-80  h-[70vh] rounded-[2rem] md:w-72 "
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="lg:w-1/2">
            <ol className="relative border-l mb-12 border-gray-700">
              {steps.map((step, index) => (
                <li
                  key={index}
                  ref={(el) => {
                    if (el) stepsRef.current[index] = el;
                  }}
                  className={`group ml-10 transition-all duration-300 ease-in-out ${
                    index === activeStep || index === highlightedStep
                      ? "opacity-100"
                      : "opacity-80"
                  }`}
                >
                  <span
                    className={`absolute -left-6 flex h-8 w-8 items-center justify-center rounded-full ring-4 ring-gray-900 transition-all duration-300 ml-[5px] ease-in-out ${
                      index === activeStep || index === highlightedStep
                        ? "bg-lime-400"
                        : "bg-gray-500"
                    }`}
                  >
                    <span
                      className={`transition-colors duration-300 ${
                        index === activeStep || index === highlightedStep
                          ? "text-black"
                          : "text-gray-100 z-10 opacity-100"
                      }`}
                    >
                      {index + 1}
                    </span>
                  </span>
                  <h3
                    className={`mb-1 flex items-center text-[1rem] font-medium transition-colors duration-300 text-gray-500 mt-8`}
                  >
                    Step {index + 1}
                  </h3>
                  <h3
                    className={`mb-1 flex items-center text-xl font-medium transition-colors duration-300 mt-5 ${
                      index === activeStep || index === highlightedStep
                        ? "text-lime-300"
                        : "text-white"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`mb-4 text-sm font-normal transition-colors duration-300 ${
                      index === activeStep || index === highlightedStep
                        ? "text-gray-300"
                        : "text-gray-400"
                    }`}
                  >
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}