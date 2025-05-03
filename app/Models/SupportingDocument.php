<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupportingDocument extends Model
{
    /** @use HasFactory<\Database\Factories\SupportingDocumentFactory> */
    use HasFactory;

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
