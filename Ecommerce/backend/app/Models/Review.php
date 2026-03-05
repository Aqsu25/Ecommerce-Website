<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = ['review', 'status', 'rate', 'user_id', 'product_id'];

    // user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // product
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
