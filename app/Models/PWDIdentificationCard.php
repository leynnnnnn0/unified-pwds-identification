<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
