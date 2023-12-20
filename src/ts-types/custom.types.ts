export interface ICenterPageState{
  centerPageReducer: {
    requesting: string,
    success: string,
    error: any,
    center: ICenter
  }
}

export interface ICenter{
  _id: string,
  slug: string,
  name: string,
  description: string,
  yearsOfExperience: number,
  _i18n:any,
  location:{
    address: string;
    coordinates: [number, number];
  }
  certificates: string[],
  equipment: string[],
  reservationPolicy: string,
  cancellationPolicy: string,
  languages: string[],
  boats:string[],
  // contact: {
  //   email: string,
  //   phone: string,
  //   whatsapp: string,
  //   website: string,
  //   facebook: string,
  //   instagram: string
  // },
  socialMedia: {
    facebook: string,
    instagram: string,
    whatsapp: string,
  },
  representative: {
    name: string,
    phone: string
  },
  logo: string,
  frontImage: string,
  images: string[],
  publicationLanguage: string,
  avgRating: number,
  totalRatings: number,
  totalViews: number,
  certifiedPersonnel: number,
  activities: IActivity[]
}


interface IActivity{
    name: string,
    slug: string,
    description: string,
    category: {},
    subCategory: {},
    price: number,
    promotionalPrice: number,
    pricePerGroup: number,
    currency: string,
    duration: string,
    _i18n:any,
    schedule: [
      {
        day: string,
        hourStart: string,
        minuteEnd: string
      }
    ],
    diveZones: string[]
    center: {},
    requirements: string[]
    includes: string[]
    notIncludes: string[]
    itineraries: string[]
    frontImage: string,
    images: string,
    languages: string[]
    tags: string[]
    publicationLanguage: string,
    notAvailableDates: string[]
    whatExpect: string,
    avgRating: number,
    totalRatings: number,
    totalBookings: number,
    totalViews: number,
    totalQuestions: number,
    levelExperience: number
}


// lodging
export interface ILodgingPageState{
  lodgingPageReducer: {
    requesting: string,
    success: string,
    error: any,
    popular_activities: IActivity[],
    isOpen_rooms_modal:boolean,
    lodging: ILodging
  }
}

export interface ILodging{
    _i18n:any,
    _id: string,
    slug: string,
    name: string,
    description: string,
    type: string,
    services: string[],
    reservationPolicy: string,
    cancellationPolicy: string,
    location: {
      address: string,
      coordinates: [number, number],
    },
    representative: string,
    logo: string,
    frontImage: string,
    images: string[],
    rooms: 
      {
          _id: string,
          name: string,
          description: string,
          price: number,
          promotionalPrice: number,
          beds: number,
          bathrooms: number,
          services: [
              string,
              string
          ],
          frontImage: string,
          images: [
              string
          ],
          lodging: string,
          __v: number
      }[],
    publicationLanguage: string,
    avgRating: number,
    totalViews: number,
    totalBookings: number,
    totalReviews: number,

    price: number,
    contact: {
      email: string,
      phone: string,
      whatsapp: string,
      website: string,
      facebook: string,
      instagram: string
    },
    socialMedia: {
      facebook: string,
      instagram: string
    },
    activities: IActivity[],
}

//homeReducerState
export interface IHomePageState{
  homePageReducer: {
    requesting: false,
    success: false,
    error: any,

    categories: ICategory[],

    popular_activities: IActivity[],
    places_to_relax: ILodging[],
    best_centers: ICenter[],
  }
}


export interface ICategory{
  _id:string,
  name:string,
  _i18n:any,
  image:string,
  createdAt:string,
  updatedAt:string,
  __v:number
}

//searchActivityReducerState
export interface ISearchActivityState{
  searchActivityReducer: {
    requesting: boolean,
    success: boolean,
    error: any,

    isOpen_whatwouldyouliketodo_modal: boolean,
    result: any[],
    values:{
        type: string,
        levelExperience: number,
        language: string,
        startDate: string,
        endDate: string,
        pax: {
            name: string,
            email: string,
            tel: string,
            experience: number,
            language:string,
        }[],
        minPrice: number,
        maxPrice: number,
        sortBy: string,
        sortOrder: string,
        subCategory_id: string,
        zones: string[],
        services: string[],
        languages: string[],
    },

    filterOptions:{
      zones: [
        {
          name: string,
          count: number
        }
      ],
      services: [
        {
          name: string,
          count: number
        }
      ],
      languages: [
        {
          name: string,
          count: number
        }
      ]
    }
  }
}

//serviceReducerState
export interface IServiceState{
  servicePageReducer:{
    requesting: boolean,
    success: boolean,
    error: string,

    service: IService,
    popular_activities: IActivity [],
    lodging: ILodging[],
    post_opinion_value:string,
    post_question_value:string,
  }
}

//service interface
export interface IService{
    _id: string,
    name: string,
    slug: string,
    description: string,
    category: string,
    subCategory: string,
    price: number,
    promotionalPrice: number,
    pricePerGroup: number,
    currency: string,
    duration: string,
    schedule: [
      {
        day: string,
        hourStart: string,
        _id: string
      },
    ],
    diveZones: string[],
    center: ICenter,
    requirements: string[],
    includes: string[],
    notIncludes: string[],
    itineraries: [],
    frontImage: string,
    images: string[],
    languages: string[],
    tags: string[],
    publicationLanguage: string,
    notAvailableDates: [],
    whatExpect: string,
    avgRating: string,
    totalRatings: number,
    totalBookings: number,
    totalViews: number,
    totalQuestions: number,
    levelExperience: number,
    createdAt: string,
    updatedAt: string,
    __v: number,
}

export interface InfoServiceCardProps {
  serviceLogo: string,
  serviceTitle: string,
  serviceLocation: string,
  qualification: number | string,
  price: number,
  centerTitle: string,
  service: IService,
}

export interface InfoHotelCardProps {
  hotelLogo: string,
  // hotelCertification: string,
  hotelTitle: string,
  hotelLocation: {
    address: string,
    coordinates: [number,number]
  },
  qualification: number,
  price: number,
  whatsapp: string,
  facebook: string,
  instagram: string,
  reservationPolitics: string,
  cancelationPolitics: string,
  lodging:ILodging
}

export interface IReservationsPageState{
  reservationsPageReducer: {
    requesting: boolean,
    success: boolean,
    error:string,
    reservations:{
        name:string,
        price:number,
        status:string,
        bookingType: string,			
        activity: {
          name: string
        },			
        lodging: {
          name: string
        },				
        room: {
          price: number | string,
        }				
        language: string,				
        entryDate: string,			
        departureDate: string,		
        numberPeople: number,				
        companion:		
            {
                name: string,	
                language: string,	
                experience: number	
            }[]
    }[]
  }
}