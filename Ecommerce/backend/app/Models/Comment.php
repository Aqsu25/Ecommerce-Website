<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['comment', 'user_id', 'product_id','status'];

     // users
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
