<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CauseOfDisability extends Model
{
    /** @use HasFactory<\Database\Factories\CauseOfDisabilityFactory> */
    use HasFactory;

    protected $fillable = [
        'application_form_id',
        'name',
    ];

    public function application_form()
    {
        return $this->belongsTo(PWDApplicationForm::class, 'application_form_id');
    }
}
