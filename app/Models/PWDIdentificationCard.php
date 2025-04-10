<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class PWDIdentificationCard extends Model
{
    /** @use HasFactory<\Database\Factories\PWDIdentificationCardFactory> */
    use HasFactory;

    protected $table = 'pwd_identification_cards';

    protected $fillable = [
        'application_form_id',
        'rfid_card_number',
        'pwd_card_number',
        'effective_date',
        'expiry_date',
    ];

    protected $appends = [
        'formatted_effective_date',
        'formatted_expiry_date'
    ];

    public function application_form()
    {
        return $this->belongsTo(PWDApplicationForm::class, 'application_form_id');
    }

    public function getFormattedEffectiveDateAttribute()
    {
        return Carbon::parse($this->effective_date)->format('F d, Y');
    }

    public function getFormattedExpiryDateAttribute()
    {
        return Carbon::parse($this->expiry_date)->format('F d, Y');
    }
}
