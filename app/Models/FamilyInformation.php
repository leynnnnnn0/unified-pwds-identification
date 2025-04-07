<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FamilyInformation extends Model
{
    /** @use HasFactory<\Database\Factories\FamilyInformationFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'father_first_name',
        'father_middle_name',
        'father_last_name',
        'mother_first_name',
        'mother_middle_name',
        'mother_last_name',
        'guardian_first_name',
        'guardian_middle_name',
        'guardian_last_name',
    ];
}
