// src/components/BaseCard.jsx
import { Link } from 'react-router-dom';

// 1. The Main Wrapper
export function Card({ children, className = "" }) {
    return (
        <div className={`bg-theme-surface/60 backdrop-blur-sm border border-theme-border/60 p-5 rounded-2xl shadow-sm transition-all hover:shadow-md hover:bg-theme-surface group flex gap-4 ${className}`}>
            {children}
        </div>
    );
}

// 2. The Image Slot
Card.Image = function CardImage({ src, alt, className = "" }) {
    if (!src) return null;
    return (
        <div className={`shrink-0 ${className}`}>
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover rounded-lg shadow-sm border border-slate-100"
            />
        </div>
    );
};

// 3. The Content Wrapper
Card.Content = function CardContent({ children, className = "" }) {
    return <div className={`flex-1 min-w-0 ${className}`}>{children}</div>;
};

// 4. The Header (Now accepts specific class names for typography!)
Card.Header = function CardHeader({
                                      title,
                                      subtitle,
                                      rightSlot,
                                      className = "",
                                      titleClassName = "",
                                      subtitleClassName = ""
                                  }) {
    return (
        <div className={`flex justify-between items-start mb-1 truncate ${className}`}>
            <div>
                <h3 className={`font-semibold text-theme-text leading-tight truncate pr-2 ${titleClassName}`}>
                    {title}
                </h3>
                {subtitle && (
                    <p className={`text-xs text-slate-400 font-medium mt-0.5 ${subtitleClassName}`}>
                        {subtitle}
                    </p>
                )}
            </div>
            {rightSlot}
        </div>
    );
};

// 5. The Badge Slot (Allows overriding the default variant styles)
Card.Badge = function CardBadge({ children, variant = "default", className = "" }) {
    if (!children) return null;

    const variants = {
        default: "bg-slate-100 text-slate-500 border-slate-200",
        success: "bg-theme-secondary/20 text-green-700 border-green-200",
        primary: "bg-theme-primary/20 text-indigo-700 border-indigo-200"
    };

    const style = variants[variant] || variants.default;

    return (
        <span className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border shrink-0 ${style} ${className}`}>
            {children}
        </span>
    );
};

// 6. The Body Text Slot
Card.Body = function CardBody({ children, className = "" }) {
    if (!children) return null;
    return (
        <div className={`mt-3 text-sm text-slate-600 leading-relaxed ${className}`}>
            {children}
        </div>
    );
};

// 7. The Action Link Slot (Now configurable!)
Card.Action = function CardAction({ to, children, className = "", linkClassName = "" }) {
    return (
        <div className={`mt-3 pt-3 border-t border-theme-border/40 ${className}`}>
            <Link
                to={to}
                className={`text-xs font-semibold text-theme-primary hover:opacity-80 transition-opacity flex items-center gap-1 group/link ${linkClassName}`}
            >
                {children}
                <span className="transform group-hover/link:translate-x-1 transition-transform">&rarr;</span>
            </Link>
        </div>
    );
};