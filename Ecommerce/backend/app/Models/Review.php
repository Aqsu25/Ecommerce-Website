<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
protected $fillable = ['review','status','rate','user_id','product_id'];
}
