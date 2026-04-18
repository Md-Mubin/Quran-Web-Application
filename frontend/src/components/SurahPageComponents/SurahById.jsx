"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link.js';
import { useSettings } from '@/context/SettingsContext';
import SettingPanel from '../reuseable/SettingPanel';
import { ArrowLeft, Cog } from 'lucide-react';

const SurahById = ({ id }) => {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const [surah, setSurah] = useState(null);
    const [loading, setLoading] = useState(true);
    const { settings, setIsOpen, isOpen } = useSettings();

    useEffect(() => {
        async function fetchSurah() {
            const res = await fetch(`${baseURL}/api/surah/${id}`);
            if (res.ok) {
                const data = await res.json();
                setSurah(data);
            }
            setLoading(false);
        }
        fetchSurah();
    }, [id]);

    const arabicStyle = {
        fontFamily: settings.arabicFont,
        fontSize: `${settings.arabicFontSize}px`,
        lineHeight: '1.8',
    };

    const translationStyle = {
        fontFamily: settings.translationFont,
        fontSize: `${settings.translationFontSize}px`,
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!surah) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Surah not found
            </div>
        );
    }
    return (
        <section className="min-h-screen">
            <header className="bg-brandColor text-white shadow-lg sticky top-0 z-40">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex justify-between items-center gap-4">
                        <Link href="/" className="p-2 hover:bg-[#00000022] rounded-lg cursor-pointer duration-200 flex items-center gap-1">
                            <ArrowLeft size={20}/> Back
                        </Link>
                        <h1 className="text-xl font-bold flex-1 text-center">
                            {surah.transliteration}
                        </h1>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 hover:bg-[#00000022] rounded-lg flex items-center gap-1 cursor-pointer duration-200"
                        >
                            <Cog /> Settings
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-2xl font-arabic text-center" dir="rtl">
                        {surah.name}
                    </h2>
                    <p className="text-center text-gray-600 mt-2">
                        {surah.translation} • {surah.total_verses} verses
                    </p>
                    <p className="text-center text-sm text-gray-500 mt-1">
                        {surah.type === 'meccan' ? 'Revealed in Mecca' : 'Revealed in Medina'}
                    </p>
                </div>

                <div className="space-y-6">
                    {surah.verses.map((verse) => (
                        <div key={verse.id} className="bg-white rounded-lg shadow p-6">
                            <div className="text-left text-brandColor/60 mb-2 text-sm">
                                {surah.id}:{verse.id}
                            </div>
                            <div className="font-arabic text-right" dir="rtl" style={arabicStyle}>
                                {verse.text}
                            </div>
                            <div className="mt-4 text-gray-700" style={translationStyle}>
                                {verse.translation}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <Link
                        href="/"
                        className="inline-block px-6 py-3 bg-brandColor text-white rounded-lg hover:bg-brandColor/80"
                    >
                        Back to Surah List
                    </Link>
                </div>
            </main>

            <SettingPanel />
        </section>
    )
}

export default SurahById