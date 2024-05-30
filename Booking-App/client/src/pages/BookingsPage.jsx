import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImage from "../PlaceImage";
import { Link } from "react-router-dom";
import BookingDate from "../BookingDate";
export default function BookingsPage(){
    const [bookings,setBookings]=useState([]);
    useEffect(()=>{
        axios.get('/bookings').then(response=>{
            setBookings(response.data);
        })
    },[])
    return(
        <div>
            <AccountNav/>
            <div className="flex flex-col gap-y-4">
                {bookings?.length > 0 && bookings.map(booking=>(
                    <Link to={`/account/bookings/${booking._id}`} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
                        <div className="w-48">
                           <PlaceImage place={booking.place} /> 
                        </div>
                        <div className="py-3 grow pr-3" >
                            <h2 className="text-xl">{booking.place.title}</h2>
                            <BookingDate booking={booking} />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}