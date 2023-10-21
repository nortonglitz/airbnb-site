import axios from 'axios'

import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import useLoginModal from '@/app/hooks/useLoginModal'

import { toast } from 'react-hot-toast'

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

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || []

        return list.includes(listingId)
    }, [currentUser, listingId])

    const toggleFavorite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation()

        if (!currentUser) {
            return loginModal.onOpen()
        }

        try {
            if (hasFavorited) {
                const delReq = axios.delete(`/api/favorites/${listingId}`)
                await toast.promise(delReq, {
                    loading: 'Removing from your favorite list...',
                    success: 'Removed!',
                    error: 'Something went wrong'
                })
            } else {
                const addReq = axios.post(`/api/favorites/${listingId}`)
                await toast.promise(addReq, {
                    loading: 'Adding to your favorite list...',
                    success: 'Favorited!',
                    error: 'Something went wrong'
                })
            }

            router.refresh()
        } catch (err) {
        }
    }, [currentUser, hasFavorited, listingId, loginModal, router])

    return {
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite