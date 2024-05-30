export default function PlaceImage({place,index=0,className=null}){
    if(!place.photos?.length){
        return '';
    }
    if(!className){
        className='object-cover'
    }
    return(
        <img className src={'http://localhost:3000/uploads/' + place.photos[0]} alt=""/>
    )
}