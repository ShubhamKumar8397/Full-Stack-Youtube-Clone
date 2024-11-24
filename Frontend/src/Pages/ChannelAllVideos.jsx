import React, { useEffect } from 'react'
import { ChannelVideo } from '../Components'
import { useGetChannelAllVideos } from '../ReactQueryAndMutations/ChannelQueries'
import { useParams } from 'react-router-dom'

const ChannelAllVideos = () => {

  const { username } = useParams()
  const { data, isLoading } = useGetChannelAllVideos({ username })
  useEffect(() => {
    if (data) {
      console.log(data)
    }
  }, [data])

  console.log("shubham")
  return isLoading ? <h1 className='text-6xl'>Loading</h1> 
  :
  (
    <div class="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 pt-2">
      {
         data.videos.map((cur) => (
            <div key={cur._id}>
              <ChannelVideo video={cur}/>
            </div>
         ))
      }

    </div>
  )
}

export default ChannelAllVideos