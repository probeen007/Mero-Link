'use client';
import { useState, useEffect } from "react";
import ThemeSelectorForm from "./ThemeSelectorForm";

export default function ThemeSelectorWrapper({ currentTheme, pageId, onThemeChange }) {
    const [mounted, setMounted] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState(currentTheme);

    useEffect(() => setMounted(true), []);
    // Keep internal state in sync with prop changes (e.g., after refresh)
    useEffect(() => {
        setSelectedTheme(currentTheme);
    }, [currentTheme]);

    const handleThemeChange = async (themeKey) => {
        console.log("Theme change requested:", { themeKey, pageId });
        setSelectedTheme(themeKey);
        
        // Update parent component's theme state immediately
        if (onThemeChange) {
            onThemeChange(themeKey);
        }
        
        try {
            const requestBody = { pageId, theme: themeKey };
            console.log("Sending request to /api/saveTheme:", requestBody);
            
            const res = await fetch("/api/saveTheme", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            console.log("Response status:", res.status);
            
            if (!res.ok) {
                const errorText = await res.text();
                console.log("Error response:", errorText);
                throw new Error(`Failed to save theme: ${errorText}`);
            }

            const responseData = await res.json();
            console.log("Success response:", responseData);
            alert("Theme saved successfully! User pages will update automatically.");
        } catch (err) {
            console.error("Theme save error:", err);
            alert("Error saving theme: " + err.message);
            // Revert the theme if save failed
            setSelectedTheme(currentTheme);
            if (onThemeChange) {
                onThemeChange(currentTheme);
            }
        }
    };

    if (!mounted) return null;
    return <ThemeSelectorForm currentTheme={selectedTheme} onThemeChange={handleThemeChange} />;
}
