<?php

namespace Database\Seeders;

use App\Models\Package;
use Illuminate\Database\Seeder;

class PackageSeeder extends Seeder
{
    public function run()
    {
        $packages = [
            [
                'title' => 'Mystical Bali Adventure',
                'destination' => 'Bali, Indonesia',
                'duration' => 7,
                'budget' => 1299,
                'type' => 'Honeymoon',
                'description' => 'Embark on a mystical journey through the Island of the Gods. This comprehensive package combines the spiritual heart of Ubud with the breathtaking coastlines of Seminyak. Witness traditional fire dances, explore sacred monkey forests, swing over endless rice terraces, and relax in luxurious private pool villas. Our expert local guides will ensure you experience both the popular attractions and hidden gems of Balinese culture.',
                'image' => 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            ],
            [
                'title' => 'Alpine Ski Explorer',
                'destination' => 'Swiss Alps, Switzerland',
                'duration' => 5,
                'budget' => 2450,
                'type' => 'Adventure',
                'description' => 'Experience the ultimate winter wonderland in the majestic Swiss Alps. This premium ski package offers access to world-class slopes, luxury chalet accommodation, and breathtaking panoramic views of the Matterhorn. Whether you\'re a beginner or an expert, our package includes ski passes, premium gear rental, and access to exclusive après-ski lounges.',
                'image' => 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            ],
            [
                'title' => 'Dubai Luxury Escape',
                'destination' => 'Dubai, UAE',
                'duration' => 4,
                'budget' => 1850,
                'type' => 'Luxury',
                'description' => 'Discover the city where the future meets tradition. Stay in a 5-star hotel, shop at the world\'s largest mall, and dine in the sky. This package includes a premium VIP desert safari, tickets to the top of the Burj Khalifa, and a luxury yacht cruise around the Palm Jumeirah.',
                'image' => 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            ],
            [
                'title' => 'Backpacking Southeast Asia',
                'destination' => 'Vietnam & Thailand',
                'duration' => 14,
                'budget' => 899,
                'type' => 'Solo',
                'description' => 'Designed for the independent traveler, this extensive package takes you through the vibrant streets of Bangkok to the serene waters of Ha Long Bay. Meet like-minded travelers, enjoy authentic street food, and explore ancient ruins. Includes hostel/budget hotel accommodations, inter-city transport, and guided group activities.',
                'image' => 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            ],
            [
                'title' => 'Classic Golden Triangle',
                'destination' => 'Delhi, Agra, Jaipur (India)',
                'duration' => 6,
                'budget' => 650,
                'type' => 'Family',
                'description' => 'A perfect family introduction to India. Travel comfortably between Delhi, Agra, and Jaipur in a private AC vehicle. Marvel at the Taj Mahal at sunrise, explore the majestic Amber Fort on an elephant, and wander through the bustling bazaars of Old Delhi.',
                'image' => 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            ],
        ];

        foreach ($packages as $package) {
            Package::firstOrCreate(
                ['title' => $package['title']],
                $package
            );
        }
    }
}
