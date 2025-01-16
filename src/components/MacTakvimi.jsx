import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MacTakvimi.css';

const MacTakvimi = () => {
  const [activeTab, setActiveTab] = useState('gelecek');

  const gelecekMaclar = [
    {
      id: 1,
      tarih: "2024-01-20",
      saat: "19:00",
      evSahibi: "Fenerbahçe",
      deplasman: "Beşiktaş",
      stadyum: "Ülker Stadyumu"
    },
    {
      id: 2,
      tarih: "2024-01-21",
      saat: "20:00",
      evSahibi: "Galatasaray",
      deplasman: "Trabzonspor",
      stadyum: "NEF Stadyumu"
    }
  ];

  const gecmisMaclar = [
    {
      id: 3,
      tarih: "2024-01-14",
      evSahibi: "Beşiktaş",
      deplasman: "Galatasaray",
      skor: "1-2",
      stadyum: "Vodafone Park"
    },
    {
      id: 4,
      tarih: "2024-01-13",
      evSahibi: "Trabzonspor",
      deplasman: "Fenerbahçe",
      skor: "0-3",
      stadyum: "Şenol Güneş Spor Kompleksi"
    }
  ];

  const formatTarih = (tarih) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(tarih).toLocaleDateString('tr-TR', options);
  };

  return (
    <div className="mac-takvimi-container">
      <h1>Maç Takvimi</h1>

      <div className="tabs">
        <button
          className={activeTab === 'gelecek' ? 'active' : ''}
          onClick={() => setActiveTab('gelecek')}
        >
          Gelecek Maçlar
        </button>
        <button
          className={activeTab === 'gecmis' ? 'active' : ''}
          onClick={() => setActiveTab('gecmis')}
        >
          Geçmiş Maçlar
        </button>
      </div>

      <div className="mac-listesi">
        {activeTab === 'gelecek' && gelecekMaclar.map(mac => (
          <div key={mac.id} className="mac-karti">
            <div className="mac-tarih">
              <div className="tarih">{formatTarih(mac.tarih)}</div>
              <div className="saat">{mac.saat}</div>
            </div>

            <div className="mac-detay">
              <span className="takim ev-sahibi">{mac.evSahibi}</span>
              <span className="vs">VS</span>
              <span className="takim deplasman">{mac.deplasman}</span>
            </div>

            <div className="stadyum">
              <i className="fas fa-stadium"></i> {mac.stadyum}
            </div>

            <Link to={`/mac-detay/${mac.id}`} className="detay-link">
              Maç Detayları
            </Link>
          </div>
        ))}

        {activeTab === 'gecmis' && gecmisMaclar.map(mac => (
          <div key={mac.id} className="mac-karti">
            <div className="mac-tarih">
              <div className="tarih">{formatTarih(mac.tarih)}</div>
            </div>

            <div className="mac-detay">
              <span className="takim ev-sahibi">{mac.evSahibi}</span>
              <span className="skor">{mac.skor}</span>
              <span className="takim deplasman">{mac.deplasman}</span>
            </div>

            <div className="stadyum">
              <i className="fas fa-stadium"></i> {mac.stadyum}
            </div>

            <Link to={`/mac-detay/${mac.id}`} className="detay-link">
              Maç Özeti
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MacTakvimi; 