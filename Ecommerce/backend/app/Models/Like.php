<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    protected $fillable = [
        'user_id',
        'likeable_id',
        'likeable_type'
    ];

    // likeable
    public function likeable()
    {
        return $this->morphTo();
    }
    // user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
