"use client";

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faDownload, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import ShareCardPreview from "@/components/ShareCardPreview";

export default function ShareProfileSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  const cardRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch("/api/profile/share-card", { cache: "no-store" });
        if (!response.ok) {
          const payload = await response.json().catch(() => ({}));
          throw new Error(payload.error || "Failed to load share card data");
        }
        const payload = await response.json();

        const canonicalProfileUrl = payload?.uri
          ? `https://merolink.it.com/${payload.uri}`
          : payload?.profileUrl || "";

        let qrCodeUrl = "";
        try {
          if (canonicalProfileUrl) {
            const QRCode = (await import("qrcode")).default;
            qrCodeUrl = await QRCode.toDataURL(canonicalProfileUrl, {
              width: 96,
              margin: 1,
              color: {
                dark: "#0f172a",
                light: "#ffffff",
              },
            });
          }
        } catch {
          qrCodeUrl = "";
        }

        setData({ ...payload, profileUrl: canonicalProfileUrl, qrCodeUrl });
      } catch (err) {
        setError(err.message || "Unable to load share card");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const copyProfileLink = async () => {
    if (!data?.profileUrl) return;
    try {
      await navigator.clipboard.writeText(data.profileUrl);
      toast.success("Profile link copied");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const downloadCard = async () => {
    if (!cardRef.current || !data) return;
    try {
      setDownloading(true);

      if (document?.fonts?.ready) {
        await document.fonts.ready;
      }
      await new Promise((resolve) => requestAnimationFrame(() => resolve()));

      const html2canvas = (await import("html2canvas")).default;
      const captureWidth = cardRef.current.offsetWidth;
      const captureHeight = cardRef.current.offsetHeight;

      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
        imageTimeout: 8000,
        removeContainer: true,
        width: captureWidth,
        height: captureHeight,
        windowWidth: captureWidth,
        windowHeight: captureHeight,
      });

      const imageUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `merolink-share-${data.uri || "profile"}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Share card downloaded");
    } catch (err) {
      toast.error("Failed to generate image. Check your avatar/banner image URL CORS settings.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <FontAwesomeIcon icon={faShareNodes} className="text-blue-600 mr-2" />
        Share Profile
      </h3>

      {loading && <p className="text-sm text-gray-500">Loading share card preview...</p>}
      {!loading && error && <p className="text-sm text-red-600">{error}</p>}

      {!loading && !error && data && (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <div className="min-w-[360px] flex justify-center">
              <ShareCardPreview ref={cardRef} data={data} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={copyProfileLink}
              className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium transition"
            >
              <FontAwesomeIcon icon={faCopy} className="w-4 h-4" />
              Copy Profile Link
            </button>

            <button
              type="button"
              onClick={downloadCard}
              disabled={downloading}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              <FontAwesomeIcon icon={faDownload} className="w-4 h-4" />
              {downloading ? "Generating..." : "Download Share Card"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
