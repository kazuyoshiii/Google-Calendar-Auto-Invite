/**
 * Googleカレンダーのイベントに自動的に指定のメールアドレスを招待するスクリプト。
 */

function addAttendeeToEvents() {
  var calendarId = 'primary'; // 使用するカレンダーID。必要に応じて変更してください。
  var emailToCheck = 'your_email@example.com'; // チェックするメールアドレス。適切な値に変更してください。
  var additionalAttendee = 'additional_email@example.com'; // 追加するメールアドレス。適切な値に変更してください。

  // カレンダーから近日中のイベントを取得
  var events = CalendarApp.getCalendarById(calendarId).getEvents(new Date(), new Date(new Date().getTime() + (1000*60*60*24*7)));
  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    var organizer = event.getCreators();

    // 主催者が自分の場合、または特定のメールアドレスが含まれている場合にチェック
    if (organizer.includes(emailToCheck)) {
      event.addGuest(additionalAttendee);
    } else {
      var attendees = event.getGuestList();
      var isInvited = attendees.some(function(attendee) {
        return attendee.getEmail() === emailToCheck;
      });

      if (isInvited) {
        event.addGuest(additionalAttendee);
      }
    }
  }
}
