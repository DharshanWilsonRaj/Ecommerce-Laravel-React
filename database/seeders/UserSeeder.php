<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         \App\Models\User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@gamil.com',
            'password' => '123456',
            'role_id' => 1,
        ]);
    }
}
