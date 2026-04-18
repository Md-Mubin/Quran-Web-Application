import { useSettings } from '@/context/SettingsContext';
import { X } from 'lucide-react';

const SettingPanel = () => {
    const { settings, updateSettings, isOpen, setIsOpen, arabicFonts, translationFonts } = useSettings();

    if (!isOpen) return null;
    return (
        <aside className="fixed inset-y-0 top-0 right-0 w-72 bg-white shadow-lg border border-[#00000020] z-50 overflow-y-auto">
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Settings</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-600 cursor-pointer hover:bg-gray-300 rounded p-1">
                        <X />
                    </button>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Arabic Font</label>
                        <select
                            value={settings.arabicFont}
                            onChange={(e) => updateSettings({ arabicFont: e.target.value })}
                            className="w-full p-2 border rounded-lg"
                        >
                            {arabicFonts.map((font) => (
                                <option key={font.value} value={font.value}>
                                    {font.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Arabic Font Size: {settings.arabicFontSize}px
                        </label>
                        <input
                            type="range"
                            min="16"
                            max="48"
                            value={settings.arabicFontSize}
                            onChange={(e) => updateSettings({ arabicFontSize: parseInt(e.target.value) })}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Translation Font</label>
                        <select
                            value={settings.translationFont}
                            onChange={(e) => updateSettings({ translationFont: e.target.value })}
                            className="w-full p-2 border rounded-lg"
                        >
                            {translationFonts.map((font) => (
                                <option key={font.value} value={font.value}>
                                    {font.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Translation Font Size: {settings.translationFontSize}px
                        </label>
                        <input
                            type="range"
                            min="12"
                            max="28"
                            value={settings.translationFontSize}
                            onChange={(e) => updateSettings({ translationFontSize: parseInt(e.target.value) })}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default SettingPanel