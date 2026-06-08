// src/components/dev/DevEditButton.jsx
import { useNavigate } from 'react-router-dom';

export default function DevEditButton() {
    const navigate = useNavigate();

    // This check is the "secret" gate.
    // It will return null (nothing) in production builds.
    if (!import.meta.env.DEV) {
        return null;
    }

    return (
        <button
            onClick={() => navigate('/admin')}
            className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-[#dce7e0] border border-[#a8c2b1] text-[#4a5759] font-medium text-xs rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
            Edit Website 🌿
        </button>
    );
}