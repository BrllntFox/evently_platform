import { IEvent } from '@/lib/mongodb/database/models/event.model'
import React from 'react'
import Card from './Card'

type CollectionProps = {
    data: IEvent[],
    emptyTitle:string,
    emptyStateSubtext:string,
    limit:number,
    page:number|string,
    totalPages?:number,
    collectionType?:"Events_Organizers"|"My_Tickets"|"All_Events",
    urlParamName?:string
}

const Collection = ({
    data,
    emptyTitle,
    emptyStateSubtext,
    limit,
    page,
    totalPages = 0,
    collectionType,
    urlParamName
}:CollectionProps) => {
  console.log(data)
  return (
    <div>
    
    {data.length>0 ? (
      <div className="flex flex-col items-center gap-10">
        <ul className=' grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 xl:gap-10'>
          {data.map((event)=>{
            const hasOrderLink = collectionType ==='Events_Organizers';
            const hidePrice = collectionType === 'My_Tickets';
            return (
              <li key={event._id} className='flex justify-center'>
<Card event={event} hasOrderLink={hasOrderLink} hidePrice={hidePrice}/>
              </li>
            )
          })}
        </ul>
      </div>
    ):(<div className='flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-24 text-center'>

      <h3 className='p-bold-20 md:h5-bold'>{emptyTitle}</h3>
      <p className='p-regular-14'>{emptyStateSubtext}</p>
    </div>
    )}
    </div>
  )
}

export default Collection