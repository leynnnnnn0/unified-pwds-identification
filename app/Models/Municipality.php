<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Municipality extends Model
{
    /** @use HasFactory<\Database\Factories\MunicipalityFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'municipality'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
