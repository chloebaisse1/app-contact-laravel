import { ContactFormData, schemaModal } from "@/Schemas/Index";
import { PropsModal } from "@/types";
import { router, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import * as yup from "yup";
export default function ContactModal({
    showModal,
    modalType,
    contact,
    onClose,
}: PropsModal) {
    const { data, setData, post, put, errors, processing, reset } =
        useForm<ContactFormData>({
            first_name: contact?.first_name || "",
            last_name: contact?.last_name || "",
            email: contact?.email || "",
            phone: contact?.phone || "",
            address: contact?.address || "",
            city: contact?.city || "",
            postal_code: contact?.postal_code || "",
            country: contact?.country || "",
            notes: contact?.notes || "",
        });

    useEffect(() => {
        if (contact && modalType === "edit") {
            setData({
                first_name: contact.first_name,
                last_name: contact.last_name,
                email: contact.email,
                phone: contact.phone,
                address: contact.address,
                city: contact.city,
                postal_code: contact.postal_code,
            });
        } else if (modalType === "create") {
            reset();
        }
    }, [contact, modalType, showModal]);

    const validateForm = async (): Promise<boolean> => {
        try {
            await schemaModal.validate(data, { abortEarly: false });
            return true;
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                const validationErrors: Record<string, string> = {};
                error.inner.forEach((error) => {
                    if (error.path) {
                        validationErrors[error.path] = error.message;
                    }
                });
                return false;
            }
            return false;
        }
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = await validateForm();
        if (!isValid) return;

        if (modalType === "create") {
            post(route("contacts.store"), {
                preserveScroll: true,
                onSuccess: () => {
                    handleClose();
                    router.reload();
                },
            });
        } else {
            put(route("contacts.update", contact?.id), {
                preserveScroll: true,
                onSuccess: () => {
                    handleClose();
                    router.reload();
                },
                onError: (errors) => {
                    console.error(errors);
                },
            });
        }
    };

    const handleClose = () => {
        if (modalType === "create") {
            reset();
        }
        onClose();
    };

    return <div>ContactModal</div>;
}
