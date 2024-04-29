export interface UserAttractionVO {
    userVO: UserVO;
    attractionVO: AttractionVO;
    provinceVO: ProvinceVO;
    cityVO: CityVO;
    areaVO: AreaVO;
    streetVO: StreetVO;
    createTime: string;
    updateTime: string;
}

export interface AttractionVO {
    id: number;
    attractionName: string;
    description: string;
    location: string;
    rate?: any;
    provinceCode: number;
    cityCode: number;
    areaCode: number;
    streetCode: number;
    reviewed: number;
    isDeleted: number;
    createTime: string;
    updateTime: string;
}

export interface UserVO {
    id: number;
    username: string;
    password?: any;
    email: string;
    userType?: any;
    code?: any;
}

export interface CityVO {
    code: number;
    name: string;
    provinceCode: number;
}

export interface ProvinceVO {
    code: number;
    name: string;
}

export interface AreaVO {
    code: number;
    name: string;
    provinceCode: number;
    cityCode: number;
}

export interface StreetVO {
    code: number;
    name: string;
    provinceCode: number;
    cityCode: number;
    areaCode: number;
}

export interface AttractionTicketVO {
    id: number;
    attractionVO: AttractionVO;
    ticketVO: TicketVO;
}

export interface TicketVO {
    id: number;
    ticketName: string;
    price: number;
    ticketType: number;
    description: string;
}

export interface OrderVO {
    id: number[];
    userId: number;
    ticketId: number;
    status: number;
    quantity: number;
    amount: number;
    orderTime: string;
}

export interface PostVO {
    id: number;
    title: string;
    content: string;
    userId: number;
    createTime: string;
    updateTime: string;
}

export interface PasswordVO {
    id: number;
    username: string;
    password: string;
    confirmPassword: string;
}
