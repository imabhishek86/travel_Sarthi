<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Favorite extends Model
{
    use HasFactory;

    protected $collection = 'favorites';

    protected $fillable = [
        'user_id',
        'favorable_id',
        'favorable_type' // 'hotel' or 'package'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
