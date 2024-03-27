export interface UserAttractionVO {
    userVO: UserVO;
    attractionVO: AttractionVO;
    provinceVO: ProvinceVO;
    cityVO: CityVO;
    areaVO: AreaVO;
    streetVO: StreetVO;
}

export interface AttractionVO {
    id: number;
    attractionName: string;
    description: string;
    location: string;
    score?: any;
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
