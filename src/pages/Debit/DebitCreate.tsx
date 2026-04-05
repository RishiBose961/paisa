import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useSelector } from "react-redux"
import CheckEnvironment from "@/CheckEnvironment/CheckEnvironment"

const DebitCreate = () => {
    const { base_url } = CheckEnvironment();
     const queryClient = useQueryClient();
    const { user } = useSelector(
        (state: {
            auth: {
                isAuthenticated: boolean;
                user: { token: string; _id: string; name: string; avatar: string; email: string };
            };
        }) => state.auth
    );

    const [formData, setFormData] = useState({
        amount: "",
        date: "",
        type: "",
        about: "",
    })

    const mutation = useMutation({
        mutationFn: async (data: {
            amount: number;
            date: string;
            type: string;
            about: string;
        }) => {
            const res = await axios.post(`${base_url}/api/debits/create`, data,{
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
            return res.data
        },
        onSuccess: () => {
            alert("Debit created successfully ✅")            
            queryClient.invalidateQueries({ queryKey: ["debits"] })
            setFormData({
                amount: "",
                date: "",
                type: "",
                about: ""
            })
        },
        onError: (err: { response: { data: { message: string } } }) => {
            console.error(err)
            alert("Error creating debit ❌")
        }
    })

    const handleSubmit = () => {
        mutation.mutate({
            amount: Number(formData.amount),
            date: formData.date,
            type: formData.type,
            about: formData.about
        })
    }

    return (
        <div className="flex flex-col gap-4 mt-3 p-2">
            <h1 className="text-lg font-bold">Create Debit</h1>

            <Label>Amount</Label>
            <Input
                type="number"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                }
            />

            <Label>Date</Label>
            <Input
                type="date"
                value={formData.date}
                onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                }
            />

            <Label>Type of Debit</Label>
            <Select
                onValueChange={(value: string | null) =>
                    value && setFormData({ ...formData, type: value })
                }
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="mobile">MOBILE</SelectItem>
                        <SelectItem value="gross">GROSS</SelectItem>
                        <SelectItem value="lic-premium">LIC PREMIUM</SelectItem>
                        <SelectItem value="uti">UTI</SelectItem>
                        <SelectItem value="food">FOOD</SelectItem>
                        <SelectItem value="doctor">DOCTOR</SelectItem>
                        <SelectItem value="ecom">ECOM (Shopping)</SelectItem>
                        <SelectItem value="dcard">DCARD</SelectItem>
                        <SelectItem value="exm">EXM FORM</SelectItem>
                        <SelectItem value="friend">FRIEND</SelectItem>
                        <SelectItem value="computer">Computer</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Label>About</Label>
            <Input
                type="text"
                placeholder="Enter about"
                value={formData.about}
                onChange={(e) =>
                    setFormData({ ...formData, about: e.target.value })
                }
            />

            <Button
                className="w-full rounded-xl cursor-pointer"
                onClick={handleSubmit}
                disabled={mutation.isPending}
            >
                {mutation.isPending ? "Submitting..." : "Submit"}
            </Button>
        </div>
    )
}

export default DebitCreate