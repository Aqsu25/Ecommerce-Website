<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductImg extends Model
{
    protected $fillable = ['product_id', 'name'];


    protected $appends = ['image_url'];


    // img-url
    public function getImageUrlAttribute()
    {
        if (!$this->name) {
            return null;
        }
        return asset('storage/product/' . $this->name);
    }

    // product
    public function product()
    {

        return $this->belongsTo(Product::class);
    }
}
