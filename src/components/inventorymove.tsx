"use client";

import { useState } from "react";
import { ButtonPrimary } from "./buttons";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

enum FormType {
    MOVE_CONTAINERS,
    TRANSFER_ITEMS
}

export function NewInventoryMoveBtnAndForm(){
    const [open, setOpen] = useState(false);
    const [formType, setFormType] = useState(FormType.MOVE_CONTAINERS);

    const renderForm = () => {
        switch (formType) {
            case FormType.MOVE_CONTAINERS:
                return (
                    <form className="flex flex-col gap-4">
                        <label className="flex flex-col">
                            <span className="mb-1 font-medium">Move From</span>
                            <input type="text" name="moveFrom" className="border rounded px-2 py-1" required />
                        </label>
                        <label className="flex flex-col">
                            <span className="mb-1 font-medium">Move To</span>
                            <input type="text" name="moveTo" className="border rounded px-2 py-1" required />
                        </label>
                        <div className="flex gap-2 justify-end">
                            <button type="button" className="px-4 py-2 rounded bg-gray-200" onClick={()=>setOpen(false)}>
                                Cancel
                            </button>
                            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
                                Move
                            </button>
                        </div>
                    </form>
                );
            case FormType.TRANSFER_ITEMS:
                return (
                    <form className="flex flex-col gap-4">
                        <label className="flex flex-col">
                            <span className="mb-1 font-medium">Transfer Items From</span>
                            <input type="text" name="moveFrom" className="border rounded px-2 py-1" required />
                        </label>
                        <label className="flex flex-col">
                            <span className="mb-1 font-medium">Transfer Items To</span>
                            <input type="text" name="moveTo" className="border rounded px-2 py-1" required />
                        </label>
                        <label className="flex flex-col">
                            <span className="mb-1 font-medium">Qty</span>
                            <input type="number" name="qty" min="1" className="border rounded px-2 py-1" required />
                        </label>
                        <div className="flex gap-2 justify-end">
                            <button type="button" className="px-4 py-2 rounded bg-gray-200" onClick={()=>setOpen(false)}>
                                Cancel
                            </button>
                            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
                                Move
                            </button>
                        </div>
                    </form>
                );
            default:
                return null;
        }
    }

    return (
        <>
            <ButtonPrimary onClick={()=>{setFormType(FormType.MOVE_CONTAINERS); setOpen(true)}}>
                Move Containers
            </ButtonPrimary>
            <ButtonPrimary onClick={()=>{setFormType(FormType.TRANSFER_ITEMS); setOpen(true)}}>
                Transfer Items
            </ButtonPrimary>

            <Dialog
                open={open}
                onClose={()=>{setOpen(false)}}>
                    <DialogBackdrop className="fixed inset-0 bg-black/30" />
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <DialogPanel
                                transition
                                className="w-full max-w-md rounded-xl bg-white p-4 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                            >
                                {renderForm()}
                            </DialogPanel>
                        </div>
                    </div>
            </Dialog>
        </>
    );
}