<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Contact extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'email',
        'address',
        'city',
        'postal_code',
        'country',
        'notes',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
}
