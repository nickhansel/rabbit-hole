'use client'

import React, { useState } from 'react'

function SearchBox({ handleSearch }: { handleSearch: (searchQuery: string) => void }) {
    const [searchQuery, setSearchQuery] = useState<string>("")

    function validateQuery(query: string) {
        return query.trim().length > 0;
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    const doSearch = () => {
        if (!validateQuery(searchQuery)) {
            return
        }
        handleSearch(searchQuery)
    }

    return (
        <div className="border border-gray-300 rounded-md flex items-center w-full w-full md:w-[40rem] px-4 py-2">
            <form
                className="w-full"
                onSubmit={e => {
                    e.preventDefault()
                    doSearch()
                }}
            >
                <input
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full px-2 py-1 bg-transparent outline-none"
                    type="text"
                    placeholder="Search..."
                />
            </form>
            <button
                onClick={doSearch}
                className="outline-none focus:outline-none">
                <svg
                    className="w-5 text-gray-600 h-5 cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-4.35-4.35"
                    />
                    <circle cx="11" cy="11" r="8" />
                </svg>
            </button>
        </div>
    )
}

export default SearchBox;
