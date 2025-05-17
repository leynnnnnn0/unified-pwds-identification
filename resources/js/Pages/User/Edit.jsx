import React, { useEffect, useState } from "react";
import H1 from "@/Components/text/h1";
import FormH1 from "@/Components/text/form-h1";
import FormField from "@/Components/form/form-field";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/Components/ui/select";
import FormContainer from "@/Components/div/form-container";
import SearchableSelect from "@/Components/searchable-select";
import { useForm, router } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { X } from "lucide-react";
import { Link } from "@inertiajs/react";

const Edit = ({ user, provinces, municipalities, auth }) => {
    const [province, setProvince] = useState("");
    const [municipality, setMunicipality] = useState("");
    const [municipalitiesOption, setMunicipalitiesOption] =
        useState(municipalities);

    // Initialize with user's current assignments
    const initialProvinces = user.provinces.map((p) => p.province);
    const initialMunicipalities = user.municipalities.map(
        (m) => m.municipality
    );

    const form = useForm({
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        email: user.email,
        role: user.role,
        remarks: user.remarks,
        assignedProvinces: initialProvinces,
        assignedMunicipalities: initialMunicipalities,
    });

    // Add proper roles
    const roles = [
        {
            label: "Admin",
            value: "admin",
            isVisible: auth.role == "admin",
        },
        {
            label: "Sub Admin",
            value: "sub_admin",
            isVisible: auth.role == "admin",
        },
        {
            label: "Processer",
            value: "processer",
            isVisible: true,
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        form.put(route("admin.users.update", user.id), {
            onSuccess: () => {
                console.log("success");
            },
            onError: () => {
                console.log("error");
            },
        });
    };

    const addToProvinces = () => {
        if (!province) return;
        if (form.data.assignedProvinces.includes(province)) return;

        form.setData("assignedProvinces", [
            ...form.data.assignedProvinces,
            province,
        ]);
        setProvince("");
    };

    const addToMunicipalities = () => {
        if (!municipality) return;
        if (form.data.assignedMunicipalities.includes(municipality)) return;

        form.setData("assignedMunicipalities", [
            ...form.data.assignedMunicipalities,
            municipality,
        ]);
        setMunicipality("");
    };

    const removeProvince = (provinceToRemove) => {
        form.setData(
            "assignedProvinces",
            form.data.assignedProvinces.filter(
                (prov) => prov !== provinceToRemove
            )
        );
    };

    const removeMunicipality = (municipalityToRemove) => {
        form.setData(
            "assignedMunicipalities",
            form.data.assignedMunicipalities.filter(
                (mun) => mun !== municipalityToRemove
            )
        );
    };

    useEffect(() => {
        if (!province) {
            setMunicipalitiesOption({});
            return;
        }

        axios.get(`/api/municipalities/${province}`).then((response) => {
            setMunicipality(null);
            setMunicipalitiesOption(response.data.municipalities);
        });
    }, [province]);

    return (
        <>
            <H1 title="Edit User" />
            <form onSubmit={handleSubmit}>
                <div className="w-full rounded-lg shadow-xl border md:p-10 p-5 grid md:grid-cols-2 gap-3 auto-rows-auto">
                    <div className="col-span-2 grid md:grid-cols-2 gap-4">
                        <FormField
                            label="First Name"
                            error={form.errors.first_name}
                        >
                            <Input
                                value={form.data.first_name}
                                onChange={(e) =>
                                    form.setData("first_name", e.target.value)
                                }
                            />
                        </FormField>
                        <FormField
                            label="Middle Name"
                            error={form.errors.middle_name}
                            isRequired={false}
                        >
                            <Input
                                value={form.data.middle_name}
                                onChange={(e) =>
                                    form.setData("middle_name", e.target.value)
                                }
                            />
                        </FormField>
                        <FormField
                            label="Last Name"
                            error={form.errors.last_name}
                        >
                            <Input
                                value={form.data.last_name}
                                onChange={(e) =>
                                    form.setData("last_name", e.target.value)
                                }
                            />
                        </FormField>
                        <FormField
                            label="Phone Number"
                            error={form.errors.phone_number}
                        >
                            <Input
                                value={form.data.phone_number}
                                onChange={(e) =>
                                    form.setData("phone_number", e.target.value)
                                }
                            />
                        </FormField>
                        <FormField label="Email" error={form.errors.email}>
                            <Input
                                type="email"
                                value={form.data.email}
                                onChange={(e) =>
                                    form.setData("email", e.target.value)
                                }
                            />
                        </FormField>
                        <FormField label="Role" error={form.errors.role}>
                            <Select
                                value={form.data.role}
                                onValueChange={(value) =>
                                    form.setData("role", value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    {roles.map(
                                        (item) =>
                                            item.isVisible && (
                                                <SelectItem
                                                    key={item.value}
                                                    value={item.value}
                                                >
                                                    {item.label}
                                                </SelectItem>
                                            )
                                    )}
                                </SelectContent>
                            </Select>
                        </FormField>
                        <FormField
                            label="Remarks"
                            error={form.errors.remarks}
                            isRequired={false}
                        >
                            <Input
                                value={form.data.remarks}
                                onChange={(e) =>
                                    form.setData("remarks", e.target.value)
                                }
                            />
                        </FormField>
                    </div>
                </div>

                {form.data.role == "sub_admin" && (
                    <FormContainer className="grid-1">
                        <h1 className="font-bold text-lg text-primary-color border-b-2 pb-3 mb-5">
                            Assign Provinces
                        </h1>
                        <div className="flex items-center gap-2 mb-4">
                            <FormField
                                label="Provinces"
                                className="flex-1"
                                error={form.errors.assignedProvinces}
                            >
                                <SearchableSelect
                                    options={provinces}
                                    value={province}
                                    onChange={setProvince}
                                    placeholder="Search provinces..."
                                />
                            </FormField>
                            <Button
                                type="button"
                                onClick={addToProvinces}
                                className="mt-6"
                            >
                                Add Province
                            </Button>
                        </div>

                        {form.data.assignedProvinces.length > 0 && (
                            <div className="mt-4">
                                <h3 className="text-sm font-medium mb-2">
                                    Assigned Provinces (
                                    {form.data.assignedProvinces.length})
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {form.data.assignedProvinces.map(
                                        (provinceId) => (
                                            <div
                                                key={provinceId}
                                                className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm"
                                            >
                                                <span>
                                                    {provinces[provinceId]}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeProvince(
                                                            provinceId
                                                        )
                                                    }
                                                    className="ml-2 text-gray-500 hover:text-red-500"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </FormContainer>
                )}

                {form.data.role == "processer" && (
                    <FormContainer className="grid-1">
                        <h1 className="font-bold text-lg text-primary-color border-b-2 pb-3 mb-5">
                            Assign Municipalitites/Cities
                        </h1>
                        <FormField label="Province" className="flex-1">
                            <SearchableSelect
                                options={provinces}
                                value={province}
                                onChange={setProvince}
                                placeholder="Search province..."
                            />
                        </FormField>
                        <div className="flex items-center gap-2 mb-4">
                            <FormField
                                label="Municipalities"
                                className="flex-1"
                                error={form.errors.assignedMunicipalities}
                            >
                                <SearchableSelect
                                    options={municipalitiesOption}
                                    value={municipality}
                                    onChange={setMunicipality}
                                    placeholder="Search municipalities..."
                                />
                            </FormField>
                            <Button
                                type="button"
                                onClick={addToMunicipalities}
                                className="mt-6"
                            >
                                Add
                            </Button>
                        </div>

                        {form.data.assignedMunicipalities.length > 0 && (
                            <div className="mt-4">
                                <h3 className="text-sm font-medium mb-2">
                                    Assigned Municipalities (
                                    {form.data.assignedMunicipalities.length})
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {form.data.assignedMunicipalities.map(
                                        (municipalityId) => (
                                            <div
                                                key={municipalityId}
                                                className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm"
                                            >
                                                <span>
                                                    {
                                                        municipalitiesOption[
                                                            municipalityId
                                                        ]
                                                    }
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeMunicipality(
                                                            municipalityId
                                                        )
                                                    }
                                                    className="ml-2 text-gray-500 hover:text-red-500"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </FormContainer>
                )}

                <div className="mt-6 flex justify-end gap-4">
                    <Link href={route("admin.users.index")}>
                        <Button variant="outline">Cancel</Button>
                    </Link>
                    <Button type="submit">Update User</Button>
                </div>
            </form>
        </>
    );
};

export default Edit;
