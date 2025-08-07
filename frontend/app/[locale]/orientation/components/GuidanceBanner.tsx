// app/[locale]/orientation/components/GuidanceBanner.tsx
import type { FC } from 'react';

const GuidanceBanner: FC = () => (
    <div className="bg-orange-500 text-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Découvre ton Futur</h2>
        <p className="text-orange-100 mb-4">Profil d'orientation complété à 65%</p>
        <div className="flex items-center gap-4">
            <div className="w-full bg-orange-400/80 rounded-full h-2.5">
                <div className="bg-white h-2.5 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <span className="font-bold text-lg">65%</span>
        </div>
    </div>
);
export default GuidanceBanner;