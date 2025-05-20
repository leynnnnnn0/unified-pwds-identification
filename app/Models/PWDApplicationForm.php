<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PWDApplicationForm extends Model
{
    /** @use HasFactory<\Database\Factories\PWDApplicationFormFactory> */
    use HasFactory;

    protected $table = 'pwd_application_forms';

    protected $fillable = [
        'remarks',
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
        'disabilities_list',
        'cause_of_disabilities_list',
        'full_name'
    ];


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function supporting_documents()
    {
        return $this->hasMany(SupportingDocument::class, 'application_form_id');
    }

    public function disabilities()
    {
        return $this->hasMany(Disability::class, 'application_form_id');
    }

    public function getDisabilitiesListAttribute()
    {
        return $this->disabilities->pluck('name')
            ->map(function ($name) {
                return ucwords(str_replace('_', ' ', $name));
            })
            ->implode(', ');
    }

    public function getCauseOfDisabilitiesListAttribute()
    {
        return $this->causes_of_disabilities->pluck('name')
            ->map(function ($name) {
                return ucwords(str_replace('_', ' ', $name));
            })
            ->implode(', ');
    }



    public function causes_of_disabilities()
    {
        return $this->hasMany(CauseOfDisability::class, 'application_form_id');
    }

    public function pwd_identification_card()
    {
        return $this->hasOne(PWDIdentificationCard::class, 'application_form_id');
    }

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

    public function getFullNameAttribute()
    {
        return $this->first_name . " " . $this->last_name;
    }
}
