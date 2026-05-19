<?php

namespace Database\Seeders;

use App\Models\Favorite;
use App\Models\User;
use App\Models\Package;
use Illuminate\Database\Seeder;

class FavouriteSeeder extends Seeder
{
    public function run()
    {
        $users = User::where('role', 'user')->get();
        $packages = Package::all();

        if ($users->isEmpty() || $packages->isEmpty()) {
            return;
        }

        foreach ($users as $user) {
            // Each user likes 2-4 packages
            $numFavorites = rand(2, 4);
            $selectedPackages = $packages->random($numFavorites);

            foreach ($selectedPackages as $package) {
                Favorite::firstOrCreate(
                    [
                        'user_id' => $user->id,
                        'package_id' => $package->id,
                    ]
                );
            }
        }
    }
}
