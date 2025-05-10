import React, { useState } from 'react'
import H1 from '@/Components/text/h1'
import FormH1 from '@/Components/text/form-h1'
import FormField from '@/Components/form/form-field'
import { Input } from '@/Components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent} from '@/Components/ui/select'
import { Button } from "@/Components/ui/button";

const Edit = () => {

const [isShowMode, setIsShowMode] = useState(true);

  return (
    <>
      <div className='flex items-center justify-between'>
        <H1 title="Edit User Details"/>
                <Button
                    onClick={
                        isShowMode
                            ? () => setIsShowMode(false)
                            : () => setIsShowMode(true)
                    }
                >
                    {isShowMode ? "Edit Details" : "Cancel Edit"}
                </Button>
      </div>
      

      <div className="w-full rounded-lg shadow-xl border p-10  auto-rows-auto">

      <FormH1 label="User Details"/>

      <div className='col-span-2 grid grid-cols-2 gap-4'>

      <FormField label="First Name">
        <Input
          disabled={isShowMode}
        />
      </FormField>

      <FormField label="Middle Name">
        <Input
          disabled={isShowMode}
        />
      </FormField>

      <FormField label="Last Name">
        <Input
          disabled={isShowMode}
        />
      </FormField>

      <FormField label="Phone Number">
        <Input
          disabled={isShowMode}
        />
      </FormField>

      <FormField label="Email">
        <Input
          disabled={isShowMode}
        />
      </FormField>

      <FormField label="Roles">
      <Select
        disabled={isShowMode}
      >
          <SelectTrigger>
              <SelectValue placeholder="Options" />
          </SelectTrigger>
              <SelectContent>

              </SelectContent>
        </Select>
      </FormField>

      <FormField label="Remarks">
        <Input
          disabled={isShowMode}
        />
      </FormField>

      </div>
     
      </div>
    </>
  )
}

export default Edit