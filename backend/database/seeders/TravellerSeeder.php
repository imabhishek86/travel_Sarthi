<?php

namespace Database\Seeders;

use App\Models\Traveller;
use App\Models\User;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class TravellerSeeder extends Seeder
{
    public function run()
    {
        $firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emma', 'Robert', 'Lisa', 'William', 'Mary'];
        $lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
        $nationalities = ['Indian', 'American', 'British', 'Canadian', 'Australian', 'German', 'French', 'Spanish', 'Italian', 'Japanese'];
        $genders = ['Male', 'Female'];

        $users = User::where('role', 'user')->get();

        if ($users->isEmpty()) {
            return;
        }

        foreach ($users as $user) {
            // Create 1-3 travellers per user
            $numTravellers = rand(1, 3);
            for ($i = 0; $i < $numTravellers; $i++) {
                $firstName = $firstNames[array_rand($firstNames)];
                $lastName = $lastNames[array_rand($lastNames)];
                $dob = Carbon::now()->subYears(rand(18, 65))->subDays(rand(1, 365));
                $passportExpiry = Carbon::now()->addYears(rand(1, 5));

                Traveller::firstOrCreate(
                    [
                        'user_id' => $user->id,
                        'full_name' => "$firstName $lastName",
                    ],
                    [
                        'dob' => $dob,
                        'gender' => $genders[array_rand($genders)],
                        'passport_number' => strtoupper(chr(rand(65, 90)) . chr(rand(65, 90)) . rand(100000, 999999)),
                        'passport_expiry' => $passportExpiry,
                        'nationality' => $nationalities[array_rand($nationalities)],
                        'phone' => '+' . rand(1, 999) . rand(1000000000, 9999999999),
                    ]
                );
            }
        }
    }
}
