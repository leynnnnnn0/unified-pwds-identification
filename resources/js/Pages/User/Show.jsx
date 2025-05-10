import { useForm } from "@inertiajs/react";
import FormField from '@/Components/form/form-field'
import H1 from '@/Components/text/h1'
import React from 'react'
import InfoLabel from '@/Components/text/info-label'
import { Button } from "@/Components/ui/button";

const Show = ({user}) => {
    const form = useForm({
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        email: user.email,
        role: user.role,
        remarks: user.remarks,
        
    });

    console.log(form.data);
  return (
    <>
    <H1 title="User Details"/>

    <div className="w-full rounded-lg shadow-xl border p-10 grid grid-cols-2 auto-rows-auto">

      <FormField label="First Name">
        <InfoLabel
        label={form.data.first_name}
        />
      </FormField>

      <FormField label="Middle Name">
        <InfoLabel 
          label={form.data.middle_name}
        />
      </FormField>


      <FormField label="Last Name">
        <InfoLabel 
        value={form.data.last_name}
        />
      </FormField>

      <FormField label="Phone Number">
        <InfoLabel 
        value={form.data.phone_number}
        />
      </FormField>

      <FormField label="Email">
        <InfoLabel 
        value={form.data.email}
        />
      </FormField>

      <FormField label="Roles">
        <InfoLabel 
        value={form.data.roles}
        />
      </FormField>

      <FormField label="Remarks">
        <InfoLabel 
        value={form.data.remarks}
        />
      </FormField>

    </div>
    <Button>Back</Button>
    </>
  )
}

export default Show