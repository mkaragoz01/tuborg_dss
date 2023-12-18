const get_personel = "http://localhost:3000/api/get_personel";

fetch(get_personel)
  .then((response) => response.json())
  .then((data) => {
    // Veriyi işleyin ve HTML içine ekleyin
    const dataContainer1 = document.getElementById("blok1");

    // Veri içindeki 'message' dizisinin uzunluğunu alın
    if (data && data.message && Array.isArray(data.message)) {
      const messageArrayLength1 = data.message.length;
      dataContainer1.innerHTML = `${messageArrayLength1}`;
    } else {
      dataContainer1.innerHTML = "Hatalı veri formatı";
    }
  })
  .catch((error) => {
    console.error("Veri çekme hatası:", error);
    container.innerHTML = "Veri çekme hatası";
  });

const get_odalar = "http://localhost:3000/api/get_odalar";

fetch(get_odalar)
  .then((response) => response.json())
  .then((data) => {
    // Veriyi işleyin ve HTML içine ekleyin
    const dataContainer2 = document.getElementById("blok2");

    // Veri içindeki 'message' dizisinin uzunluğunu alın
    if (data && data.message && Array.isArray(data.message)) {
      const messageArrayLength2 = data.message.length;
      dataContainer2.innerHTML = `${messageArrayLength2}`;
    } else {
      dataContainer2.innerHTML = "Hatalı veri formatı";
    }
  })
  .catch((error) => {
    console.error("Veri çekme hatası:", error);
    container.innerHTML = "Veri çekme hatası";
  });

const getTemizlik = "http://localhost:3000/api/get_temizlik";
fetch(getTemizlik)
  .then((response) => response.json())
  .then((data) => {
    const dataContainer3 = document.getElementById("blok3");

    // Veri içindeki 'message' dizisinin ilk öğesinin 'sorgu' özelliğini alın
    if (
      data &&
      data.message &&
      Array.isArray(data.message) &&
      data.message.length > 0
    ) {
      const sorguValue = data.message[0].sorgu;
      dataContainer3.innerHTML = `${sorguValue}%`;
    } else {
      dataContainer3.innerHTML = "Hatalı veri formatı veya veri bulunamadı";
    }
  })
  .catch((error) => {
    console.error("Veri çekme hatası:", error);
    dataContainer3.innerHTML = "Veri çekme hatası";
  });

const getKayit = "http://localhost:3000/api/get_kayit";
fetch(getKayit)
  .then((response) => response.json())
  .then((data) => {
    const dataContainer3 = document.getElementById("blok4");

    // Veri içindeki 'message' dizisinin ilk öğesinin 'sorgu' özelliğini alın
    if (
      data &&
      data.message &&
      Array.isArray(data.message) &&
      data.message.length > 0
    ) {
      const sorguValue = data.message[0].temizlik;
      dataContainer3.innerHTML = `${sorguValue}`;
    } else {
      dataContainer3.innerHTML = "Hatalı veri formatı veya veri bulunamadı";
    }
  })
  .catch((error) => {
    console.error("Veri çekme hatası:", error);
    dataContainer3.innerHTML = "Veri çekme hatası";
  });

document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3000/api/grafik1")
    .then((response) => response.json())
    .then((sonuc) => {
      var ctx = document.getElementById("myChart1").getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: sonuc,
      });
    })
    .catch((error) => console.error("Fetch Hatası:", error));
});

document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3000/api/grafik2")
    .then((response) => response.json())
    .then((sonuc) => {
      var ctx = document.getElementById("myChart2").getContext("2d");
      new Chart(ctx, {
        type: "polarArea",
        data: sonuc,
      });
    })
    .catch((error) => console.error("Fetch Hatası:", error));
});

document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3000/api/grafik3")
    .then((response) => response.json())
    .then((sonuc) => {
      var ctx = document.getElementById("myChart3").getContext("2d");
      new Chart(ctx, {
        type: "radar",
        data: sonuc,
      });
    })
    .catch((error) => console.error("Fetch Hatası:", error));
});

document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3000/api/grafik4")
    .then((response) => response.json())
    .then((sonuc) => {
      var ctx = document.getElementById("myChart4").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: sonuc,
      });
    })
    .catch((error) => console.error("Fetch Hatası:", error));
});

document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3000/api/grafik6")
    .then((response) => response.json())
    .then((sonuc) => {
      var ctx = document.getElementById("myChart6").getContext("2d");
      new Chart(ctx, {
        type: "pie",
        data: sonuc,
      });
    })
    .catch((error) => console.error("Fetch Hatası:", error));
});

document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3000/api/grafik5")
    .then((response) => response.json())
    .then((sonuc) => {
      var ctx = document.getElementById("myChart5").getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: sonuc,
      });
    })
    .catch((error) => console.error("Fetch Hatası:", error));
});

document.addEventListener("DOMContentLoaded", function () {
  // Cookie'den kullanıcı bilgisini çek
  const userCookie = document.cookie
    .split(";")
    .find((cookie) => cookie.trim().startsWith("user="));
  if (userCookie) {
    const userJson = userCookie.split("=")[1];
    const user = JSON.parse(decodeURIComponent(userJson));

    // Kullanıcı adını HTML'e ekle
    document.getElementById("kullaniciAdi").innerText +=
      user.ad + " " + user.soyad;
  } else {
    // Giriş yapılmamışsa mesajı göster
    document.getElementById("kullaniciAdi").innerText += "Giriş yapılmamış";
  }
});
