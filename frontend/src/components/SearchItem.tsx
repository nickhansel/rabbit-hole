import Link from 'next/link'
import React from 'react'

function SearchItem({ title, url, publishedDate, author, summary, handleSummarize, getSimilar, id }:
    { title: string, url: string, publishedDate: string, author: string, summary: string, handleSummarize: (ids: Array<string>) => void, getSimilar: (url: string) => void, id: string }) {
    return (
        <div className="flex flex-col w-screen sm:w-[40rem] border border-gray-300 rounded-md pl-8 pr-8 gap-4 pt-4 pb-4">
            <div className="flex flex-row gap-4 justify-between items-center h-auto pt-4 h-full break-word">
                <div className="flex flex-col gap-4 justify-between w-1/2 self-start break-word">
                    <Link href={url} target="_blank">
                        <h1 className="sm:text-xl text-md font-bold text-gray-800">{title}</h1>
                    </Link>
                    <p className="text-sm text-gray-600">{publishedDate}</p>
                    <p className="text-sm text-gray-600">{author}</p>
                </div>
                <div className="flex flex-col gap-4 justify-between items-center w-1/3 self-start">
                    <button
                        onClick={() => getSimilar(url)}
                        className="text-sm w-28 sm:w-48 h-8 sm:h-12 text-gray-600 bg-blue-100 rounded-md mt-3">
                        <h1 className="text-sm font-bold text-gray-600">Find Similar 🐇</h1>
                    </button>
                    <button
                        onClick={() => handleSummarize([id])}
                        className="text-sm w-28 sm:w-48 h-8 sm:h-12 text-gray-600 bg-blue-100 rounded-md mt-3 mb-8">
                        <h1 className="text-sm font-bold text-gray-600">Summarize</h1>
                    </button>
                </div>
            </div>
            {summary &&
                <div className="flex flex-col gap-4 pb-8">
                    <p className="text-md font-bold text-gray-600">Summary</p>
                    <p className="text-sm text-gray-600">{summary}</p>
                </div>
            }
        </div>
    )
}

export default SearchItem
