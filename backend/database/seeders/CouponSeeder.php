<?php

namespace Database\Seeders;

use App\Models\Coupon;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class CouponSeeder extends Seeder
{
    public function run()
    {
        $coupons = [
            [
                'code' => 'SAVE10',
                'discount_percent' => 10,
                'expiry_date' => Carbon::now()->addDays(30),
            ],
            [
                'code' => 'SAVE20',
                'discount_percent' => 20,
                'expiry_date' => Carbon::now()->addDays(60),
            ],
            [
                'code' => 'EARLYBIRD',
                'discount_percent' => 15,
                'expiry_date' => Carbon::now()->addDays(45),
            ],
            [
                'code' => 'SUMMER2024',
                'discount_percent' => 25,
                'expiry_date' => Carbon::now()->addDays(90),
            ],
            [
                'code' => 'WELCOME5',
                'discount_percent' => 5,
                'expiry_date' => Carbon::now()->addDays(15),
            ],
            [
                'code' => 'HOLIDAY30',
                'discount_percent' => 30,
                'expiry_date' => Carbon::now()->addDays(120),
            ],
        ];

        foreach ($coupons as $coupon) {
            Coupon::firstOrCreate(
                ['code' => $coupon['code']],
                $coupon
            );
        }
    }
}
