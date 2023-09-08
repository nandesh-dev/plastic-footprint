import { useState } from "react"
import { ItemCounter } from "../components"
import { hslToHex } from "../utils"
import {items, statements} from "../data" 

const AVERAGE_WEIGHT_PER_DAY = 150 //in grams

export function App(){
    const [data, setData] = useState(items)

    let totalWeight = 0
    data.forEach(({weight, count})=>{
        totalWeight += weight * count
    })

    const score = Math.round(100 - 100 * totalWeight / AVERAGE_WEIGHT_PER_DAY)
    let statement = ""
    const color = hslToHex(159 - ((score - 50) / 2),63,59)

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
            style={{backgroundColor: color}}
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
        </div>
        <section className="absolute h-full w-full overflow-y-scroll">
            <div className="h-[40%]"></div>
            <div className="bg-white rounded-t-2xl w-full pt-8 px-6">
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
            </div>
        </section>
    </div>
}