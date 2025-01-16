import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [bildirimSayisi, setBildirimSayisi] = useState(3); // Örnek bildirim sayısı

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">
          <div className="logo">
            <span className="logo-icon">⚽</span>
            <span className="logo-text">Futbol Simülasyonu</span>
          </div>
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Puan Durumu</Link></li>
        <li><Link to="/fixture">Fikstür</Link></li>
        <li><Link to="/takimlar">Takımlar</Link></li>
        <li><Link to="/istatistikler">İstatistikler</Link></li>
        <li><Link to="/canli-maclar">Canlı Maçlar</Link></li>
        <li><Link to="/mac-takvimi">Maç Takvimi</Link></li>
        <li><Link to="/transfer-merkezi">Transfer Merkezi</Link></li>
        <li><Link to="/antrenman">Antrenman</Link></li>
        <li><Link to="/haberler">Haberler</Link></li>
        <li><Link to="/mac-tahminleri">Maç Tahminleri</Link></li>
        <li>
          <Link to="/bildirimler" className="bildirim-link">
            Bildirimler
            {bildirimSayisi > 0 && <span className="bildirim-badge">{bildirimSayisi}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar; 