import { CityType } from "app/city/domain/city";

export interface jobType{
    jobPosition: string,
    wage: string,
    city: CityType,
    jobWebsite: string,
    technologies: String[],
    company: string,
    description: string,
    link: string,
}

export interface jobDataType{
    jobPosition: string,
    wage: string,
    city: String,
    jobWebsite: string,
    technologies: String[],
    company: string,
    description: string,
    link: string,
}

export interface findJobsType{
    queries: Array<string>,
    city: CityType
}