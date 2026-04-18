"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react'
import SearchBar from './SearchBar';
import SettingPanel from '../reuseable/SettingPanel';

const HomePageComponent = () => {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const [allSurah, setAllSurah] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAllSurah() {
            const res = await fetch(`${baseURL}/api/surahs`);
            const data = await res.json();
            setAllSurah(data);
            setLoading(false);
        }
        fetchAllSurah();
    }, []);
    return (
        <section className="min-h-screen">
            <header className="bg-brandColor text-white shadow-lg">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <h1 className="text-2xl font-bold">Quran</h1>
                    <div className="mt-4">
                        <SearchBar />
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-8">
                {loading ? (
                    <div className="text-center py-12">Loading...</div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {allSurah?.map((surah) => (
                            <Link
                                key={surah.id}
                                href={`/surah/${surah.id}`}
                                className="block bg-white rounded-lg shadow hover:shadow-lg transition p-6"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 text-brandColor/80 rounded-full font-bold">
                                        {surah.id}
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-xl font-arabic" dir="rtl">
                                            {surah.name}
                                        </h2>
                                        <p className="text-gray-600 mt-1">
                                            {surah.transliteration}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {surah.translation} • {surah.total_verses} verses
                                        </p>
                                        <span className="inline-block mt-2 text-xs px-2 py-1 bg-gray-100 rounded">
                                            {surah.type === 'meccan' ? 'Meccan' : 'Medinan'}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>

            <SettingPanel />
        </section>
    )
}

export default HomePageComponent