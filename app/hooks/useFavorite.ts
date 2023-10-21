import axios from 'axios'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import useLoginModal from '@/app/hooks/useLoginModal'

import { User } from '@prisma/client'

interface IUseFavorite {
    listingId: string
    currentUser?: User | null
}

const useFavorite = ({
    listingId,
    currentUser
}: IUseFavorite) => {
    const router = useRouter()
    const loginModal = useLoginModal()
    const [isFavLoading, setIsFavLoading] = useState(false)
    const [favorited, setFavorited] = useState(currentUser?.favoriteIds.includes(listingId) || false)

    const toggleFavorite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation()

        if (!currentUser) {
            return loginModal.onOpen()
        }

        setIsFavLoading(() => true)

        try {
            if (favorited) {
                await axios.delete(`/api/favorites/${listingId}`)
                setFavorited(() => false)
            } else {
                await axios.post(`/api/favorites/${listingId}`)
                setFavorited(() => true)
            }

        } catch (err) {
        }
        setIsFavLoading(false)
    }, [currentUser, favorited, listingId, loginModal])

    return {
        favorited,
        toggleFavorite,
        isFavLoading
    }
}

export default useFavorite