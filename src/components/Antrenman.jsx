import React, { useState } from 'react';
import './Antrenman.css';

const Antrenman = () => {
  const [secilenAntrenman, setSecilenAntrenman] = useState('');
  const [yogunluk, setYogunluk] = useState(50);
  const [yorgunluk, setYorgunluk] = useState(0);

  const antrenmanTipleri = [
    { id: 1, ad: 'Kondisyon', etki: 'Dayanıklılık +2' },
    { id: 2, ad: 'Taktik', etki: 'Taktik Anlayışı +2' },
    { id: 3, ad: 'Şut', etki: 'Şut Gücü +2' },
    { id: 4, ad: 'Pas', etki: 'Pas İsabeti +2' },
    { id: 5, ad: 'Defans', etki: 'Defansif Yetenek +2' }
  ];

  const antrenmanYap = () => {
    if (!secilenAntrenman) {
      alert('Lütfen bir antrenman tipi seçin!');
      return;
    }
    
    const yeniYorgunluk = yorgunluk + (yogunluk / 20);
    setYorgunluk(Math.min(100, yeniYorgunluk));
  };

  return (
    <div className="antrenman-container">
      <h2>Antrenman Merkezi</h2>
      
      <div className="antrenman-panel">
        <div className="antrenman-secim">
          <h3>Antrenman Tipi Seçin</h3>
          <div className="antrenman-tipleri">
            {antrenmanTipleri.map(tip => (
              <div 
                key={tip.id} 
                className={`antrenman-tipi ${secilenAntrenman === tip.id ? 'secili' : ''}`}
                onClick={() => setSecilenAntrenman(tip.id)}
              >
                <h4>{tip.ad}</h4>
                <p>{tip.etki}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="antrenman-ayarlar">
          <h3>Antrenman Yoğunluğu</h3>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={yogunluk}
            onChange={(e) => setYogunluk(Number(e.target.value))}
          />
          <p>Yoğunluk: %{yogunluk}</p>
          
          <div className="yorgunluk-gostergesi">
            <h3>Takım Yorgunluğu</h3>
            <div className="progress-bar">
              <div 
                className="progress" 
                style={{width: `${yorgunluk}%`, backgroundColor: `hsl(${120 - yorgunluk * 1.2}, 70%, 45%)`}}
              ></div>
            </div>
            <p>%{yorgunluk.toFixed(1)}</p>
          </div>

          <button 
            className="antrenman-baslat"
            onClick={antrenmanYap}
          >
            Antrenmanı Başlat
          </button>
        </div>
      </div>
    </div>
  );
};

export default Antrenman; 