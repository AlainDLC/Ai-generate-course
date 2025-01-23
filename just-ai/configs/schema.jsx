import { pgTable, varchar, json, serial, integer } from "drizzle-orm/pg-core";

export const CourseList = pgTable("course_list", {
  id: serial("id").primaryKey(),
  courseId: varchar("courseId").notNull(),
  name: varchar("name").notNull(),
  level: varchar("level").notNull(),
  includeVideo: varchar("includeVideo").notNull().default("Yes"),
  category: varchar("category").notNull(),
  courseOutput: json("courseOutput").notNull(),
  createdBy: varchar("createdBy").notNull(),
  userName: varchar("userName"),
  userProfilImage: varchar("userProfilImage"),
  noOfChapter: integer("noOfChapter").notNull(),
});
