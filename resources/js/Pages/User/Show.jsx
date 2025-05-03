import FormField from '@/Components/form/form-field'
import H1 from '@/Components/text/h1'
import React from 'react'
import InfoLabel from '@/Components/text/info-label'
import { Button } from 'react-day-picker'

const Show = () => {
  return (
    <>
    <H1 title="User Details"/>
    <div className="w-full rounded-lg shadow-xl border p-10 grid grid-cols-2 auto-rows-auto">
      <FormField label="First Name">
        <InfoLabel label="Try"/>
      </FormField>
      <FormField label="Middle Name">
        <InfoLabel label="Try"/>
      </FormField>
      <FormField label="First Name">
        <InfoLabel label="Try"/>
      </FormField>
      <FormField label="Last Name">
        <InfoLabel label="Try"/>
      </FormField>
      <FormField label="Phone Number">
        <InfoLabel label="Try"/>
      </FormField>
      <FormField label="Email">
        <InfoLabel label="Try"/>
      </FormField>
      <FormField label="Roles">
        <InfoLabel label="Try"/>
      </FormField>
      <FormField label="Remarks">
        <InfoLabel label="Try"/>
      </FormField>
    </div>
    <Button>Back</Button>
    </>
  )
}

export default Show