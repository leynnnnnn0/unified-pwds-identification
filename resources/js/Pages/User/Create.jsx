import React from 'react'
import H1 from '@/Components/text/h1'
import FormH1 from '@/Components/text/form-h1'
import FormField from '@/Components/form/form-field'
import { Input } from '@/Components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent} from '@/Components/ui/select'


const Create = () => {
  return (
    <>
      <H1 title="Create New User"/>
      <div className="w-full rounded-lg shadow-xl border p-10 grid grid-cols-2 gap-3 auto-rows-auto">

      <FormH1 label="User Details"/>

      <div className='col-span-2 grid grid-cols-2 gap-4'>
      <FormField label="First Name">
        <Input/>
      </FormField>
      <FormField label="Middle Name">
        <Input/>
      </FormField>
      <FormField label="Last Name">
        <Input/>
      </FormField>
      <FormField label="Phone Number">
        <Input/>
      </FormField>
      <FormField label="Email">
        <Input/>
      </FormField>
      <FormField label="Roles">
      <Select>
          <SelectTrigger>
              <SelectValue placeholder="Options" />
          </SelectTrigger>
              <SelectContent>

              </SelectContent>
        </Select>
      </FormField>
      <FormField label="Remarks">
        <Input/>
      </FormField>

      </div>
     
      </div>
    </>
  )
}

export default Create