'use client'

import SearchBox from '@/components/SearchBox';
import Hero from '@/components/Hero';
import { search, summarize, findSimilar } from '@/service/routes';
import SearchItem from '@/components/SearchItem';
import { useState } from 'react'

export default function Home() {
  const [searchResults, setSearchResults] = useState<any>([])
  const [summarizedResults, setSummarizedResults] = useState<any>({}) // this is a dictionary of id -> summary
  const [loading, setLoading] = useState<boolean>(false)
  const [rabbitHoleCount, setRabbitHoleCount] = useState<number>(0)

  const handleSearch = (searchQuery: string) => {
    setLoading(true)
    search(searchQuery).then((response) => {
      setSearchResults(response.results)
      setLoading(false)
    });
  }

  const handleSummarize = (ids: Array<string>) => {
    setLoading(true)
    summarize(ids).then((response) => {
      setSummarizedResults((prevState: any) => {
        const newSummarizedResults = { ...prevState }
        ids.forEach((id) => {
          newSummarizedResults[id] = response["text"]
        })
        return newSummarizedResults
      }
      )
      setLoading(false)
    })
  }

  const getSimilar = (url: string) => {
    setLoading(true)
    findSimilar(url).then((response) => {
      if (!response) {
        alert("No similar results found.")
        return;
      }
      setSearchResults(response.results)
      setRabbitHoleCount((prevState) => prevState + 1)
      setLoading(false)
    })
  }

  const handleReset = () => {
    setSearchResults([])
    setRabbitHoleCount(0)
    setSummarizedResults({})
  }

  const SpinnerOverlay = () => {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-20 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center animate-spin">
          <span className="text-4xl" role="img" aria-label="Spinner emoji">🐇</span>
        </div>
      </div>
    );
  };


  return (
    <main className="flex min-h-screen w-full flex-col items-center gap-10 p-24">
      {loading && <SpinnerOverlay />}
      <Hero />
      <SearchBox handleSearch={handleSearch} />
      {searchResults && searchResults.length !== 0 &&
        <div className="flex flex-row gap-4 justify-between items-center w-screen sm:w-[40rem] sm:pl-4 sm:pr-4 pl-8 pr-12">
          <h1 className="sm:text-4xl text-md font-bold text-gray-800">Search Results</h1>
          <p className="text-xl font-bold text-gray-800">🐇 - {rabbitHoleCount}</p>
          <button
            onClick={() => handleReset()}
            className="text-sm w-28 sm:w-48 h-8 sm:h-12 text-gray-600 bg-blue-100 rounded-md mt-3">
            <h1 className="sm:text-sm text-xs font-bold text-gray-600">Reset Journey</h1>
          </button>
        </div>
      }
      {searchResults.map((result: any) => (
        <SearchItem
          key={result.url}
          id={result.id}
          getSimilar={getSimilar}
          handleSummarize={handleSummarize}
          summary={summarizedResults ? summarizedResults[result.id] : null}
          title={result.title ? result.title : "No title"}
          url={result.url ? result.url : "No url"}
          publishedDate={result.publishedDate ? result.publishedDate : "No published date"}
          author={result.author ? result.author : "No author"}
        />
      ))}
    </main>
  )
}
