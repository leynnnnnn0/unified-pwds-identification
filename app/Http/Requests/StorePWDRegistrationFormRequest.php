<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePWDRegistrationFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'supporting_documents' => ['required', 'array'],
            'type_of_registration' => 'required|string|in:new_applicant,renewal',
            'pwd_number' => 'nullable|required_if:type_of_registration,renewal|string|max:50',
            'photo' => 'required|image|mimes:jpeg,png,jpg|max:2048',

            // Personal Information
            'first_name' => 'required|string|max:100',
            'middle_name' => 'nullable|string|max:100',
            'last_name' => 'required|string|max:100',
            'suffix' => 'nullable|string|max:20',
            'date_of_birth' => 'required|date|before_or_equal:today',
            'sex' => 'required|string|in:male,female',
            'civil_status' => 'required|string|in:single,separated,cohabitation,married,widowed',
            'type_of_disabilities' => 'required|array|in:deaf_or_hard_of_hearing,intellectual_disability,learning_disability,mental_disability,physical_disability,psychosocial_disability,speech_and_language_impairment,visual_disability,cancer,rare_disease',
            'cause_of_disability' => 'required|string|max:255',
            'cause_of_disabilities' => 'required|array',

            // Residence Address
            'house_no_and_street' => 'required|string|max:255',
            'barangay' => 'required|string|max:100',
            'municipality' => 'required|string|max:100',
            'province' => 'required|string|max:100',
            'region' => 'required|string|max:100',

            // Contact Details
            'landline_no' => 'nullable|string|max:20',
            'mobile_no' => 'required|string|max:20',
            'email_address' => 'nullable|email|max:100',

            // Education
            'educational_attainment' => 'required|string|in:none,kindergarten,elementary,junior_high_school,senior_high_school,college,vocational,post_graduate',

            // Employment Details
            'status_of_employment' => 'required|string|in:employed,unemployed,self_employed',
            'types_of_employment' => 'required_if:status_of_employment,employed,self_employed|nullable|string|in:permanent_regular,seasonal,casual,emergency',
            'category_of_employment' => 'required_if:status_of_employment,employed|nullable|string|in:government,private',

            // Occupation
            'work_field' => 'required_if:status_of_employment,employed,self_employed|nullable|string|in:managers,professionals,technicians_and_associate_professionals,clerical_support_workers,service_and_sales_workers,skilled_agricultural_forestry_and_fishery_workers,craft_and_related_trade_workers,plant_and_machine_operators_and_assemblers,elementary_occupations,armed_forces_occupations,others',
            'other_field' => 'required_if:work_field,others|nullable|string|max:255',

            // Organization Information
            'organization_affiliated' => 'nullable|string|max:255',
            'contact_person' => 'nullable|string|max:255',
            'office_address' => 'nullable|string|max:255',
            'telephone_no' => 'nullable|string|max:20',

            // ID Reference Numbers
            'sss_no' => 'nullable|string|max:20',
            'gsis_no' => 'nullable|string|max:20',
            'pag_ibig_no' => 'nullable|string|max:20',
            'psn_no' => 'nullable|string|max:20',
            'philhealth_no' => 'nullable|string|max:20',

            // Family Information
            'father_last_name' => 'required|string|max:100',
            'father_first_name' => 'required|string|max:100',
            'father_middle_name' => 'nullable|string|max:100',
            'mother_last_name' => 'nullable|string|max:100',
            'mother_first_name' => 'nullable|string|max:100',
            'mother_middle_name' => 'nullable|string|max:100',
            'guardian_last_name' => 'nullable|string|max:100',
            'guardian_first_name' => 'nullable|string|max:100',
            'guardian_middle_name' => 'nullable|string|max:100',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'type_of_registration.required' => 'Please select registration type.',
            'pwd_number.required_if' => 'PWD number is required for renewal applications.',
            'photo.image' => 'The uploaded file must be an image.',
            'photo.mimes' => 'The photo must be a JPEG, PNG, or JPG file.',
            'photo.max' => 'The photo must not exceed 2MB.',

            // Personal Information
            'first_name.required' => 'First name is required.',
            'last_name.required' => 'Last name is required.',
            'date_of_birth.required' => 'Date of birth is required.',
            'date_of_birth.before_or_equal' => 'Date of birth must be on or before today.',
            'sex.required' => 'Sex is required.',
            'civil_status.required' => 'Civil status is required.',
            'type_of_disability.required' => 'Type of disability is required.',

            // Residence Address
            'house_no_and_street.required' => 'House number and street are required.',
            'barangay.required' => 'Barangay is required.',
            'municipality.required' => 'Municipality is required.',
            'province.required' => 'Province is required.',
            'region.required' => 'Region is required.',

            // Contact Details
            'mobile_no.required' => 'Mobile number is required.',
            'email_address.email' => 'Please enter a valid email address.',

            // Education
            'educational_attainment.required' => 'Educational attainment is required.',

            // Employment Details
            'status_of_employment.required' => 'Employment status is required.',
            'types_of_employment.required_if' => 'Type of employment is required when employed or self-employed.',
            'category_of_employment.required_if' => 'Employment category is required when employed.',

            // Occupation
            'work_field.required_if' => 'Work field is required when employed or self-employed.',
            'other_field.required_if' => 'Please specify the other occupation.',

            // Family Information
            'father_last_name.required' => 'Father\'s last name is required.',
            'father_first_name.required' => 'Father\'s first name is required.',
        ];
    }
}
