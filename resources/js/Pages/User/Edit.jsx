import React, { useEffect, useState } from "react";
import H1 from '@/Components/text/h1'
import FormH1 from '@/Components/text/form-h1'
import FormField from '@/Components/form/form-field'
import { Input } from '@/Components/ui/input'
import { Button } from "@/Components/ui/button";
import { useForm } from '@inertiajs/react'
import FormContainer from '@/Components/div/form-container'
import SearchableSelect from '@/Components/searchable-select'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const Edit = ({user}) => {

const [isShowMode, setIsShowMode] = useState(true);

    const form = useForm({
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        email: user.email,
        role: user.role,
        remarks: user.remarks,
        assignedProvinces: user.provinces.map((item) => item.province + "\n"),
        assignedMunicipalities: user.municipalities.map((item) => {item.municipality}), 
    });

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
          value={form.data.first_name}
          onChange={(e) =>
            form.setData("first_name", e.target.value)
         }
        />
      </FormField>

      <FormField label="Middle Name"
        isRequired={false}
      >
        <Input
          disabled={isShowMode}
          value={form.data.middle_name}
          onChange={(e) =>
            form.setData("middle_name", e.target.value)
          }
        />
      </FormField>

      <FormField label="Last Name">
        <Input
          disabled={isShowMode}
          value={form.data.last_name}
          onChange={(e) =>
            form.setData("last_name", e.target.value)
          }
        />
      </FormField>

      <FormField label="Phone Number">
        <Input
          disabled={isShowMode}
          value={form.data.phone_number}
          onChange={(e) =>
            form.setData("phone_number", e.target.value)
          }
        />
      </FormField>

      <FormField label="Email">
        <Input
          disabled={isShowMode}
          value={form.data.email}
          onChange={(e) =>
            form.setData("email", e.target.value)
          }
        />
      </FormField>

      <FormField label="Roles">
                    <Select
                        disabled={isShowMode}
                        value={form.data.role || ""}
                        onValueChange={(value) => form.setData("role", value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Options" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="sub_admin">Sub Admin</SelectItem>
                            <SelectItem value="processer">Processer</SelectItem>
                        </SelectContent>
                    </Select>
      </FormField>

      <FormField label="Remarks"
        isRequired={false}
      >
        <Input
          disabled={isShowMode}
          value={form.data.remarks}
          onChange={(e) =>
            form.setData("remarks", e.target.value)
          }
        />
      </FormField>

      </div>
     
      </div>
    </>
  )
}

export default Edit