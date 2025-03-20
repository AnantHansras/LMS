import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-br from-[#0B1120] to-[#141C2F] text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* MNIT Jaipur Logo */}
        <a href="https://mnit.ac.in" className="flex items-center space-x-3">
          <img
            src="/MNITlogo.jpeg" 
            alt="MNIT Jaipur Logo"
            className="h-12 w-auto"
          />
          <span className="text-xl font-bold">MNIT Jaipur</span>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 text-sm">
          <a href="https://mnit.ac.in/about" className="hover:text-gray-300 transition">About</a>
          <a href="https://mnit.ac.in/departments" className="hover:text-gray-300 transition">Departments</a>
          <a href="https://mnit.ac.in/admissions" className="hover:text-gray-300 transition">Admissions</a>
          <a href="https://mnit.ac.in/research" className="hover:text-gray-300 transition">Research</a>
          <a href="https://mnit.ac.in/campus_life" className="hover:text-gray-300 transition">Campus Life</a>
          <a href="https://mnit.ac.in/contact" className="hover:text-gray-300 transition">Contact</a>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          className="md:hidden bg-[#1E293B] text-white p-4 space-y-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <a href="https://mnit.ac.in/about" className="block">About</a>
          <a href="https://mnit.ac.in/departments" className="block">Departments</a>
          <a href="https://mnit.ac.in/admissions" className="block">Admissions</a>
          <a href="https://mnit.ac.in/research" className="block">Research</a>
          <a href="https://mnit.ac.in/campus_life" className="block">Campus Life</a>
          <a href="https://mnit.ac.in/contact" className="block">Contact</a>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
