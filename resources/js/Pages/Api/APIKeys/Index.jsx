import Table from "@/Components/table/table";
import TableBody from "@/Components/table/table-body";
import TableHead from "@/Components/table/table-head";
import TD from "@/Components/table/td";
import TH from "@/Components/table/th";
import { Button } from "@/Components/ui/button";
import {
    Copy,
    Loader2,
    LockIcon,
    PlusIcon,
    Trash,
    Trash2Icon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
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
import { Link, router, useForm } from "@inertiajs/react";
import toast from "react-hot-toast";

const Index = ({ keys: initialKeys }) => {
    const [keys, setKeys] = useState(initialKeys);
    const [isAPIKeyModalOpen, setIsAPIKeyModalOpen] = useState(false);
    const [isCreateApiModalOpen, setIsCreateApiModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [apiKey, setApiKey] = useState("");
    const [name, setName] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const deleteForm = useForm({
        id: null,
        secret_key: null,
    });

    const openDeleteModal = (id, key) => {
        console.log(keys);
        deleteForm.setData("id", id);
        deleteForm.setData("secret_key", key);

        setIsDeleteModalOpen(true);
    };

    const deleteApiKey = () => {
        setIsDeleting(true);
        deleteForm.delete(route("api-keys.destroy", deleteForm.data.id), {
            preserveScroll: true,
            onSuccess: (page) => {
                // Use the fresh data from the server response
                setKeys(page.props.keys);

                setIsDeleteModalOpen(false);
                deleteForm.reset();
                toast.success("API key destroyed.");
            },
            onFinish: () => {
                setIsDeleting(false);
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
        setIsCreating(true);
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
                    id: res.data.key_id,
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

                console.log(keys);

                // Open the key display modal
                setIsAPIKeyModalOpen(true);
                setIsCreateApiModalOpen(false);
                setName("");

                toast.success("API key created!");
            })
            .catch((e) => console.log(e))
            .finally((e) => setIsCreating(false));
    };

    // Function to mask API keys on the front-end (matching the backend masking)
    const maskApiKey = (apiKey, prefixChars = 8, suffixChars = 5) => {
        const length = apiKey.length;
        const maxVisible = prefixChars + suffixChars;

        // If the key is shorter than our desired display length, mask everything
        if (length <= maxVisible) {
            return "*".repeat(Math.min(18, length));
        }

        const prefix = apiKey.substring(0, prefixChars);
        const suffix = apiKey.substring(apiKey.length - suffixChars);

        // Calculate how many asterisks we need to reach exactly 18 characters
        const maskLength = 18 - (prefixChars + suffixChars);

        return prefix + "*".repeat(maskLength) + suffix;
    };

    return (
        <div className="p-4 md:p-6">
            <Dialog
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
            >
                <DialogContent className="w-full max-w-[95vw] sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-lg sm:text-xl">
                            Revoke secret key
                        </DialogTitle>
                        <DialogDescription className="text-xs sm:text-sm">
                            This API key will immediately be disabled. API
                            requests made using this key will be rejected, which
                            could cause any systems still depending on it to
                            break. Once revoked, you'll no longer be able to
                            view or modify this API key.
                        </DialogDescription>
                    </DialogHeader>

                    <Input
                        className="cursor-default text-xs sm:text-sm"
                        disabled={true}
                        value={deleteForm.data.secret_key}
                    />

                    <div className="flex justify-end mt-4">
                        <Button
                            disabled={isDeleting}
                            className="bg-red-500 text-xs sm:text-sm"
                            onClick={deleteApiKey}
                        >
                            {isDeleting && (
                                <Loader2 className="animate-spin mr-2 size-3 sm:size-4" />
                            )}
                            Remove key
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog
                open={isAPIKeyModalOpen}
                onOpenChange={setIsAPIKeyModalOpen}
            >
                <DialogContent className="w-full max-w-[95vw] sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-lg sm:text-xl">
                            Save your key
                        </DialogTitle>
                        <DialogDescription className="text-xs sm:text-sm">
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
                            className="text-xs sm:text-sm flex-1 bg-transparent border-none focus:outline-none focus:ring-0"
                        />
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCopy}
                            className="h-8 w-8 p-0"
                        >
                            <span className="sr-only">Copy</span>
                            <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                    </div>

                    <div className="mt-2">
                        {copied ? (
                            <p className="text-green-600 text-xs sm:text-sm">
                                Copied to clipboard!
                            </p>
                        ) : (
                            <p className="text-gray-500 text-xs sm:text-sm">
                                Click the key to select it, then press Ctrl+C
                                (or Cmd+C) to copy
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end mt-4">
                        <Button
                            className="bg-black text-xs sm:text-sm"
                            onClick={() => setIsAPIKeyModalOpen(false)}
                        >
                            I've saved my key
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 gap-4">
                <h1 className="font-bold text-lg sm:text-xl text-gray-800">
                    API Keys
                </h1>

                <Button
                    onClick={() => setIsCreateApiModalOpen(true)}
                    className="bg-black text-xs sm:text-sm"
                >
                    <PlusIcon className="size-3 sm:size-4 mr-1" /> Create new
                    secret key
                </Button>

                <Dialog
                    open={isCreateApiModalOpen}
                    onOpenChange={setIsCreateApiModalOpen}
                >
                    <DialogContent className="w-full max-w-[95vw] sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-lg sm:text-xl">
                                Create new secret key
                            </DialogTitle>
                            <DialogDescription className="text-xs sm:text-sm">
                                This API key is tied to your user and can make
                                requests against the selected project. If you
                                are removed from the organization or project,
                                this key will be disabled.
                            </DialogDescription>
                        </DialogHeader>

                        <FormField label="Name (Optional)" isRequired={false}>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="text-xs sm:text-sm"
                            />
                        </FormField>

                        <DialogFooter>
                            <Button
                                disabled={isCreating}
                                onClick={generateAPIKey}
                                className="bg-black text-xs sm:text-sm"
                            >
                                {isCreating && (
                                    <Loader2 className="animate-spin mr-2 size-3 sm:size-4" />
                                )}
                                Create secret key
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex flex-col gap-3 mt-4">
                <p className="text-gray-600 text-xs sm:text-sm">
                    As an owner of this project, you can view and manage all API
                    keys in this project.
                </p>

                <p className="text-gray-600 text-xs sm:text-sm">
                    Do not share your API key with others or expose it in the
                    browser or other client-side code. To protect your account's
                    security, OpenAI may automatically disable any API key that
                    has leaked publicly.
                </p>

                <p className="text-gray-600 text-xs sm:text-sm">
                    View usage per API key on the{" "}
                    <Link
                        href="/api/usage"
                        className="text-black cursor-pointer hover:opacity-70"
                    >
                        Usage page
                    </Link>{" "}
                    .
                </p>
            </div>

            <div className="mt-6 sm:mt-10 overflow-x-auto">
                <Table>
                    <TableHead>
                        <TH>Name</TH>
                        <TH>Secret Key</TH>
                        <TH className="sm:table-cell hidden">Last Used</TH>
                        <TH className="sm:table-cell hidden">Created By</TH>
                        <TH>Actions</TH>
                    </TableHead>
                    <TableBody>
                        {keys.data.length > 0 &&
                            keys.data.map((item, index) => (
                                <tr key={item.secret_key + "-" + index}>
                                    <TD>{item.name}</TD>
                                    <TD>{item.secret_key}</TD>
                                    <TD className="sm:table-cell hidden">
                                        {item.last_used}
                                    </TD>
                                    <TD className="sm:table-cell hidden">
                                        {item.created_by}
                                    </TD>
                                    <TD>
                                        <button
                                            onClick={() =>
                                                openDeleteModal(
                                                    item.id,
                                                    item.secret_key
                                                )
                                            }
                                        >
                                            <Trash2Icon className="size-3 sm:size-4 text-red-500" />
                                        </button>
                                    </TD>
                                </tr>
                            ))}
                    </TableBody>
                </Table>

                {keys.data.length == 0 && (
                    <div className="mt-12 sm:mt-24 flex flex-col items-center justify-center w-full gap-3">
                        <LockIcon className="size-6 sm:size-8" />
                        <h1 className="font-bold text-black/90 text-sm sm:text-base">
                            Create an API key to access the UPID API
                        </h1>

                        <Button
                            onClick={() => setIsCreateApiModalOpen(true)}
                            className="bg-black text-xs sm:text-sm"
                        >
                            <PlusIcon className="size-3 sm:size-4 mr-1" />{" "}
                            Create new secret key
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Index;
