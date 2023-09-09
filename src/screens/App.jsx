import { useLayoutEffect, useReducer, useRef, useState } from "react"
import { ItemCounter } from "../components"
import { hslToHex } from "../utils"
import {items, statements} from "../data" 
import { MdInfoOutline as InfoIcon, MdArrowBackIosNew as BackIcon } from "react-icons/md"

import { Info } from "../screens"

const AVERAGE_WEIGHT_PER_DAY = 150 //in grams

export function App(){
    const [data, setData] = useState(items)
    const [infoScreenState, toggleInfoScreen] = useReducer((state)=>{
        return !state
    }, false)

    const spaceDivRef = useRef(null)

    useLayoutEffect(()=>{
        if(spaceDivRef.current == null)   return
        const scrollDist = parseInt(window.getComputedStyle(spaceDivRef.current).height.split("px")[0]) * 0.45
        spaceDivRef.current.scroll({top: scrollDist, behavior: "smooth"})
    })

    let totalWeight = 0
    data.forEach(({weight, count})=>{
        totalWeight += weight * count
    })

    const score = Math.round(100 - 100 * totalWeight / AVERAGE_WEIGHT_PER_DAY)
    let statement = ""
    const color1 = hslToHex(159 - ((score - 50) / 2),63,40)
    const color2 = hslToHex(159 - ((score - 50) / 2),63,59)

    if(score === 100){
        statement = statements[0]
    }   else if(score > 80){
        statement = statements[1]
    }   else if(score > 50){
        statement = statements[2]
    }   else if(score > 30){
        statement = statements[3]
    }   else if(score > 0){
        statement = statements[4]
    }   else{
        statement = statements[5]
    }

    return <div className="relative h-full">
        <div className="absolute h-full w-full"
            style={{backgroundColor: color2, backgroundImage: `linear-gradient(${color1},${color2} 25%, #FFFFFF 40%)`}}
        >
            <div className="flex flex-col items-center justify-center gap-4 h-[40%]">
                <p className="text-white text-3xl">Your Score</p>
                <div>
                    <span className="text-4xl opacity-0">%</span>
                    <span className="text-white font-semibold text-6xl">{score}</span>
                    <span className="text-white text-4xl">%</span>
                </div>
                <p className="mx-4 text-white text-center sm:font-medium h-16">{statement}</p>
            </div>
            <div className="flex flex-col p-8 h-[40%]">
                <div>
                    <span className="text-black text-md">Your plastic use each year:</span>
                </div>
                <div className="flex items-center gap-2 mt-4 py-2 px-4 rounded outline outline-1 outline-gray-300">
                    <span className="text-black text-xl font-semibold">{totalWeight * 360 / 1000}</span>
                    <span className="text-black text-lg"> Kilograms</span>
                </div>
                <div className="mt-6">
                    <span className="text-black text-md">Global Average use each year:</span>
                </div>
                <div className="flex items-center gap-2 mt-4 py-2 px-4 rounded outline outline-1 outline-gray-300">
                    <span className="text-black text-xl font-semibold">40</span>
                    <span className="text-black text-lg"> Kilograms</span>
                </div>
            </div>
        </div>
        <section className="absolute h-full w-full overflow-y-scroll" ref={spaceDivRef}>
            <div className="h-[40%] w-0">
            </div>
            <div className="h-[40%] w-0"></div>
            <div className="bg-white rounded-t-2xl w-full px-6">
                <div className="flex justify-center py-5"><div className="h-[2px] w-10 bg-gray-400"></div></div>
                <h3 className="font-semibold text-lg sm:font-medium">Pick the plastic items you</h3>
                <h3 className="font-semibold text-lg sm:font-medium">used today</h3>
                <br />
                <div className="flex flex-col gap-2">
                    {
                        data.map(({name, weight, image, count}, index)=>{
                            return <ItemCounter key={index} name={name} image={image} count={count} updateCount={(type)=>{
                                switch(type){
                                    case "add":
                                        data[index].count = count + 1
                                        break
                                    case "reduce":
                                        if(count <= 0) return
                                        data[index].count = count - 1
                                        break
                                    default:
                                        break
                                }
                                setData([...data])
                            }}/>
                        })
                    }
                </div>
                <br />
                <br />
            </div>
        </section>
        {
            infoScreenState &&
            <section className="absolute h-full w-full overflow-y-scroll bg-white">
                <div className="px-6 pt-8">
                    <button onClick={()=>{
                    toggleInfoScreen()
                }}>
                        <BackIcon/>
                    </button>
                </div>
                <div className="px-6">
                    <Info/>
                </div>
            </section>
        }
        {
            !infoScreenState && window.innerHeight > window.innerWidth &&
            <div className="flex justify-end w-full p-4 absolute">
                <button onClick={()=>{
                    toggleInfoScreen()
                }}>
                    <InfoIcon color="white" size={20}></InfoIcon>
                </button>
            </div>
        }
    </div>
}