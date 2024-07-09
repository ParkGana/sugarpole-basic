function Number({ value }: { value: number | string }) {
    return (
        <>
            {value === 'cancel' ? (
                <div className="grid items-center justify-center w-[65px] h-[45px] bg-[#404258] rounded-full cursor-pointer">
                    <img src="/icons/cancel.png" />
                </div>
            ) : (
                <div className="w-[65px] h-[45px] leading-[45px] bg-[#404258] text-2xl text-white text-center rounded-full cursor-pointer">
                    {value}
                </div>
            )}
        </>
    )
}

export default Number
