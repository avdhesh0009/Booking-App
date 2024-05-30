import { Link} from "react-router-dom"
import AccountNav from "../AccountNav";
import { useEffect,useState } from "react";
import axios from "axios";
import PlaceImage from "../PlaceImage";
export default function PlacesPage(){
    const [places,setPlaces]=useState([]);
    useEffect(()=>{
        axios.get('/user-places').then(({data})=>{
            console.log("This are the places"+data);
            setPlaces(data);
        })
    },[])
    return(
        <div>
            <AccountNav/>
            List of all added new places
            <div className="text-center">
                <Link className='inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full' to={'/account/places/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add New Place
                </Link>
            </div>
            <div className="mt-4">
                {places.length>0 && places.map((place,index)=>(
                    <Link key={index} to={'/account/places/'+place._id} className="flex gap-4 cursor-pointer bg-gray-200 p-4 rounded-2xl">
                      <div className="flex bg-gray-300 p-4 rounded-lg ">
                        <div className="flex w-32 h-32 gap-2 grow shrink-0">
                            <PlaceImage place={place} />
                        </div>
                        <div className="flex-grow ml-4">
                            <h2 className="text-xl font-bold">{place.title}</h2>
                            <p className="text-sm mt-2 text-gray-700">{place.description}</p>
                        </div>
                     </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}