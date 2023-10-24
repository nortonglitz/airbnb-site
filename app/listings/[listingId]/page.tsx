import getCurrentUser from "@/app/actions/getCurrentUser"
import getListingById from "@/app/actions/getListingById"
import EmptyState from "@/app/components/EmptyState"
import ListingClient from "./ListingClient"
import getReservations from "@/app/actions/getReservations"

interface IParams {
    listingId?: string
}


const ListingPage = async ({ params }: { params: IParams }) => {
    const { listingId } = params

    if (!listingId) {
        return (
            <EmptyState
                title="This listing is not valid"
                subtitle="Try looking at our homepage"
            />
        )
    }

    const listing = await getListingById(params)
    const reservations = await getReservations(params)

    if (!listing) {
        return (
            <EmptyState
                title="This listing is not valid"
                subtitle="Try looking at our homepage"
                showReset
            />
        )
    }

    const currentUser = await getCurrentUser()

    return (
        <div>
            <ListingClient listing={listing} currentUser={currentUser} reservations={reservations} />
        </div>
    )
}

export default ListingPage