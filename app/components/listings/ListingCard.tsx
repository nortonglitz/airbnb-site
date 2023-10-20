'use client'

import { useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import useCountries from "@/app/hooks/useCountries"

import { Listing, Reservation, User } from "@prisma/client"
import { format } from 'date-fns'
import Image from "next/image"

import HeartButton from "@/app/components/HeartButton"
import Button from "@/app/components/Button"


interface ListingCardProps {
    data: Listing
    reservation?: Reservation
    onAction?: (id: string) => void
    disabled?: boolean
    actionLabel?: string
    actionId?: string
    currentUser?: User | null
}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currentUser
}) => {

    const router = useRouter()
    const { getCountryByValue } = useCountries()

    const location = getCountryByValue(data.locationValue)

    const handleCancel = useCallback(() => {
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()

            if (disabled) return

            onAction?.(actionId)
        }
    }, [onAction, actionId, disabled])

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice
        }

        return data.price
    }, [reservation, data.price])

    const reservationDate = useMemo(() => {
        if (!reservation) return null

        const start = new Date(reservation.startDate)
        const end = new Date(reservation.endDate)

        return `${format(start, 'PP')} - ${format(end, 'PP')}`

    }, [reservation])

    return (
        <div
            onClick={() => router.push(`/listings/${data.id}`)}
            className="col-span-1 cursor-pointer group"
        >
            <div className="flex flex-col w-full">
                <div
                    className="
                        aspect-square
                        w-full
                        relative
                        overflow-hidden
                        rounded-xl
                    "
                >
                    <Image
                        fill
                        alt="Listing"
                        src={data.imageSrc}
                        sizes="10vw"
                        className="
                            object-cover
                            h-full
                            w-full
                            group-hover:scale-110
                            transition
                        "
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton
                            listingId={data.id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                <div className="font-semibold text-base truncate">
                    {location?.label}
                </div>
                <div className="text-sm font-light text-neutral-500">
                    {reservationDate || data.category}
                </div>
                <div className="flex flex-row items-center gap-1 font-bold text-sm">
                    <div className="font-semibold">
                        $ {price}
                    </div>
                    {!reservation && (
                        <div className="font-light">night</div>
                    )}
                </div>
                {onAction && actionLabel && (
                    <Button
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={handleCancel}
                    />
                )}
            </div>
        </div>
    )
}

export default ListingCard