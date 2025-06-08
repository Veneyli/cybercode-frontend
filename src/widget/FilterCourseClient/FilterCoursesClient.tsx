"use client";
import React, { useState } from "react";
import FilterCourses from "../FilterCourses/FilterCourses";
import CourseCard from "@/components/CourseCard/CourseCard";
import styles from "./FilterCoursesClient.module.scss";
import { Course } from "@/types/course.types";
import Heading from "@/shared/ui/Heading/Heading";
import SearchCourse from "@/widget/SearchCourse/SearchCourse";

const FilterCoursesClient = ({
  initialCourses,
}: {
  initialCourses: Course[];
}) => {
  const [coursesData, setCoursesData] = useState<Course[]>(initialCourses);
  const [searchQuery] = useState("");

  const handleFilterResult = (filteredCourses: Course[]) => {
    const filtered = searchQuery
      ? filteredCourses.filter((course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : filteredCourses;

    setCoursesData(filtered);
  };

  return (
    <>
      <div className={styles["courses__filter"]}>
        <FilterCourses onResult={handleFilterResult} />
      </div>
      <div className={styles["courses__content"]}>
        <Heading level={1} className={styles["courses__title"]}>
          Каталог
        </Heading>
        <SearchCourse courses={initialCourses} onSearch={handleFilterResult} />
        <div className={styles["courses__list"]}>
          {coursesData.length > 0 ? (
            coursesData.map((course, index) => (
              <CourseCard
                key={course.course_id}
                course={course}
                index={index}
              />
            ))
          ) : (
            <p>Курсы не найдены</p>
          )}
        </div>
      </div>
    </>
  );
};

export default FilterCoursesClient;
