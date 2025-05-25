<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class ApiRequest extends Model implements Auditable
{
    /** @use HasFactory<\Database\Factories\ApiRequestFactory> */
    use HasFactory, \OwenIt\Auditing\Auditable;

    protected $fillable = [
        'user_id',
        'api_key_id',
        'ip_address',
        'is_successfull',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function api_key()
    {
        return $this->belongsTo(ApiKey::class);
    }
}
