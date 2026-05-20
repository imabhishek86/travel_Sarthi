<?php

namespace Database\Seeders;

use App\Models\Destination;
use Illuminate\Database\Seeder;

class DestinationSeeder extends Seeder
{
    public function run(): void
    {
        $destinations = [
            [
                'name' => 'Goa',
                'state' => 'Goa',
                'category' => 'Beach',
                'description' => 'Sun-soaked beaches, vibrant nightlife, and Portuguese heritage make Goa India\'s favourite coastal paradise.',
                'image' => 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80',
                'rating' => 4.8,
                'best_time' => 'Nov - Feb',
                'attractions' => [
                    ['name' => 'Basilica of Bom Jesus', 'type' => 'Heritage', 'distance' => '12 km', 'rating' => 4.7, 'img' => 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=300&q=80'],
                    ['name' => 'Dudhsagar Falls', 'type' => 'Nature', 'distance' => '60 km', 'rating' => 4.8, 'img' => 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=300&q=80'],
                    ['name' => 'Fort Aguada', 'type' => 'Heritage', 'distance' => '18 km', 'rating' => 4.5, 'img' => 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=300&q=80'],
                    ['name' => 'Anjuna Flea Market', 'type' => 'Shopping', 'distance' => '22 km', 'rating' => 4.3, 'img' => 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=300&q=80'],
                ],
                'latitude' => 15.2993,
                'longitude' => 74.1240,
            ],
            [
                'name' => 'Jaipur',
                'state' => 'Rajasthan',
                'category' => 'Heritage',
                'description' => 'The Pink City dazzles with majestic forts, opulent palaces, and a rich tapestry of Rajasthani culture.',
                'image' => 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80',
                'rating' => 4.7,
                'best_time' => 'Oct - Mar',
                'attractions' => [
                    ['name' => 'Amber Fort', 'type' => 'Heritage', 'distance' => '11 km', 'rating' => 4.9, 'img' => 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=300&q=80'],
                    ['name' => 'Hawa Mahal', 'type' => 'Heritage', 'distance' => '5 km', 'rating' => 4.7, 'img' => 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=300&q=80'],
                    ['name' => 'Nahargarh Fort', 'type' => 'Viewpoint', 'distance' => '15 km', 'rating' => 4.6, 'img' => 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=300&q=80'],
                    ['name' => 'Jantar Mantar', 'type' => 'Science', 'distance' => '4 km', 'rating' => 4.4, 'img' => 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=300&q=80'],
                ],
                'latitude' => 26.9124,
                'longitude' => 75.7873,
            ],
            [
                'name' => 'Manali',
                'state' => 'Himachal Pradesh',
                'category' => 'Mountain',
                'description' => 'Snow-capped peaks, adventure sports, and serene valleys make Manali a year-round mountain escape.',
                'image' => 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80',
                'rating' => 4.6,
                'best_time' => 'Mar - Jun',
                'attractions' => [
                    ['name' => 'Rohtang Pass', 'type' => 'Nature', 'distance' => '51 km', 'rating' => 4.8, 'img' => 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=300&q=80'],
                    ['name' => 'Solang Valley', 'type' => 'Adventure', 'distance' => '13 km', 'rating' => 4.7, 'img' => 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=300&q=80'],
                    ['name' => 'Old Manali', 'type' => 'Culture', 'distance' => '3 km', 'rating' => 4.5, 'img' => 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=300&q=80'],
                    ['name' => 'Hadimba Temple', 'type' => 'Heritage', 'distance' => '2 km', 'rating' => 4.6, 'img' => 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=300&q=80'],
                ],
                'latitude' => 32.2396,
                'longitude' => 77.1887,
            ],
            [
                'name' => 'Kerala',
                'state' => 'Kerala',
                'category' => 'Nature',
                'description' => 'Backwaters, spice gardens, and Ayurvedic wellness — God\'s Own Country offers tranquility like nowhere else.',
                'image' => 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80',
                'rating' => 4.9,
                'best_time' => 'Sep - Mar',
                'attractions' => [
                    ['name' => 'Alleppey Backwaters', 'type' => 'Nature', 'distance' => '10 km', 'rating' => 4.9, 'img' => 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300&q=80'],
                    ['name' => 'Munnar Tea Gardens', 'type' => 'Nature', 'distance' => '110 km', 'rating' => 4.8, 'img' => 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300&q=80'],
                    ['name' => 'Fort Kochi', 'type' => 'Heritage', 'distance' => '45 km', 'rating' => 4.5, 'img' => 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300&q=80'],
                    ['name' => 'Periyar Wildlife Sanctuary', 'type' => 'Wildlife', 'distance' => '150 km', 'rating' => 4.7, 'img' => 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300&q=80'],
                ],
                'latitude' => 10.8505,
                'longitude' => 76.2711,
            ],
            [
                'name' => 'Udaipur',
                'state' => 'Rajasthan',
                'category' => 'Heritage',
                'description' => 'The City of Lakes enchants with floating palaces, romantic sunsets, and regal Mewar heritage.',
                'image' => 'https://images.unsplash.com/photo-1524309491343-901ac7512f48?w=600&q=80',
                'rating' => 4.8,
                'best_time' => 'Oct - Mar',
                'attractions' => [
                    ['name' => 'City Palace', 'type' => 'Heritage', 'distance' => '2 km', 'rating' => 4.8, 'img' => 'https://images.unsplash.com/photo-1524309491343-901ac7512f48?w=300&q=80'],
                    ['name' => 'Lake Pichola', 'type' => 'Nature', 'distance' => '1 km', 'rating' => 4.9, 'img' => 'https://images.unsplash.com/photo-1524309491343-901ac7512f48?w=300&q=80'],
                    ['name' => 'Sajjangarh Palace', 'type' => 'Viewpoint', 'distance' => '8 km', 'rating' => 4.5, 'img' => 'https://images.unsplash.com/photo-1524309491343-901ac7512f48?w=300&q=80'],
                    ['name' => 'Saheliyon ki Bari', 'type' => 'Garden', 'distance' => '4 km', 'rating' => 4.3, 'img' => 'https://images.unsplash.com/photo-1524309491343-901ac7512f48?w=300&q=80'],
                ],
                'latitude' => 24.5854,
                'longitude' => 73.7125,
            ],
            [
                'name' => 'Rishikesh',
                'state' => 'Uttarakhand',
                'category' => 'Adventure',
                'description' => 'The Yoga Capital of the World blends adrenaline-pumping rapids with spiritual tranquility on the Ganges.',
                'image' => 'https://images.unsplash.com/photo-1600240644455-3edc55c375fe?w=600&q=80',
                'rating' => 4.5,
                'best_time' => 'Sep - Nov',
                'attractions' => [
                    ['name' => 'Laxman Jhula', 'type' => 'Heritage', 'distance' => '5 km', 'rating' => 4.6, 'img' => 'https://images.unsplash.com/photo-1600240644455-3edc55c375fe?w=300&q=80'],
                    ['name' => 'River Rafting', 'type' => 'Adventure', 'distance' => '16 km', 'rating' => 4.8, 'img' => 'https://images.unsplash.com/photo-1600240644455-3edc55c375fe?w=300&q=80'],
                    ['name' => 'Beatles Ashram', 'type' => 'Culture', 'distance' => '3 km', 'rating' => 4.4, 'img' => 'https://images.unsplash.com/photo-1600240644455-3edc55c375fe?w=300&q=80'],
                    ['name' => 'Triveni Ghat', 'type' => 'Spiritual', 'distance' => '2 km', 'rating' => 4.7, 'img' => 'https://images.unsplash.com/photo-1600240644455-3edc55c375fe?w=300&q=80'],
                ],
                'latitude' => 30.0869,
                'longitude' => 78.2676,
            ],
        ];

        foreach ($destinations as $dest) {
            Destination::firstOrCreate(
                ['name' => $dest['name']],
                $dest
            );
        }
    }
}
