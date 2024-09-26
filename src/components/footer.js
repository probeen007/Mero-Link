"use client"
export default function Footer() {
    return (

        <div className="relative h-40 w-full">
            <div className="absolute inset-x-0 bottom-9 h-0 ...">
                <footer className="bg-blue-600 text-white py-4">
                    <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
                        <div className="flex flex-cols md:flex-row gap-4 text-center">
                            <a href="/about" className="hover:underline">About Us</a>
                            <a href="/pricing" className="hover:underline">Pricing</a>
                            <a href="/contact" className="hover:underline">Contact</a>
                            <a href="/privacy" className="hover:underline">Privacy Policy</a>
                        </div>
                        <p className="text-center  mb-1 mt-4">
                            Mero Link connects you effortlessly in the digital realm.
                        </p>
                        <p className="text-center mb-2">
                            Contact us : <a href="mailto:pro.victus07@gmail.com" className="hover:underline"> pro.victus07@gmail.com</a>
                        </p>

                        <p className="text-center mt-3">
                            &copy; {new Date().getFullYear()} Mero🔗Link . All rights reserved.
                        </p>
                    </div>

                </footer>
            </div>
        </div>
    );
}

