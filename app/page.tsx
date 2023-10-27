'use client'

import Container from '@/app/components/Container'
import EmptyState from '@/app/components/EmptyState'
import getListings, { IListingParams } from '@/app/actions/getListings'
import ListingCard from '@/app/components/listings/ListingCard'
import getCurrentUser from '@/app/actions/getCurrentUser'
import { useEffect, useState } from 'react'
import { User } from '@prisma/client'

interface HomeProps {
  searchParams: IListingParams
}

const Home: React.FC<HomeProps> = ({
  searchParams
}) => {

  const [listings, setListings] = useState<IListingParams[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    const updateData = async () => {
      setListings(await getListings(searchParams))
      setCurrentUser(await getCurrentUser())
    }

    updateData()

  }, [searchParams])


  if (listings.length === 0) {
    return (
      <EmptyState showReset />
    )
  }

  return (
    <Container>
      <div className="
        pt-24
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        gap-8
      ">
        {listings.map((listing: any) => {
          return (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          )
        })}
      </div>
    </Container>
  )
}

export default Home