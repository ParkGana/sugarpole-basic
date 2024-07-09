function Sign({ value }: { value: string }) {
    return (
        <>
            {value === 'calculate' ? (
                <div className="grid items-center justify-center w-full h-[45px] bg-[#b2b2b2] rounded-full cursor-pointer">
                    <img src={`/icons/${value}.png`} />
                </div>
            ) : (
                <div className="grid items-center justify-center w-[45px] h-[45px] bg-[#f49d1a] rounded-full cursor-pointer">
                    <img src={`/icons/${value}.png`} />
                </div>
            )}
        </>
    )
}

export default Sign
