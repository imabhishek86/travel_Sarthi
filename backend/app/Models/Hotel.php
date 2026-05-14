<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Hotel extends Model
{
    use HasFactory;

    protected $collection = 'hotels';

    protected $fillable = [
        'name',
        'location',
        'description',
        'price_per_night',
        'images',
        'amenities',
        'rating'
    ];
}
