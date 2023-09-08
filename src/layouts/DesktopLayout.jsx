import { Children } from "react"

export function DesktopLayout({children}){
    const childrenArray = Children.toArray(children)
    return <section className="w-screen h-screen p-20">
        <div className="h-full grid grid-cols-[45vh_1fr] grid-rows-1 gap-14">
            <div className="outline outline-4 rounded-2xl overflow-hidden relative">
                <div className="absolute h-full w-full">
                    {
                        childrenArray[0]
                    }
                </div>
                <div className="absolute flex justify-center w-full">
                    <div className="bg-black w-16 h-2 rounded-b"></div>
                </div>
            </div>
            {
                childrenArray[1]
            }
        </div>
    </section>
}