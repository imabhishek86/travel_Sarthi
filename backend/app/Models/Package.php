<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Package extends Model
{
    use HasFactory;

    protected $collection = 'packages';

    protected $fillable = [
        'title',
        'destination',
        'duration_days',
        'price',
        'description',
        'itinerary',
        'images',
        'rating'
    ];
}
