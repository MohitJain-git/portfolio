import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import React from 'react';
// Make sure to import your CSS file if it's not global
// import './Hero.css'; 

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center bg-[#0a0a0a] text-white">
      
      {/* --- START OF NEW CONTENT --- */}
      <div className="logo-container text-center">
        {/* The Glitch Effect */}
        <div className="glitch relative text-9xl font-black tracking-widest" data-text="MJ">
          MJ
        </div>
        
        {/* The Sub-text */}
        <div className="sub-text text-cyan-400 text-2xl tracking-[0.5em] mt-4 font-mono">
          MOHIT JAIN
        </div>
        
        {/* The Tagline */}
        <p className="tagline text-gray-500 text-sm tracking-widest mt-2 uppercase">
          Full Stack • AI • Game Dev
        </p>
      </div>
      {/* --- END OF NEW CONTENT --- */}

    </section>
  );
};

export default Hero;

// const Hero = () => {
//   return (
//     <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
//       <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
//       <div className="container mx-auto px-4 text-center relative z-10">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
//             Mohit Jain
//           </h1>
//           <h2 className="text-2xl md:text-3xl text-muted-foreground mb-6">
//             AI/ML Engineer & Full Stack Developer
//           </h2>
//           <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
//             Computer Science master's student with 2+ years of experience in developing 
//             Python-based AI solutions, including deploying ML models and CNNs for object 
//             detection and face verification on AWS.
//           </p>
          
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
//             <Button 
//               size="lg" 
//               className="bg-gradient-primary hover:shadow-glow-primary transition-smooth"
//             >
//               <Mail className="mr-2 h-5 w-5" />
//               Get In Touch
//             </Button>
//             <Button 
//               variant="outline" 
//               size="lg"
//               className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
//             >
//               <Download className="mr-2 h-5 w-5" />
//               Download Resume
//             </Button>
//           </div>

//           <div className="flex justify-center space-x-6">
//             <a 
//               href="https://linkedin.com/in/mohitjain-27" 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className="text-muted-foreground hover:text-primary transition-smooth hover:shadow-glow-primary p-2 rounded-lg"
//             >
//               <Linkedin className="h-6 w-6" />
//             </a>
//             <a 
//               href="mailto:mohit270900@gmail.com"
//               className="text-muted-foreground hover:text-primary transition-smooth hover:shadow-glow-primary p-2 rounded-lg"
//             >
//               <Mail className="h-6 w-6" />
//             </a>
//             <a 
//               href="#" 
//               className="text-muted-foreground hover:text-primary transition-smooth hover:shadow-glow-primary p-2 rounded-lg"
//             >
//               <Github className="h-6 w-6" />
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;