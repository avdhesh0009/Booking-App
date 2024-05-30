import { useState } from "react";
export default function PlaceGallery({place}){
    const [showAllPhotos,setShowAllPhotos]=useState(false);
    if(showAllPhotos){
        return(
            <div className="absolute inset-0 bg-black text-white min-h-screen">
            <div className="bg-black p-8 grid gap-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)} className="flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                            </svg>
                            Close photos
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-4">
                        {place?.photos?.length > 0 && place.photos.map(photo => (
                            <div key={photo}>
                                <img className="w-full h-auto object-cover" src={'http://localhost:3000/uploads/' + photo} alt="" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
    return(
        <div className="relative ">
            <div className="grid gap-1 md:grid-cols-2 md:grid-rows-2 rounded-2xl overflow-hidden">
                {/* Column 1 - Full height photo */}
                <div className="md:row-span-2 h-64">
                    {place.photos?.[0] && (
                        <img onClick={()=>setShowAllPhotos(true)} src={'http://localhost:3000/uploads/'+place.photos[0]} alt="Photo 1" className="object-cover cursor-pointer w-full h-full"/>
                    )}
                </div>

                {/* Column 2 - Two vertically stacked photos */}
                <div className="w-full h-32">
                    {place.photos?.[1] && (
                        <img onClick={()=>setShowAllPhotos(true)} src={'http://localhost:3000/uploads/'+place.photos[1]} alt="Photo 1" className="object-cover cursor-pointer w-full h-full"/>
                    )}
                </div>
                <div className="w-full h-32 overflow-hidden">
                    {place.photos?.[2] && (
                        <img onClick={()=>setShowAllPhotos(true)} src={'http://localhost:3000/uploads/' +place.photos[2]} alt="Photo 1" className="object-cover cursor-pointer relative w-full h-full"/>
                    )}
                </div>
            </div>
            <button className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500"
            onClick={()=>setShowAllPhotos(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clip-rule="evenodd" />
            </svg>
            Show more photos</button>
        </div>
    )
}