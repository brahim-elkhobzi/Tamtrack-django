// File: [locale]/home/components/InfoCard.js
import React from 'react';

const InfoCard = ({ icon, title, subtitle, time }) => (
  <div className="bg-white p-4 rounded-xl shadow-md flex items-start space-x-4">
    <div className="bg-gray-100 p-3 rounded-lg mt-1">{icon}</div>
    <div>
      <h3 className="font-bold text-orange-500">{title}</h3>
      <p className="text-gray-900 font-semibold">{subtitle}</p>
      <p className="text-sm text-gray-500">{time}</p>
    </div>
  </div>
);

export default InfoCard;