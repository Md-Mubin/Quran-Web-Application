'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { Loader2 } from 'lucide-react';

const SearchBar = () => {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        try {
            const res = await fetch(`${baseURL}/api/search?q=${encodeURIComponent(query)}`);
            const data = await res.json();
            setResults(data);
            setShowResults(true);
        } catch (error) {
            console.error('Search error:', error);
            setResults([]);
            setShowResults(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLinkClick = (surahId) => {
        router.push(`/surah/${surahId}`);
        setShowResults(false);
        setQuery('');
    };
    return (
        <div className="relative">
            <form onSubmit={handleSearch} className="flex gap-2">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search ayahs by translation..."
                    className="flex-1 px-4 py-2 border rounded-lg"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-20 py-2 brandColor text-white rounded-lg hover:bg-[#00000022] duration-200 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isLoading ? <Loader2 className="animate-spin h-4 w-4 text-white" /> : 'Search'}
                </button>
            </form>

            {showResults && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-lg rounded-lg max-h-96 overflow-y-auto z-50">
                    <button
                        onClick={() => setShowResults(false)}
                        className="w-fit ml-auto text-right p-2 text-gray-500 hover:bg-[#00000022] flex items-center justify-end gap-1 rounded-bl-lg cursor-pointer duration-200"
                    >
                        <X /> Close
                    </button>
                    {results?.map((result, index) => (
                        <div
                            key={index}
                            onClick={() => handleLinkClick(result.surahId)}
                            className="p-3 border-b cursor-pointer hover:bg-[#00000022] duration-200"
                        >
                            <div className="font-arabic text-black text-lg mb-1" style={{ fontFamily: 'Amiri Quran, serif' }}>
                                {result.text}
                            </div>
                            <div className="text-sm text-gray-600">
                                {result.translation}
                            </div>
                            <div className="text-xs text-brandColor mt-1">
                                {result.surahName} - Verse {result.verseId}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SearchBar