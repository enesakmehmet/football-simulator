import React, { useState } from 'react';
import './Istatistikler.css';

const Istatistikler = () => {
  const [activeTab, setActiveTab] = useState('golKralligi');

  const golKralligi = [
    { id: 1, oyuncu: "Edin Dzeko", takim: "Fenerbahçe", gol: 15 },
    { id: 2, oyuncu: "Mauro Icardi", takim: "Galatasaray", gol: 14 },
    { id: 3, oyuncu: "Vincent Aboubakar", takim: "Beşiktaş", gol: 12 },
  ];

  const asistKralligi = [
    { id: 1, oyuncu: "Fred", takim: "Fenerbahçe", asist: 10 },
    { id: 2, oyuncu: "Kerem Aktürkoğlu", takim: "Galatasaray", asist: 8 },
    { id: 3, oyuncu: "Gedson Fernandes", takim: "Beşiktaş", asist: 7 },
  ];

  const kartIstatistikleri = [
    { id: 1, oyuncu: "Josef de Souza", takim: "Beşiktaş", sari: 8, kirmizi: 1 },
    { id: 2, oyuncu: "Sergio Oliveira", takim: "Galatasaray", sari: 7, kirmizi: 0 },
    { id: 3, oyuncu: "İrfan Can Kahveci", takim: "Fenerbahçe", sari: 6, kirmizi: 1 },
  ];

  return (
    <div className="istatistikler-container">
      <h1>İstatistikler</h1>
      
      <div className="tabs">
        <button 
          className={activeTab === 'golKralligi' ? 'active' : ''} 
          onClick={() => setActiveTab('golKralligi')}
        >
          Gol Krallığı
        </button>
        <button 
          className={activeTab === 'asistKralligi' ? 'active' : ''} 
          onClick={() => setActiveTab('asistKralligi')}
        >
          Asist Krallığı
        </button>
        <button 
          className={activeTab === 'kartlar' ? 'active' : ''} 
          onClick={() => setActiveTab('kartlar')}
        >
          Kart İstatistikleri
        </button>
      </div>

      <div className="istatistik-content">
        {activeTab === 'golKralligi' && (
          <div className="tablo">
            <h2>Gol Krallığı</h2>
            <table>
              <thead>
                <tr>
                  <th>Sıra</th>
                  <th>Oyuncu</th>
                  <th>Takım</th>
                  <th>Gol</th>
                </tr>
              </thead>
              <tbody>
                {golKralligi.map((oyuncu, index) => (
                  <tr key={oyuncu.id}>
                    <td>{index + 1}</td>
                    <td>{oyuncu.oyuncu}</td>
                    <td>{oyuncu.takim}</td>
                    <td>{oyuncu.gol}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'asistKralligi' && (
          <div className="tablo">
            <h2>Asist Krallığı</h2>
            <table>
              <thead>
                <tr>
                  <th>Sıra</th>
                  <th>Oyuncu</th>
                  <th>Takım</th>
                  <th>Asist</th>
                </tr>
              </thead>
              <tbody>
                {asistKralligi.map((oyuncu, index) => (
                  <tr key={oyuncu.id}>
                    <td>{index + 1}</td>
                    <td>{oyuncu.oyuncu}</td>
                    <td>{oyuncu.takim}</td>
                    <td>{oyuncu.asist}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'kartlar' && (
          <div className="tablo">
            <h2>Kart İstatistikleri</h2>
            <table>
              <thead>
                <tr>
                  <th>Sıra</th>
                  <th>Oyuncu</th>
                  <th>Takım</th>
                  <th>Sarı Kart</th>
                  <th>Kırmızı Kart</th>
                </tr>
              </thead>
              <tbody>
                {kartIstatistikleri.map((oyuncu, index) => (
                  <tr key={oyuncu.id}>
                    <td>{index + 1}</td>
                    <td>{oyuncu.oyuncu}</td>
                    <td>{oyuncu.takim}</td>
                    <td>{oyuncu.sari}</td>
                    <td>{oyuncu.kirmizi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Istatistikler; 