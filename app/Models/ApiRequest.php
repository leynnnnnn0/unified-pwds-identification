<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApiRequest extends Model
{
    /** @use HasFactory<\Database\Factories\ApiRequestFactory> */
    use HasFactory;

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
}
