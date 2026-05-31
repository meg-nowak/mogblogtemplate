// src/components/AppImage.jsx
export default function AppImage({
                                     src,
                                     alt = "",
                                     aspect = "aspect-video", // Controls shape
                                     rounded = "rounded-2xl",   // Controls corner radius
                                     className = "",
                                     withOverlay = false,     // For readability
                                     animate = false,         // For the hover effect
                                     overlayClassName = "",
                                     animationClassName = "transition-transform duration-700 hover:scale-105",
                                     ...props
                                 }) {
    if (!src) return null;

    return (
        <div
            className={`relative overflow-hidden ${aspect} ${rounded} ${className}`}
            {...props}
        >
            <img
                src={src}
                alt={alt}
                className={`w-full h-full object-cover ${animate ? animationClassName : ""}`}
                loading="lazy"
            />

            {/* If withOverly AND overlayClassName is provided, render the overlay */}
            {(withOverlay && overlayClassName) && (
                <div className={`absolute inset-0 pointer-events-none ${overlayClassName}`} />
            )}
        </div>
    );
}