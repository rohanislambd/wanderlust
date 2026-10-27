import {
    CalendarDaysIcon,
    CheckCircle2Icon,
    EyeIcon,
    MapPinIcon,
    Trash2Icon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IBooking } from '@/app/my-bookings/page';
function formatDate(date: string) {
    return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
}

const MyBookingCard = ({bookings}:{bookings:IBooking[]}) => {
   
    return (
        <div className="mt-8 space-y-6">
                        {bookings.map((booking) => (
                            <article
                                key={booking._id}
                                className="flex flex-col gap-5 rounded-xl border border-border bg-card p-4 shadow-sm sm:flex-row"
                            >
                                {/* Booking image */}
                                <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:h-40 sm:w-60">
                                    <Image
                                        src={booking.imageUrl || '/images/CTA.png'}
                                        alt={booking.name}
                                        fill
                                        // Image URLs come from the backend, so they
                                        // can be any host — bypass the optimizer.
                                        unoptimized
                                        sizes="(min-width: 640px) 240px, 100vw"
                                        className="object-cover"
                                    />
                                </div>

                                {/* Booking details */}
                                <div className="flex flex-1 flex-col">
                                    <Badge className="h-auto w-fit rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                                        <CheckCircle2Icon aria-hidden />
                                        Confirmed
                                    </Badge>

                                    <h2 className="mt-2 text-2xl font-bold text-foreground">
                                        {booking.name}
                                    </h2>

                                    <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                                        <CalendarDaysIcon className="size-4" aria-hidden />
                                        Departure: {formatDate(booking.departureDate)}
                                    </p>
                                    <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                                        <MapPinIcon className="size-4" aria-hidden />
                                        Booking ID: {booking._id}
                                    </p>

                                    {/* Price + actions */}
                                    <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-4">
                                        <p className="text-3xl font-bold text-brand">
                                            ${booking.price}
                                        </p>

                                        <div className="flex gap-3">
                                            <Button
                                                variant="outline"
                                                className="gap-1.5 border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                            >
                                                <Trash2Icon aria-hidden />
                                                Cancel
                                            </Button>
                                            <Button
                                                render={
                                                    <Link
                                                        href={`/destinations/${booking.id}`}
                                                    />
                                                }
                                                className="gap-1.5 bg-brand text-white hover:bg-brand-dark"
                                            >
                                                <EyeIcon aria-hidden />
                                                View
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
    );
};

export default MyBookingCard;