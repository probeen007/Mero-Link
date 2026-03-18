import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <div className="page-shell">
                {/* Main Footer Content */}
                <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <Image
                                src="https://i.ibb.co/HNVDd6R/merolinklogo.png"
                                alt="Mero Link Logo"
                                width={40}
                                height={40}
                                className="w-10 h-10 rounded-lg shadow-md"
                            />
                            <span className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                                Mero Link
                            </span>
                        </div>
                        <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-md">
                            Connect effortlessly in the digital realm. Create your personalized link hub and share your digital presence with the world.
                        </p>
                        <div className="flex items-center gap-2 text-gray-400">
                            <span>📧</span>
                            <a
                                href="mailto:prootech123@gmail.com"
                                className="hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded"
                            >
                                prootech123@gmail.com
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-white">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded px-1">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="text-gray-300 hover:text-blue-400 transition-colors text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded px-1">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded px-1">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal & Support */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-white">Legal & Support</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/privacy" className="text-gray-300 hover:text-blue-400 transition-colors text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded px-1">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-gray-300 hover:text-blue-400 transition-colors text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded px-1">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <a 
                                    href="mailto:prootech123@gmail.com" 
                                    className="text-gray-300 hover:text-blue-400 transition-colors text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded"
                                >
                                    Get Verified
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-700 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm text-center md:text-left">
                            &copy; {currentYear} Mero Link. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <span className="text-gray-400 text-sm">Made with ❤️ for creators</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

