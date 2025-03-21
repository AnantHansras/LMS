import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="bg-[hsla(240,10%,4%,1)] border border-[hsla(12,7%,15%,1)] text-[#FAFAF9] shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        
        {/* MNIT Jaipur Logo */}
        <a href="https://mnit.ac.in" className="flex items-center space-x-3">
          <img
            src="/MNITlogo.jpeg"
            alt="MNIT Jaipur Logo"
            className="h-12 w-auto"
          />
          <span className="text-xl font-semibold tracking-wide text-[#FAFAF9]">
            MNIT Jaipur
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-sm">
          {[
            { name: "About", link: "https://mnit.ac.in/about" },
            { name: "Departments", link: "https://mnit.ac.in/departments" },
            { name: "Admissions", link: "https://mnit.ac.in/admissions" },
            { name: "Research", link: "https://mnit.ac.in/research" },
            { name: "Campus Life", link: "https://mnit.ac.in/campus_life" },
            { name: "Contact", link: "https://mnit.ac.in/contact" },
          ].map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="hover:text-[hsla(21,90%,48%,1)] transition duration-300"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-[#FAFAF9] focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          ref={menuRef}
          className="md:hidden bg-[#0c0A09] text-[#FAFAF9] p-6 absolute w-full shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {[
            { name: "About", link: "https://mnit.ac.in/about" },
            { name: "Departments", link: "https://mnit.ac.in/departments" },
            { name: "Admissions", link: "https://mnit.ac.in/admissions" },
            { name: "Research", link: "https://mnit.ac.in/research" },
            { name: "Campus Life", link: "https://mnit.ac.in/campus_life" },
            { name: "Contact", link: "https://mnit.ac.in/contact" },
          ].map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="block py-2 text-center text-lg hover:text-[hsla(21,90%,48%,1)] transition"
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </motion.div>
      )}
    </header>
  );
};

export default Header;



//header-2 transparent


// import { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { Menu, X } from "lucide-react";

// const GlassmorphismNavbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const menuRef = useRef(null);

//   // Close menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setMenuOpen(false);
//       }
//     };

//     if (menuOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [menuOpen]);

//   return (
//     <header className="bg-white/10 backdrop-blur-lg text-white shadow-lg sticky top-0 z-50">
//       <div className="container mx-auto flex justify-between items-center px-6 py-4">
        
//         {/* MNIT Jaipur Logo */}
//         <a href="https://mnit.ac.in" className="flex items-center space-x-3">
//           <img
//             src="/MNITlogo.jpeg"
//             alt="MNIT Jaipur Logo"
//             className="h-12 w-auto"
//           />
//           <span className="text-xl font-semibold tracking-wide">MNIT Jaipur</span>
//         </a>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex space-x-8 text-sm">
//           {[
//             { name: "About", link: "https://mnit.ac.in/about" },
//             { name: "Departments", link: "https://mnit.ac.in/departments" },
//             { name: "Admissions", link: "https://mnit.ac.in/admissions" },
//             { name: "Research", link: "https://mnit.ac.in/research" },
//             { name: "Campus Life", link: "https://mnit.ac.in/campus_life" },
//             { name: "Contact", link: "https://mnit.ac.in/contact" },
//           ].map((item) => (
//             <a
//               key={item.name}
//               href={item.link}
//               className="hover:text-blue-300 transition duration-300"
//             >
//               {item.name}
//             </a>
//           ))}
//         </nav>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden p-2 rounded-md focus:outline-none"
//           onClick={() => setMenuOpen(!menuOpen)}
//           aria-label="Toggle Menu"
//         >
//           {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <motion.div
//           ref={menuRef}
//           className="md:hidden bg-white/10 backdrop-blur-lg text-white p-6 absolute w-full shadow-lg rounded-lg"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -10 }}
//           transition={{ duration: 0.3 }}
//         >
//           {[
//             { name: "About", link: "https://mnit.ac.in/about" },
//             { name: "Departments", link: "https://mnit.ac.in/departments" },
//             { name: "Admissions", link: "https://mnit.ac.in/admissions" },
//             { name: "Research", link: "https://mnit.ac.in/research" },
//             { name: "Campus Life", link: "https://mnit.ac.in/campus_life" },
//             { name: "Contact", link: "https://mnit.ac.in/contact" },
//           ].map((item) => (
//             <a
//               key={item.name}
//               href={item.link}
//               className="block py-2 text-center text-lg hover:text-blue-300 transition"
//               onClick={() => setMenuOpen(false)}
//             >
//               {item.name}
//             </a>
//           ))}
//         </motion.div>
//       )}
//     </header>
//   );
// };

// export default GlassmorphismNavbar;


//header-3 neon

// import { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { Menu, X } from "lucide-react";

// const NeonNavbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const menuRef = useRef(null);

//   // Close menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setMenuOpen(false);
//       }
//     };

//     if (menuOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [menuOpen]);

//   return (
//     <header className="sticky top-0 z-50 bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white shadow-lg border-b-4 border-cyan-400">
//       <div className="container mx-auto flex justify-between items-center px-6 py-4">
        
//         {/* MNIT Jaipur Logo */}
//         <a href="https://mnit.ac.in" className="flex items-center space-x-3">
//           <img
//             src="/MNITlogo.jpeg"
//             alt="MNIT Jaipur Logo"
//             className="h-12 w-auto border-2 border-cyan-400 rounded-lg shadow-[0px_0px_10px_rgba(0,255,255,0.7)]"
//           />
//           <span className="text-xl font-semibold tracking-wide text-cyan-400 drop-shadow-[0px_0px_5px_cyan]">
//             MNIT Jaipur
//           </span>
//         </a>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex space-x-8 text-sm">
//           {[
//             { name: "About", link: "https://mnit.ac.in/about" },
//             { name: "Departments", link: "https://mnit.ac.in/departments" },
//             { name: "Admissions", link: "https://mnit.ac.in/admissions" },
//             { name: "Research", link: "https://mnit.ac.in/research" },
//             { name: "Campus Life", link: "https://mnit.ac.in/campus_life" },
//             { name: "Contact", link: "https://mnit.ac.in/contact" },
//           ].map((item) => (
//             <a
//               key={item.name}
//               href={item.link}
//               className="hover:text-cyan-400 transition duration-300 text-lg font-medium drop-shadow-[0px_0px_5px_cyan]"
//             >
//               {item.name}
//             </a>
//           ))}
//         </nav>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden p-2 rounded-md focus:outline-none text-cyan-400"
//           onClick={() => setMenuOpen(!menuOpen)}
//           aria-label="Toggle Menu"
//         >
//           {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <motion.div
//           ref={menuRef}
//           className="md:hidden bg-[#14142b] text-white p-6 absolute w-full  border-t-4 border-cyan-400 shadow-[0px_0px_15px_rgba(0,255,255,0.5)]"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -10 }}
//           transition={{ duration: 0.3 }}
//         >
//           {[
//             { name: "About", link: "https://mnit.ac.in/about" },
//             { name: "Departments", link: "https://mnit.ac.in/departments" },
//             { name: "Admissions", link: "https://mnit.ac.in/admissions" },
//             { name: "Research", link: "https://mnit.ac.in/research" },
//             { name: "Campus Life", link: "https://mnit.ac.in/campus_life" },
//             { name: "Contact", link: "https://mnit.ac.in/contact" },
//           ].map((item) => (
//             <a
//               key={item.name}
//               href={item.link}
//               className="block py-2 text-center text-lg hover:text-cyan-400 transition text-cyan-400 font-medium drop-shadow-[0px_0px_5px_cyan]"
//               onClick={() => setMenuOpen(false)}
//             >
//               {item.name}
//             </a>
//           ))}
//         </motion.div>
//       )}
//     </header>
//   );
// };

// export default NeonNavbar;

//header-4

// import { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { Menu, X } from "lucide-react";

// const MinimalNavbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const menuRef = useRef(null);

//   // Close menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setMenuOpen(false);
//       }
//     };

//     if (menuOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [menuOpen]);

//   return (
//     <header className="sticky top-0 z-50 bg-white text-gray-900 border-b border-gray-300 shadow-sm">
//       <div className="container mx-auto flex justify-between items-center px-6 py-4">
        
//         {/* MNIT Jaipur Logo */}
//         <a href="https://mnit.ac.in" className="flex items-center space-x-3">
//           <img
//             src="/MNITlogo.jpeg"
//             alt="MNIT Jaipur Logo"
//             className="h-10 w-auto"
//           />
//           <span className="text-lg font-medium">MNIT Jaipur</span>
//         </a>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex space-x-6 text-sm">
//           {[
//             { name: "About", link: "https://mnit.ac.in/about" },
//             { name: "Departments", link: "https://mnit.ac.in/departments" },
//             { name: "Admissions", link: "https://mnit.ac.in/admissions" },
//             { name: "Research", link: "https://mnit.ac.in/research" },
//             { name: "Campus Life", link: "https://mnit.ac.in/campus_life" },
//             { name: "Contact", link: "https://mnit.ac.in/contact" },
//           ].map((item) => (
//             <a
//               key={item.name}
//               href={item.link}
//               className="hover:text-gray-600 transition duration-300"
//             >
//               {item.name}
//             </a>
//           ))}
//         </nav>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden p-2 rounded-md focus:outline-none"
//           onClick={() => setMenuOpen(!menuOpen)}
//           aria-label="Toggle Menu"
//         >
//           {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <motion.div
//           ref={menuRef}
//           className="md:hidden bg-white text-gray-900 p-6 absolute w-full border-t border-gray-300 shadow-lg"
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -10 }}
//           transition={{ duration: 0.3 }}
//         >
//           {[
//             { name: "About", link: "https://mnit.ac.in/about" },
//             { name: "Departments", link: "https://mnit.ac.in/departments" },
//             { name: "Admissions", link: "https://mnit.ac.in/admissions" },
//             { name: "Research", link: "https://mnit.ac.in/research" },
//             { name: "Campus Life", link: "https://mnit.ac.in/campus_life" },
//             { name: "Contact", link: "https://mnit.ac.in/contact" },
//           ].map((item) => (
//             <a
//               key={item.name}
//               href={item.link}
//               className="block py-2 text-center text-lg hover:text-gray-600 transition"
//               onClick={() => setMenuOpen(false)}
//             >
//               {item.name}
//             </a>
//           ))}
//         </motion.div>
//       )}
//     </header>
//   );
// };

// export default MinimalNavbar;


//header-5

// import { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { Menu, X } from "lucide-react";

// const FloatingNavbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const menuRef = useRef(null);

//   // Close menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setMenuOpen(false);
//       }
//     };

//     if (menuOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [menuOpen]);

//   return (
//     <header className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-[#1A2332] text-white shadow-xl rounded-xl px-6 py-3 z-50">
//       <div className="flex justify-between items-center w-full max-w-screen-lg">
        
//         {/* MNIT Jaipur Logo */}
//         <a href="https://mnit.ac.in" className="flex items-center space-x-3">
//           <img src="/MNITlogo.jpeg" alt="MNIT Jaipur Logo" className="h-10 w-auto" />
//           <span className="text-xl font-semibold">MNIT Jaipur</span>
//         </a>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex space-x-6 text-sm">
//           {[
//             { name: "About", link: "https://mnit.ac.in/about" },
//             { name: "Departments", link: "https://mnit.ac.in/departments" },
//             { name: "Admissions", link: "https://mnit.ac.in/admissions" },
//             { name: "Research", link: "https://mnit.ac.in/research" },
//             { name: "Campus Life", link: "https://mnit.ac.in/campus_life" },
//             { name: "Contact", link: "https://mnit.ac.in/contact" },
//           ].map((item) => (
//             <a
//               key={item.name}
//               href={item.link}
//               className="hover:text-gray-300 transition duration-300"
//             >
//               {item.name}
//             </a>
//           ))}
//         </nav>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden p-2 rounded-md focus:outline-none"
//           onClick={() => setMenuOpen(!menuOpen)}
//           aria-label="Toggle Menu"
//         >
//           {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <motion.div
//           ref={menuRef}
//           className="md:hidden bg-[#1E293B] text-white p-6 absolute w-full mt-4 shadow-lg rounded-lg"
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -10 }}
//           transition={{ duration: 0.3 }}
//         >
//           {[
//             { name: "About", link: "https://mnit.ac.in/about" },
//             { name: "Departments", link: "https://mnit.ac.in/departments" },
//             { name: "Admissions", link: "https://mnit.ac.in/admissions" },
//             { name: "Research", link: "https://mnit.ac.in/research" },
//             { name: "Campus Life", link: "https://mnit.ac.in/campus_life" },
//             { name: "Contact", link: "https://mnit.ac.in/contact" },
//           ].map((item) => (
//             <a
//               key={item.name}
//               href={item.link}
//               className="block py-2 text-center text-lg hover:text-gray-300 transition"
//               onClick={() => setMenuOpen(false)}
//             >
//               {item.name}
//             </a>
//           ))}
//         </motion.div>
//       )}
//     </header>
//   );
// };

// export default FloatingNavbar;
