'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Trash2 } from "lucide-react"
import { useState } from "react"

interface DeleteByid {
    dataId: number,
    dataName: string,
    apiUrl: string,
    onRefresh?: () => void,
}

export function ConfirmDelete({ dataId, dataName, apiUrl, onRefresh }: DeleteByid) {

    const [isOpen, setIsOpen] = useState(false)
    const { toast } = useToast()

    const onSubmit = async () => {
        try {
            const response = await fetch(`/api/${apiUrl}/${dataId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            console.log('data: ', data);

            toast({
                title: 'Berhasil hapus data!',
                description: `Data ${data.name} berhasil dihapus.`,
                style: {
                    color: 'green',
                },
            });
            setIsOpen(false)
            if (onRefresh) onRefresh()
        } catch (error) {
            console.error('Error deleting data:', error);

            toast({
                title: `Gagal hapus data!`,
                description: 'Terjadi kesalahan saat menghapus data.',
                style: {
                    color: 'red',
                },
            });
        }
    };


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button size={'sm'} 
                className="bg-transparent shadow-none text-red-500 hover:bg-red-100 border border-slate-300"
                onClick={() => setIsOpen(true)}>
                    <Trash2 />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" aria-describedby="dialogDescription">
                <DialogHeader>
                    <DialogTitle>Peringatan!</DialogTitle>
                    <DialogDescription id="dialogDescription">
                        Konfirmasi Hapus Data
                    </DialogDescription>
                </DialogHeader>
                <div className="my-2">
                    Yakin untuk menghapus {dataName}?
                </div>

                <div className="flex justify-between">
                    <Button variant={'default'}>Batal</Button>
                    <Button className="bg-red-400 hover:bg-red-500" onClick={onSubmit}>Simpan</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
