import React from 'react'
import Image from 'next/image'

function Hero() {
    return (
        <div className="flex flex-col items-center justify-center w-96 text-center">
            <Image
                src="/rabbit.jpeg"
                alt="Rabbit Hole"
                width={300}
                height={300}
            />
            <h1 className="text-4xl font-bold text-gray-800 pt-8 pb-4">Rabbit Hole 🐇</h1>
            <p className="text-md text-gray-600">Search for a topic, find webpages, find related webpages, and go down the rabbit hole.</p>
        </div>
    )
}

export default Hero
