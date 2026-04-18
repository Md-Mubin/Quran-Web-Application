import { quranData } from "../data/quran.js";

export function getAllSurahs() {
    return quranData.map(surah => ({
        id: surah.id,
        name: surah.name,
        transliteration: surah.transliteration,
        translation: surah.translation,
        type: surah.type,
        total_verses: surah.total_verses
    }));
}

export function getSurahById(id) {
    return quranData.find(surah => surah.id === parseInt(id));
}

export function searchAyat(query) {
    const results = [];
    quranData.forEach(surah => {
        surah.verses.forEach(verse => {
            if (verse.translation.toLowerCase().includes(query.toLowerCase())) {
                results.push({
                    surahId: surah.id,
                    surahName: surah.transliteration,
                    verseId: verse.id,
                    text: verse.text,
                    translation: verse.translation
                });
            }
        });
    });
    return results;
}