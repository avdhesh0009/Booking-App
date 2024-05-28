import axios from 'axios'
import { useState } from 'react';
export default function PhotosUploader({addedPhotos,onChange}){
    const [photoLink,setPhotoLink]=useState('');
    async function addPhotoByLink(ev){
        ev.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link',{link:photoLink})
        onChange(prev=>[...prev,filename])
        setPhotoLink('');
    }
    async function uploadPhoto(ev){
        ev.preventDefault();
        const file=ev.target.files[0];
        if(!file){
            return "File not Found";
        }
        const formData=new FormData();
        formData.append('photos',file)
        try{
            const response = await axios.post('http://localhost:3000/upload',formData,{
                headers: {
                    'Content-Type':'multipart/form-data',
                },
            })
            onChange(prev=>[...prev,response.data.filename]);
        }
        catch(error) {
            console.log('Error uploading file');
        }
    }
    return(
        <>
           <div className="flex gap-2">
                <input type='text' placeholder={"Add using a link ...jpg"}
                    value={photoLink}
                    onChange={ev=>setPhotoLink(ev.target.value)}
                />
                <button className="bg-gray-200 px-4 rounded-2xl"
                onClick={addPhotoByLink}
                >Add&nbsp;Photo</button>
            </div>
            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {
                    addedPhotos.length > 0 && addedPhotos.map((link,index)=>(
                        <div key={index} className="h-32 flex ">
                        <p></p>
                        <img className="rounded-2xl w-full object-cover" src={'http://localhost:3000/uploads/'+link} alt=""/>
                        </div>
                    ))
                }
                <label className="h-32 flex cursor-pointer gap-1 items-center border bg-transparent rounded-2xl justify-center text-2xl text-gray-600">
                    <input type="file" className="hidden" onChange={uploadPhoto}/>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                    </svg>
                        Upload
                </label>
            </div>
        </>
    )
}