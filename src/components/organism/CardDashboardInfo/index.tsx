import * as React from "react"

import {
    Card,
    CardContent,

} from "@/components/ui/card"

export function CardDashboardInfo() {
    return (
        <Card className="w-[200px] shadow-none">
            <CardContent>
                <div>
                    <p className="mt-5 text-center">
                        Jumlah Transaksi
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
