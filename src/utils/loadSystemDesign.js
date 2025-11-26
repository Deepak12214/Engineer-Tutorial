// src/utils/loadCourseData.js

export async function loadCourseData(courseName) {
  if (!courseName) {
    throw new Error("courseName is required!");
  }

  // Load ALL JSON files from ALL courses
  const allFiles = import.meta.glob("../data/**/**/*.json", {
    eager: true,
  });

  const course = {
    id: courseName,
    title: courseName.replace("-", " ").toUpperCase(),
    sections: [],
  };

  const sectionMap = {};

  // STEP 1 → Pick only this course's section.json
  for (const path in allFiles) {
    if (!path.includes(`/data/${courseName}/`)) continue;

    const data = allFiles[path];

    const parts = path.split("/");
    const sectionId = parts[parts.length - 2];
    const fileName = parts[parts.length - 1];

    if (fileName === "section.json") {
      sectionMap[sectionId] = {
        id: sectionId,
        title: data.title || sectionId,
        order: data.order || 0,
        topics: [],
      };
    }
  }

  // STEP 2 → Load topics
  for (const path in allFiles) {
    if (!path.includes(`/data/${courseName}/`)) continue;
    if (path.endsWith("section.json")) continue;

    const data = allFiles[path];

    const parts = path.split("/");
    const sectionId = parts[parts.length - 2];
    const topicId = parts[parts.length - 1].replace(".json", "");

    if (!sectionMap[sectionId]) continue;

    sectionMap[sectionId].topics.push({
      id: topicId,
      title: data.title || data.heading || topicId,
      heading: data.heading || data.title,
      order: data.order || 0,
      blocks: data.blocks || [],
      points: data.points || [],
    });
  }

  // STEP 3 → Build final data object
  course.sections = Object.values(sectionMap);

  // Sort sections
  course.sections.sort((a, b) => a.order - b.order);

  // Sort topics
  course.sections.forEach((s) => {
    s.topics.sort((a, b) => a.order - b.order);
  });

  return course;
}
