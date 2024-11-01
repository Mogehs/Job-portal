import React from "react";

const Footer = () => {
  return (
    <div className="mt-[3rem] ">
      <footer class="bg-gray-900 text-white py-8">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap justify-between">
            <div class="w-full md:w-1/4 mb-6">
              <h2 class="text-lg font-semibold mb-3">Company Name</h2>
              <p class="text-gray-400">
                Your company tagline or a brief description about what your
                company does.
              </p>
            </div>

            <div class="w-full md:w-1/4 mb-6">
              <h2 class="text-lg font-semibold mb-3">Quick Links</h2>
              <ul>
                <li>
                  <a href="#" class="text-gray-400 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" class="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" class="text-gray-400 hover:text-white">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" class="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div class="w-full md:w-1/4 mb-6">
              <h2 class="text-lg font-semibold mb-3">Contact Us</h2>
              <p class="text-gray-400">123 Main Street, City, Country</p>
              <p class="text-gray-400">Email: info@company.com</p>
              <p class="text-gray-400">Phone: (123) 456-7890</p>
            </div>

            <div class="w-full md:w-1/4 mb-6">
              <h2 class="text-lg font-semibold mb-3">Follow Us</h2>
              <div class="flex space-x-4">
                <a href="#" class="text-gray-400 hover:text-white">
                  <i class="fab fa-facebook"></i>
                </a>
                <a href="#" class="text-gray-400 hover:text-white">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#" class="text-gray-400 hover:text-white">
                  <i class="fab fa-instagram"></i>
                </a>
                <a href="#" class="text-gray-400 hover:text-white">
                  <i class="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>

          <div class="border-t border-gray-700 mt-6 pt-4 text-center">
            <p class="text-gray-500 text-sm">
              &copy; 2024 Company Name. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
