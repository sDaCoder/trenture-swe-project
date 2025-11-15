import HotelsList from "@/components/HotelsList/HotelsList";
import fs from "fs/promises"

const page = async () => {
    const data = await fs.readFile("hotel-data.json", "utf-8");
    const hotels = JSON.parse(data);

    return (
        <>
            <HotelsList hotels={hotels} />
        </>
    )
}

export default page
