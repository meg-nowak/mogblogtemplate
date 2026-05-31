export default function ResponsiveImage({
                                            src,
                                            alt,
                                            aspect = "aspect-video", // Defaults to 16:9
                                            rounded = "rounded-2xl",
                                            className = ""
                                        }) {
    return (
        <div className={`relative overflow-hidden ${aspect} ${rounded} ${className}`}>
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
                loading="lazy" // Performance optimization!
            />
        </div>
    );
}