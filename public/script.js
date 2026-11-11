(function () {
  var NOMOR = '6283153211118'; // nomor WA admin, format internasional tanpa +
  var $ = function (id) { return document.getElementById(id); };
  $('y').textContent = new Date().getFullYear();

  // Toggle syarat: punya NPWP atau tidak
  var tabs = document.querySelectorAll('.seg button');
  tabs.forEach(function (b) {
    b.addEventListener('click', function () {
      tabs.forEach(function (t) { t.setAttribute('aria-selected', t === b); });
      $('jam-ya').hidden = b.dataset.k !== 'ya';
      $('jam-tidak').hidden = b.dataset.k !== 'tidak';
    });
  });

  // Lightbox galeri
  var lb = $('lb'), lbImg = lb.querySelector('img');
  document.querySelectorAll('.shot').forEach(function (s) {
    s.addEventListener('click', function () {
      var img = s.querySelector('img');
      if (!img) return;
      lbImg.src = img.src; lbImg.alt = img.alt; lb.showModal();
    });
  });
  lb.addEventListener('click', function () { lb.close(); });

  // Form booking -> WhatsApp
  var mulai = $('mulai'), selesai = $('selesai'), msg = $('msg');
  var today = new Date().toISOString().slice(0, 10);
  mulai.min = today; selesai.min = today;
  function fmt(d) {
    return new Date(d + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  }
  function hari() {
    if (!mulai.value || !selesai.value) return 0;
    return Math.round((new Date(selesai.value) - new Date(mulai.value)) / 86400000) + 1;
  }
  function update() {
    if (mulai.value) selesai.min = mulai.value;
    var n = hari();
    msg.textContent = n > 0 ? 'Lama sewa: ' + n + ' hari' : '';
  }
  mulai.addEventListener('change', update);
  selesai.addEventListener('change', update);
  $('f').addEventListener('submit', function (e) {
    e.preventDefault();
    if (!mulai.value || !selesai.value) { msg.textContent = 'Isi tanggal mulai dan tanggal kembali dulu.'; return; }
    if (hari() < 1) { msg.textContent = 'Tanggal kembali tidak boleh sebelum tanggal mulai.'; return; }
    var nama = $('nama').value.trim();
    var teks = 'Halo admin JONG RENT MOTOR, saya' + (nama ? ' ' + nama : '') +
      ' mau booking ZX25R tanggal ' + fmt(mulai.value) + ' sampai ' + fmt(selesai.value) +
      ' (' + hari() + ' hari). Apakah unitnya tersedia?';
    window.open('https://wa.me/' + NOMOR + '?text=' + encodeURIComponent(teks), '_blank', 'noopener');
  });
})();
