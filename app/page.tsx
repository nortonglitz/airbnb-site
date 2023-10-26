import Container from '@/app/components/Container'
import EmptyState from '@/app/components/EmptyState'
import getListings, { IListingParams } from '@/app/actions/getListings'
import ListingCard from '@/app/components/listings/ListingCard'
import getCurrentUser from '@/app/actions/getCurrentUser'

interface HomeProps {
  searchParams: IListingParams
}

const Home: React.FC<HomeProps> = async ({
  searchParams
}) => {

  const currentUser = await getCurrentUser()
  const listings = await getListings(searchParams)

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