const Footer = () => {
    return (
      <footer className="bg-gradient-to-br from-[#0B1120] to-[#141C2F] text-gray-300 py-10 px-6 md:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          {/* About Us */}
          <div>
            <h3 className="text-white font-semibold mb-4">ABOUT US</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-100">Our Story</a></li>
              <li><a href="#" className="hover:text-gray-100">Our People</a></li>
              <li><a href="#" className="hover:text-gray-100">Our Contributors</a></li>
              <li><a href="#" className="hover:text-gray-100">Locations</a></li>
              <li><a href="#" className="hover:text-gray-100">Management</a></li>
              <li><a href="#" className="hover:text-gray-100">Social Impact</a></li>
              <li><a href="#" className="hover:text-gray-100">Accessibility Statement</a></li>
              <li><a href="#" className="hover:text-gray-100">Careers</a></li>
              <li><a href="#" className="hover:text-gray-100">Imprints</a></li>
            </ul>
          </div>
  
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">QUICK LINKS</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-100">Partnerships</a></li>
              <li><a href="#" className="hover:text-gray-100">Media Queries</a></li>
              <li><a href="#" className="hover:text-gray-100">Influencers</a></li>
              <li><a href="#" className="hover:text-gray-100">Company Reads</a></li>
              <li><a href="#" className="hover:text-gray-100">PenguinRandomHouse.biz</a></li>
              <li><a href="#" className="hover:text-gray-100">Email Preferences</a></li>
              <li><a href="#" className="hover:text-gray-100">Terms of Use</a></li>
              <li><a href="#" className="hover:text-gray-100">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-100">CA Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-100">Do Not Sell My Personal Info</a></li>
              <li><a href="#" className="hover:text-gray-100">Affiliate Program Disclosure</a></li>
              <li><a href="#" className="hover:text-gray-100">Avoid Publishing Scams</a></li>
            </ul>
          </div>
  
          {/* Help */}
          <div>
            <h3 className="text-white font-semibold mb-4">HELP</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-100">Publishing Process</a></li>
              <li><a href="#" className="hover:text-gray-100">FAQ</a></li>
              <li><a href="#" className="hover:text-gray-100">Shopping & Shipping FAQ</a></li>
              <li><a href="#" className="hover:text-gray-100">For Educators</a></li>
              <li><a href="#" className="hover:text-gray-100">Subrights</a></li>
              <li><a href="#" className="hover:text-gray-100">Permissions</a></li>
            </ul>
          </div>
  
          {/* Connect */}
          <div>
            <h3 className="text-white font-semibold mb-4">CONNECT</h3>
            <p className="mb-4 text-gray-400">
              Sign up for news about books, authors, and more from Malaviya National Institute of Technology Jaipur.
            </p>
            <a 
              href="#" 
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 w-fit"
            >
              📩 Stay In Touch
            </a>
  
            {/* Social Icons */}
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-xl cursor-pointer hover:text-gray-100">🌍</a>
              <a href="#" className="text-xl cursor-pointer hover:text-gray-100">📷</a>
              <a href="#" className="text-xl cursor-pointer hover:text-gray-100">📺</a>
              <a href="#" className="text-xl cursor-pointer hover:text-gray-100">📌</a>
              <a href="#" className="text-xl cursor-pointer hover:text-gray-100">💼</a>
            </div>
  
            <a href="#" className="text-gray-500 mt-4 block">ANANT_JORAWAR&SOURAV.COM</a>
            <p className="text-gray-500">© 2025 Anant&Jorawar</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  