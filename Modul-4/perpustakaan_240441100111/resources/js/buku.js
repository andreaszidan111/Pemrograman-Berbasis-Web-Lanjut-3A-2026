// nomer 1
async function ambilDataBuku() {
    try {
        const response = await fetch('/api/buku');

        if (!response.ok) {
            throw new Error('Gagal mengambil data buku.');
        }

        const hasil = await response.json();

        tampilkanBuku(hasil.data);
    } catch (error) {
        console.error(error);

        document.getElementById('tabel-buku').innerHTML = `
            <tr>
                <td colspan="5" class="px-6 py-6 text-center text-red-600">
                    ${error.message}
                </td>
            </tr>
        `;
    }
}

function tampilkanBuku(daftarBuku) {
    const tabel = document.getElementById('tabel-buku');

    tabel.innerHTML = '';

    if (daftarBuku.length === 0) {
        tabel.innerHTML = `
            <tr>
                <td colspan="5" class="px-6 py-6 text-center text-stone-500">
                    Belum ada data buku.
                </td>
            </tr>
        `;
        return;
    }

    daftarBuku.forEach((buku, index) => {
        tabel.innerHTML += `
            <tr class="hover:bg-stone-50">
                <td class="px-6 py-4">${index + 1}</td>
                <td class="px-6 py-4">${buku.kategori ?? '-'}</td>
                <td class="px-6 py-4 font-semibold text-stone-800">
                    ${buku.judul}
                </td>
                <td class="px-6 py-4">${buku.penulis}</td>
                <td class="px-6 py-4">${buku.tahun}</td>
                <td class="px-6 py-4">
                    <button
                        data-id="${buku.id}"
                        class="tombol-edit text-blue-600 hover:text-blue-800"
                    >
                        Edit <span class="font-semibold text-gray-500">|</span>
                    </button>

                    <button
                        data-id="${buku.id}"
                        class="tombol-hapus text-red-600 hover:text-red-800"
                    >
                        Hapus
                    </button>
                </td>
            </tr>
        `;
    });

    document.querySelectorAll('.tombol-edit').forEach((tombol) => {
        tombol.addEventListener('click', () => {
            editBuku(tombol.dataset.id);
        });
    });

    document.querySelectorAll('.tombol-hapus').forEach((tombol) => {
        tombol.addEventListener('click', () => {
            hapusBuku(tombol.dataset.id);
        });
    });
}


// nomer 3
async function editBuku(id) {
    try {
        const response = await fetch(`/api/buku/${id}`);

        if (!response.ok) {
            throw new Error('Gagal mengambil data buku.');
        }

        const hasil = await response.json();

        const buku = hasil.data;

        document.getElementById('kategori_id').value = buku.kategori_id ?? '';
        document.getElementById('judul').value = buku.judul;
        document.getElementById('penulis').value = buku.penulis;
        document.getElementById('tahun_terbit').value = buku.tahun;

        document.getElementById('form-buku').dataset.id = buku.id;

        document.getElementById('judul-form').textContent = 'Edit Buku';
        document.getElementById('tombol-submit').textContent = 'Simpan Perubahan';

    } catch (error) {
        console.error(error);

        document.getElementById('pesan-buku').innerHTML = `
            <p class="text-red-600">
                ${error.message}
            </p>
        `;
    }
}

// nomer 4
async function hapusBuku(id) {
    const konfirmasi = confirm(
        'Apakah kamu yakin ingin menghapus buku ini?'
    );

    if (!konfirmasi) {
        return;
    }

    try {
        const response = await fetch(`/api/buku/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            }
        });

        const hasil = await response.json();

        if (!response.ok) {
            throw new Error(
                hasil.message || 'Gagal menghapus buku.'
            );
        }

        document.getElementById('pesan-buku').innerHTML = `
            <p class="text-green-600">
                ${hasil.message}
            </p>
        `;

        await ambilDataBuku();

    } catch (error) {
        console.error(error);

        document.getElementById('pesan-buku').innerHTML = `
            <p class="text-red-600">
                ${error.message}
            </p>
        `;
    }
}

// nomor 2 dan 3
async function simpanBuku(event) {
    event.preventDefault();

    const form = event.target;

    const id = form.dataset.id;

    const data = {
        kategori_id: form.kategori_id.value,
        judul: form.judul.value,
        penulis: form.penulis.value,
        tahun_terbit: form.tahun_terbit.value
    };

    const method = id ? 'PUT' : 'POST';

    const url = id
        ? `/api/buku/${id}`
        : '/api/buku';

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const hasil = await response.json();

        if (!response.ok) {
            throw new Error(
                hasil.message || 'Gagal menyimpan buku.'
            );
        }

        document.getElementById('pesan-buku').innerHTML = `
            <p class="text-green-600">
                ${hasil.message}
            </p>
        `;

        form.reset();

        delete form.dataset.id;

        document.getElementById('judul-form').textContent =
            'Tambah Buku';

        document.getElementById('tombol-submit').textContent =
            'Tambah Buku';

        await ambilDataBuku();

    } catch (error) {
        console.error(error);

        document.getElementById('pesan-buku').innerHTML = `
            <p class="text-red-600">
                ${error.message}
            </p>
        `;
    }
}

document
    .getElementById('form-buku')
    .addEventListener('submit', simpanBuku);

ambilDataBuku();