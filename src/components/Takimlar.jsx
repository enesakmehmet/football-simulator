import React from 'react';
import { Link } from 'react-router-dom';
import { takimKadrolari } from '../data/takimKadrolari';
import './Takimlar.css';

function Takimlar() {
  return (
    <div className="takimlar">
      <h2>Takımlar</h2>
      <div className="takim-listesi">
        {Object.entries(takimKadrolari).map(([takimAdi, takim]) => (
          <Link to={`/takim/${takimAdi}`} key={takimAdi} className="takim-card">
            <h3>{takimAdi}</h3>
            <div className="takim-bilgi">
              <p><strong>Stadyum:</strong> {takim.stadyum}</p>
              <p><strong>Kapasite:</strong> {takim.kapasite.toLocaleString()}</p>
              <p><strong>Kuruluş:</strong> {takim.kurulus}</p>
              <p><strong>Teknik Direktör:</strong> {takim.teknikDirektor}</p>
              <div className="takim-renkler">
                {takim.renkler.map((renk, index) => (
                  <div key={index} className="renk-kutu" style={{ backgroundColor: renk.toLowerCase() }}></div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Takimlar; 