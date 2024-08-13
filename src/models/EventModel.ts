interface Location {
    title: string;
    address: string;
}

interface Event {
    title: string;
    description: string;
    location: Location;
    imageUrl: string;
    user: string[];
    authorId: string;
    startAt: number;
    endAt: number;
    date: number;
}

export type {Event, Location}
