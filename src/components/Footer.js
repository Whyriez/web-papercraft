// File: src/components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-16">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center space-x-2">
              <svg
                className="scissors-icon w-8 h-8 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"
                />
              </svg>
              <h1 className="text-2xl font-bold flex items-center">
                Paper<span className="text-primary">Wonder</span>
                <span className="font-handwritten text-accent ml-1">Crafts</span>
              </h1>
            </div>
            <p className="mt-4 text-gray-400 max-w-md">
              Discover the joy of papercraft with our collection of beautiful,
              downloadable templates for all skill levels.
            </p>
          </div>

          {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {['Explore','About','Connect'].map((section, i) => (
              <div key={i}>
                <h3 className="font-bold text-lg mb-4">{section}</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Link 1</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Link 2</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Link 3</a></li>
                </ul>
              </div>
            ))}
          </div> */}
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2023 PaperWonder. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
