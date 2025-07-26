import React, { useEffect } from 'react'
import { ChannelVideo } from '../Components'
import { useGetChannelAllVideos } from '../ReactQueryAndMutations/ChannelQueries'
import { useParams } from 'react-router-dom'
import { useInView } from "react-intersection-observer";

const ChannelAllVideos = () => {

  const { username } = useParams()
  const { ref, inView } = useInView()
  const { data, isFetching, hasNextPage, fetchNextPage, isFetched } = useGetChannelAllVideos({ username })


  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage])



  return !isFetched ? <h1 className='text-6xl'>Loading</h1>
    :
    (
      <div class="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 pt-2">
        {
          data?.pages.map(cur => (
            cur?.videos.map((cur) => (
              <div key={cur._id}>
                <ChannelVideo video={cur} />
              </div>
            ))
          ))
        }

        {hasNextPage && (
          <div ref={ref} className='mt-9 w-full flex justify-center'>
            <img src="../Public/Logo/loading.svg" alt="" />
          </div>
        )}
      </div>
    )
}

export default ChannelAllVideos