"use client";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-700 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        
        {/* Left Section - Brand Name */}
        <div className="text-2xl font-bold mb-4 md:mb-0">
          <Link href="/">TodoList</Link>
        </div>

        {/* Center Section - Navigation Links */}
        <ul className="flex gap-6 text-lg">
          <li>
            <Link href="/" className="hover:text-gray-300 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/tasks" className="hover:text-gray-300 transition duration-300">
              Tasks
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-gray-300 transition duration-300">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-gray-300 transition duration-300">
              Contact
            </Link>
          </li>
        </ul>

        {/* Right Section - Social Media Icons */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition duration-300">
            <Facebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition duration-300">
            <Twitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition duration-300">
            <Instagram size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition duration-300">
            <Linkedin size={24} />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-sm text-gray-300 mt-6">
        © {new Date().getFullYear()} TodoList. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
