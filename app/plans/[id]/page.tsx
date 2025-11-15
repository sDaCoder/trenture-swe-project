import fs from "fs/promises"
import HotelInfo from '@/components/HotelInfo/HotelInfo'

interface Hotel {
    id: number
    name: string
    location: string
    address: string
    rating: number
    pricePerNight: number
    cuisineType: string[]
    personsPerRoom: number
    roomType: string
    availableRooms: number
    amenities: string[]
    description: string
    imageUrl: string
    contact: {
        phone: string
        email: string
    }
}

const page = async ({params}: {params: {id: string}}) => {

    const data = await fs.readFile("hotel-data.json", "utf-8");
    const hotels = JSON.parse(data);
    const { id } = await params
    const hotelId = Number.parseInt(id)
    const hotel = hotels.find((hotel: Hotel) => hotel.id === hotelId)
    

    return (
        <>
            <HotelInfo hotel={hotel} hotelId={hotelId} />
        </>
    )
}

export default page
