interface HeaderLabel {
    label: string
}

export default function PageHeader({label}: HeaderLabel) {
    return(
        <div className=" text-slate-900 w-[20%] mt-5">
            <label className="font-bold text-lg">{label}</label>
        </div>
    )
}