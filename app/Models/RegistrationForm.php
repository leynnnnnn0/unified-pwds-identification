<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegistrationForm extends Model
{
    /** @use HasFactory<\Database\Factories\RegistrationFormFactory> */
    use HasFactory;

    protected $fillable = [
        'processing_officer_id',
        'approving_officer_id',
        'encoder_id',
        'reporting_unit_id',
        'control_number',
    ];
}
