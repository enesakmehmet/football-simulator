import React, { useState } from 'react';
import './MacTahminleri.css';

function MacTahminleri() {
  const [tahmin, setTahmin] = useState({ 
    evSahibi: '',
    deplasman: '',
    evSahibiSkor: '',
    deplasmanSkor: ''
  });

  const [tahminler, setTahminler] = useState([]);

  const ornekMaclar = [
    { id: 1, evSahibi: 'Galatasaray', deplasman: 'Fenerbahçe', tarih: '2024-03-20' },
    { id: 2, evSahibi: 'Beşiktaş', deplasman: 'Trabzonspor', tarih: '2024-03-21' },
    { id: 3, evSahibi: 'Başakşehir', deplasman: 'Adana Demirspor', tarih: '2024-03-22' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTahmin({ ...tahmin, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const yeniTahmin = {
      ...tahmin,
      id: Date.now(),
      tarih: new Date().toLocaleDateString()
    };
    setTahminler([yeniTahmin, ...tahminler]);
    setTahmin({ evSahibi: '', deplasman: '', evSahibiSkor: '', deplasmanSkor: '' });
  };

  return (
    <div className="mac-tahminleri-container">
      <h2 className="mac-tahminleri-baslik">Maç Tahminleri</h2>
      
      <div className="tahmin-form">
        <h3>Yaklaşan Maçlar</h3>
        <select 
          name="mac" 
          onChange={(e) => {
            const seciliMac = ornekMaclar.find(m => m.id === parseInt(e.target.value));
            if (seciliMac) {
              setTahmin({
                ...tahmin,
                evSahibi: seciliMac.evSahibi,
                deplasman: seciliMac.deplasman
              });
            }
          }}
          defaultValue=""
        >
          <option value="" disabled>Maç Seçin</option>
          {ornekMaclar.map(mac => (
            <option key={mac.id} value={mac.id}>
              {mac.evSahibi} vs {mac.deplasman} ({mac.tarih})
            </option>
          ))}
        </select>

        <form onSubmit={handleSubmit} className="tahmin-form">
          <div className="form-grup">
            <label>Ev Sahibi Takım:</label>
            <input
              type="text"
              name="evSahibi"
              value={tahmin.evSahibi}
              onChange={handleChange}
              placeholder="Ev sahibi takım"
              required
            />
          </div>
          
          <div className="form-grup">
            <label>Deplasman Takımı:</label>
            <input
              type="text"
              name="deplasman"
              value={tahmin.deplasman}
              onChange={handleChange}
              placeholder="Deplasman takımı"
              required
            />
          </div>

          <div className="form-grup">
            <label>Ev Sahibi Skor:</label>
            <input
              type="number"
              name="evSahibiSkor"
              value={tahmin.evSahibiSkor}
              onChange={handleChange}
              min="0"
              placeholder="0"
              required
            />
          </div>

          <div className="form-grup">
            <label>Deplasman Skor:</label>
            <input
              type="number"
              name="deplasmanSkor"
              value={tahmin.deplasmanSkor}
              onChange={handleChange}
              min="0"
              placeholder="0"
              required
            />
          </div>

          <button type="submit" className="tahmin-buton">Tahmin Yap</button>
        </form>
      </div>

      <div className="tahminler-listesi">
        <h3>Tahminleriniz</h3>
        {tahminler.map(t => (
          <div key={t.id} className="tahmin-kart">
            <h3>{t.evSahibi} vs {t.deplasman}</h3>
            <p>Tahmin: {t.evSahibiSkor} - {t.deplasmanSkor}</p>
            <p>Tarih: {t.tarih}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MacTahminleri; 