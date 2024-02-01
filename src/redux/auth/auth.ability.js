export const acl = {
  staff: [
    {
      action: "manage",
      subject: "users",
    },
    {
      action: "manage",
      subject: "contact",
    },
    {
      action: "manage",
      subject: "announcements-route",
    },
    {
      action: "manage",
      subject: "followups-route",
    },
    {
      action: "manage",
      subject: "chat-route",
    },
    {
      action: "manage",
      subject: "dashboard",
    },
    {
      action: "manage",
      subject: "files",
    },
    {
      action: "manage",
      subject: "management",
    },
    {
      action: "manage",
      subject: "subjects",
    },
    {
      action: "manage",
      subject: "lecturerSubjects-route",
    },
    {
      action: "manage",
      subject: "lecturerTimetable-route",
    },
    {
      action: "manage",
      subject: "subjectDetails",
    },
    {
      action: "manage",
      subject: "attendanceSheet",
    },
    {
      action: "manage",
      subject: "assessment",
    },
    {
      action: "manage",
      subject: "userdetails",
    },
  ],
  lecturer: [
    {
      action: "manage",
      subject: "userdetails",
    },
    {
      action: "manage",
      subject: "chat-nav",
    },
    {
      action: "manage",
      subject: "chat-route",
    },
    {
      action: "manage",
      subject: "announcements-route",
    },
    {
      action: "manage",
      subject: "followups-route",
    },
    {
      action: "manage",
      subject: "announcements-nav",
    },
    {
      action: "manage",
      subject: "followups-nav",
    },
    {
      action: "manage",
      subject: "dashboard",
    },
    {
      action: "manage",
      subject: "consultation",
    },
    {
      action: "manage",
      subject: "lecturerSubjects-nav",
    },
    {
      action: "manage",
      subject: "lecturerSubjects-route",
    },
    {
      action: "manage",
      subject: "subjectDetails",
    },
    {
      action: "manage",
      subject: "lecturerTimetable-nav",
    },
    {
      action: "manage",
      subject: "lecturerTimetable-route",
    },
    {
      action: "manage",
      subject: "attendanceSheet",
    },
    {
      action: "manage",
      subject: "assessment",
    },
    {
      action: "manage",
      subject: "files",
    },
  ],
}

export const defaultRoute = {
  staff: "/dashboard",
  lecturer: "/dashboard",
}
