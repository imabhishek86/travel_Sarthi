<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Review extends Model
{
    use HasFactory;

    protected $collection = 'reviews';

    protected $fillable = [
        'user_id',
        'reviewable_id',
        'reviewable_type', // 'hotel' or 'package'
        'rating',
        'comment'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
