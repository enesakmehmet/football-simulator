import React, { useState, useEffect } from 'react';
import './TransferMerkezi.css';

const TransferMerkezi = () => {
  const [oyuncular, setOyuncular] = useState([]);
  const [filtrelenmisTeklifler, setFiltrelenmisTeklifler] = useState([]);
  const [butce, setButce] = useState(1000000);

  useEffect(() => {
    // Örnek veri
    const ornekOyuncular = [
      { id: 1, ad: "Alex de Souza", yas: 28, deger: 15000000, pozisyon: "OF" },
      { id: 2, ad: "Sergen Yalçın", yas: 25, deger: 12000000, pozisyon: "OS" },
      // Daha fazla oyuncu eklenebilir
    ];
    setOyuncular(ornekOyuncular);
  }, []);

  const teklifVer = (oyuncuId, miktar) => {
    // Teklif verme mantığı
    console.log(`${oyuncuId} için ${miktar}€ teklif verildi`);
  };

  return (
    <div className="transfer-merkezi">
      <h2>Transfer Merkezi</h2>
      <div className="butce-bilgisi">
        <h3>Kullanılabilir Bütçe: {butce.toLocaleString()}€</h3>
      </div>
      
      <div className="transfer-listesi">
        {oyuncular.map(oyuncu => (
          <div key={oyuncu.id} className="oyuncu-karti">
            <h3>{oyuncu.ad}</h3>
            <p>Yaş: {oyuncu.yas}</p>
            <p>Değer: {oyuncu.deger.toLocaleString()}€</p>
            <p>Pozisyon: {oyuncu.pozisyon}</p>
            <button onClick={() => teklifVer(oyuncu.id, oyuncu.deger)}>
              Teklif Ver
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransferMerkezi; 