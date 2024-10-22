import { DateTime } from "luxon";

export interface ClassData {
  title: string;
  description: string;
  classRegistrationLink: string;
  featuredImage: string;
  startDate: Date;
  startTime: DateTime;
  endDate: Date;
  endTime: DateTime;
  weekdays: string[];
  singleSession?: boolean;
  [key: string]: any
}
export interface ProccessedClass extends ClassData {
  classDateString: string;
  classTimeString: string;
  tab: Tab;
  slug: string;
  file: string;
}

export type Tab = "upcoming" | "current" | "past";

export const classDateString = (classDataObj: ClassData) => {
  let startDate = DateTime.fromJSDate(classDataObj.startDate, {
    zone: "America/New_York",
  }).toLocaleString(DateTime.DATE_FULL);
  let endDate = DateTime.fromJSDate(classDataObj.endDate, {
    zone: "America/New_York",
  }).toLocaleString(DateTime.DATE_FULL);
  let weekdayList = classDataObj.weekdays;
  let singleSession = classDataObj.singleSession;
  let outputString = "";
  if (weekdayList && weekdayList.length > 0) {
    let s = singleSession ? "" : "s";
    if (weekdayList.length == 1) {
      outputString += weekdayList[0] + s;
    } else if (weekdayList.length == 2) {
      outputString += `${weekdayList[0]}${s} and ${weekdayList[1]}${s}`;
    } else {
      let weekdayString = "";
      for (let i = 0; i < weekdayList.length; i++) {
        let day = weekdayList[i];
        if (i == weekdayList.length - 1) {
          weekdayString += `${day}${s}`;
        } else {
          weekdayString += `${day}${s}, `;
        }
      }
      outputString += weekdayString;
    }
  }

  if (singleSession) {
    outputString += `, ${startDate}`;
  } else {
    outputString += `, ${startDate}–${endDate}`;
  }

  return outputString;
};

export const classTimeString = (classDataObj: ClassData) => {
  let startTime = DateTime.fromJSDate(classDataObj.startTime, {
    zone: "America/New_York",
  }).toLocaleString(DateTime.TIME_SIMPLE);
  let startTimePst = DateTime.fromJSDate(classDataObj.startTime, {
    zone: "America/Los_Angeles",
  }).toLocaleString(DateTime.TIME_SIMPLE);
  let endTime = DateTime.fromJSDate(classDataObj.endTime, {
    zone: "America/New_York",
  }).toLocaleString(DateTime.TIME_SIMPLE);
  let endTimePst = DateTime.fromJSDate(classDataObj.endTime, {
    zone: "America/Los_Angeles",
  }).toLocaleString(DateTime.TIME_SIMPLE);

  let outputString = ` ${startTime}–${endTime} EST (${startTimePst}–${endTimePst} PST)`;
  return outputString;
};

export const tab = (classDataObj: ClassData): Tab => {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  let tab: Tab =
    classDataObj.startDate > today
      ? "upcoming"
      : classDataObj.endDate >= today
      ? "current"
      : "past";
  return tab;
};
