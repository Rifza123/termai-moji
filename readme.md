# 🧩 Termai Moji

**Termai Moji** adalah library ringan berbasis JavaScript untuk mengganti karakter emoji (seperti `👍`, `💯`, dll) menjadi elemen gambar `<img>` yang bisa dirender secara konsisten di semua platform.

Dirancang dengan fleksibilitas penuh: kamu dapat menggunakan preset emoji siap pakai seperti iOS, atau mendaftarkan emoji custom sendiri. Library ini sepenuhnya aman (tidak memodifikasi `innerHTML`) dan sangat mudah diintegrasikan ke dalam proyek web apa pun.

> Dibuat oleh [Rifza123](https://github.com/Rifza123) — ringan, fleksibel, dan lintas platform.

---

## ✨ Fitur

- 🖼️ Mengganti emoji teks menjadi gambar PNG/SVG.
- ⚙️ API sederhana: `.register()`, `.init()`, dan `.parse()`,.
- 🔐 Aman dari XSS (berbasis DOM Walker, bukan `innerHTML`).
- 🌐 Dukungan CDN siap pakai.
- 🎨 Preset emoji seperti `ios`, dengan rencana dukungan untuk set lain di masa depan.

---

## 📦 Instalasi

Tambahkan langsung ke dalam halaman HTML kamu via CDN:

```html
<script src="https://c.termai.cc/termai-moji.js"></script>
```

---

## 🚀 Contoh Penggunaan

```html
<p id="chat">Mantap 👍🔥</p>

<script>
  const emojis = TermaiMoji();
  emojis.init("https://c.termai.cc/emojis/ios/");

  // Ukuran default (1em)
  emojis.parse(document.getElementById("chat"));

  // Ukuran custom (24px)
  emojis.parse(document.getElementById("chat"), { width: "24px", height: "24px",display: "inline", verticalAlign: "middle", marginRight: "2px"  });

  // Ukuran besar menggunakan em
  emojis.parse(document.getElementById("chat"), { width: "2em", height: "2em",display: "inline", verticalAlign: "middle", marginRight: "2px"  });
</script>

```

---

## 📘 API

--- 
### `CDN Url`
Sudah mendukung emoji whatsapp dan ios

- `IOS` → https://c.termai.cc/emojis/ios/
- `WhatsApp` → https://c.termai.cc/emojis/whatsapp/

---

### `TermaiMoji()`

Membuat instance baru dari library emoji.

---

### `.register(emoji, { src })`

Mendaftarkan emoji manual.

- `emoji` → string emoji Unicode (contoh: `"💯"`)
- `src` → URL atau path gambar (PNG)

```js
emojis.register("👽", { src: "https://c.termai.cc/emojis/ios/alien.png" });
```

---

### `.init(basePath?)`

Mendaftarkan emoji secara massal 

- `basePath` → URL folder emoji (default: `emojis/ios/` jika tidak ditentukan)

```js
emojis.init("https://c.termai.cc/emojis/ios/");
```

---

### `.parse(element, { width: "45px", height: "45px",display: "inline", verticalAlign: "middle", marginRight: "2px" })`

Memindai teks dalam elemen DOM dan mengganti emoji dengan gambar.

```js
emojis.parse(document.querySelector("#chat"));
```

---


## 📄 Lisensi

Dilisensikan di bawah [MIT License](./LICENSE) — gratis digunakan, dimodifikasi, dan disebarluaskan, dengan mencantumkan atribusi yang sesuai.

---

## 🙏 Kredit

- 👨‍💻 Developer: [Rifza123](https://github.com/Rifza123)
