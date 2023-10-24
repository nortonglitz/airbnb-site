'use client'

import { useRouter } from "next/navigation"
import { useState, useCallback } from "react"

import { Listing, Reservation, User } from "@prisma/client"

import Container from '@/app/components/Container'
import Heading from '@/app/components/Heading'
import axios from "axios"
import toast from "react-hot-toast"
import ListingCard from "@/app/components/listings/ListingCard"

interface ReservationWithListing extends Reservation {
    listing: Listing
}

interface TripsClientProps {
    reservations: ReservationWithListing[]
    currentUser?: User | null
}

const TripsClient: React.FC<TripsClientProps> = ({
    reservations,
    currentUser
}) => {

    const router = useRouter()
    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback(async (id: string) => {
        console.log('passei')
        setDeletingId(id)

        await axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success('Reservation canceled')
                router.refresh()
            })
            .catch((err) => {
                toast.error(err?.response?.data?.error)
            })
            .finally(() => {
                setDeletingId('')
            })
    }, [router])

    return (
        <Container>
            <Heading
                title="Trips"
                subtitle="Where you've been and where you're doing"
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
                {reservations.map(reservation => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionLabel="Cancel reservation"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    )
}

export default TripsClient