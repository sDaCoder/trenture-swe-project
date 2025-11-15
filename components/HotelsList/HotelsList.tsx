"use client"
import React from 'react'
import HotelCard from '../HotelCard/HotelCard'

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

interface HotelsListProps {
    hotels: Hotel[]
}

const HotelsList: React.FC<HotelsListProps> = ({ hotels }) => {
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-12 my-18">
                <div className='md:space-y-1 my-4'>
                    <h1 className='md:text-5xl text-3xl font-bold'>Our Plans </h1>
                    <p className='text-xs'>Curated list of hotels made for you</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hotels.map((hotel) => (
                        <HotelCard key={hotel.id} hotel={hotel} />
                    ))}
                </div>

                {/* {selectedHotel && <BookingModal hotel={selectedHotel} isOpen={isBookingOpen} onClose={handleCloseBooking} />} */}
            </div>
        </>
    )
}

export default HotelsList
