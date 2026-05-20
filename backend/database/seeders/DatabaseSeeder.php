<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::firstOrCreate([
            'email' => 'test@example.com',
        ], [
            'name' => 'Test User',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
            'role' => 'user',
            'status' => 'active',
        ]);

        User::firstOrCreate([
            'email' => 'admin@travelsarthi.com',
        ], [
            'name' => 'Super Admin',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
            'role' => 'admin',
            'status' => 'active',
            'avatar' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        ]);

        // Create additional test users
        for ($i = 1; $i <= 5; $i++) {
            User::firstOrCreate([
                'email' => "user$i@example.com",
            ], [
                'name' => "Test User $i",
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'role' => 'user',
                'status' => 'active',
            ]);
        }

        $this->call([
            PackageSeeder::class,
            HotelSeeder::class,
            RoomSeeder::class,
            CouponSeeder::class,
            BookingSeeder::class,
            ReviewSeeder::class,
            TravellerSeeder::class,
            FavouriteSeeder::class,
            AdminAnalyticsSeeder::class,
            DestinationSeeder::class,
        ]);
    }
}
