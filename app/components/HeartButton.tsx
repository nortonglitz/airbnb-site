'use client'

import { User } from "@prisma/client"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import PuffLoader from 'react-spinners/PuffLoader'

import useFavorite from '@/app/hooks/useFavorite'

interface HeartButtonProps {
    listingId: string
    currentUser?: User | null
}

const HeartButton: React.FC<HeartButtonProps> = ({
    listingId,
    currentUser
}) => {

    const { favorited, toggleFavorite, isFavLoading } = useFavorite({ listingId, currentUser })

    return (
        <div
            onClick={isFavLoading ? undefined : toggleFavorite}
            className="
                relative
                transition
                cursor-pointer
            "
        >
            {isFavLoading ? (
                <PuffLoader
                    loading={true}
                    aria-label="Loading spinner"
                    color="#fda4af"
                    size={28}
                />
            ) : (
                <>
                    <AiOutlineHeart
                        size={28}
                        className="
                            opacity-80
                            hover:opacity-100
                            fill-white
                            absolute
                            -top-[2px]
                            -right-[2px]
                        "
                    />
                    <AiFillHeart
                        size={24}
                        className={favorited ? 'fill-rose-500' : 'fill-neutral-500/20'}
                    />
                </>
            )}
        </div>
    )
}

export default HeartButton