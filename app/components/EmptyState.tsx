
import Heading from '@/app/components/Heading'
import Button from '@/app/components/Button'
import Link from 'next/link'

interface EmptyStateProps {
    title?: string
    subtitle?: string
    showReset?: boolean
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title = "No exact matches",
    subtitle = "Try chaning or removing some of your filters",
    showReset
}) => {

    return (
        <div
            className="
                h-[60vh]
                flex
                flex-col
                gap-2
                justify-center
                items-center
            "
        >
            <Heading
                center
                title={title}
                subtitle={subtitle}
            />
            <div className="w-48 mt-4">
                {showReset && (
                    <Link
                        href="/"
                        className="
                            flex
                            justify-center
                            border-2
                            border-black
                            py-3
                            rounded-lg
                            text-md
                            font-semibold
                            transition
                            hover:opacity-80
                        "
                    >
                        Home
                    </Link>
                )}
            </div>
        </div>
    )
}

export default EmptyState