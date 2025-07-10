import { Get } from "@lib/httpMethod";
import * as GetCoursesType from "./types/getCourses.type";
import * as GetCoursesByIdType from "./types/getCourseById.type"
import prisma from "config/prisma.config";
import { Validate } from "@lib/validate";
import { Request, Router } from "express";

// NOTE: 10/7 tạm thời dừng phát triển để tập trung vào làm server exchange

export default class CourseController {
    @Get('/')
    @Validate(GetCoursesType.schema)
    async getCourses(req: GetCoursesType.Req) {
        const { year, semester } = req.query;
        const courses = await prisma.ds_mon.findMany({
            where: {
                ds_mon_theo_nam: {
                    some: {
                        year: year,
                        semester: semester
                    }
                }
            }
        })

        return new GetCoursesType.GetCoursesResp(courses.length, courses.map(c => {
            return {
                id: c.id,
                display_name: c.display_name || '',
            }
        }));
    }



    @Get("/:id")
    @Validate(GetCoursesByIdType.schema)
    async getCourseById(req: GetCoursesByIdType.Req) {
        const { id } = req.params;
    }

}
