import React, { useState, useEffect } from 'react';
import './Bildirimler.css';

function Bildirimler() {
  const [bildirimler, setBildirimler] = useState([]);
  const [bildirimAyarlari, setBildirimAyarlari] = useState({
    macBaslangic: true,
    gol: true,
    onemliOlaylar: true,
    duyurular: true
  });

  // Örnek bildirimler
  const ornekBildirimler = [
    {
      id: 1,
      tip: 'macBaslangic',
      mesaj: 'Galatasaray - Fenerbahçe maçı 15 dakika içinde başlayacak!',
      tarih: '2024-03-20 19:45',
      okundu: false
    },
    {
      id: 2,
      tip: 'gol',
      mesaj: 'GOL! Beşiktaş 1 - 0 Trabzonspor (45\' Cenk Tosun)',
      tarih: '2024-03-20 20:15',
      okundu: false
    },
    {
      id: 3,
      tip: 'onemliOlay',
      mesaj: 'Kırmızı Kart! Fenerbahçe\'den İrfan Can Kahveci oyun dışı kaldı',
      tarih: '2024-03-20 20:30',
      okundu: true
    }
  ];

  useEffect(() => {
    setBildirimler(ornekBildirimler);
  }, []);

  const handleAyarDegisikligi = (ayar) => {
    setBildirimAyarlari(prev => ({
      ...prev,
      [ayar]: !prev[ayar]
    }));
  };

  const bildirimOku = (id) => {
    setBildirimler(prev =>
      prev.map(bildirim =>
        bildirim.id === id ? { ...bildirim, okundu: true } : bildirim
      )
    );
  };

  const tumBildirimleriOku = () => {
    setBildirimler(prev =>
      prev.map(bildirim => ({ ...bildirim, okundu: true }))
    );
  };

  const bildirimSil = (id) => {
    setBildirimler(prev =>
      prev.filter(bildirim => bildirim.id !== id)
    );
  };

  return (
    <div className="bildirimler-container">
      <div className="bildirimler-header">
        <h2>Bildirimler</h2>
        <button onClick={tumBildirimleriOku} className="tumu-okundu-btn">
          Tümünü Okundu İşaretle
        </button>
      </div>

      <div className="bildirim-ayarlari">
        <h3>Bildirim Ayarları</h3>
        <div className="ayarlar-grid">
          <div className="ayar-item">
            <label>
              <input
                type="checkbox"
                checked={bildirimAyarlari.macBaslangic}
                onChange={() => handleAyarDegisikligi('macBaslangic')}
              />
              Maç Başlangıç Bildirimleri
            </label>
          </div>
          <div className="ayar-item">
            <label>
              <input
                type="checkbox"
                checked={bildirimAyarlari.gol}
                onChange={() => handleAyarDegisikligi('gol')}
              />
              Gol Bildirimleri
            </label>
          </div>
          <div className="ayar-item">
            <label>
              <input
                type="checkbox"
                checked={bildirimAyarlari.onemliOlaylar}
                onChange={() => handleAyarDegisikligi('onemliOlaylar')}
              />
              Önemli Olay Bildirimleri
            </label>
          </div>
          <div className="ayar-item">
            <label>
              <input
                type="checkbox"
                checked={bildirimAyarlari.duyurular}
                onChange={() => handleAyarDegisikligi('duyurular')}
              />
              Duyuru Bildirimleri
            </label>
          </div>
        </div>
      </div>

      <div className="bildirimler-listesi">
        {bildirimler.length === 0 ? (
          <p className="bos-bildirim">Henüz bildirim bulunmuyor.</p>
        ) : (
          bildirimler.map(bildirim => (
            <div
              key={bildirim.id}
              className={`bildirim-kart ${bildirim.okundu ? 'okundu' : ''}`}
              onClick={() => bildirimOku(bildirim.id)}
            >
              <div className="bildirim-icerik">
                <p className="bildirim-mesaj">{bildirim.mesaj}</p>
                <span className="bildirim-tarih">{bildirim.tarih}</span>
              </div>
              <button
                className="bildirim-sil-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  bildirimSil(bildirim.id);
                }}
              >
                Sil
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Bildirimler; 