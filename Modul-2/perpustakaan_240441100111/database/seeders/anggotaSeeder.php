<?php

namespace Database\Seeders;

use App\Models\anggota;
use Illuminate\Database\Seeder;

class anggotaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        anggota::factory(5)->create();
    }
}
