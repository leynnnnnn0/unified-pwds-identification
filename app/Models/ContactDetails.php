<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactDetails extends Model
{
    /** @use HasFactory<\Database\Factories\ContactDetailsFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'landline_number',
        'mobile_number',
        'email_address',
    ];
}
