'use client'

import axios from 'axios'

import { useState } from 'react'
import { useRouter } from "next/navigation"

import { Reservation, User, Listing } from "@prisma/client"

import { toast } from 'react-hot-toast'

import Heading from '@/app/components/Heading'
import Container from '@/app/components/Container'
import ListingCard from '@/app/components/listings/ListingCard'

interface ReservationWithListing extends Reservation {
    listing: Listing
}

interface ReservationsClient {
    reservations: ReservationWithListing[]
    currentUser: User
}

const ReservationsClient: React.FC<ReservationsClient> = ({
    reservations,
    currentUser
}) => {

    const router = useRouter()
    const [deletingId, setDeletingId] = useState('')

    const onCancel = (id: string) => {
        setDeletingId(() => id)

        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success('Reservation canceled')
                router.refresh()
            })
            .catch(() => {
                toast.error('Something went wrong')
            })
            .finally(() => {
                setDeletingId('')
            })
    }

    return (
        <Container>
            <Heading
                title="Reservations"
                subtitle="Bookings on your properties"
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
                        actionLabel="Cancel guest reservation"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    )
}

export default ReservationsClient