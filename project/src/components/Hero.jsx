import React from "react";

export default function Hero() {
  return (
    <div className="relative bg-indigo-900 text-white py-20">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/2681319/pexels-photo-2681319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Students learning"
          className="w-full h-full object-cover opacity-10"
        />
      </div>
      <div className="relative container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Education Without Barriers
          </h1>
          <p className="text-xl mb-8">
            Personalized learning experiences designed for every student's
            unique needs. Discover accessible education that adapts to you.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-white text-indigo-900 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
              Get Started
            </button>
            <button className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-900 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
