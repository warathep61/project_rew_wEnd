<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('heroes', function (Blueprint $table) {
            $table->id();
            $table->string('name');  // ชื่อฮีโร่
            $table->string('type');  // ประเภทของฮีโร่ (เช่น tank, warrior, mage)
            $table->integer('health');  // ค่าพลังชีวิต (HP)
            $table->integer('mana');  // มานา
            $table->integer('attack_damage');  // ค่าพลังโจมตี (AD)
            $table->integer('ability_power');  // ค่าพลังเวทย์ (AP)
            $table->integer('defense');  // ค่าป้องกัน (Defense)
            $table->integer('speed');  // คความเร็วเคลื่อนที่
            $table->string('main_img'); // รูปหลัก
            $table->string('img1'); // รูปลอง1
            $table->string('img2'); // รูปลอง2
            $table->string('img3'); // รูปลอง3
            $table->string('img4'); // รูปลอง4
            $table->string('img5'); // รูปลอง5
            $table->string('img6'); // รูปลอง6
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('heroes');
    }
};
