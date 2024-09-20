<?php

namespace Database\Seeders;

use App\Models\Hero;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HeroSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Hero::insert([
            [
                'name' => 'Zanis',
                'type' => 'Warrior',
                'health' => 3400,
                'mana' => 500,
                'attack_damage' => 160,
                'ability_power' => 0,
                'defense' => 100,
                'speed' => 380,
                'main_img' => 'zanis_main.png',
                'img1' => 'zanis_img1.png',
                'img2' => 'zanis_img2.png',
                'img3' => 'zanis_img3.png',
                'img4' => 'zanis_img4.png',
                'img5' => 'zanis_img5.png',
                'img6' => 'zanis_img6.png',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Lauriel',
                'type' => 'Mage',
                'health' => 2800,
                'mana' => 450,
                'attack_damage' => 120,
                'ability_power' => 300,
                'defense' => 80,
                'speed' => 350,
                'main_img' => 'lauriel_main.png',
                'img1' => 'lauriel_img1.png',
                'img2' => 'lauriel_img2.png',
                'img3' => 'lauriel_img3.png',
                'img4' => 'lauriel_img4.png',
                'img5' => 'lauriel_img5.png',
                'img6' => 'lauriel_img6.png',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Tel\'Annas',
                'type' => 'Marksman',
                'health' => 2500,
                'mana' => 400,
                'attack_damage' => 180,
                'ability_power' => 50,
                'defense' => 70,
                'speed' => 360,
                'main_img' => 'telannas_main.png',
                'img1' => 'telannas_img1.png',
                'img2' => 'telannas_img2.png',
                'img3' => 'telannas_img3.png',
                'img4' => 'telannas_img4.png',
                'img5' => 'telannas_img5.png',
                'img6' => 'telannas_img6.png',
                'created_at' => now(),
                'updated_at' => now()
            ]
            // สามารถเพิ่มข้อมูลฮีโร่เพิ่มเติมได้ที่นี่
        ]);
    }
}
