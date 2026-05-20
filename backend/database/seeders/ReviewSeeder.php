<?php

namespace Database\Seeders;

use App\Models\Review;
use App\Models\User;
use App\Models\Package;
use App\Models\Booking;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ReviewSeeder extends Seeder
{
    public function run()
    {
        $reviews = [
            'Absolutely incredible experience! The package was perfectly planned and executed.',
            'Outstanding service and amazing destinations. Highly recommend!',
            'Great value for money. Will definitely book again!',
            'The itinerary was well-structured and the guides were knowledgeable.',
            'Best vacation ever! Everything was perfect from start to finish.',
            'Exceptional service and beautiful locations. Worth every penny!',
            'Wonderful experience with amazing hospitality and beautiful sights.',
            'Perfectly organized package with excellent local guides.',
            'Unforgettable memories created on this wonderful journey!',
            'Highly satisfied with the entire experience and services provided.',
        ];

        $bookings = Booking::where('status', 'confirmed')->get();

        foreach ($bookings as $booking) {
            if (rand(1, 3) > 1) { // 66% chance to add a review
                Review::firstOrCreate(
                    [
                        'user_id' => $booking->user_id,
                        'package_id' => $booking->package_id,
                    ],
                    [
                        'booking_id' => $booking->id,
                        'rating' => rand(4, 5),
                        'comment' => $reviews[array_rand($reviews)],
                        'title' => 'Great Experience!',
                    ]
                );
            }
        }
    }
}
