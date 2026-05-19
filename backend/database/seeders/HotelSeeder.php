<?php

namespace Database\Seeders;

use App\Models\Hotel;
use Illuminate\Database\Seeder;

class HotelSeeder extends Seeder
{
    public function run()
    {
        $hotels = [
            [
                'name' => 'Grand Azure Resort & Spa',
                'location' => 'Malé, Maldives',
                'rating' => 4.9,
                'image' => 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            ],
            [
                'name' => 'The Himalayan Retreat',
                'location' => 'Manali, India',
                'rating' => 4.5,
                'image' => 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            ],
            [
                'name' => 'Urban Boutique Hotel',
                'location' => 'Paris, France',
                'rating' => 4.7,
                'image' => 'https://images.unsplash.com/photo-1551882547-ff40c0d5e9af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            ],
            [
                'name' => 'Sunset Beach Villa',
                'location' => 'Bali, Indonesia',
                'rating' => 4.8,
                'image' => 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            ],
            [
                'name' => 'Backpacker\'s Haven',
                'location' => 'Bangkok, Thailand',
                'rating' => 4.1,
                'image' => 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            ],
            [
                'name' => 'Alpine Ski Lodge',
                'location' => 'Zermatt, Switzerland',
                'rating' => 4.9,
                'image' => 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            ],
            [
                'name' => 'Desert Oasis Camp',
                'location' => 'Dubai, UAE',
                'rating' => 4.6,
                'image' => 'https://images.unsplash.com/photo-1542314831-c6a4d14d8373?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            ],
            [
                'name' => 'Metropolis Central',
                'location' => 'New York, USA',
                'rating' => 4.4,
                'image' => 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            ],
            [
                'name' => 'Cozy Countryside Inn',
                'location' => 'Tuscany, Italy',
                'rating' => 4.7,
                'image' => 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            ],
            [
                'name' => 'Oceanview Paradise',
                'location' => 'Santorini, Greece',
                'rating' => 4.8,
                'image' => 'https://images.unsplash.com/photo-1570213489059-0aac6626cade?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            ],
        ];

        foreach ($hotels as $hotel) {
            Hotel::firstOrCreate(
                ['name' => $hotel['name']],
                $hotel
            );
        }
    }
}
