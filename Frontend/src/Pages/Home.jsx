import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { videoApi } from '../EndPoints/channel'
import { useInView } from "react-intersection-observer";
import { ChannelVideo, HomeVideoCard } from '../Components';
import { useInfiniteQuery } from '@tanstack/react-query';





const Home = () => {

  const { ref, inView } = useInView()

  const getAllVideosOfHome = async ({ pageParam = 1, }) => {
    try {
      const response = await videoApi.get(`/home-videos?page=${pageParam}`,
        { headers: { 'Content-Type': 'application/json' } }
      )
      return response.data.data
    } catch (error) {
      throw error.response
    }
  }

  const { data, isFetching, hasNextPage, fetchNextPage, isFetched } = useInfiniteQuery({
    queryKey: ["getAllHomeVideos"],
    queryFn: ({ pageParam = 1 }) => getAllVideosOfHome({ pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.page + 1 : undefined;
    }
  })


  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage])


  return !isFetched ? <h1 className='text-6xl'>Loading</h1>
    :
    (
      <div class="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 pt-2 px-2">
        {
          data?.pages.map(cur => (
            cur?.videos.map((cur) => (
              <div key={cur._id}>
                <HomeVideoCard video={cur} />
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

export default Home