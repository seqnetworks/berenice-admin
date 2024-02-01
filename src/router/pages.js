import DashboardPage from "../pages/dashboard/DashboardPage"
import AnnouncementsPage from "../pages/announcements/announcements.page"
import AssessmentPage from "../pages/assessment/assessment.page"
import AttendanceSheetPage from "../pages/attendance sheet/attendanceSheet.page"
import ChatPage from "../pages/chat/chatPage.page"
import ConsulttationPage from "../pages/consultation/consulttation.page"
import ContactPage from "../pages/contact/contact.page"
import FilesPage from "../pages/files/Files.page"
import FollowupsPage from "../pages/follow ups/followups.page"
import LecturerSubjectsPage from "../pages/lecturer subjects/lecturerSubjects.page"
import LecturerTimetablePage from "../pages/lecturer timetable/lecturerTimetable.page"
import LoginPage from "../pages/login/Login-v2"
import ManagementPage from "../pages/management/management.page"
import SubjectDetailsPage from "../pages/subject details/SubjectDetails.page"
import SubjectsPage from "../pages/subjects/subjects.page"
import UserDetailsPage from "../pages/user details/UserDetailsPage"
import UsersPage from "../pages/users/UsersPage"

export default [
  {
    path: "/login",
    component: LoginPage,
    layout: "BlankLayout",
    meta: {
      authRoute: true,
    },
  },
  {
    path: "/dashboard",
    id: "Dashboard",
    component: DashboardPage,
    exact: true,
    meta: {
      action: "read",
      resource: "dashboard",
    },
  },
  {
    path: "/users",
    id: "Users",
    component: UsersPage,
    exact: true,
    meta: {
      action: "read",
      resource: "users",
    },
  },
  {
    path: "/chat",
    id: "Chat",
    component: ChatPage,
    exact: true,
    className: "chat-application",
    appLayout: true,
    meta: {
      action: "read",
      resource: "chat-route",
    },
  },
  {
    path: "/userdetails",
    id: "Users Details",
    component: UserDetailsPage,
    exact: true,
    meta: {
      action: "read",
      resource: "userdetails",
    },
  },
  {
    path: "/contact",
    id: "contact",
    component: ContactPage,
    exact: true,
    meta: {
      action: "read",
      resource: "contact",
    },
  },
  {
    path: "/announcements",
    id: "announcements",
    component: AnnouncementsPage,
    exact: true,
    meta: {
      action: "read",
      resource: "announcements-route",
    },
  },
  {
    path: "/followups",

    id: "followups",
    component: FollowupsPage,
    exact: true,
    meta: {
      action: "read",
      resource: "followups-route",
    },
  },
  {
    path: "/consultation",
    id: "consultation",
    component: ConsulttationPage,
    exact: true,
    appLayout: true,
    meta: {
      action: "read",
      resource: "consultation",
    },
  },
  {
    path: "/files",
    id: "files",
    component: FilesPage,
    exact: true,
    meta: {
      action: "read",
      resource: "files",
    },
  },
  {
    path: "/management",
    id: "management",
    component: ManagementPage,
    exact: true,
    meta: {
      action: "read",
      resource: "management",
    },
  },
  {
    path: "/subjects",
    id: "subjects",
    component: SubjectsPage,
    exact: true,
    meta: {
      action: "read",
      resource: "subjects",
    },
  },
  {
    path: "/lecturerSubjects",
    id: "lecturerSubjects",
    component: LecturerSubjectsPage,
    exact: true,
    meta: {
      action: "read",
      resource: "lecturerSubjects-route",
    },
  },
  {
    path: "/lecturerTimetable",
    id: "lecturerTimetable",
    component: LecturerTimetablePage,
    exact: true,
    meta: {
      action: "read",
      resource: "lecturerTimetable-route",
    },
  },
  {
    path: "/subjectDetails",
    id: "subjectDetails",
    component: SubjectDetailsPage,
    exact: true,
    meta: {
      action: "read",
      resource: "subjectDetails",
    },
  },
  {
    path: "/attendanceSheet",
    id: "attendanceSheet",
    component: AttendanceSheetPage,
    exact: true,
    meta: {
      action: "read",
      resource: "attendanceSheet",
    },
  },
  {
    path: "/assessment",
    id: "assessment",
    component: AssessmentPage,
    exact: true,
    meta: {
      action: "read",
      resource: "assessment",
    },
  },
]