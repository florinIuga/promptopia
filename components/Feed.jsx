'use client'

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) =>  (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}/>
      ))}
    </div>
  )
} 

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [filteredPosts, setFilteredPosts] = useState([])
  const [originalPosts, setOriginalPosts] = useState([])

  const handleSearchChange = (e) => {
   clearTimeout(searchTimeout)
   setSearchText(e.target.value)

   // debounce method
   setSearchTimeout(
    setTimeout(() => {
      const searchResult = filterPrompts(searchText)
      setFilteredPosts(searchResult)
    }, 400)
   )
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName)

    const searchResult = filterPrompts(tagName)
    setFilteredPosts(searchResult)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch ('/api/prompt')
      const data = await response.json()

      setOriginalPosts(data)
    }

    fetchPosts()
  }, [])

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i")
    return originalPosts.filter(
      (item) => 
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    )
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

    {searchText ? (
        <PromptCardList
          data={filteredPosts}
          handleTagClick={handleTagClick}
        />
    ) :  (
      <PromptCardList
        data={originalPosts}
        handleTagClick={handleTagClick}
        />
    )}
    </section>
  )
}

export default Feed