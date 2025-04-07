<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResidenceAddress extends Model
{
    /** @use HasFactory<\Database\Factories\ResidenceAddressFactory> */
    use HasFactory;

    protected  $fillable = [
        'user_id',
        'house_number_and_street',
        'barangay',
        'municipality',
        'province',
        'region',
    ];
}
