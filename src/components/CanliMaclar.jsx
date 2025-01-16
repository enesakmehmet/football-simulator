import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CanliMaclar.css';

const CanliMaclar = () => {
  const [canliMaclar, setCanliMaclar] = useState([
    {
      id: 1,
      evSahibi: "Fenerbahçe",
      deplasman: "Galatasaray",
      skor: "2-1",
      dakika: 67,
      olaylar: [
        { dakika: 23, takim: "Fenerbahçe", olay: "Gol", oyuncu: "Dzeko" },
        { dakika: 45, takim: "Galatasaray", olay: "Gol", oyuncu: "Icardi" },
        { dakika: 56, takim: "Fenerbahçe", olay: "Gol", oyuncu: "Tadic" }
      ]
    },
    {
      id: 2,
      evSahibi: "Beşiktaş",
      deplasman: "Trabzonspor",
      skor: "0-0",
      dakika: 34,
      olaylar: []
    }
  ]);

  useEffect(() => {
    // Gerçek uygulamada burada API'den canlı maç verilerini çekebilirsiniz
    const interval = setInterval(() => {
      // Maç dakikalarını güncelle
      setCanliMaclar(prevMaclar => 
        prevMaclar.map(mac => ({
          ...mac,
          dakika: mac.dakika < 90 ? mac.dakika + 1 : mac.dakika
        }))
      );
    }, 60000); // Her dakika güncelle

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="canli-maclar-container">
      <h1>Canlı Maçlar</h1>
      
      <div className="mac-listesi">
        {canliMaclar.map(mac => (
          <div key={mac.id} className="mac-karti">
            <div className="mac-baslik">
              <span className="canli-badge">CANLI</span>
              <span className="dakika">{mac.dakika}'</span>
            </div>
            
            <div className="mac-detay">
              <div className="takim ev-sahibi">
                <span className="takim-adi">{mac.evSahibi}</span>
              </div>
              
              <div className="skor">
                <span>{mac.skor}</span>
              </div>
              
              <div className="takim deplasman">
                <span className="takim-adi">{mac.deplasman}</span>
              </div>
            </div>

            <div className="mac-olaylar">
              {mac.olaylar.map((olay, index) => (
                <div key={index} className="olay">
                  <span className="olay-dakika">{olay.dakika}'</span>
                  <span className="olay-detay">
                    {olay.oyuncu} ({olay.takim}) - {olay.olay}
                  </span>
                </div>
              ))}
            </div>

            <Link to={`/mac-detay/${mac.id}`} className="detay-link">
              Maç Detayları
            </Link>
          </div>
        ))}
      </div>

      {canliMaclar.length === 0 && (
        <div className="no-matches">
          Şu anda canlı maç bulunmamaktadır.
        </div>
      )}
    </div>
  );
};

export default CanliMaclar; 