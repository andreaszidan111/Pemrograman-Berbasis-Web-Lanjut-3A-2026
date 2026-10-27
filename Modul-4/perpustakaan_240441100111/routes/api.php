<?php

use App\Http\Controllers\Api\BukuController;
use Illuminate\Support\Facades\Route;

Route::apiResource('buku', BukuController::class)->names([
    'index' => 'api.buku.index',
    'store' => 'api.buku.store',
    'show' => 'api.buku.show',
    'update' => 'api.buku.update',
    'destroy' => 'api.buku.destroy',]);
Route::get('/rekap/buku-per-kategori', [BukuController::class, 'bukuPerKategori']);
Route::get('/rekap/peminjaman-per-buku', [BukuController::class, 'peminjamanPerBuku']);