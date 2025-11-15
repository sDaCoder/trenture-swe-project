"use client"
import Link from 'next/link'
import { Button } from '../ui/button'
import { ArrowLeft, DoorOpen, Mail, MapPin, Phone, Star, Users, Utensils, Wifi } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { initiatePayment } from '@/actions/initiatePayment'
import { useRouter } from 'next/navigation'

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

interface HotelInfoProps {
    hotelId: number,
    hotel: Hotel
}

const HotelInfo = ({ hotelId, hotel }: HotelInfoProps) => {

    const router = useRouter()

    const handlePay = async (amount: number) => {
        try {
            const response = await initiatePayment(amount)
            if(response)
            {
                router.push(response.redirectUrl)
            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    return (
        <>
            {/* <div>This tells us about the information of hotel number: {hotelId}</div>  */}
            <div className="min-h-screen bg-background mt-16">
                {/* Header with back button */}
                <div className="sticky top-0 z-10 bg-background border-b">
                    <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
                        <Link href="/plans">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft size={20} />
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold">{hotel.name}</h1>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Hero Image */}
                            <div className="rounded-lg overflow-hidden h-96 bg-muted">
                                <img src={hotel.imageUrl || "/placeholder.svg"} alt={hotel.name} className="w-full h-full object-cover" />
                            </div>

                            {/* Hotel Info */}
                            <Card>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <CardTitle className="text-3xl mb-2">{hotel.name}</CardTitle>
                                            <CardDescription className="flex items-center gap-2 text-base">
                                                <MapPin size={18} />
                                                {hotel.location}
                                            </CardDescription>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center gap-2 justify-end mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={20}
                                                        className={
                                                            i < Math.floor(hotel.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                                                        }
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-lg font-semibold">{hotel.rating} / 5</p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-base text-muted-foreground">{hotel.description}</p>
                                    <p className="text-sm text-muted-foreground flex items-start gap-2">
                                        <MapPin size={16} className="mt-1 shrink-0" />
                                        {hotel.address}
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Room Details */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Room Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg">
                                            <DoorOpen size={24} className="text-primary" />
                                            <div>
                                                <p className="text-sm text-muted-foreground">Room Type</p>
                                                <p className="font-semibold">{hotel.roomType}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg">
                                            <Users size={24} className="text-primary" />
                                            <div>
                                                <p className="text-sm text-muted-foreground">Capacity</p>
                                                <p className="font-semibold">{hotel.personsPerRoom} persons</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                        <p className="text-sm text-muted-foreground">Available Rooms</p>
                                        <p className="text-2xl font-bold text-green-600">{hotel.availableRooms} rooms</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Amenities */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Amenities</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {hotel.amenities.map((amenity) => (
                                            <div key={amenity} className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg">
                                                <Wifi size={18} className="text-primary shrink-0" />
                                                <span className="text-sm">{amenity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Cuisine */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Utensils size={24} />
                                        Cuisine Types
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {hotel.cuisineType.map((cuisine) => (
                                            <span key={cuisine} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium">
                                                {cuisine}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Contact */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Contact Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Phone size={20} className="text-primary" />
                                        <a href={`tel:${hotel.contact.phone}`} className="text-blue-600 hover:underline">
                                            {hotel.contact.phone}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail size={20} className="text-primary" />
                                        <a href={`mailto:${hotel.contact.email}`} className="text-blue-600 hover:underline">
                                            {hotel.contact.email}
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Booking Sidebar */}
                        <div className="lg:col-span-1">
                            <Card className="sticky top-24">
                                <CardHeader>
                                    <CardTitle>Book Your Stay</CardTitle>
                                    <div className="mt-2">
                                        <p className="text-3xl font-bold">₹{hotel.pricePerNight.toLocaleString()}</p>
                                        <p className="text-sm text-muted-foreground">per night</p>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* <div className="space-y-2">
                                        <label className="text-sm font-medium">Check-in Date</label>
                                        <input
                                            type="date"
                                            value={checkInDate}
                                            onChange={(e) => setCheckInDate(e.target.value)}
                                            className="w-full px-3 py-2 border rounded-lg"
                                        />
                                    </div> */}

                                    {/* <div className="space-y-2">
                                        <label className="text-sm font-medium">Check-out Date</label>
                                        <input
                                            type="date"
                                            value={checkOutDate}
                                            onChange={(e) => setCheckOutDate(e.target.value)}
                                            className="w-full px-3 py-2 border rounded-lg"
                                        />
                                    </div> */}

                                    {/* <div className="space-y-2">
                                        <label className="text-sm font-medium">Number of Rooms</label>
                                        <select
                                            value={rooms}
                                            onChange={(e) => setRooms(Number.parseInt(e.target.value))}
                                            className="w-full px-3 py-2 border rounded-lg"
                                        >
                                            {[...Array(Math.min(hotel.availableRooms, 10))].map((_, i) => (
                                                <option key={i + 1} value={i + 1}>
                                                    {i + 1} room{i + 1 > 1 ? "s" : ""}
                                                </option>
                                            ))}
                                        </select>
                                    </div> */}

                                    {/* <div className="space-y-2">
                                        <label className="text-sm font-medium">Number of Guests</label>
                                        <select
                                            value={guests}
                                            onChange={(e) => setGuests(Number.parseInt(e.target.value))}
                                            className="w-full px-3 py-2 border rounded-lg"
                                        >
                                            {[...Array(10)].map((_, i) => (
                                                <option key={i + 1} value={i + 1}>
                                                    {i + 1} guest{i + 1 > 1 ? "s" : ""}
                                                </option>
                                            ))}
                                        </select>
                                    </div> */}

                                    {/* {nights > 0 && (
                                        <div className="space-y-2 p-3 bg-secondary/30 rounded-lg">
                                            <div className="flex justify-between text-sm">
                                                <span>
                                                    ₹{hotel.pricePerNight.toLocaleString()} × {rooms} room × {nights} nights
                                                </span>
                                            </div>
                                            <div className="border-t pt-2 flex justify-between font-bold text-lg">
                                                <span>Total:</span>
                                                <span>₹{totalPrice.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    )} */}

                                    <Button onClick={() => handlePay(1)} className="w-full" size="lg">
                                        Confirm Booking
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HotelInfo
