<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    /** @use HasFactory<\Database\Factories\ProvinceFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'province'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
