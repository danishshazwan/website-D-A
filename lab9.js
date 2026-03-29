const tax_rate = 0.10;
const shipping_threshold = 1000;

var subtotal = 0;

/* Functions */
function calculateTotal(q, p) { return q * p; }
function calculateTax(s, r) { return s * r; }
function calculateShipping(s, t) { return (s > t) ? 0 : 40; }
function calculateGrandTotal(s, t, sh) { return s + t + sh; }

function outputCurrency(num) {
    document.write("$" + num.toFixed(2));
}

// Output baris produk, dengan button + / - di kolum jumlah (#)
function outputCartRow(file, title, quantity, price, total, index) {
    document.write('<tr>');

    // Gambar produk
    document.write('<td><img src="' + file + '" width="80" style="border:1px solid #ddd;"></td>');

    // Nama produk (colspan=1)
    document.write('<td>' + title + '</td>');

    // Kolum # (quantity + button + -)
    document.write('<td class="center">');
    document.write('<button onclick="decrease(' + index + ')">-</button> ');
    document.write('<span id="qty-' + index + '">' + quantity + '</span> ');
    document.write('<button onclick="increase(' + index + ')">+</button>');
    document.write('</td>');

    // Harga satuan
    document.write('<td class="right">$' + price.toFixed(2) + '</td>');

    // Jumlah harga item = qty × price (updated live)
    document.write('<td class="right" id="total-' + index + '">$' + total.toFixed(2) + '</td>');

    document.write('</tr>');
}

/* Loop data */
subtotal = 0;
for (var i = 0; i < filenames.length; i++) {
    let total = calculateTotal(quantities[i], prices[i]);
    subtotal += total;
    outputCartRow(filenames[i], titles[i], quantities[i], prices[i], total, i);
}

var tax = calculateTax(subtotal, tax_rate);
var shipping = calculateShipping(subtotal, shipping_threshold);
var grand = calculateGrandTotal(subtotal, tax, shipping);


// Fungsi tambah kuantiti
function increase(i) {
    quantities[i]++;
    updateRow(i);
}

// Fungsi kurang kuantiti (tak kurang dari 0)
function decrease(i) {
    if (quantities[i] > 0) {
        quantities[i]--;
        updateRow(i);
    }
}

// Update baris dan total
function updateRow(i) {
    let newTotal = quantities[i] * prices[i];

    // Update quantity di kolum #
    document.getElementById("qty-" + i).innerText = quantities[i];

    // Update jumlah harga di kolum Amount
    document.getElementById("total-" + i).innerText = "$" + newTotal.toFixed(2);

    // Kira subtotal baru
    subtotal = 0;
    for (let j = 0; j < quantities.length; j++) {
        subtotal += quantities[j] * prices[j];
    }

    tax = calculateTax(subtotal, tax_rate);

    // Shipping tetap 40 kalau subtotal 0 juga (ikut logic asal)
    shipping = calculateShipping(subtotal, shipping_threshold);

    // Kalau subtotal 0, grand total 0 juga (bukan shipping + 0)
    if (subtotal === 0) {
        grand = 0;
        shipping = 0; // shipping pun 0 kalau takde barang
    } else {
        grand = calculateGrandTotal(subtotal, tax, shipping);
    }

    // Update display total bawah
    let totals = document.querySelectorAll("tr.totals td:last-child");
    totals[0].innerText = "$" + subtotal.toFixed(2);
    totals[1].innerText = "$" + tax.toFixed(2);
    totals[2].innerText = "$" + shipping.toFixed(2);
    totals[3].innerText = "$" + grand.toFixed(2);
}