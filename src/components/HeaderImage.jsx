export default function HeaderImage({ src, alt, height = "h-64", className = "" }) {
    if (!src) return null;

    return (
        <div className={`relative w-full ${height} overflow-hidden rounded-3xl ${className}`}>
            <img
                src={src}
                alt={alt || "Header image"}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Optional overlay for better text readability if needed */}
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
        </div>
    );
}