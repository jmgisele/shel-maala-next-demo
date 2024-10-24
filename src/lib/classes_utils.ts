import { DateTime } from "luxon";
// TODO: redo this whole interface this is ridic
export interface FullClassInfo { parsed: ParsedClass; data: ClassData }
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

export interface ParsedClass extends ClassDataDef {
  file: string,
  content: string,
  slug:string,
}
export type Tab = "upcoming" | "current" | "past";

export class ClassData {
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
  slug: string;
  file: string;
  content: string;

  constructor(def: ParsedClass) {
    Object.assign(this, def);
  }

  classDateString = () => {
    let startDate = DateTime.fromJSDate(this.startDate, {
      zone: "America/New_York",
    }).toLocaleString(DateTime.DATE_FULL);
    let endDate = DateTime.fromJSDate(this.endDate, {
      zone: "America/New_York",
    }).toLocaleString(DateTime.DATE_FULL);
    let weekdayList = this.weekdays;
    let singleSession = this.singleSession;
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

  classTimeString = () => {
    let startTimeParsed = DateTime.fromJSDate(this.startTime, {
      zone: "America/New_York",
    }).toLocaleString(DateTime.TIME_SIMPLE);
    let startTimePst = DateTime.fromJSDate(this.startTime, {
      zone: "America/Los_Angeles",
    }).toLocaleString(DateTime.TIME_SIMPLE);
    let endTimeParsed = DateTime.fromJSDate(this.endTime, {
      zone: "America/New_York",
    }).toLocaleString(DateTime.TIME_SIMPLE);
    let endTimePst = DateTime.fromJSDate(this.endTime, {
      zone: "America/Los_Angeles",
    }).toLocaleString(DateTime.TIME_SIMPLE);

    let outputString = ` ${startTimeParsed}–${endTimeParsed} EST (${startTimePst}–${endTimePst} PST)`;
    return outputString;
  };
  tab = (): Tab => {
    let today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    let tab: Tab =
      this.startDate > today
        ? "upcoming"
        : this.endDate >= today
        ? "current"
        : "past";
    return tab;
  };
}