import { pgTable, varchar, json, serial } from "drizzle-orm/pg-core";

export const CourseList = pgTable("course_list", {
  id: serial("id").primaryKey(),
  courseId: varchar("courseId").notNull(),
  name: varchar("name").notNull(),
  level: varchar("level").notNull(),
  category: varchar("category").notNull(),
  courseOutput: json("courseOutput").notNull(),
  createdBy: varchar("createdBy").notNull(),
  userName: varchar("userName"),
  userProfilImage: varchar("userProfilImage"),
});
