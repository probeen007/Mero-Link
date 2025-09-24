'use client';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode, faDownload, faSpinner, faCheckCircle, faMagic, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';

export default function CustomQRClient({ page, user }) {
    const [qrCode, setQrCode] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isGenerated, setIsGenerated] = useState(false);
    const [downloadReady, setDownloadReady] = useState(false);
    const canvasRef = useRef(null);

    // Generate QR Code URL
    const pageUrl = `https://merolink.me/${page.uri}`;

    const generateQR = async () => {
        setIsGenerating(true);
        setIsGenerated(false);
        setDownloadReady(false);

        try {
            // Dynamic import to avoid SSR issues
            const QRCode = (await import('qrcode')).default;

            // Generate QR code with Mero Link logo in center
            const qrDataUrl = await QRCode.toDataURL(pageUrl, {
                width: 300,
                margin: 2,
                color: {
                    dark: '#1e40af', // Blue color for QR
                    light: '#ffffff'
                },
                errorCorrectionLevel: 'H' // High error correction for logo overlay
            });

            // Simulate some loading time for better UX
            setTimeout(() => {
                setQrCode(qrDataUrl);
                setIsGenerating(false);
                setIsGenerated(true);

                // Enable download after animation
                setTimeout(() => {
                    setDownloadReady(true);
                }, 1000);
            }, 2000);

        } catch (error) {
            console.error('Error generating QR code:', error);
            setIsGenerating(false);
        }
    };

    const downloadQR = async () => {
        if (!qrCode || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Set canvas size for final download image (increased height for bottom link)
        canvas.width = 400;
        canvas.height = 570;

        // Clear canvas with white background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Helper function to draw the rest of the content
        const drawContent = () => {
            // Add user display name (use page.displayName or fallback to user.name)
            ctx.fillStyle = '#1f2937';
            ctx.font = 'bold 24px Arial, sans-serif';
            ctx.textAlign = 'center';
            const displayName = page.displayName || user.name || 'User';
            ctx.fillText(displayName, canvas.width / 2, 130);

            // Add verification badge if user is verified
            if (page.isVerified) {
                ctx.fillStyle = '#3b82f6';
                ctx.font = 'bold 16px Arial, sans-serif';
                ctx.fillText('✓ Verified', canvas.width / 2, 155);
            }

            // Add page URI
            ctx.fillStyle = '#6b7280';
            ctx.font = '18px Arial, sans-serif';
            ctx.fillText(`merolink.me/${page.uri}`, canvas.width / 2, 180);



            // Add QR code
            const qrImg = new Image();
            qrImg.onload = () => {
                const qrSize = 300;
                const qrX = (canvas.width - qrSize) / 2;
                const qrY = 200;

                ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

                // Add Mero Link logo in center of QR (overlay)
                const logoImg = new Image();
                logoImg.crossOrigin = 'anonymous';
                logoImg.onload = () => {
                    const logoSize = 60;
                    const logoX = canvas.width / 2 - logoSize / 2;
                    const logoY = qrY + qrSize / 2 - logoSize / 2;

                    // White background circle for logo
                    ctx.fillStyle = '#ffffff';
                    ctx.beginPath();
                    ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2 + 5, 0, 2 * Math.PI);
                    ctx.fill();

                    ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);

                    // Add link at the bottom
                    ctx.fillStyle = '#6b7280';
                    ctx.font = 'bold 14px Arial, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText('Scan to visit this profile', canvas.width / 2, 530);

                    ctx.fillStyle = '#3b82f6';
                    ctx.font = '12px Arial, sans-serif';
                    ctx.fillText(`${pageUrl}`, canvas.width / 2, 550);

                    // Download the final image
                    const link = document.createElement('a');
                    link.download = `${page.uri}-qr-code.png`;
                    link.href = canvas.toDataURL('image/png');
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                };
                logoImg.onerror = () => {
                    // Fallback: download without logo but with link
                    console.log('Logo failed to load, downloading without logo');

                    // Add link at the bottom even without logo
                    ctx.fillStyle = '#6b7280';
                    ctx.font = 'bold 14px Arial, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText('Scan to visit this profile', canvas.width / 2, 530);

                    ctx.fillStyle = '#3b82f6';
                    ctx.font = '12px Arial, sans-serif';
                    ctx.fillText(`${pageUrl}`, canvas.width / 2, 550);

                    const link = document.createElement('a');
                    link.download = `${page.uri}-qr-code.png`;
                    link.href = canvas.toDataURL('image/png');
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                };
                logoImg.src = 'https://i.ibb.co/HNVDd6R/merolinklogo.png';
            };
            qrImg.onerror = () => {
                console.error('QR code image failed to load');
            };
            qrImg.src = qrCode;
        };

        // Add user profile picture if available
        if (user.image) {
            try {
                const profileImg = new Image();
                profileImg.crossOrigin = 'anonymous';
                profileImg.onload = () => {
                    // Draw circular profile picture
                    const profileSize = 80;
                    const profileX = (canvas.width - profileSize) / 2;
                    const profileY = 20;

                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(profileX + profileSize / 2, profileY + profileSize / 2, profileSize / 2, 0, 2 * Math.PI);
                    ctx.clip();
                    ctx.drawImage(profileImg, profileX, profileY, profileSize, profileSize);
                    ctx.restore();

                    // Add border around profile picture
                    ctx.strokeStyle = '#3b82f6';
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.arc(profileX + profileSize / 2, profileY + profileSize / 2, profileSize / 2, 0, 2 * Math.PI);
                    ctx.stroke();

                    drawContent();
                };
                profileImg.onerror = () => {
                    console.log('Profile image failed to load, continuing without it');
                    drawContent();
                };
                profileImg.src = user.image;
            } catch (error) {
                console.error('Error loading profile image:', error);
                drawContent();
            }
        } else {
            drawContent();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="max-w-2xl mx-auto">
                {/* Navigation Back Button */}
                <div className="mb-6">
                    <Link
                        href="/account"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
                        <span>Back to Dashboard</span>
                    </Link>
                </div>


                <div className="flex items-center justify-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <FontAwesomeIcon
                            icon={faQrcode}
                            className="text-3xl text-blue-600"
                        />
                    </div>
                    <div className="text-left">
                        <h1 className="text-3xl font-bold text-gray-800">Custom QR Generator</h1>
                        <p className="text-blue-600 font-medium text-sm">Create personalized QR codes for your Mero Link</p>
                    </div>
                </div>


            </div>

            {/* User Info Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <div className="flex items-center space-x-4">
                    {user.image && (
                        <Image
                            src={user.image}
                            alt="Profile"
                            width={64}
                            height={64}
                            className="w-16 h-16 rounded-full border-2 border-blue-200"
                        />
                    )}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                            {page.displayName || user.name}
                            {page.isVerified && (
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    className="text-blue-500 ml-2 text-sm"
                                />
                            )}
                        </h3>
                        <p className="text-blue-600 font-medium">merolink.me/{page.uri}</p>
                    </div>
                </div>
            </div>

            {/* QR Generation Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                {!qrCode && !isGenerating && (
                    <div className="py-8">
                        <FontAwesomeIcon
                            icon={faMagic}
                            className="text-6xl text-gray-300 mb-6"
                        />
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                            Ready to Create Your QR Code?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Generate a custom QR code that links to your personal Mero Link page
                        </p>
                        <button
                            onClick={generateQR}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            <FontAwesomeIcon icon={faQrcode} className="mr-2" />
                            Generate QR Code
                        </button>
                    </div>
                )}

                {isGenerating && (
                    <div className="py-12">
                        <FontAwesomeIcon
                            icon={faSpinner}
                            className="text-6xl text-blue-500 mb-6 animate-spin"
                        />
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                            Creating Your QR Code...
                        </h3>
                        <p className="text-gray-600">
                            Please wait while we generate your personalized QR code
                        </p>
                    </div>
                )}

                {isGenerated && qrCode && (
                    <div className={`transition-all duration-1000 ${isGenerated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                            🎉 Your QR Code is Ready!
                        </h3>

                        {/* QR Code Display */}
                        <div className="bg-gray-50 rounded-lg p-6 mb-6 inline-block">
                            <Image
                                src={qrCode}
                                alt="Generated QR Code"
                                width={256}
                                height={256}
                                className="w-64 h-64 mx-auto rounded-lg shadow-md"
                            />
                            <p className="text-sm text-gray-500 mt-4">
                                Scan to visit: merolink.me/{page.uri}
                            </p>
                        </div>

                        {/* Download Button */}
                        <div className="mt-6">
                            <button
                                onClick={downloadQR}
                                disabled={!downloadReady}
                                className={`
                    px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform
                    ${downloadReady
                                        ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 hover:scale-105 shadow-lg'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }
                  `}
                            >
                                <FontAwesomeIcon
                                    icon={downloadReady ? faDownload : faSpinner}
                                    className={`mr-2 ${!downloadReady ? 'animate-spin' : ''}`}
                                />
                                {downloadReady ? 'Download PNG' : 'Preparing Download...'}
                            </button>
                            {downloadReady && (
                                <p className="text-sm text-gray-600 mt-2">
                                    Download includes your profile, verification status, and QR code
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Hidden canvas for download generation */}
            <canvas
                ref={canvasRef}
                style={{ display: 'none' }}
            />
        </div>
    );
}