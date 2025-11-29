import React from "react";
import data from "../data/learn.json";
import { useNavigate } from "react-router-dom";

export default function WhatYouLearn() {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-bg-main transition-colors">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-16 tracking-tight">
          {data.title}
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-12">
          {data.items.map((item, idx) => (
            <div onClick={()=> navigate(item.path)} key={idx} className="cursor-pointer flex flex-col items-center gap-3">
              
              <img 
                src={item.icon}
                alt={item.label}
                className=" h-36 object-contain dark:invert-[0.5] lg:dark:invert-[0.9]"
              />
              
              <p className="text-lg font-semibold text-text-primary">
                {item.label}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
