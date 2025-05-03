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
        Schema::create('pwd_application_forms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('processing_officer_id')->nullable()->constrained('users');
            $table->foreignId('encoder_id')->constrained('users');
            $table->foreignId('approver_id')->nullable()->constrained('users');
            $table->date('application_date');
            $table->string('application_number')->unique();
            $table->string('type_of_registration');
            $table->string('pwd_number')->nullable();
            $table->string('photo')->nullable();
            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->string('last_name');
            $table->string('suffix')->nullable();
            $table->date('date_of_birth');
            $table->string('sex');
            $table->string('civil_status');

            $table->string('cause_of_disability')->nullable();
            $table->string('house_no_and_street');
            $table->string('barangay');
            $table->string('municipality');
            $table->string('province');
            $table->string('region');
            $table->string('landline_no')->nullable();
            $table->string('mobile_no');
            $table->string('email_address')->nullable();
            $table->string('educational_attainment');
            $table->string('status_of_employment')->nullable();
            $table->string('types_of_employment')->nullable();
            $table->string('category_of_employment')->nullable();
            $table->string('work_field')->nullable();
            $table->string('other_field')->nullable();
            $table->string('organization_affiliated')->nullable();
            $table->string('contact_person')->nullable();
            $table->string('office_address')->nullable();
            $table->string('telephone_no')->nullable();
            $table->string('sss_no')->nullable();
            $table->string('gsis_no')->nullable();
            $table->string('pag_ibig_no')->nullable();
            $table->string('psn_no')->nullable();
            $table->string('philhealth_no')->nullable();
            $table->string('father_last_name');
            $table->string('father_first_name');
            $table->string('father_middle_name')->nullable();
            $table->string('mother_last_name')->nullable();
            $table->string('mother_first_name')->nullable();
            $table->string('mother_middle_name')->nullable();
            $table->string('guardian_last_name')->nullable();
            $table->string('guardian_first_name')->nullable();
            $table->string('guardian_middle_name')->nullable();
            $table->string('status')->default('pending');
            $table->string('remarks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pwd_application_forms');
    }
};
