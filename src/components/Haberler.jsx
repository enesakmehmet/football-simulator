import React from 'react';
import './Haberler.css';

const Haberler = () => {
  const haberler = [
    {
      id: 1,
      baslik: "Süper Lig'de Şampiyonluk Yarışı Kızışıyor",
      ozet: "Ligin ikinci yarısına girilirken üç büyükler arasındaki puan farkı kapanıyor...",
      tarih: "2024-01-15",
      resim: "https://example.com/sampiyonluk-yarisi.jpg",
      kategori: "Lig"
    },
    {
      id: 2,
      baslik: "Yılın Transfer Bombası",
      ozet: "Fenerbahçe, dünyaca ünlü yıldız oyuncuyla görüşmelere başladı...",
      tarih: "2024-01-14",
      resim: "https://example.com/transfer-bombasi.jpg",
      kategori: "Transfer"
    },
    {
      id: 3,
      baslik: "VAR Tartışmaları Devam Ediyor",
      ozet: "Geçtiğimiz haftaki kritik maçta alınan VAR kararları tartışma yarattı...",
      tarih: "2024-01-13",
      resim: "https://example.com/var-tartismalari.jpg",
      kategori: "Hakem"
    }
  ];

  const formatTarih = (tarih) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(tarih).toLocaleDateString('tr-TR', options);
  };

  return (
    <div className="haberler-container">
      <h1>Haberler</h1>

      <div className="haber-listesi">
        {haberler.map(haber => (
          <div key={haber.id} className="haber-karti">
            <div className="haber-resim">
              <img src={haber.resim} alt={haber.baslik} />
              <span className="kategori">{haber.kategori}</span>
            </div>

            <div className="haber-icerik">
              <div className="haber-baslik">
                <h2>{haber.baslik}</h2>
                <span className="tarih">{formatTarih(haber.tarih)}</span>
              </div>

              <p className="ozet">{haber.ozet}</p>

              <button className="devami-btn">
                Devamını Oku
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button className="prev-btn">Önceki</button>
        <div className="sayfa-numaralari">
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
        </div>
        <button className="next-btn">Sonraki</button>
      </div>
    </div>
  );
};

export default Haberler; 