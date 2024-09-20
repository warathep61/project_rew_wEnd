<?php

namespace App\Http\Controllers;

use App\Models\Hero;
use Illuminate\Http\Request;

class HeroController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hero = Hero::all();
        return response()->json($hero);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // ตรวจสอบข้อมูลที่รับเข้ามา
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string',
            'health' => 'required|integer',
            'mana' => 'required|integer',
            'attack_damage' => 'required|integer',
            'ability_power' => 'required|integer',
            'defense' => 'required|integer',
            'speed' => 'required|integer',
            'main_img' => 'required|string',
            'img1' => 'required|string',
            'img2' => 'required|string',
            'img3' => 'required|string',
            'img4' => 'required|string',
            'img5' => 'required|string',
            'img6' => 'required|string',
        ]);
    
        // บันทึกข้อมูลลงในฐานข้อมูล
        $hero = new Hero;
        $hero->name = $validatedData['name'];
        $hero->type = $validatedData['type'];
        $hero->health = $validatedData['health'];
        $hero->mana = $validatedData['mana'];
        $hero->attack_damage = $validatedData['attack_damage'];
        $hero->ability_power = $validatedData['ability_power'];
        $hero->defense = $validatedData['defense'];
        $hero->speed = $validatedData['speed'];
        $hero->main_img = $validatedData['main_img'];
        $hero->img1 = $validatedData['img1'];
        $hero->img2 = $validatedData['img2'];
        $hero->img3 = $validatedData['img3'];
        $hero->img4 = $validatedData['img4'];
        $hero->img5 = $validatedData['img5'];
        $hero->img6 = $validatedData['img6'];
    
        // บันทึกข้อมูล
        $hero->save();
    
        // ส่งกลับไปยังหน้าที่ต้องการ
        return response()->json(["message" => "successfully"]);
    }
    

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $hero = Hero::find($id);
        return response()->json($hero);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // ตรวจสอบข้อมูลที่รับเข้ามา
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string',
            'health' => 'required|integer',
            'mana' => 'required|integer',
            'attack_damage' => 'required|integer',
            'ability_power' => 'required|integer',
            'defense' => 'required|integer',
            'speed' => 'required|integer',
            'main_img' => 'required|string',
            'img1' => 'required|string',
            'img2' => 'required|string',
            'img3' => 'required|string',
            'img4' => 'required|string',
            'img5' => 'required|string',
            'img6' => 'required|string',
        ]);
    
        // ค้นหา Hero ที่จะอัปเดต
        $hero = Hero::findOrFail($id); // หาฮีโร่จาก ID, ถ้าไม่เจอจะเกิด error
    
        // อัปเดตข้อมูล
        $hero->update($validatedData);
    
        // ส่งกลับไปยังหน้าที่ต้องการ พร้อมข้อความสำเร็จ
        return response()->json(["message" => "Update successfully"]);
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // ค้นหา Hero ด้วย ID
        $hero = Hero::find($id);
    
        // ตรวจสอบว่าพบข้อมูลหรือไม่
        if ($hero) {
            $hero->delete();
            return response()->json(["message" => "delete successfully"]);
        } else {
            return response()->json(["message" => "Hero not found"], 404); // ส่ง 404 ถ้าไม่พบ
        }
    }
    

}
