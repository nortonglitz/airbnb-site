import { Listing, User } from "@prisma/client"

import Heading from "@/app/components/Heading"
import Container from '@/app/components/Container'
import ListingCard from "@/app/components/listings/ListingCard"

interface FavoritesClientProps {
    listings: Listing[]
    currentUser?: User | null
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
    listings,
    currentUser
}) => {
    return (
        <Container>
            <Heading
                title="Favorites"
                subtitle="List of places you have favorited"
            />
            <div
                className="
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                gap-8
                "
            >
                {listings.map(listing => (
                    <ListingCard
                        key={listing.id}
                        currentUser={currentUser}
                        data={listing}
                    />
                ))}

            </div>
        </Container>
    )
}

export default FavoritesClient