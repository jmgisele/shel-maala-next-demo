import { Component } from "react";
import {
  attributes,
  react as HomeContent,
} from "../../content/classes/candles-and-kashyes.md";
import React from "react";

export default class Home extends Component {
  render() {
    let {
      title,
      description,
      featuredImage,
      startDate,
      endDate,
      startTime,
      endTime,
      singleSession,
      weekdays,
    } = attributes;
    return (
      <>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <article>
          <h1>{title}</h1>
          <img src={featuredImage} />
          <header>
            <h1>{title}</h1>
          </header>

          <h1>{title}</h1>
          <h1>{description}</h1>
          <h1>{startDate}</h1>
          <h1>{endDate}</h1>
          <h1>{startTime}</h1>
          <h1>{endTime}</h1>
          <h1>{singleSession}</h1>
          <h1>{weekdays}</h1>
          <HomeContent />
        </article>
      </>
    );
  }
}
