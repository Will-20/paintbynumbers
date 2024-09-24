import Image from "next/image";
import React from "react";
import { lusitana } from '@/app/ui/fonts';


export default function About() {
  return (
    
    <main className="flex w-screen justify-around align-middle">
    
      <div className="flex flex-col w-1/2 justify-center text-left space-y-4 py-4">
        <header className="text-white text-lg">
          About Our Paint-by-Numbers Template Maker
        </header>

        <p className="text-slate-300">
          Welcome to our innovative Paint-by-Numbers Template Maker! This web application is designed to transform your favorite images into custom paint-by-numbers templates, allowing you to create unique artwork with ease.
        </p>

        <header className="text-white text-lg">
          Our Mission
        </header>
        
        <p className="text-slate-300">
          We believe that everyone has an artist within them. Our goal is to make art accessible and enjoyable for people of all skill levels by providing a user-friendly tool to create personalized paint-by-numbers projects.
        </p>

        <header className="text-white text-lg">
        How It Works
        </header>
        
        <p className="text-slate-300">
        Our application uses advanced image processing algorithms to analyze your uploaded images and generate detailed paint-by-numbers templates. Simply upload an image, adjust the settings to your liking, and watch as your photo is transformed into a ready-to-paint masterpiece.
        </p>

        <header className="text-white text-lg">
          Open Source Project
        </header>
        
        <p className="text-slate-300">
          We&#39;re proud to announce that this project is entirely open source. We believe in the power of community-driven development and welcome contributions from developers around the world. You can find our source code on GitHub (link to be added).
        </p>

        <header className="text-white text-lg">
          Development Journey
        </header>
        
        <p className="text-slate-300">
          This labor of love took three months of dedicated work to bring to life. From conceptualization to deployment, our team poured their hearts into creating a tool that we hope will bring joy and creativity to users everywhere.
        </p>

        <header className="text-white text-lg">
        Get Started
        </header>
        
        <p className="text-slate-300">
          Ready to turn your photos into paint-by-numbers art? Upload an image and start creating your custom template today!
          For any questions, feedback, or support, please don&#39;t hesitate to contact us. Happy painting!        
        </p>
  
        
        
        
      </div>

    </main>
  );
}
