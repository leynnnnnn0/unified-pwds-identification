<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class SupportingDocument extends Model implements Auditable
{
    /** @use HasFactory<\Database\Factories\SupportingDocumentFactory> */
    use HasFactory, \OwenIt\Auditing\Auditable;

    protected $fillable = [
        'application_form_id',
        'path',
        'name',
        'status',
        'remarks',
    ];
    public function application_form()
    {
        return $this->belongsTo(PWDApplicationForm::class, 'application_form_id');
    }
}
