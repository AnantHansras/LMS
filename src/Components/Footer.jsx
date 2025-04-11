import { useSelector } from "react-redux";

const Footer = () => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  return (
    <footer
      className={`border py-10 px-6 md:px-16 transition-colors duration-300 ${
        !isDarkMode
          ? "border-[hsla(12,7%,15%,1)] bg-[hsla(240,10%,4%,1)] text-[#FAFAF9]"
          : "border-gray-200 bg-gray-50 text-gray-800"
      }`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
        {/* ABOUT US */}
        <div>
          <h3 className="font-semibold mb-4">ABOUT US</h3>
          <ul className="space-y-2">
            {[
              "Our Story",
              "Our People",
              "Our Contributors",
              "Locations",
              "Management",
              "Social Impact",
              "Accessibility Statement",
              "Careers",
              "Imprints",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-[hsla(21,90%,48%,1)] transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold mb-4">QUICK LINKS</h3>
          <ul className="space-y-2">
            {[
              "Partnerships",
              "Media Queries",
              "Influencers",
              "Company Reads",
              "PenguinRandomHouse.biz",
              "Email Preferences",
              "Terms of Use",
              "Privacy Policy",
              "CA Privacy Policy",
              "Do Not Sell My Personal Info",
              "Affiliate Program Disclosure",
              "Avoid Publishing Scams",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-[hsla(21,90%,48%,1)] transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* HELP */}
        <div>
          <h3 className="font-semibold mb-4">HELP</h3>
          <ul className="space-y-2">
            {[
              "Publishing Process",
              "FAQ",
              "Shopping & Shipping FAQ",
              "For Educators",
              "Subrights",
              "Permissions",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-[hsla(21,90%,48%,1)] transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* CONNECT */}
        <div>
          <h3 className="font-semibold mb-4">CONNECT</h3>
          <p className={`mb-4 ${!isDarkMode ? "text-[#A8A29E]" : "text-gray-600"}`}>
            Sign up for news about books, authors, and more from Malaviya National Institute of Technology Jaipur.
          </p>
          <a
            href="#"
            className="bg-[hsla(21,90%,48%,1)] hover:bg-[hsla(21,90%,48%,0.9)] text-white px-4 py-2 rounded-lg flex items-center gap-2 w-fit"
          >
            📩 Stay In Touch
          </a>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            {["🌍", "📷", "📺", "📌", "💼"].map((icon, idx) => (
              <a
                key={idx}
                href="#"
                className="text-xl cursor-pointer hover:text-[hsla(21,90%,48%,1)]"
              >
                {icon}
              </a>
            ))}
          </div>

          <a
            href="#"
            className={`mt-4 block ${!isDarkMode ? "text-[#A8A29E]" : "text-gray-600"}`}
          >
            ANANT_JORAWAR&SOURAV.COM
          </a>
          <p className={!isDarkMode ? "text-[#A8A29E]" : "text-gray-600"}>
            © 2025 Anant&Jorawar
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
