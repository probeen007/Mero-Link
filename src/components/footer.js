"use client"
export default function Footer() {
    return (

        <footer className="bg-blue-600 text-white py-8 font-sans mt-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Navigation Links */}
                <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base mb-6">
                    <a
                        href="/about"
                        className="hover:text-blue-300 transition duration-200 ease-in-out"
                    >
                        About Us
                    </a>
                    <a
                        href="/pricing"
                        className="hover:text-blue-300 transition duration-200 ease-in-out"
                    >
                        Pricing
                    </a>
                    <a
                        href="/contact"
                        className="hover:text-blue-300 transition duration-200 ease-in-out"
                    >
                        Contact
                    </a>
                    <a
                        href="/privacy"
                        className="hover:text-blue-300 transition duration-200 ease-in-out"
                    >
                        Privacy Policy
                    </a>
                </div>

                {/* Description */}
                <p className="text-center text-sm md:text-base mb-2 leading-relaxed">
                    Mero Link connects you effortlessly in the digital realm.
                </p>

                {/* Contact Info */}
                <p className="text-center text-sm md:text-base mb-4">
                    Contact :
                    <a
                        href="mailto:pro.victus07@gmail.com"
                        className="hover:text-blue-300 transition duration-200 ease-in-out ml-2"
                    >
                        pro.victus07@gmail.com
                    </a>
                </p>

                {/* Copyright */}
                <p className="text-center text-xs md:text-sm mt-6 leading-loose">
                    &copy; {new Date().getFullYear()} Mero🔗Link. All rights reserved.
                </p>
            </div>
        </footer>

    );
}

