export interface HostUser{
    id: string;
    rentDate: Date;
    host: {
        name: string;
        description: true;
        price: number;
    }
}

