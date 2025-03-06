export const Footer = () => {
    return (
      <footer className="bg-indigo-950 text-white py-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
  
            <div>
              <h3 className="font-bold text-sm mb-3">[Edutech]</h3>
              <p className="text-gray-400 text-xs mb-4">
                Bringing beginners and experts together through our platform.
              </p>
              <div className="bg-yellow-500 text-indigo-950 px-3 py-2 rounded-md">
                <div className="font-bold text-xs">Contact Us</div>
                <div className="text-xs mt-1">info@Edutech.com</div>
                <div className="text-xs">(625) 333 222 123</div>
              </div>
            </div>
  
            <div>
              <h3 className="font-bold text-sm mb-3">Follow Us</h3>
              <ul className="footer-links space-y-2">
                {["Instagram", "Twitter", "LinkedIn"].map((platform, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 text-xs hover:text-yellow-500">{platform}</a>
                  </li>
                ))}
              </ul>
            </div>
  
            <div>
              <h3 className="font-bold text-sm mb-3">Programs</h3>
              <ul className="footer-links space-y-2">
                {["Developer Bootcamp", "UI/UX Workshop"].map((program, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 text-xs hover:text-yellow-500">{program}</a>
                  </li>
                ))}
              </ul>
            </div>
  
            <div>
              <h3 className="font-bold text-sm mb-3">Support</h3>
              <ul className="footer-links space-y-2">
                {["Help Center", "FAQs", "Privacy Policy"].map((support, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 text-xs hover:text-yellow-500">{support}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
  
          <div className="border-t border-gray-800 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-xs">© {new Date().getFullYear()} DhyaanShila. All rights reserved.</div>
            <div className="flex space-x-4 text-xs text-gray-400 mt-2 md:mt-0">
              {["Home", "About Us", "Courses", "FAQ", "Blog"].map((link, index) => (
                <a key={index} href="#" className="hover:text-yellow-500">{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  };
  