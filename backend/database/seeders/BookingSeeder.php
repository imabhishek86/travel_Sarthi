<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\User;
use App\Models\Package;
use App\Models\Coupon;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class BookingSeeder extends Seeder
{
    public function run()
    {
        $users = User::where('role', 'user')->get();
        $packages = Package::all();
        $coupons = Coupon::all();

        if ($users->isEmpty() || $packages->isEmpty()) {
            return;
        }

        $statuses = ['pending', 'confirmed', 'cancelled'];

        for ($i = 0; $i < 15; $i++) {
            $user = $users->random();
            $package = $packages->random();
            $coupon = $coupons->random();
            $startDate = Carbon::now()->addDays(rand(5, 30));
            $endDate = $startDate->clone()->addDays($package->duration);
            $totalAmount = $package->budget;

            Booking::create([
                'user_id' => $user->id,
                'package_id' => $package->id,
                'coupon_id' => $coupon->id,
                'total_amount' => $totalAmount,
                'status' => $statuses[array_rand($statuses)],
                'start_date' => $startDate,
                'end_date' => $endDate,
            ]);
        }
    }
}
