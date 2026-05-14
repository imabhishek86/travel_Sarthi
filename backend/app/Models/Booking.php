<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Booking extends Model
{
    use HasFactory;

    protected $collection = 'bookings';

    protected $fillable = [
        'user_id',
        'bookable_id',
        'bookable_type', // 'hotel' or 'package'
        'booking_date',
        'status', // 'pending', 'confirmed', 'cancelled'
        'total_price',
        'payment_status',
        'guests'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
