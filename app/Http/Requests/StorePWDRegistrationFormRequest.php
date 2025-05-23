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
            'first_name' => 'required|string|max:100|regex:/^[a-zA-Z\s]+$/',
            'middle_name' => 'nullable|string|max:100|regex:/^[a-zA-Z\s]+$/',
            'last_name' => 'required|string|max:100|regex:/^[a-zA-Z\s]+$/',
            'suffix' => 'nullable|string|max:20|regex:/^[a-zA-Z\s.]+$/',
            'date_of_birth' => 'required|date|before:today',
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
            'landline_no' => 'nullable|string|max:20|regex:/^[\d\s\-\(\)\+]+$/',
            'mobile_no' => 'required|string|size:11|regex:/^09\d{9}$/',
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
            'contact_person' => 'nullable|string|max:255|regex:/^[a-zA-Z\s.,-]+$/',
            'office_address' => 'nullable|string|max:255',
            'telephone_no' => 'nullable|string|max:20|regex:/^[\d\s\-\(\)\+]+$/',

            // ID Reference Numbers
            'sss_no' => 'nullable|string|max:20|regex:/^[\d\-]+$/',
            'gsis_no' => 'nullable|string|max:20|regex:/^[\d\-]+$/',
            'pag_ibig_no' => 'nullable|string|max:20|regex:/^[\d\-]+$/',
            'psn_no' => 'nullable|string|max:20|regex:/^[\d\-]+$/',
            'philhealth_no' => 'nullable|string|max:20|regex:/^[\d\-]+$/',

            // Family Information
            'father_last_name' => 'required|string|max:100|regex:/^[a-zA-Z\s]+$/',
            'father_first_name' => 'required|string|max:100|regex:/^[a-zA-Z\s]+$/',
            'father_middle_name' => 'nullable|string|max:100|regex:/^[a-zA-Z\s]+$/',
            'mother_last_name' => 'nullable|string|max:100|regex:/^[a-zA-Z\s]+$/',
            'mother_first_name' => 'nullable|string|max:100|regex:/^[a-zA-Z\s]+$/',
            'mother_middle_name' => 'nullable|string|max:100|regex:/^[a-zA-Z\s]+$/',
            'guardian_last_name' => 'nullable|string|max:100|regex:/^[a-zA-Z\s]+$/',
            'guardian_first_name' => 'nullable|string|max:100|regex:/^[a-zA-Z\s]+$/',
            'guardian_middle_name' => 'nullable|string|max:100|regex:/^[a-zA-Z\s]+$/',
        ];
    }


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
            'first_name.regex' => 'First name must contain only letters and spaces.',
            'middle_name.regex' => 'Middle name must contain only letters and spaces.',
            'last_name.required' => 'Last name is required.',
            'last_name.regex' => 'Last name must contain only letters and spaces.',
            'suffix.regex' => 'Suffix must contain only letters, spaces, and periods.',
            'date_of_birth.required' => 'Date of birth is required.',
            'date_of_birth.before' => 'Date of birth must be before today.',
            'sex.required' => 'Sex is required.',
            'civil_status.required' => 'Civil status is required.',
            'type_of_disability.required' => 'Type of disability is required.',

            // Residence Address
            'house_no_and_street.required' => 'House number and street are required.',
            'barangay.required' => 'Barangay is required.',
            'barangay.regex' => 'Barangay must contain only letters, spaces, and common punctuation.',
            'municipality.required' => 'Municipality is required.',
            'municipality.regex' => 'Municipality must contain only letters, spaces, and common punctuation.',
            'province.required' => 'Province is required.',
            'province.regex' => 'Province must contain only letters, spaces, and common punctuation.',
            'region.required' => 'Region is required.',
            'region.regex' => 'Region must contain only letters, spaces, and common punctuation.',

            // Contact Details
            'mobile_no.required' => 'Mobile number is required.',
            'mobile_no.size' => 'Mobile number must be exactly 11 digits long.',
            'mobile_no.regex' => 'Mobile number must start with 09 and be followed by 9 additional digits.',
            'landline_no.regex' => 'Landline number must contain only numbers, spaces, hyphens, parentheses, and plus signs.',
            'telephone_no.regex' => 'Telephone number must contain only numbers, spaces, hyphens, parentheses, and plus signs.',
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

            // Contact Person
            'contact_person.regex' => 'Contact person name must contain only letters, spaces, and common punctuation.',

            // ID Numbers
            'sss_no.regex' => 'SSS number must contain only numbers and hyphens.',
            'gsis_no.regex' => 'GSIS number must contain only numbers and hyphens.',
            'pag_ibig_no.regex' => 'Pag-IBIG number must contain only numbers and hyphens.',
            'psn_no.regex' => 'PSN number must contain only numbers and hyphens.',
            'philhealth_no.regex' => 'PhilHealth number must contain only numbers and hyphens.',

            // Family Information
            'father_last_name.required' => 'Father\'s last name is required.',
            'father_last_name.regex' => 'Father\'s last name must contain only letters and spaces.',
            'father_first_name.required' => 'Father\'s first name is required.',
            'father_first_name.regex' => 'Father\'s first name must contain only letters and spaces.',
            'father_middle_name.regex' => 'Father\'s middle name must contain only letters and spaces.',
            'mother_last_name.regex' => 'Mother\'s last name must contain only letters and spaces.',
            'mother_first_name.regex' => 'Mother\'s first name must contain only letters and spaces.',
            'mother_middle_name.regex' => 'Mother\'s middle name must contain only letters and spaces.',
            'guardian_last_name.regex' => 'Guardian\'s last name must contain only letters and spaces.',
            'guardian_first_name.regex' => 'Guardian\'s first name must contain only letters and spaces.',
            'guardian_middle_name.regex' => 'Guardian\'s middle name must contain only letters and spaces.',
        ];
    }
}
