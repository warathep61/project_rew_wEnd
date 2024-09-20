<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hero extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'health',
        'mana',
        'attack_damage',
        'ability_power',
        'defense',
        'speed',
        'main_img',
        'img1',
        'img2',
        'img3',
        'img4',
        'img5',
        'img6'
    ];
}
