import { Linking } from 'react-native';

const openGoogleCalendar = () => {
    const title = 'Project';
    const description = 'About project ';
    const startDate = '20251001T100000'; // YYYYMMDDTHHMMSS
    const endDate = '20251001T110000';

    const url =
      `https://calendar.google.com/calendar/render?action=TEMPLATE` +
      `&text=${encodeURIComponent(title)}` +
      `&dates=${startDate}/${endDate}` +
      `&details=${encodeURIComponent(description)}`;

    Linking.openURL(url);
  };

  export default openGoogleCalendar;