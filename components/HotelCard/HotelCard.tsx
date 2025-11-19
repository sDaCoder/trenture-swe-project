"use client"
import { DoorOpen, MapPin, Star, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

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

const HotelCard: React.FC<{ hotel: Hotel }> = ({ hotel }) => {
    const router = useRouter()

    return (
        <>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
                <div className="relative h-48 bg-muted overflow-hidden">
                    <img
                        src={hotel.imageUrl || "/placeholder.svg"}
                        alt={hotel.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                        ₹{hotel.pricePerNight.toLocaleString()}/night
                    </div>
                </div>

                <CardHeader className="pb-3">
                    <CardTitle className="text-xl truncate">{hotel.name}</CardTitle>
                    <CardDescription className="text-sm flex items-center gap-1 truncate">
                        <MapPin size={14} className="flex-shrink-0" />
                        <span className="truncate">{hotel.location}</span>
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 flex-1 flex flex-col">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={16}
                                    className={i < Math.floor(hotel.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}
                                />
                            ))}
                        </div>
                        <span className="text-sm font-medium">{hotel.rating}</span>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">{hotel.description}</p>

                    <div className="space-y-2 bg-secondary/30 p-3 rounded-lg">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground flex items-center gap-1">
                                <DoorOpen size={14} />
                                Room Type:
                            </span>
                            <span className="font-medium truncate ml-2">{hotel.roomType}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground flex items-center gap-1">
                                <Users size={14} />
                                Capacity:
                            </span>
                            <span className="font-medium">{hotel.personsPerRoom} persons</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Available:</span>
                            <span className="font-medium text-green-600">{hotel.availableRooms} rooms</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground">Cuisine:</p>
                        <div className="flex flex-wrap gap-2">
                            {hotel.cuisineType.slice(0, 2).map((cuisine) => (
                                <span key={cuisine} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded truncate">
                                    {cuisine}
                                </span>
                            ))}
                            {hotel.cuisineType.length > 2 && (
                                <span className="text-xs text-muted-foreground px-2 py-1">+{hotel.cuisineType.length - 2} more</span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground">Amenities:</p>
                        <div className="flex flex-wrap gap-2">
                            {hotel.amenities.slice(0, 3).map((amenity) => (
                                <span key={amenity} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded truncate">
                                    {amenity}
                                </span>
                            ))}
                            {hotel.amenities.length > 3 && (
                                <span className="text-xs text-muted-foreground px-2 py-1">+{hotel.amenities.length - 3} more</span>
                            )}
                        </div>
                    </div>

                    <Button onClick={() => router.push(`/plans/${hotel.id}`)} className="w-full mt-auto">
                        Book Now
                    </Button>
                </CardContent>
            </Card>
        </>
    )
}

export default HotelCard
