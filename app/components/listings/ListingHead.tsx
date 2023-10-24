import { User } from "@prisma/client"
import Heading from '@/app/components/Heading'
import useCountries from "@/app/hooks/useCountries"
import Image from "next/image"
import HeartButton from "../HeartButton"

interface ListingHeadProps {
    title: string
    locationValue: string
    imageSrc: string
    id: string
    currentUser?: User | null
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser
}) => {

    const { getCountryByValue } = useCountries()
    const location = getCountryByValue(locationValue)

    return (
        <>
            <Heading
                title={title}
                subtitle={`${location?.region}, ${location?.label}`}
            />
            <div
                className="
                    w-full
                    h-[60vh]
                    overflow-hidden
                    rounded-xl
                    relative
                "
            >
                <Image
                    alt="Image of property"
                    src={imageSrc}
                    fill
                    sizes="90vw"
                    className="object-cover w-full"
                />
                <div className="absolute top-5 right-5">
                    <HeartButton
                        listingId={id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </>
    )
}

export default ListingHead