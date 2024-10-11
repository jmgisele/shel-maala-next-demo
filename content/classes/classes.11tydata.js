const { DateTime } = require("luxon");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  eleventyComputed: {
    classDateString: classDataObj => {
      let startDate = DateTime.fromJSDate(classDataObj.startDate,{ zone: "America/New_York" }).toLocaleString(DateTime.DATE_FULL);
      let endDate = DateTime.fromJSDate(classDataObj.endDate, {zone: "America/New_York"}).toLocaleString(DateTime.DATE_FULL);
      let weekdayList = classDataObj.weekdays;
      let singleSession = classDataObj.singleSession;
      let outputString = '';
      if(weekdayList && weekdayList.length > 0){
        let s = singleSession ? '' : 's'
        if(weekdayList.length == 1){
          outputString += weekdayList[0] + s; 
        } else if (weekdayList.length == 2){
          outputString += `${weekdayList[0]}${s} and ${weekdayList[1]}${s}`;
        } else {
          let weekdayString = '';
          for(let i = 0; i < weekdayList.length; i++){
            let day = weekdayList[i];
            if(i == weekdayList.length - 1){
              weekdayString += `${day}${s}`;
            } else {
              weekdayString += `${day}${s}, `;
            }
          }
          outputString += weekdayString;
        }
      }

      if(singleSession){
        outputString += `, ${startDate}`;
      } else {
        outputString += `, ${startDate}–${endDate}`;
      }

      return outputString;
    },
    classTimeString: classDataObj => {
      let startTime = DateTime.fromJSDate(classDataObj.startTime, {zone: "America/New_York"}).toLocaleString(DateTime.TIME_SIMPLE);
      let startTimePst = DateTime.fromJSDate(classDataObj.startTime, {zone: "America/Los_Angeles"}).toLocaleString(DateTime.TIME_SIMPLE);
      let endTime = DateTime.fromJSDate(classDataObj.endTime, {zone: "America/New_York"}).toLocaleString(DateTime.TIME_SIMPLE);
      let endTimePst = DateTime.fromJSDate(classDataObj.endTime, {zone: "America/Los_Angeles"}).toLocaleString(DateTime.TIME_SIMPLE);
      
      let outputString = ` ${startTime}–${endTime} EST (${startTimePst}–${endTimePst} PST)`
      return outputString
    },
    tab: classDataObj => {
      let today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      
      let tab = classDataObj.startDate > today ? 'upcoming'
        : classDataObj.endDate >= today ? 'current'
        : 'past';
      return tab;
    },
    listItem: classDataObj => {
      let key = uuidv4();
      return `
      <li 
        x-data="{showDescription: false}" 
        class="p-5 bg-gray-100 border-2 border-gray-300'} lg:flex" 
        :class="{'open': showDescription}"
      >
      
      <div class="w-full lg:w-1/3">
        <img src="${classDataObj.featuredImage}" />
      </div>
      <div>
        <header>
          <div class="flex lg:flex-grow">
            <h3 class="font-bold flex-grow">${classDataObj.title}</h3>
            <button 
            class="lg:hidden"
            @click="showDescription = !showDescription">
            <svg x-show="!showDescription" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke-width="2.5" stroke="#000000" fill="none" class="duration-300 transform transition-all" style="width: 18px; height: 18px;"><path d="M6.53 18.86l26.63 25.26 24.26-25.26"></path></svg>
            <svg x-show="showDescription" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke-width="2.5" stroke="#000000" fill="none" class="duration-300 transform transition-all" style="width: 18px; height: 18px;"><path d="M57.47 45.15L30.84 19.88 6.58 45.15"></path></svg>
            </button>
          </div>
        </header>
        <div class="p-1 bg-gray-200 my-1">
          <time class="text-sm">${classDataObj.classDateString}</time>
        </div>
        <div class="overflow-hidden transition-all duration-700 lg:max-h-override"
          x-ref="${key}" :style="
          showDescription ? 'max-height: ' + $refs['${key}'].scrollHeight + 'px' : 'max-height: 0'

        ">
          <p>${classDataObj.description}</p>
          <p class="text-right"><a href="${classDataObj.page.url}">More Info</a></p>
        </div>
      </div>
      </li>
      `
    },
  }
}
