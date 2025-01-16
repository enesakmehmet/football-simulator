import React from 'react';
import { useParams } from 'react-router-dom';
import { takimKadrolari } from '../data/takimKadrolari';
import './TakimDetay.css';

function TakimDetay() {
  const { takimAdi } = useParams();
  const takim = takimKadrolari[takimAdi];

  if (!takim) {
    return <div className="hata">Takım bulunamadı!</div>;
  }

  const ortalamaYas = () => {
    let toplamYas = 0;
    let oyuncuSayisi = 0;

    ['kaleciler', 'defans', 'ortasaha', 'forvet'].forEach(pozisyon => {
      takim[pozisyon].forEach(oyuncu => {
        toplamYas += oyuncu.yas;
        oyuncuSayisi++;
      });
    });

    return (toplamYas / oyuncuSayisi).toFixed(1);
  };

  const ortalamaYetenek = () => {
    let toplamYetenek = 0;
    let oyuncuSayisi = 0;

    ['kaleciler', 'defans', 'ortasaha', 'forvet'].forEach(pozisyon => {
      takim[pozisyon].forEach(oyuncu => {
        toplamYetenek += oyuncu.yetenek;
        oyuncuSayisi++;
      });
    });

    return (toplamYetenek / oyuncuSayisi).toFixed(1);
  };

  const yabancıSayisi = () => {
    let sayac = 0;
    ['kaleciler', 'defans', 'ortasaha', 'forvet'].forEach(pozisyon => {
      takim[pozisyon].forEach(oyuncu => {
        if (oyuncu.uyruk !== "Türkiye") sayac++;
      });
    });
    return sayac;
  };

  return (
    <div className="takim-detay">
      <div className="takim-baslik">
        <h1>{takimAdi}</h1>
        <div className="takim-renkler">
          {takim.renkler.map((renk, index) => (
            <div key={index} className="renk-kutu" style={{ backgroundColor: renk.toLowerCase() }}></div>
          ))}
        </div>
      </div>

      <div className="takim-bilgileri">
        <div className="bilgi-kutu">
          <h3>Kuruluş</h3>
          <p>{takim.kurulus}</p>
        </div>
        <div className="bilgi-kutu">
          <h3>Stadyum</h3>
          <p>{takim.stadyum}</p>
          <p className="alt-bilgi">Kapasite: {takim.kapasite.toLocaleString()}</p>
        </div>
        <div className="bilgi-kutu">
          <h3>Teknik Direktör</h3>
          <p>{takim.teknikDirektor}</p>
        </div>
        <div className="bilgi-kutu">
          <h3>Kadro İstatistikleri</h3>
          <p>Ortalama Yaş: {ortalamaYas()}</p>
          <p>Ortalama Güç: {ortalamaYetenek()}</p>
          <p>Yabancı Sayısı: {yabancıSayisi()}</p>
        </div>
      </div>

      <div className="kadro">
        <h2>Kaleciler</h2>
        <div className="oyuncu-listesi">
          {takim.kaleciler.map(oyuncu => (
            <div key={oyuncu.no} className="oyuncu-kart">
              <div className="forma-no">{oyuncu.no}</div>
              <div className="oyuncu-bilgi">
                <h3>{oyuncu.ad}</h3>
                <p>Yaş: {oyuncu.yas}</p>
                <p>Güç: {oyuncu.yetenek}</p>
                <p className="uyruk">{oyuncu.uyruk}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>Defans</h2>
        <div className="oyuncu-listesi">
          {takim.defans.map(oyuncu => (
            <div key={oyuncu.no} className="oyuncu-kart">
              <div className="forma-no">{oyuncu.no}</div>
              <div className="oyuncu-bilgi">
                <h3>{oyuncu.ad}</h3>
                <p>Yaş: {oyuncu.yas}</p>
                <p>Güç: {oyuncu.yetenek}</p>
                <p className="uyruk">{oyuncu.uyruk}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>Orta Saha</h2>
        <div className="oyuncu-listesi">
          {takim.ortasaha.map(oyuncu => (
            <div key={oyuncu.no} className="oyuncu-kart">
              <div className="forma-no">{oyuncu.no}</div>
              <div className="oyuncu-bilgi">
                <h3>{oyuncu.ad}</h3>
                <p>Yaş: {oyuncu.yas}</p>
                <p>Güç: {oyuncu.yetenek}</p>
                <p className="uyruk">{oyuncu.uyruk}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>Forvet</h2>
        <div className="oyuncu-listesi">
          {takim.forvet.map(oyuncu => (
            <div key={oyuncu.no} className="oyuncu-kart">
              <div className="forma-no">{oyuncu.no}</div>
              <div className="oyuncu-bilgi">
                <h3>{oyuncu.ad}</h3>
                <p>Yaş: {oyuncu.yas}</p>
                <p>Güç: {oyuncu.yetenek}</p>
                <p className="uyruk">{oyuncu.uyruk}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TakimDetay; 