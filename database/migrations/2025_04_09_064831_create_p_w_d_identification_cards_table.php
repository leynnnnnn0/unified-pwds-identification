<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pwd_identification_cards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('application_form_id')->constrained('pwd_application_forms')->onDelete('cascade');
            $table->string('rfid_card_number')->unique();
            $table->string('pwd_card_number')->unique();
            $table->date('effective_date');
            $table->date('expiry_date');
            $table->boolean('is_printed')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pwd_identification_cards');
    }
};
