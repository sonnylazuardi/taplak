import React, { Component } from 'react';
import logo from './logo.svg';

class App extends Component {
  render() {
    return (
      <div>
       <div className="home">
          <section className="main">
             <div className="container">
                <div className="row">
                   <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12">
                      <div className="clear-100"></div>
                      <div className="clear-100 hidden-xs hidden-sm hidden-md"></div>
                      <h1>Taplak - Tap To Bukalapak</h1>
                      <p>
                         Cari dan telusuri barang semudah tap.<br />
                      </p>
                      <p>
                         <a href="https://play.google.com/store/apps/details?id=info.mejamakan.floatingview" className="get-early-access primary">
                         Download di Play Store
                         </a> &nbsp;
                         <a href="http://tekno.liputan6.com/read/2986500/bukalapak-development-competition-jaring-ratusan-aplikasi-lokal" className="get-early-access">
                         3 Besar BLDC
                         </a>
                         <br />
                      </p>
                      <div className="clear-50 hidden-lg"></div>
                      <div className="clear-100 hidden-xs hidden-sm hidden-md"></div>
                      <div className="clear-100 hidden-xs hidden-sm hidden-md"></div>
                      <a href="https://www.youtube.com/watch?v=JVBSWPkgd8Q&t=1s" className="hidden-lg">
                      <img className="hero-screenshot-sm hidden-lg" src="/img/screenshots/mac-phone.png?v2" />
                      </a>
                   </div>
                   <a className="hero-screenshot hidden-xs hidden-sm hidden-md" href="https://www.youtube.com/watch?v=JVBSWPkgd8Q&t=1s"></a>
                </div>
             </div>
          </section>
          <section className="home-features">
             <div className="container">
                <div className="row features-square">
                   <div className="col-xs-12 col-sm-6 block block-img">
                      <img src="/img/screenshots/copy.png?v2" />
                   </div>
                   <div id="tracking" className="col-xs-12 col-sm-6 block block-text">
                      <div className="content">
                         <p>
                            <b>
                            TANPA PINDAH APP
                            </b>
                         </p>
                         <h3>
                            Tinggal Tap
                         </h3>
                         <p>
                            Sedang asik ngechat dengan teman, terus menemukan barang menarik? Tinggal salin kalimat deskripsi barang, TAPLAK akan otomatis carikan langsung barangnya di Bukalapak, tanpa harus pindah aplikasi!
                         </p>
                      </div>
                   </div>
                   <div className="col-xs-12 col-sm-6 hidden-lg hidden-md hidden-sm block block-img">
                      <img src="/img/screenshots/apiai.png" />
                   </div>
                   <div id="campaigns" className="col-xs-12 col-sm-6 block block-text">
                      <div className="content">
                         <p>
                            <b>
                            ARTIFICIAL INTELLIGENCE
                            </b>
                         </p>
                         <h3>
                            Asisten Pintar didukung AI
                         </h3>
                         <p>
                           Tidak usah khawatir setiap kali menyalin kata akan membuka TAPLAK, karena dengan bantuan AI, kita dapat memprediksi mana kalimat-kalimat yang tepat. Mengindentifikasi kata-kata yang menunjukan barang dan harga yang dapat di beli di bukalapak.
                         </p>
                      </div>
                   </div>
                   <div className="col-xs-12 col-sm-6 hidden-xs block block-img">
                      <img src="/img/screenshots/apiai.png" />
                   </div>
                   <div className="col-xs-12 col-sm-6 block block-img">
                      <img src="/img/screenshots/widget.png" />
                   </div>
                   <div className="col-xs-12 col-sm-6 block block-text">
                      <div className="content">
                         <p>
                            <b>
                            OFFLINE SUPPORT
                            </b>
                         </p>
                         <h3>
                            Koneksi Terputus
                         </h3>
                         <p>
                           Lagi asik belanja, tapi internet tiba-tiba putus? Tidak usah bingung, tetap browsing barang-barang yang sudah terbuka, dan masukkan barang ke favorit. Sudah mendapatkan koneksi kembali? Lanjutkan belanja, lalu checkout dengan tenang!
                         </p>
                      </div>
                   </div>
                   <div className="col-xs-12 col-sm-6 hidden-lg hidden-md hidden-sm block block-img">
                      <img src="/img/screenshots/widget.png" />
                   </div>
                </div>
             </div>
          </section>
       </div>
    </div>
    );
  }
}

export default App;
