<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PWDApplicationForm extends Model
{
    /** @use HasFactory<\Database\Factories\PWDApplicationFormFactory> */
    use HasFactory;

    protected $table = 'pwd_application_forms';

    protected $fillable = [
        'user_id',
        'encoder_id',
        'application_number',
        'approver_id',
        'processing_officer_id',
        'application_date',
        'status',

        'type_of_registration',
        'pwd_number',
        'photo',

        'first_name',
        'middle_name',
        'last_name',
        'suffix',
        'date_of_birth',
        'sex',
        'civil_status',
        'type_of_disability',
        'cause_of_disability',

        'house_no_and_street',
        'barangay',
        'municipality',
        'province',
        'region',

        'landline_no',
        'mobile_no',
        'email_address',

        'educational_attainment',

        'status_of_employment',
        'types_of_employment',
        'category_of_employment',

        'work_field',
        'other_field',

        'organization_affiliated',
        'contact_person',
        'office_address',
        'telephone_no',

        'sss_no',
        'gsis_no',
        'pag_ibig_no',
        'psn_no',
        'philhealth_no',

        'father_last_name',
        'father_first_name',
        'father_middle_name',
        'mother_last_name',
        'mother_first_name',
        'mother_middle_name',
        'guardian_last_name',
        'guardian_first_name',
        'guardian_middle_name',
    ];

    protected $appends = [
        'formatted_application_date',
        'formatted_status',
        'formatted_type_of_application',
    ];

    public function encoder()
    {
        return $this->belongsTo(User::class, 'encoder_id');
    }

    public function getFormattedApplicationDateAttribute()
    {
        return $this->application_date ? date('F d, Y', strtotime($this->application_date)) : null;
    }

    public function getFormattedStatusAttribute()
    {
        return strtoupper(str_replace('_', ' ', $this->status));
    }

    public function getFormattedTypeOfApplicationAttribute()
    {
        return strtoupper(str_replace('_', ' ', $this->type_of_registration));
    }
}
