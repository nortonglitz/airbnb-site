'use client'

import useSearchModal from '@/app/hooks/useSearchModal'
import { useSearchParams } from 'next/navigation'
import { BiSearch } from 'react-icons/bi'
import useCountries from '@/app/hooks/useCountries'
import { differenceInCalendarDays } from 'date-fns'

const Search = () => {

    const searchModal = useSearchModal()
    const params = useSearchParams()
    const { getCountryByValue } = useCountries()

    const locationValue = params?.get('locationValue')
    const startDate = params?.get('startDate')
    const endDate = params?.get('endDate')
    const guestCount = params?.get('guestCount')

    const locationLabgel = () => {
        if (locationValue) {
            return getCountryByValue(locationValue as string)?.label
        }

        return 'Anywhere'
    }

    const durationLabel = () => {
        if (startDate && endDate) {
            const start = new Date(startDate as string)
            const end = new Date(endDate as string)

            let diff = differenceInCalendarDays(end, start)

            if (diff === 0) {
                diff = 1
            }

            return `${diff} days`
        }

        return 'Any week'
    }

    const guestLabel = () => {
        if (guestCount) {
            return `${guestCount} guests`
        }

        return 'Guests'
    }

    return (
        <div
            onClick={searchModal.onOpen}
            className="
            border-[1px]
            w-full
            md:w-auto
            py-2
            rounded-full
            shadow-sm
            hover:shadow-md
            transition
            cursor-pointer
            select-none
            "
        >
            <div
                className="
                flex
                flex-row
                items-center
                justify-between
                "
            >
                <div
                    className="
                        text-sm
                        font-semibold
                        px-6
                    "
                >
                    {locationLabgel()}
                </div>
                <div
                    className="
                        hidden
                        sm:block
                        text-sm
                        font-semibold
                        px-6
                        border-x-[1px]
                        flex-1
                        text-center
                    "
                >
                    {durationLabel()}
                </div>
                <div
                    className="
                        text-sm
                        pl-6
                        pr-2
                        text-gray-600
                        flex
                        flex-row
                        items-center
                        gap-3
                    "
                >
                    <div className="hidden sm:block">{guestLabel()}</div>
                    <div
                        className="
                            p-2
                            bg-rose-500
                            rounded-full
                            text-white
                        "
                    >
                        <BiSearch size={18} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search