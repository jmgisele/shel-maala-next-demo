import { DateTime } from "luxon";
export interface ClassDataDef {
  title: string;
  description: string;
  classRegistrationLink: string;
  featuredImage: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  weekdays: string[];
  singleSession?: boolean;
  [key: string]: any;
}

export interface ClassData extends ClassDataDef {
  file: string;
  content: string;
  slug: string;
  classDateString: string;
  classTimeString: string;
  tab: Tab;
}
export type Tab = "upcoming" | "current" | "past";

export const classDateString = (c: ClassDataDef) => {
  let startDate = DateTime.fromJSDate(c.startDate, {
    zone: "America/New_York",
  }).toLocaleString(DateTime.DATE_FULL);
  let endDate = DateTime.fromJSDate(c.endDate, {
    zone: "America/New_York",
  }).toLocaleString(DateTime.DATE_FULL);

  let outputString = "";
  if (c.weekdays && c.weekdays.length > 0) {
    let s = c.singleSession ? "" : "s";
    if (c.weekdays.length == 1) {
      outputString += c.weekdays[0] + s;
    } else if (c.weekdays.length == 2) {
      outputString += `${c.weekdays[0]}${s} and ${c.weekdays[1]}${s}`;
    } else {
      let weekdayString = "";
      for (let i = 0; i < c.weekdays.length; i++) {
        let day = c.weekdays[i];
        if (i == c.weekdays.length - 1) {
          weekdayString += `${day}${s}`;
        } else {
          weekdayString += `${day}${s}, `;
        }
      }
      outputString += weekdayString;
    }
  }
  outputString += c.singleSession
    ? `, ${startDate}`
    : `, ${startDate}–${endDate}`;

  return outputString;
};

export const classTimeString = (c: ClassDataDef) => {
  let startTimeParsed = DateTime.fromJSDate(c.startTime, {
    zone: "America/New_York",
  }).toLocaleString(DateTime.TIME_SIMPLE);
  let startTimePst = DateTime.fromJSDate(c.startTime, {
    zone: "America/Los_Angeles",
  }).toLocaleString(DateTime.TIME_SIMPLE);
  let endTimeParsed = DateTime.fromJSDate(c.endTime, {
    zone: "America/New_York",
  }).toLocaleString(DateTime.TIME_SIMPLE);
  let endTimePst = DateTime.fromJSDate(c.endTime, {
    zone: "America/Los_Angeles",
  }).toLocaleString(DateTime.TIME_SIMPLE);

  let outputString = ` ${startTimeParsed}–${endTimeParsed} EST (${startTimePst}–${endTimePst} PST)`;
  return outputString;
};

export const tab = (c: ClassDataDef): Tab => {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  let tab: Tab =
    new Date(c.startDate) > today
      ? "upcoming"
      : new Date(c.endDate) >= today
      ? "current"
      : "past";
  return tab;
};
