'use client';
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ThemeSelectorForm from "./ThemeSelectorForm";

export default function ThemeSelectorWrapper({ currentTheme, pageId, onThemeChange }) {
    const [mounted, setMounted] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState(currentTheme);
    const [savingTheme, setSavingTheme] = useState('');

    useEffect(() => setMounted(true), []);
    // Keep internal state in sync with prop changes (e.g., after refresh)
    useEffect(() => {
        setSelectedTheme(currentTheme);
    }, [currentTheme]);

    const handleThemeChange = async (themeKey) => {
        if (savingTheme) return;
        setSavingTheme(themeKey);
        setSelectedTheme(themeKey);
        
        // Update parent component's theme state immediately
        if (onThemeChange) {
            onThemeChange(themeKey);
        }
        
        try {
            const requestBody = { pageId, theme: themeKey };
            
            const res = await fetch("/api/saveTheme", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });
            
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Failed to save theme: ${errorText}`);
            }

            await res.json();
            toast.success("Theme saved successfully");
        } catch (err) {
            console.error("Theme save error:", err);
            toast.error("Error saving theme: " + err.message);
            // Revert the theme if save failed
            setSelectedTheme(currentTheme);
            if (onThemeChange) {
                onThemeChange(currentTheme);
            }
        } finally {
            setSavingTheme('');
        }
    };

    if (!mounted) return null;
    return <ThemeSelectorForm currentTheme={selectedTheme} onThemeChange={handleThemeChange} savingTheme={savingTheme} />;
}
