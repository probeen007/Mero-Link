'use client';
import { themes } from "@/libs/themes";

export default function ThemeSelectorForm({ currentTheme, onThemeChange, savingTheme = '' }) {
    const handleSelect = (key) => onThemeChange?.(key);

    return (
        <div className="p-1 sm:p-2 mb-2 max-w-7xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Select Page Theme
            </h3>
            
            {/* Scrollable container for themes */}
            <div className="relative">
                {savingTheme && (
                    <div className="mb-3 text-center text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg py-2 px-3">
                        Saving theme...
                    </div>
                )}
                <div 
                    className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 p-1 justify-center max-h-[560px] overflow-y-auto pr-2 pb-10 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 hover:scrollbar-thumb-blue-600 ${savingTheme ? 'opacity-80 pointer-events-none' : ''}`}
                    style={{ 
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#3b82f6 #e5e7eb'
                    }}
                >
                    {Object.keys(themes).map((key) => {
                        const theme = themes[key];
                        const isSelected = key === currentTheme;

                        return (
                            <div
                                key={key}
                                onClick={() => !savingTheme && handleSelect(key)}
                                className={`cursor-pointer relative rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl ${
                                    isSelected ? "ring-2 ring-blue-500 shadow-xl" : "border border-gray-200 shadow-md hover:border-blue-300"
                                }`}
                                style={{ aspectRatio: '4/3', minHeight: "128px" }}
                            >
                                {/* Theme Preview */}
                                <div className={`w-full h-full ${theme.bgClass} flex flex-col items-center justify-between p-3.5 relative overflow-hidden`}>
                                    {/* Theme content preview */}
                                    <div className="flex flex-col items-center gap-2.5 z-10 relative">
                                        {/* Profile preview */}
                                        <div className={`w-8 h-8 bg-white/20 border-2 border-white/50 ${
                                            theme.profileShape === 'circle' ? 'rounded-full' :
                                            theme.profileShape === 'square' ? 'rounded-lg' :
                                            theme.profileShape === 'hexagon' ? 'rounded-full' :
                                            'rounded-full'
                                        } ${theme.imageClass || ''}`}>
                                        </div>
                                        
                                        {/* Social icons preview */}
                                        <div className="flex space-x-1">
                                            {[1, 2, 3].map((i) => (
                                                <div 
                                                    key={i}
                                                    className={`w-3 h-3 bg-white/30 ${
                                                        theme.socialShape === 'circle' ? 'rounded-full' :
                                                        theme.socialShape === 'square' ? 'rounded-sm' :
                                                        theme.socialShape === 'diamond' ? 'rotate-45 rounded-sm' :
                                                        'rounded-full'
                                                    } ${theme.buttonClass || ''}`}
                                                />
                                            ))}
                                        </div>
                                        
                                        {/* Link preview */}
                                        <div className={`w-20 h-4 bg-white/20 ${
                                            theme.linkShape === 'rounded' ? 'rounded-md' :
                                            theme.linkShape === 'gaming' ? 'rounded-none border-l-2 border-r-2 border-white/40' :
                                            theme.linkShape === 'elegant' ? 'rounded-xl' :
                                            theme.linkShape === 'wavy' ? 'rounded-full' :
                                            'rounded-md'
                                        } ${theme.cardClass || ''}`}>
                                        </div>
                                    </div>
                                    
                                    {/* Theme name */}
                                    <div className="z-10 relative px-1.5 py-0.5 rounded bg-black/20 backdrop-blur-[1px]">
                                        <span className={`${theme.fontClass} text-[11px] font-bold text-center leading-snug block`}>
                                            {theme.name}
                                        </span>
                                    </div>
                                    
                                    {/* Special theme indicators */}
                                    {theme.hasPageAnimation && (
                                        <div className="absolute top-1 left-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse z-10" title="Animated Theme"></div>
                                    )}
                                    
                                    {theme.fontFamily && (
                                        <div className="absolute top-1 right-1 w-2 h-2 bg-green-400 rounded-full z-10" title="Custom Font"></div>
                                    )}
                                </div>
                                
                                {/* Selection indicator */}
                                {isSelected && (
                                    <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold z-20 shadow-lg">
                                        {savingTheme ? '…' : '✓'}
                                    </div>
                                )}
                                
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                                    <span className="text-white font-semibold text-sm bg-black/50 px-3 py-1 rounded-full">
                                        Select
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                {/* Scroll indicator */}
                {Object.keys(themes).length > 15 && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-gray-500 text-sm flex items-center space-x-1 bg-white/90 px-3 py-1 rounded-full shadow-lg">
                        <span>Scroll for more themes</span>
                        <div className="animate-bounce">⬇️</div>
                    </div>
                )}
            </div>
            
            {/* Legend */}
            <div className="mt-5 flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span>Animated</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span>Custom Font</span>
                </div>
            </div>
        </div>
    );
}
