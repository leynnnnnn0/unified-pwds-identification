<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IDReferenceNumber extends Model
{
    /** @use HasFactory<\Database\Factories\IDReferenceNumberFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'sss_number',
        'pag_ibig_number',
        'philhealth_number',
        'postal_number',
    ];
}
