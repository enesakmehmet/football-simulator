import React from 'react';
import { useParams } from 'react-router-dom';
import './OyuncuProfil.css';

const OyuncuProfil = () => {
  const { id } = useParams();

  // Örnek oyuncu verisi
  const oyuncu = {
    id: id,
    ad: "Edin Dzeko",
    takim: "Fenerbahçe",
    yas: 37,
    mevki: "Forvet",
    uyruk: "Bosna Hersek",
    forma: "11",
    istatistikler: {
      mac: 15,
      gol: 12,
      asist: 3,
      sariKart: 2,
      kirmiziKart: 0,
      dakika: 1250
    }
  };

  return (
    <div className="oyuncu-profil-container">
      <div className="oyuncu-kart">
        <div className="oyuncu-baslik">
          <h1>{oyuncu.ad}</h1>
          <div className="oyuncu-temel-bilgi">
            <span className="takim">{oyuncu.takim}</span>
            <span className="forma">#{oyuncu.forma}</span>
          </div>
        </div>

        <div className="oyuncu-detaylar">
          <div className="detay-grup">
            <label>Yaş:</label>
            <span>{oyuncu.yas}</span>
          </div>
          <div className="detay-grup">
            <label>Mevki:</label>
            <span>{oyuncu.mevki}</span>
          </div>
          <div className="detay-grup">
            <label>Uyruk:</label>
            <span>{oyuncu.uyruk}</span>
          </div>
        </div>

        <div className="istatistikler">
          <h2>Sezon İstatistikleri</h2>
          <div className="istatistik-grid">
            <div className="istatistik-item">
              <span className="deger">{oyuncu.istatistikler.mac}</span>
              <label>Maç</label>
            </div>
            <div className="istatistik-item">
              <span className="deger">{oyuncu.istatistikler.gol}</span>
              <label>Gol</label>
            </div>
            <div className="istatistik-item">
              <span className="deger">{oyuncu.istatistikler.asist}</span>
              <label>Asist</label>
            </div>
            <div className="istatistik-item">
              <span className="deger">{oyuncu.istatistikler.dakika}</span>
              <label>Dakika</label>
            </div>
            <div className="istatistik-item">
              <span className="deger">{oyuncu.istatistikler.sariKart}</span>
              <label>Sarı Kart</label>
            </div>
            <div className="istatistik-item">
              <span className="deger">{oyuncu.istatistikler.kirmiziKart}</span>
              <label>Kırmızı Kart</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OyuncuProfil; 