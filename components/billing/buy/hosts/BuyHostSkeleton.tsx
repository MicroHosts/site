const BuyHostCardSkeleton = () => {
    return (
        <div className="mt-4 bg-zinc-800 mx-auto rounded animate-pulse">
            <div className="py-4 px-6 justify-between text-sm flex flex-col md:flex-row">
                <div>
                    <div className="font-bold text-lg">
                        <div className="h-2  rounded-full">
                        </div>
                    </div>
                    <div className="mt-2 text-base">
                        <div className="h-2  rounded-full">
                        </div>
                    </div>
                    <div className="font-bold mt-4 md:[&>*]:pr-4 md:[&>*]:pt-0 [&>*]:pt-2 text-sm md:flex-row flex flex-col flex-wrap">
                        <div>
                            <div className="h-2  rounded-full">
                            </div>
                        </div>
                        <div>
                            <div className="h-2  rounded-full">
                            </div>
                        </div>
                        <div>
                            <div className="h-2  rounded-full">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:my-auto my-4 text-base">
                    <div className="h-2  rounded-full">
                    </div>
                </div>
                <div className="my-auto">
                </div>
            </div>
        </div>
    )
}

export default BuyHostCardSkeleton
