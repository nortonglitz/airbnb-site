'use client'

import qs from 'query-string'

import { useState, useMemo } from "react"
import useSearchModal from "@/app/hooks/useSearchModal"
import { useSearchParams, useRouter } from "next/navigation"

import Modal from "./Modal"
import Heading from '@/app/components/Heading'

import CountrySelect, { CountrySelectValue } from '@/app/components/inputs/CountrySelect'
import { Range } from "react-date-range"
import dynamic from "next/dynamic"
import { formatISO } from 'date-fns'
import Calendar from '@/app/components/inputs/Calendar'
import Counter from '@/app/components/inputs/Counter'

enum STEPS {
    LOCATION,
    DATE,
    INFO
}

const SearchModal = () => {

    const router = useRouter()
    const params = useSearchParams()
    const searchModal = useSearchModal()

    const [location, setLocation] = useState<CountrySelectValue>()
    const [step, setStep] = useState(STEPS.LOCATION)
    const [guestCount, setGuestCount] = useState(1)
    const [roomCount, setRoomCount] = useState(1)
    const [bathroomCount, setBathroomCount] = useState(1)
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })

    const Map = useMemo(() => dynamic(() => import('@/app/components/Map'), {
        ssr: false
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [location])

    const onBack = () => {
        setStep(value => value - 1)
    }

    const onNext = () => {
        setStep(value => value + 1)
    }

    const onSubmit = async () => {
        if (step !== STEPS.INFO) {
            return onNext()
        }

        let currentQuery = {}

        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            bathroomCount,
            roomCount
        }

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate)
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate)
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true })

        setStep(STEPS.LOCATION)
        searchModal.onClose()
        router.push(url)
    }

    const actionLabel = () => {
        if (step === STEPS.INFO) {
            return 'Search'
        }

        return 'Next'
    }

    const secondaryActionLabel = () => {
        if (step === STEPS.LOCATION) {
            return undefined
        }

        return 'Back'
    }

    let bodyContent = <></>

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where do you wanna go?"
                    subtitle="Find the perfect location"
                />
                <CountrySelect
                    value={location}
                    onChange={value => setLocation(value)}
                />
                <hr />
                {location && <Map center={location?.latlng} />}
            </div>
        )
    }

    if (step === STEPS.DATE) {
        bodyContent = <div className="flex flex-col gap-8">
            <Heading
                title="When do you want to go?"
                subtitle="Make sure everyone is free!"
            />
            <Calendar
                value={dateRange}
                onChange={value => setDateRange(value.selection)}
            />
        </div>
    }

    if (step === STEPS.INFO) {
        bodyContent = <div className="flex flex-col gap-8">
            <Heading
                title="More information"
                subtitle="Find your perfect place"
            />
            <Counter
                title="Guests"
                subtitle="How many guests are coming?"
                value={guestCount}
                onChange={value => setGuestCount(value)}
            />
            <Counter
                title="Rooms"
                subtitle="How many rooms do you need?"
                value={roomCount}
                onChange={value => setRoomCount(value)}
            />
            <Counter
                title="Bathrooms"
                subtitle="How many bathrooms do you need?"
                value={bathroomCount}
                onChange={value => setBathroomCount(value)}
            />
        </div>
    }

    return (
        <Modal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filters"
            actionLabel={actionLabel()}
            secondaryActionLabel={secondaryActionLabel()}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            body={bodyContent}
        />
    )
}

export default SearchModal