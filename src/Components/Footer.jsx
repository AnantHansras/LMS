// import { useSelector } from "react-redux";

// const Footer = () => {
//   const isDarkMode = false

//   return (
//     <footer
//       className={`border py-10 px-6 md:px-16 transition-colors duration-300 ${
//         !isDarkMode
//           ? "border-[hsla(12,7%,15%,1)] bg-[hsla(240,10%,4%,1)] text-[#FAFAF9]"
//           : "border-gray-200 bg-gray-50 text-gray-800"
//       }`}
//     >
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
//         {/* ABOUT US */}
//         <div>
//           <h3 className="font-semibold mb-4">ABOUT US</h3>
//           <ul className="space-y-2">
//             {[
//               "Our Story",
//               "Our People",
//               "Our Contributors",
//               "Locations",
//               "Management",
//               "Social Impact",
//               "Accessibility Statement",
//               "Careers",
//               "Imprints",
//             ].map((item) => (
//               <li key={item}>
//                 <a
//                   href="#"
//                   className="hover:text-[hsla(21,90%,48%,1)] transition-colors"
//                 >
//                   {item}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* QUICK LINKS */}
//         <div>
//           <h3 className="font-semibold mb-4">QUICK LINKS</h3>
//           <ul className="space-y-2">
//             {[
//               "Partnerships",
//               "Media Queries",
//               "Influencers",
//               "Company Reads",
//               "PenguinRandomHouse.biz",
//               "Email Preferences",
//               "Terms of Use",
//               "Privacy Policy",
//               "CA Privacy Policy",
//               "Do Not Sell My Personal Info",
//               "Affiliate Program Disclosure",
//               "Avoid Publishing Scams",
//             ].map((item) => (
//               <li key={item}>
//                 <a
//                   href="#"
//                   className="hover:text-[hsla(21,90%,48%,1)] transition-colors"
//                 >
//                   {item}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* HELP */}
//         <div>
//           <h3 className="font-semibold mb-4">HELP</h3>
//           <ul className="space-y-2">
//             {[
//               "Publishing Process",
//               "FAQ",
//               "Shopping & Shipping FAQ",
//               "For Educators",
//               "Subrights",
//               "Permissions",
//             ].map((item) => (
//               <li key={item}>
//                 <a
//                   href="#"
//                   className="hover:text-[hsla(21,90%,48%,1)] transition-colors"
//                 >
//                   {item}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* CONNECT */}
//         <div>
//           <h3 className="font-semibold mb-4">CONNECT</h3>
//           <p className={`mb-4 ${!isDarkMode ? "text-[#A8A29E]" : "text-gray-600"}`}>
//             Sign up for news about books, authors, and more from Malaviya National Institute of Technology Jaipur.
//           </p>
//           <a
//             href="#"
//             className="bg-[hsla(21,90%,48%,1)] hover:bg-[hsla(21,90%,48%,0.9)] text-white px-4 py-2 rounded-lg flex items-center gap-2 w-fit"
//           >
//             📩 Stay In Touch
//           </a>

//           {/* Social Icons */}
//           <div className="flex gap-4 mt-4">
//             {["🌍", "📷", "📺", "📌", "💼"].map((icon, idx) => (
//               <a
//                 key={idx}
//                 href="#"
//                 className="text-xl cursor-pointer hover:text-[hsla(21,90%,48%,1)]"
//               >
//                 {icon}
//               </a>
//             ))}
//           </div>

//           <a
//             href="#"
//             className={`mt-4 block ${!isDarkMode ? "text-[#A8A29E]" : "text-gray-600"}`}
//           >
//             ANANT_JORAWAR&SOURAV.COM
//           </a>
//           <p className={!isDarkMode ? "text-[#A8A29E]" : "text-gray-600"}>
//             © 2025 Anant&Jorawar
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import { useSelector } from "react-redux";

const themeStyles = {
  sunset: {
    background: "hsl(20,14.3%,4.1%)",
    cardBg: "hsl(20, 14.3%, 4.1%)",
    border: "hsl(12, 6.5%, 15.1%)",
    textPrimary: "hsl(60, 9.1%, 97.8%)",
    textMuted: "hsl(24, 5.4%, 63.9%)",
    accent: "hsl(20.5, 90.2%, 48.2%)",
    accentHover: "hsl(20.5, 90.2%, 43%)",
    inputFocusRing: "hsl(20.5, 90.2%, 48.2%)",
    buttonText: "hsl(60, 9.1%, 97.8%)",
  },
  forest: {
    background: "hsl(150, 25%, 5%)",
    cardBg: "hsl(150, 20%, 10%)",
    border: "hsl(150, 10%, 20%)",
    textPrimary: "hsl(0, 0%, 95%)",
    textMuted: "hsl(150, 10%, 60%)",
    accent: "hsl(140, 70%, 45%)",
    accentHover: "hsl(140, 70%, 38%)",
    inputFocusRing: "hsl(140, 80%, 25%)",
    buttonText: "hsl(140, 100%, 10%)",
  },
  midnight: {
    background: "hsl(224,71.4%,4.1%)",
    cardBg: "hsl(224,71.4%,4.1%)",
    border: "hsl(215,27.9%,16.9%)",
    textPrimary: "hsl(210,20%,98%)",
    textMuted: "hsl(217.9,10.6%,64.9%)",
    accent: "hsl(263.4,70%,50.4%)",
    accentHover: "hsl(263.4,70%,45%)",
    inputFocusRing: "hsl(263.4,70%,50.4%)",
    buttonText: "hsl(210,20%,98%)",
  },
  rose: {
    background: "hsl(340, 20%, 6%)",
    cardBg: "hsl(345, 15%, 12%)",
    border: "hsl(345, 10%, 22%)",
    textPrimary: "hsl(0, 0%, 96%)",
    textMuted: "hsl(345, 10%, 65%)",
    accent: "hsl(346, 75%, 50%)",
    accentHover: "hsl(346, 75%, 42%)",
    inputFocusRing: "hsl(346, 85%, 40%)",
    buttonText: "hsl(350, 100%, 98%)",
  },
};

const Footer = () => {
  const currentTheme = useSelector((state) => state.theme.theme);
  const theme = themeStyles[currentTheme.toLowerCase()] || themeStyles["midnight"];

  return (
    <footer
      className="border py-10 px-6 md:px-16 transition-colors duration-300"
      style={{
        backgroundColor: theme.background,
        borderColor: theme.border,
        color: theme.textPrimary,
      }}
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
                  style={{
                    color: theme.textMuted,
                    "&:hover": { color: theme.accent },
                  }}
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
                  className="transition-colors"
                  style={{
                    color: theme.textMuted,
                    "&:hover": { color: theme.accent },
                  }}
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
                  className="transition-colors"
                  style={{
                    color: theme.textMuted,
                    "&:hover": { color: theme.accent },
                  }}
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
          <p className="mb-4" style={{ color: theme.textMuted }}>
            Sign up for news about books, authors, and more from Malaviya National Institute of Technology Jaipur.
          </p>
          <a
            href="#"
            className="px-4 py-2 rounded-lg flex items-center gap-2 w-fit transition-colors"
            style={{
              backgroundColor: theme.accent,
              color: theme.buttonText,
              "&:hover": { backgroundColor: theme.accentHover },
            }}
          >
            📩 Stay In Touch
          </a>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            {["🌍", "📷", "📺", "📌", "💼"].map((icon, idx) => (
              <a
                key={idx}
                href="#"
                className="text-xl cursor-pointer transition-colors"
                style={{
                  color: theme.textMuted,
                  "&:hover": { color: theme.accent },
                }}
              >
                {icon}
              </a>
            ))}
          </div>

          <a
            href="#"
            className="mt-4 block transition-colors"
            style={{ color: theme.textMuted }}
          >
            ANANT_JORAWAR&SOURAV.COM
          </a>
          <p style={{ color: theme.textMuted }}>
            © 2025 Anant&Jorawar
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;