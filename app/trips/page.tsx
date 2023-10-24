import TripsClient from './TripsClient'
import EmptyState from "@/app/components/EmptyState"

import getCurrentUser from "@/app/actions/getCurrentUser"
import getReservations from "@/app/actions/getReservations"


const TripsPage = async () => {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <EmptyState
                title="Unauthorized"
                subtitle="Please login"
                showReset
            />
        )
    }

    const reservations = await getReservations({
        userId: currentUser.id
    })

    if (reservations.length === 0) {
        return (
            <EmptyState
                title="No trips found"
                subtitle="Looks like you haven't reserved any trips"
                showReset
            />
        )
    }

    return (
        <TripsClient
            reservations={reservations}
            currentUser={currentUser}
        />
    )
}

export default TripsPage