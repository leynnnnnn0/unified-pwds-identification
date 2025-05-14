<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApiKey extends Model
{
    /** @use HasFactory<\Database\Factories\ApiKeyFactory> */
    use HasFactory;

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
