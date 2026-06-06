// src/pages/core/LocalDashboard.jsx
import { useState } from 'react';
import initialWebringData from '../../content/data/webring.json';

export default function LocalDashboard() {
    const [sites, setSites] = useState(initialWebringData);
    const [status, setStatus] = useState('');

    // --- Actions ---
    const updateSite = (index, field, value) => {
        const updatedSites = [...sites];
        updatedSites[index][field] = value;
        setSites(updatedSites);
    };

    const addSite = () => {
        setSites([...sites, { id: Date.now().toString(), name: '', url: '', tag: '✨', description: '' }]);
    };

    const removeSite = (index) => {
        setSites(sites.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
        setStatus('Saving...');
        try {
            const response = await fetch('/api/save-webring', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sites)
            });

            if (response.ok) {
                setStatus('🌿 Safely written to webring.json');
                setTimeout(() => setStatus(''), 3000);
            } else {
                setStatus('⚠️ Failed to save.');
            }
        } catch (error) {
            setStatus('⚠️ Network error.');
        }
    };

    // --- Render ---
    return (
        <div className="max-w-3xl mx-auto p-8 min-h-screen bg-[#fcfdfc] text-[#4a5759]">
            <header className="mb-8 flex justify-between items-end border-b border-[#e2ebe4] pb-4">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight text-[#3a4749]">Local Workspace</h1>
                    <p className="text-sm text-[#8a9a86] mt-1">Manage your digital garden's data files.</p>
                </div>
                <button
                    onClick={handleSave}
                    className="bg-[#dce7e0] hover:bg-[#c8d8ce] text-[#4a5759] font-medium px-5 py-2 rounded-full transition-colors shadow-sm"
                >
                    Save Changes
                </button>
            </header>

            {status && (
                <div className="mb-6 p-3 bg-[#f0f5f1] border border-[#dce7e0] text-[#5a6a5c] rounded-lg text-sm text-center transition-all">
                    {status}
                </div>
            )}

            <section className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-medium text-[#5a6a5c]">Webring Index</h2>
                    <button onClick={addSite} className="text-sm text-[#8a9a86] hover:text-[#4a5759] transition-colors">
                        + Add Neighbor
                    </button>
                </div>

                {sites.map((site, index) => (
                    <div key={site.id} className="bg-white border border-[#e2ebe4] p-5 rounded-2xl shadow-sm space-y-4">
                        <div className="flex gap-4">
                            <div className="w-16">
                                <label className="block text-xs text-[#8a9a86] mb-1 uppercase tracking-wider">Badge</label>
                                <input
                                    type="text"
                                    value={site.tag}
                                    onChange={(e) => updateSite(index, 'tag', e.target.value)}
                                    className="w-full bg-[#f8fcf9] border border-[#dce7e0] rounded-lg p-2 text-center focus:outline-none focus:border-[#a8c2b1] transition-colors"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-xs text-[#8a9a86] mb-1 uppercase tracking-wider">Site Name</label>
                                <input
                                    type="text"
                                    value={site.name}
                                    onChange={(e) => updateSite(index, 'name', e.target.value)}
                                    className="w-full bg-[#f8fcf9] border border-[#dce7e0] rounded-lg p-2 focus:outline-none focus:border-[#a8c2b1] transition-colors"
                                    placeholder="Friend's Website"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-xs text-[#8a9a86] mb-1 uppercase tracking-wider">URL</label>
                                <input
                                    type="url"
                                    value={site.url}
                                    onChange={(e) => updateSite(index, 'url', e.target.value)}
                                    className="w-full bg-[#f8fcf9] border border-[#dce7e0] rounded-lg p-2 focus:outline-none focus:border-[#a8c2b1] transition-colors"
                                    placeholder="https://"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs text-[#8a9a86] mb-1 uppercase tracking-wider">Description</label>
                            <input
                                type="text"
                                value={site.description}
                                onChange={(e) => updateSite(index, 'description', e.target.value)}
                                className="w-full bg-[#f8fcf9] border border-[#dce7e0] rounded-lg p-2 focus:outline-none focus:border-[#a8c2b1] transition-colors"
                                placeholder="A short description of this corner of the web..."
                            />
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                onClick={() => removeSite(index)}
                                className="text-xs text-red-400 hover:text-red-600 transition-colors"
                            >
                                Remove Site
                            </button>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}