'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"

import { Listing, User } from "@prisma/client"

import Container from '@/app/components/Container'
import Heading from '@/app/components/Heading'
import axios from "axios"
import toast from "react-hot-toast"
import ListingCard from "@/app/components/listings/ListingCard"

interface TripsClientProps {
    listings: Listing[]
    currentUser?: User | null
}

const PropertiesClient: React.FC<TripsClientProps> = ({
    listings,
    currentUser
}) => {

    const router = useRouter()
    const [deletingId, setDeletingId] = useState('')

    const onCancel = async (id: string) => {
        setDeletingId(() => id)

        await axios.delete(`/api/listings/${id}`)
            .then(() => {
                toast.success('Listing deleted')
                router.refresh()
            })
            .catch((err) => {
                toast.error(err?.response?.data?.error)
            })
            .finally(() => {
                setDeletingId('')
            })
    }

    return (
        <Container>
            <Heading
                title="Properties"
                subtitle="List of your properties"
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
                        data={listing}
                        actionId={listing.id}
                        onAction={onCancel}
                        disabled={deletingId === listing.id}
                        actionLabel="Delete property"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    )
}

export default PropertiesClient