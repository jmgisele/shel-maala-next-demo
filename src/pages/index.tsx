import { Component } from "react";
import {
  attributes,
  react as HomeContent,
} from "../../content/classes/candles-and-kashyes.md";
import Script from "next/script";

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
      content,
    } = attributes;
    return (
      <>
        <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
        <body>
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
        </body>
      </>
    );
  }
}
