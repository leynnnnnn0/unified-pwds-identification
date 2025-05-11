import Table from "@/Components/table/table";
import TableBody from "@/Components/table/table-body";
import TableHead from "@/Components/table/table-head";
import TD from "@/Components/table/td";
import TH from "@/Components/table/th";
import { Button } from "@/Components/ui/button";
import { Copy, LockIcon, PlusIcon, Trash, Trash2Icon } from "lucide-react";
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import FormField from "@/Components/form/form-field";
import { Input } from "@/Components/ui/input";
import axios from "axios";
import { useForm } from "@inertiajs/react";

const Index = ({ keys: initialKeys }) => {
    // Convert initial keys to a state so we can update it
    const [keys, setKeys] = useState(initialKeys);
    const [isAPIKeyModalOpen, setIsAPIKeyModalOpen] = useState(false);
    const [isCreateApiModalOpen, setIsCreateApiModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [apiKey, setApiKey] = useState("");
    const [name, setName] = useState("");

    const deleteForm = useForm({
        id: null,
        secret_key: null,
    });

    const openDeleteModal = (id, key) => {
        deleteForm.setData("id", id);
        deleteForm.setData("secret_key", key);

        setIsDeleteModalOpen(true);
    };

    const deleteApiKey = () => {
        deleteForm.delete(route("api-keys.destroy", deleteForm.data.id), {
            onSuccess: () => {
                // Remove the deleted key from state
                setKeys((prevKeys) => ({
                    ...prevKeys,
                    data: prevKeys.data.filter(
                        (key) => key.id !== deleteForm.data.id
                    ),
                }));

                setIsDeleteModalOpen(false);
                deleteForm.reset();
            },
        });
    };

    const handleCopy = () => {
        try {
            // Create a textarea for copying
            const textarea = document.createElement("textarea");
            textarea.value = apiKey;
            // Make the textarea out of viewport
            textarea.style.position = "fixed";
            textarea.style.left = "-999999px";
            textarea.style.top = "-999999px";
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();

            const successful = document.execCommand("copy");
            document.body.removeChild(textarea);

            if (successful) {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const generateAPIKey = () => {
        axios
            .post(
                route("api-keys.store", {
                    name: name,
                })
            )
            .then((res) => {
                // Store the unmasked key for display in the modal
                setApiKey(res.data.key);

                // Add the new key to the keys state with masked version
                const newKey = {
                    name: name || "Secret key",
                    secret_key: maskApiKey(res.data.key), // Use a front-end version of the mask function
                    last_used: "Never",
                    created_by: keys.data[0]?.created_by || "You", // Assuming same creator as other keys
                };

                // Update the keys state with the new key
                setKeys((prevKeys) => ({
                    ...prevKeys,
                    data: [newKey, ...prevKeys.data],
                }));

                // Open the key display modal
                setIsAPIKeyModalOpen(true);
                setIsCreateApiModalOpen(false);
                setName("");
            })
            .catch((e) => console.log(e));
    };

    // Function to mask API keys on the front-end (matching the backend masking)
    const maskApiKey = (apiKey, prefixChars = 8, suffixChars = 5) => {
        const length = apiKey.length;

        if (length <= prefixChars + suffixChars) {
            return "*".repeat(length);
        }

        const prefix = apiKey.substring(0, prefixChars);
        const suffix = apiKey.substring(apiKey.length - suffixChars);
        const maskedLength = length - prefixChars - suffixChars;

        return prefix + "*".repeat(maskedLength) + suffix;
    };

    return (
        <>
            <Dialog
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Revoke secret key</DialogTitle>
                        <DialogDescription className="text-xs">
                            This API key will immediately be disabled. API
                            requests made using this key will be rejected, which
                            could cause any systems still depending on it to
                            break. Once revoked, you'll no longer be able to
                            view or modify this API key.
                        </DialogDescription>
                    </DialogHeader>

                    <Input
                        className="cursor-default"
                        disabled={true}
                        value={deleteForm.data.secret_key}
                    />

                    <div className="flex justify-end mt-4">
                        <Button className="bg-red-500" onClick={deleteApiKey}>
                            Remove key
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog
                open={isAPIKeyModalOpen}
                onOpenChange={setIsAPIKeyModalOpen}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Save your key</DialogTitle>
                        <DialogDescription className="text-xs">
                            Please save your secret key in a safe place since
                            you won't be able to view it again. Keep it secure,
                            as anyone with your API key can make requests on
                            your behalf. If you do lose it, you'll need to
                            generate a new one.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex items-center space-x-2 mt-4 bg-gray-100 p-2 rounded-md">
                        <input
                            type="text"
                            readOnly
                            value={apiKey}
                            onClick={(e) => e.target.select()}
                            className="text-sm flex-1 bg-transparent border-none focus:outline-none focus:ring-0"
                        />
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCopy}
                            className="h-8 w-8 p-0"
                        >
                            <span className="sr-only">Copy</span>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="mt-2 text-xs">
                        {copied ? (
                            <p className="text-green-600">
                                Copied to clipboard!
                            </p>
                        ) : (
                            <p className="text-gray-500">
                                Click the key to select it, then press Ctrl+C
                                (or Cmd+C) to copy
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end mt-4">
                        <Button
                            className="bg-primary-color"
                            onClick={() => setIsAPIKeyModalOpen(false)}
                        >
                            I've saved my key
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
            <div className="flex items center justify-between border-b pb-5">
                <h1 className="font-bold text-xl text-gray-800 ">API Keys</h1>

                <Button
                    onClick={() => setIsCreateApiModalOpen(true)}
                    className="bg-primary-color"
                >
                    <PlusIcon /> Create new secret key
                </Button>

                <Dialog
                    open={isCreateApiModalOpen}
                    onOpenChange={setIsCreateApiModalOpen}
                >
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create new secret key</DialogTitle>
                            <DialogDescription className="text-xs">
                                This API key is tied to your user and can make
                                requests against the selected project. If you
                                are removed from the organization or project,
                                this key will be disabled.
                            </DialogDescription>
                        </DialogHeader>

                        <FormField label="Name" isRequired={false}>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormField>

                        <DialogFooter>
                            <Button
                                onClick={generateAPIKey}
                                className="bg-primary-color"
                            >
                                Create secret key
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex flex-col gap-3">
                <p className="text-gray-600 text-sm">
                    As an owner of this project, you can view and manage all API
                    keys in this project.
                </p>

                <p className="text-gray-600 text-sm">
                    Do not share your API key with others or expose it in the
                    browser or other client-side code. To protect your account's
                    security, OpenAI may automatically disable any API key that
                    has leaked publicly.
                </p>

                <p className="text-gray-600 text-sm">
                    View usage per API key on the{" "}
                    <span className="text-primary-color cursor-pointer hover:opacity-70">
                        Usage page
                    </span>{" "}
                    .
                </p>
            </div>

            <div className="mt-10">
                <Table>
                    <TableHead>
                        <TH>Name</TH>
                        <TH>Secret Key</TH>
                        <TH>Last Used</TH>
                        <TH>Created By</TH>
                        <TH>Actions</TH>
                    </TableHead>
                    <TableBody>
                        {keys.data.length > 0 &&
                            keys.data.map((item, index) => (
                                <tr key={item.secret_key + "-" + index}>
                                    <TD>{item.name}</TD>
                                    <TD>{item.secret_key}</TD>
                                    <TD>{item.last_used}</TD>
                                    <TD>{item.created_by}</TD>
                                    <TD>
                                        <button
                                            onClick={() =>
                                                openDeleteModal(
                                                    item.id,
                                                    item.secret_key
                                                )
                                            }
                                        >
                                            <Trash2Icon className="size-4 text-red-500" />
                                        </button>
                                    </TD>
                                </tr>
                            ))}
                    </TableBody>
                </Table>

               {keys.data.length == 0 &&  <div className="mt-24 flex flex-col items-center jsutify-center w-full gap-3">
                    <LockIcon/>
                <h1 className="font-bold text-black/90">
                Create an API key to access the UPID API
                </h1>

                <Button
                    onClick={() => setIsCreateApiModalOpen(true)}
                    className="bg-primary-color"
                >
                    <PlusIcon /> Create new secret key
                </Button>

                </div>}
            </div>
        </>
    );
};

export default Index;
