import moment from "moment";

export function isAllDay(event) {
  const start = moment(event.start);
  const end = moment(event.end);
  const isAllDay = false;
  const startDay = parseInt(start.format("D"), 10);
  const endDay = parseInt(end.format("D"), 10);

  if (!(endDay === startDay) || end.diff(start, "day") >= 1) {
    return true;
  }

  return isAllDay;
}

export function isFull24HoursDay(event) {
  return event.vevent.getFirstProperty("dtstart") ? event.vevent.getFirstProperty("dtstart").type === "date" : false;
}

export function isMultiDay(event) {
  return isAllDay(event) && !isFull24HoursDay(event);
}

export function getAttendees(event) {
  return event.vevent.getAllProperties("attendee").map(attendee => {
    const attendeeEmail = attendee.getFirstValue();

    if (!attendeeEmail) {
      return;
    }

    const cn = attendee.getParameter("cn");
    const mail = attendeeEmail;
    const partstat = attendee.getParameter("partstat");

    return {
      email: mail,
      name: cn || mail,
      partstat: partstat,
      displayName: cn || mail
    };
  });
}

export function getOrganizer(event) {
  const organizer = event.vevent.getFirstProperty("organizer");
  const mail = organizer.getFirstValue();
  const cn = organizer.getParameter("cn");

  return {
    fullmail: mail,
    email: mail,
    name: cn || mail,
    displayName: cn || mail
  };
}
