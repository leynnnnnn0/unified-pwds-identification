<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class ApiKey extends Model implements Auditable
{
    /** @use HasFactory<\Database\Factories\ApiKeyFactory> */
    use HasFactory, \OwenIt\Auditing\Auditable;

    protected $fillable = [
        'user_id',
        'name',
        'secret_key',
        'failed_requests',
        'successful_requests',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function api_requests()
    {
        return $this->hasMany(ApiRequest::class);
    }
}
