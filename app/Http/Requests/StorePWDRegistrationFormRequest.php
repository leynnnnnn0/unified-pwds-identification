<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StorePWDRegistrationFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'type_of_registration' => 'required|string|in:option-one,option-two',
            'pwd_number' => 'nullable|string|max:50',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',

            // Personal Information
            'personal_information.first_name' => 'required|string|max:100',
            'personal_information.middle_name' => 'nullable|string|max:100',
            'personal_information.last_name' => 'required|string|max:100',
            'personal_information.suffix' => 'nullable|string|max:20',
            'personal_information.date_of_birth' => 'required|date|before_or_equal:today',
            'personal_information.sex' => 'required|string|in:male,female',
            'personal_information.civil_status' => 'required|string|in:single,seperated,cohabitation,married,widow',
            'personal_information.type_of_disability' => 'required|string|in:deaf_or_hard_of_hearing,intellectual_disability,learning_disability,mental_disability,physical_disability,psychosocial_disability,speech_and_language_impairment,visual_disability,cancer,rare_disease',
            'personal_information.causeOfDisability' => 'nullable|string|max:255',

            // Residence Address
            'residence_address.house_no_and_street' => 'required|string|max:255',
            'residence_address.barangay' => 'required|string|max:100',
            'residence_address.municipality' => 'required|string|max:100',
            'residence_address.province' => 'required|string|max:100',
            'residence_address.region' => 'required|string|max:100',

            // Contact Details
            'contact_details.landline_no' => 'nullable|string|max:20',
            'contact_details.mobile_no' => 'required|string|max:20',
            'contact_details.email_address' => 'nullable|email|max:100',

            // Education
            'education.educational_attainment' => 'required|string|in:none,kindergarten,elementary,junior_high_school,senior_high_school,college,vocational,post_graduate',

            // Employment Details
            'employment_details.status_of_employment' => 'required|string|in:employed,unemployed,self_employed',
            'employment_details.types_of_employment' => 'required_if:employment_details.status_of_employment,employed,self_employed|nullable|string|in:permanent_regular,seasonal,casual,emergency',
            'employment_details.category_of_employment' => 'required_if:employment_details.status_of_employment,employed|nullable|string|in:government,private',

            // Occupation
            'occupation.work_field' => 'required_if:employment_details.status_of_employment,employed,self_employed|nullable|string|in:managers,professionals,technicians_and_associate_professionals,clerical_support_workers,service_and_sales_workers,skilled_agricultural_forestry_and_fishery_workers,craft_and_related_trade_workers,plant_and_machine_operators_and_assemblers,elementary_occupations,armed_forces_occupations,others',
            'occupation.other_field' => 'required_if:occupation.work_field,others|nullable|string|max:255',

            // Organization Information
            'organization_information.organization_affiliated' => 'nullable|string|max:255',
            'organization_information.contact_person' => 'nullable|string|max:255',
            'organization_information.office_address' => 'nullable|string|max:255',
            'organization_information.telephone_no' => 'nullable|string|max:20',

            // ID Reference Numbers
            'id_reference_no.sss_no' => 'nullable|string|max:20',
            'id_reference_no.gsis_no' => 'nullable|string|max:20',
            'id_reference_no.pag_ibig_no' => 'nullable|string|max:20',
            'id_reference_no.psn_no' => 'nullable|string|max:20',
            'id_reference_no.philhealth_no' => 'nullable|string|max:20',

            // Family Information
            'family_information.fathers_name.last_name' => 'nullable|string|max:100',
            'family_information.fathers_name.first_name' => 'nullable|string|max:100',
            'family_information.fathers_name.middle_name' => 'nullable|string|max:100',

            'family_information.mothers_name.last_name' => 'nullable|string|max:100',
            'family_information.mothers_name.first_name' => 'nullable|string|max:100',
            'family_information.mothers_name.middle_name' => 'nullable|string|max:100',

            'family_information.guardians_name.last_name' => 'nullable|string|max:100',
            'family_information.guardians_name.first_name' => 'nullable|string|max:100',
            'family_information.guardians_name.middle_name' => 'nullable|string|max:100',
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
            'personal_information.first_name.required' => 'First name is required.',
            'personal_information.last_name.required' => 'Last name is required.',
            'personal_information.date_of_birth.required' => 'Date of birth is required.',
            'personal_information.date_of_birth.before_or_equal' => 'Date of birth must be on or before today.',
            'personal_information.sex.required' => 'Sex is required.',
            'personal_information.civil_status.required' => 'Civil status is required.',
            'personal_information.type_of_disability.required' => 'Type of disability is required.',

            'residence_address.house_no_and_street.required' => 'House number and street are required.',
            'residence_address.barangay.required' => 'Barangay is required.',
            'residence_address.municipality.required' => 'Municipality is required.',
            'residence_address.province.required' => 'Province is required.',
            'residence_address.region.required' => 'Region is required.',

            'contact_details.mobile_no.required' => 'Mobile number is required.',
            'contact_details.email_address.email' => 'Please enter a valid email address.',

            'education.educational_attainment.required' => 'Educational attainment is required.',

            'employment_details.status_of_employment.required' => 'Employment status is required.',
            'employment_details.types_of_employment.required_if' => 'Type of employment is required when employed or self-employed.',
            'employment_details.category_of_employment.required_if' => 'Employment category is required when employed.',

            'occupation.work_field.required_if' => 'Work field is required when employed or self-employed.',
            'occupation.other_field.required_if' => 'Please specify the other occupation.',

            'photo.image' => 'The uploaded file must be an image.',
            'photo.mimes' => 'The photo must be a JPEG, PNG, or JPG file.',
            'photo.max' => 'The photo must not exceed 2MB.',
        ];
    }
}
