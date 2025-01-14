interface StatusProps {
    data: string
}

export function Status({ data }: StatusProps) {
    return (
        <div className="bg-green-100 p-2 rounded-xl text-green-600 text-xs">
            <p>{data}</p>
        </div>
    )
}