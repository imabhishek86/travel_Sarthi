<?php

namespace Database\Seeders;

use App\Models\Room;
use App\Models\Hotel;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    public function run()
    {
        $roomTypes = [
            ['type' => 'Deluxe Room', 'price' => 150],
            ['type' => 'Suite', 'price' => 250],
            ['type' => 'Penthouse', 'price' => 500],
            ['type' => 'Standard Room', 'price' => 80],
            ['type' => 'Family Room', 'price' => 300],
        ];

        $hotels = Hotel::all();

        foreach ($hotels as $hotel) {
            foreach ($roomTypes as $roomType) {
                Room::firstOrCreate(
                    [
                        'hotel_id' => $hotel->id,
                        'type' => $roomType['type'],
                    ],
                    [
                        'price' => $roomType['price'],
                        'availability' => true,
                    ]
                );
            }
        }
    }
}
