<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EducationAndEmploymentDetails extends Model
{
    /** @use HasFactory<\Database\Factories\EducationAndEmploymentDetailsFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'educational_attainment',
        'work_field',
        'organization_affiliated',
        'contact_person',
        'office_address',
        'telephone_number',
    ];
}
