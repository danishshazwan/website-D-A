let data = {};
let hasil = 0;
let troli = document.querySelector("#troli");

function tambahData(dapatkanBarang) {
    let nama = dapatkanBarang.nama;

    if (nama in data) {
        data[nama].jumlah++;
    } 
    else {
        data[nama] = {
            harga: dapatkanBarang.harga,
            jumlah: 1
        };
    }
    kiraHasil();
    renderTroli();
}

function kiraHasil() {
    hasil = 0;
    for (let key in data) {
        hasil += data[key].harga * data[key].jumlah;
    }
    document.querySelector(".bold").innerText = "RM " + hasil.toFixed(2);
}

function renderTroli() {
    kosongkanElemen(troli);

    for (let key in data) {
        // Container Utama ikut CSS kau
        let div_container = document.createElement("div");
        div_container.classList.add("kandungan-kedua");

        // Teks Kiri
        let div_teks = document.createElement("div");
        div_teks.style.textAlign = "left"; // Bagi teks rapat kiri
        div_teks.innerHTML = `${key} (${data[key].jumlah}x)`;

        // Container Butang Kanan
        let div_kanan = document.createElement("div");
        
        let butang = document.createElement("button");
        butang.classList.add("buang");
        butang.onclick = function() { buangData(key); };

        let i = document.createElement("i");
        i.classList.add("fas", "fa-trash");

        butang.appendChild(i);
        let span = document.createElement("span");
        span.innerText = " Buang";
        butang.appendChild(span);

        div_kanan.appendChild(butang);

        // Masukkan dalam Grid
        div_container.appendChild(div_teks);
        div_container.appendChild(div_kanan);
        
        troli.appendChild(div_container);
    }
}

function buangData(namaBarang) {
    if (data[namaBarang].jumlah > 1) {
        data[namaBarang].jumlah--;
    } else {
        delete data[namaBarang];
    }
    kiraHasil();
    renderTroli();
}

function kosongkanElemen(elemen) {
    while (elemen.firstChild) {
        elemen.removeChild(elemen.firstChild);
    }
}