// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
// core components/views
import DashboardAdminPage from "views/DashboardAdmin/DashboardAdmin.jsx";
import DashboardUserPage from "views/DashboardUser/DashboardUser.jsx";
// import HbA1cDataEntry from "views/HbA1cDataEntry/HbA1cDataEntry.jsx";
import Member from "views/Member/Member.jsx";
// import HctDataEntry from "views/HctDataEntry/HctDataEntry.jsx";
import BgFormSetting from "views/BgFormSetting/BgFormSetting.jsx";
import BgDataEntry from "views/BgDataEntry/BgDataEntry.jsx";

let dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard (หน้าแรก)",
    navbarName: "Dashboard (หน้าแรก)",
    icon: Dashboard,
    component: DashboardAdminPage,
    isVisible: [1]
  },
  {
    path: "/dashboard",
    sidebarName: "Dashboard (หน้าแรก)",
    navbarName: "Dashboard (หน้าแรก)",
    icon: Dashboard,
    component: DashboardUserPage,
    isVisible: [3]
  },
  {
    path: "/member",
    sidebarName: "Member (สมาชิก)",
    navbarName: "Member (สมาชิก)",
    icon: "people",
    component: Member,
    isVisible: [1]
  },
  {
    path: "/BgDataEntry",
    sidebarName: "PT-Blood Glucose \n(ส่งผลการวัดระดับนํ้าตาล)",
    navbarName: "PT-Blood Glucose (ส่งผลการวัดระดับนํ้าตาล)",
    icon: "send",
    component: BgDataEntry,
    isVisible: ['blood_glucose_member_id']
  },
  // {
  //   path: "/HctDataEntry",
  //   sidebarName: "PT-Hct \n(ส่งผลเม็ดเลือดแดงอัดแน่น)",
  //   navbarName: "PT-Hct (ส่งผลเม็ดเลือดแดงอัดแน่น)",
  //   icon: "send",
  //   component: HctDataEntry,
  //   isVisible: ['hct_member_id']
  // },
  // {
  //   path: "/HbA1cDataEntry",
  //   sidebarName: "PT-HbA1c \n(ส่งผลฮีโมโกลบินเอวันซี)",
  //   navbarName: "PT-HbA1c (ส่งผลฮีโมโกลบินเอวันซี)",
  //   icon: "send",
  //   component: HbA1cDataEntry,
  //   isVisible: ['hba1c_member_id']
  // },
  {
    path: "/SettingBgForm",
    sidebarName: "Blood Glucose Form \n(แบบฟอร์ม Blood Glucose)",
    navbarName: "Blood Glucose Form (แบบฟอร์ม Blood Glucose)",
    icon: "assignment",
    component: BgFormSetting,
    isVisible: [1]
  },
  // {
  //   path: "/notifications",
  //   sidebarName: "Notifications",
  //   navbarName: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   isVisible:[3]
  // },
  // {
  //   path: "/upgrade-to-pro",
  //   sidebarName: "Upgrade To PRO",
  //   navbarName: "Upgrade To PRO",
  //   icon: Unarchive,
  //   component: UpgradeToPro,
  //   isVisible:[3]
  // },
  // {
  //   path: "/logout",
  //   sidebarName: "Logout (ออกจากระบบ)",
  //   navbarName: "Logout (ออกจากระบบ)",
  //   icon: "vpn_key",
  //   component: Logout,
  //   isVisible: [1, 3],
  // },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect", isVisible: [1, 3] }
];
if (JSON.parse(localStorage.getItem('the_main_app'))) {
  dashboardRoutes = dashboardRoutes.filter((data) => {
    let datas = data.isVisible.filter(element => {
      // console.log(JSON.parse(localStorage.getItem('the_main_app')))
      if (element == JSON.parse(localStorage.getItem('the_main_app')).user_type_id) {
        return element == JSON.parse(localStorage.getItem('the_main_app')).user_type_id
      } else if (element == 'blood_glucose_member_id') {

        if (JSON.parse(localStorage.getItem('the_main_app')).blood_glucose_member_id != '') {
          return JSON.parse(localStorage.getItem('the_main_app')).blood_glucose_member_id != ''
        }
      } else if (element == 'hba1c_member_id') {

        if (JSON.parse(localStorage.getItem('the_main_app')).hba1c_member_id != '') {
          return JSON.parse(localStorage.getItem('the_main_app')).hba1c_member_id != ''
        }
      } else if (element == 'hct_member_id') {

        if (JSON.parse(localStorage.getItem('the_main_app')).hct_member_id != '') {
          return JSON.parse(localStorage.getItem('the_main_app')).hct_member_id != ''
        }
      }
    });
    if (datas.length > 0) {
      return data
    }
  })
}

export default dashboardRoutes;
