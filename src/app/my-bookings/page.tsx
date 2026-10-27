import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

import { playfairDisplay } from '@/lib/fonts';

import MyBookingCard from '@/components/MyBookingCard';

// Shape of a booking returned by GET /my-booking/:email
export interface IBooking {
    _id: string;
    id: string; // destination id, used for the View link
    name: string;
    price: string;
    departureDate: string;
    imageUrl: string;
}

// `T00:00:00` keeps the date from shifting a day across timezones.


const MyBookingPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user;

    const res = await fetch(`http://localhost:8000/my-booking/${user?.email}`, {
        cache: 'no-store',
    });
    const bookings: IBooking[] = await res.json();

    return (
        <section className="bg-background py-12 md:py-16">
            <div className="mx-auto max-w-4xl px-6">
                <h1
                    className={`${playfairDisplay.className} text-4xl leading-[1.05] text-foreground md:text-5xl`}
                >
                    My Bookings
                </h1>
                <p className="mt-3 text-base text-muted-foreground">
                    Manage and view your upcoming travel plans
                </p>

                {bookings.length === 0 ? (
                    <p className="mt-10 text-muted-foreground">
                        No bookings yet. Explore destinations and book your
                        first trip.
                    </p>
                ) : (
                    bookings.map((booking) => <MyBookingCard key={booking._id}  booking ={booking}/>)
                    
                )}
            </div>
        </section>
    );
};

export default MyBookingPage;
