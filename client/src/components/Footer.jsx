import React from "react";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import logo from "../assets/favicon.svg";

const Footer = () => {
    return (
        <footer className="mt-32 px-6 sm:px-16 lg:px-28 xl:px-40 py-16 bg-transparent text-gray-300">

            {/* Top Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                {/* Brand Section */}
                <div>
                    <div className="flex items-center space-x-2">
                        <img src={logo} alt="Ace.AI Logo" className="w-8 h-8" />
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
                            Ace.AI
                        </h2>
                    </div>

                    <p className="mt-4 text-gray-400 leading-relaxed max-w-xs">
                        Transform your ideas into powerful content with next-generation AI tools designed for creators, developers, and businesses.
                    </p>

                </div>

                {/* Tools Section */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">AI Tools</h4>
                    <ul className="space-y-3 text-gray-400">
                        <li className="hover:text-white cursor-pointer">AI Article Writer</li>
                        <li className="hover:text-white cursor-pointer">Blog Title Generator</li>
                        <li className="hover:text-white cursor-pointer">Image Generator</li>
                        <li className="hover:text-white cursor-pointer">Resume Reviewer</li>
                        <li className="hover:text-white cursor-pointer">Background Remover</li>
                        <li className="hover:text-white cursor-pointer">Object Remover</li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
                    <ul className="space-y-3 text-gray-400">
                        <li className="hover:text-white cursor-pointer">About</li>
                        <li className="hover:text-white cursor-pointer">Pricing</li>    
                        <li className="hover:text-white cursor-pointer">Blog</li>
                        {/* <li className="hover:text-white cursor-pointer">Roadmap</li> */}
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
                    <ul className="space-y-3 text-gray-400">
                        <li className="hover:text-white cursor-pointer">Help Center</li>
                        <li className="hover:text-white cursor-pointer">Contact</li>
                        <li className="hover:text-white cursor-pointer">FAQ</li>
                        <li className="hover:text-white cursor-pointer">Terms & Privacy</li>

                        {/* Email */}
                        <li>
                            <a
                                href="mailto:support@aceai.com"
                                className="flex items-center space-x-2 hover:text-white transition"
                            >
                                <Mail size={18} />
                                <span>support@aceai.com</span>
                            </a>
                        </li>
                    </ul>
                </div>

            </div>

            {/* Bottom */}
            <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between text-center text-gray-400 text-sm">
                <p className="flex items-center justify-center space-x-2">
                    <span>© {new Date().getFullYear()}</span>
                    <span>Ace.AI — All Rights Reserved.</span>
                </p>

                <p className="mt-2 sm:mt-0">
                    Made with ❤️ by the Ace.AI Team
                </p>
            </div>
        </footer>
    );
};

export default Footer;
