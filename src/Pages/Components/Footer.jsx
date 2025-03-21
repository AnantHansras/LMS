const Footer = () => {
  return (
    <footer className="border border-[hsla(12,7%,15%,1)]  bg-[hsla(240,10%,4%,1)] text-[#FAFAF9] py-10 px-6 md:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
        {/* About Us */}
        <div>
          <h3 className="text-white font-semibold mb-4">ABOUT US</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-[hsla(21,90%,48%,1)]">Our Story</a></li>
            <li><a href="#" className="hover:text-[hsla(21,90%,48%,1)]">Our People</a></li>
            <li><a href="#" className="hover:text-[hsla(21,90%,48%,1)]">Our Contributors</a></li>
            <li><a href="#" className="hover:text-[hsla(21,90%,48%,1)]">Locations</a></li>
            <li><a href="#" className="hover:text-[hsla(21,90%,48%,1)]">Management</a></li>
            <li><a href="#" className="hover:text-[hsla(21,90%,48%,1)]">Social Impact</a></li>
            <li><a href="#" className="hover:text-[hsla(21,90%,48%,1)]">Accessibility Statement</a></li>
            <li><a href="#" className="hover:text-[hsla(21,90%,48%,1)]">Careers</a></li>
            <li><a href="#" className="hover:text-[hsla(21,90%,48%,1)]">Imprints</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">QUICK LINKS</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-[hsla(21,90%,48%,1)]">Partnerships</a></li>
            <li><a href="#" className="hover:text-[hsla(21,90%,48%,1)]">Media Queries</a></li>
            <li><a href="#" className="hover:text-[hsla(21,90%,48%,1)]">Influencers</a></li>
            <li><a href="#" className="hover:text-[hsla(21,90%,48%,1)]">Company Reads</a></li>
            <li><a href="#" className="hover:text-[hsla(21,90%,48%,1)]">PenguinRandomHouse.biz</a></li>
            <li><a href="#" className="hover:text-[hsla(21,90%,48%,1)]">Email Preferences</a></li>
            <li><a href="#" className="hover:text-[hsla(21,90%,48%,1)]">Terms of Use</a></li>
            <li><a href="#" className="hover:text-[hsla(21,90%,48%,1)]">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-[hsla(21,90%,48%,1)]">CA Privacy Policy</a></li>
            <li><a href="#" className="hover:text-[hsla(21,90%,48%,1)]">Do Not Sell My Personal Info</a></li>
            <li><a href="#" className="hover:text-[hsla(21,90%,48%,1)]">Affiliate Program Disclosure</a></li>
            <li><a href="#" className="hover:text-[hsla(21,90%,48%,1)]">Avoid Publishing Scams</a></li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="text-white font-semibold mb-4">HELP</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-[hsla(21,90%,48%,1)]">Publishing Process</a></li>
            <li><a href="#" className="hover:text-[hsla(21,90%,48%,1)]">FAQ</a></li>
            <li><a href="#" className="hover:text-[hsla(21,90%,48%,1)]">Shopping & Shipping FAQ</a></li>
            <li><a href="#" className="hover:text-[hsla(21,90%,48%,1)]">For Educators</a></li>
            <li><a href="#" className="hover:text-[hsla(21,90%,48%,1)]">Subrights</a></li>
            <li><a href="#" className="hover:text-[hsla(21,90%,48%,1)]">Permissions</a></li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className="text-white font-semibold mb-4">CONNECT</h3>
          <p className="mb-4 text-[#A8A29E]">
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
            <a href="#" className="text-xl cursor-pointer hover:text-[hsla(21,90%,48%,1)]">🌍</a>
            <a href="#" className="text-xl cursor-pointer hover:text-[hsla(21,90%,48%,1)]">📷</a>
            <a href="#" className="text-xl cursor-pointer hover:text-[hsla(21,90%,48%,1)]">📺</a>
            <a href="#" className="text-xl cursor-pointer hover:text-[hsla(21,90%,48%,1)]">📌</a>
            <a href="#" className="text-xl cursor-pointer hover:text-[hsla(21,90%,48%,1)]">💼</a>
          </div>

          <a href="#" className="text-[#A8A29E] mt-4 block">ANANT_JORAWAR&SOURAV.COM</a>
          <p className="text-[#A8A29E]">© 2025 Anant&Jorawar</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
