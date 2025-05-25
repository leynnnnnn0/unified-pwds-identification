<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use OwenIt\Auditing\Contracts\Auditable;

class PWDIdentificationCard extends Model implements Auditable
{
    /** @use HasFactory<\Database\Factories\PWDIdentificationCardFactory> */
    use HasFactory, \OwenIt\Auditing\Auditable;

    protected $table = 'pwd_identification_cards';

    protected $fillable = [
        'application_form_id',
        'rfid_card_number',
        'pwd_card_number',
        'effective_date',
        'expiry_date',
        'is_printed'
    ];

    protected $appends = [
        'formatted_effective_date',
        'formatted_expiry_date',
        'is_expired'
    ];

    public function getIsExpiredAttribute()
    {
        return $this->expiry_date <= now()->format('Y-m-d');
    }

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
