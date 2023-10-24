'use client'

import Container from '@/app/components/Container'
import CategoryBox from '@/app/components/CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'
import { categories } from '@/app/libs/categories'



const Categories = () => {

    const params = useSearchParams()
    const category = params?.get('category')
    const pathname = usePathname()

    const isMainpage = pathname === '/'

    if (!isMainpage) {
        return null
    }

    return (
        <Container>
            <div
                className="
                    pt-4
                    flex
                    flex-row
                    items-center
                    justify-between
                    overflow-x-auto
                    select-none
                "
            >
                {categories.map(item => (
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        selected={category === item.label}
                        icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    )
}

export default Categories